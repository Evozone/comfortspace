import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Socket } from 'socket.io-client';
import { v4 as uuid } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import LoopIcon from '@mui/icons-material/Loop';

import { light, bluegrey, deepDark, medium } from '../utils/colors';
import { formatDate } from '../utils/formatTimestamp';
import storage from '../appwrite';
import TextBody from './TextBody';
import ProfileInfo from './ProfileInfo';
import MessageInput from './MessageInput';
import { notifyAction, startLoadingAction, stopLoadingAction } from '../actions/actions';
import { message, otherUser } from './Connect';
import { AuthState } from 'src/reducers/authReducer';

interface ChatInterfaceProps {
    mode: string;
    otherUser: otherUser;
    socketRef: React.MutableRefObject<Socket | null>;
    connectSettings: any;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
    mode,
    otherUser,
    socketRef,
    connectSettings,
}) => {
    const inputRef = useRef<any>();
    const endRef = useRef<any>();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const currentUser = useSelector((state: { auth: AuthState }) => state.auth);
    const [messages, setMessages] = useState<message[]>([]);
    const [pageNum, setPageNum] = useState<number>(0);
    const [loadButtonVisible, setLoadButtonVisible] = useState<boolean>(true);
    const [prevOtherUser, setPrevOtherUser] = useState<otherUser>();
    const [timer, setTimer] = useState<NodeJS.Timeout>();
    const [typing, setTyping] = useState<boolean>(false);
    const [profileInfoOpen, setProfileInfoOpen] = useState<boolean>(false);

    useEffect(() => {
        if (otherUser.uid === prevOtherUser?.uid) return;
        setTimeout(() => {
            endRef?.current?.scrollIntoView({ behavior: 'smooth' });
        }, 700);
        setPrevOtherUser(otherUser);
        setMessages([]);
        setLoadButtonVisible(true);
        loadConversation(0);
    }, [otherUser]);

    useEffect(() => {
        const socket = socketRef?.current;
        socketRef.current?.on('recieve_message', (message) => {
            if (message.senderId !== otherUser.uid) {
                return;
            }
            setMessages((prev) => {
                if (!prev || prev.length === 0) {
                    return [message];
                }
                return [...prev, message];
            });
            setTimeout(() => {
                endRef?.current?.scrollIntoView({ behavior: 'smooth' });
            }, 700);
        });

        return () => {
            socket?.off('recieve_message');
        };
    }, [socketRef, otherUser, connectSettings]);

    useEffect(() => {
        const socket = socketRef?.current;
        socketRef.current?.on('typing_status', (data) => {
            if (data.senderId !== otherUser.uid || !connectSettings.typingStatus) {
                return;
            }
            setTyping(data.typing);
        });
        return () => {
            socket?.off('typing_status');
        };
    }, [socketRef, otherUser, connectSettings]);

    const loadConversation = async (page: number) => {
        if (!currentUser.uid) {
            return;
        }
        const chatId =
            currentUser?.uid > otherUser.uid
                ? `${currentUser.uid}${otherUser.uid}`
                : `${otherUser.uid}${currentUser.uid}`;
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_SERVER_URL}/api/message/${chatId}?page=${page}`
            );
            setPageNum(page);
            if (data.result.length === 0) {
                setLoadButtonVisible(false);
                if (!otherUser.new) {
                    dispatch(notifyAction(true, 'success', 'No more messages to load'));
                }
                return;
            }
            setMessages((prev) => {
                if (!prev || prev.length === 0) {
                    return data.result.reverse();
                }
                return [...data.result.reverse(), ...prev];
            });
        } catch (error) {
            dispatch(
                notifyAction(
                    true,
                    'error',
                    'It seems something is wrong, please log out and log in again. in a minute :('
                )
            );
        }
    };

    const handleSendMessage = async (text: string) => {
        if (!text || !currentUser.uid) {
            alert('Please enter a message');
            return;
        }
        const chatId =
            currentUser.uid > otherUser.uid
                ? currentUser.uid + otherUser.uid
                : otherUser.uid + currentUser.uid;
        const senderId = currentUser.uid;
        const senderName = currentUser.name;
        const senderEmail = currentUser.email;
        try {
            const { data } = await axios.post(
                `${process.env.REACT_APP_SERVER_URL}/api/message`,
                {
                    chatId,
                    senderId,
                    senderName,
                    senderEmail,
                    text,
                    timestamp: Date.now(),
                }
            );
            socketRef?.current?.emit('send_message', {
                ...data.result,
                receiverId: otherUser.uid,
            });
            setMessages((prev) => {
                if (!prev || prev.length === 0) {
                    return [data.result];
                }
                return [...prev, data.result];
            });
            setTimeout(() => {
                endRef?.current?.scrollIntoView({ behavior: 'smooth' });
            }, 700);
            if (inputRef?.current) {
                inputRef.current.value = '';
            }
        } catch (error) {
            dispatch(
                notifyAction(
                    true,
                    'error',
                    'It seems something is wrong, please log out and log in again. in a minute :('
                )
            );
            console.log(error);
        }
    };

    const uploadFile = async (file: File) => {
        dispatch(startLoadingAction());
        const id = uuid();
        const bucketId = process.env.REACT_APP_APPWRITE_BUCKET_ID;
        await storage.createFile(bucketId || '', id, file);
        const result = storage.getFilePreview(bucketId || '', id);
        await handleSendMessage(result.href);
        dispatch(stopLoadingAction());
    };

    const textfieldOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value && connectSettings.typingStatus) {
            socketRef?.current?.emit('start_typing', {
                receiverId: otherUser.uid,
                senderId: currentUser.uid,
                typing: true,
            });
            clearTimeout(timer);
            const newTimer = setTimeout(() => {
                socketRef?.current?.emit('stop_typing', {
                    receiverId: otherUser.uid,
                    senderId: currentUser.uid,
                    typing: false,
                });
            }, 1500);
            setTimer(newTimer);
        }
    };

    const startPersonalCall = async () => {
        dispatch(startLoadingAction());
        const id = uuid();
        const CALL_TEMPLATE = `Hey, Lets talk more on a video call. Please click on the link below to join the call. \n\n ${process.env.REACT_APP_BASE_URL}/connect/pc/${id}`;
        await handleSendMessage(CALL_TEMPLATE);
        dispatch(stopLoadingAction());
        navigate(`/connect/pc/${id}`);
    };

    const handleProfileClick = () => {
        setProfileInfoOpen(true);
    };

    return (
        <Box sx={{ flexGrow: 1, overflowY: 'hidden' }}>
            <AppBar
                sx={{
                    width: '100%',
                    backgroundColor: mode === 'light' ? medium : bluegrey,
                    height: 61,
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'row',
                    px: 2,
                }}
                elevation={0}
                color="inherit"
                position="static"
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        cursor: 'pointer',
                    }}
                    onClick={handleProfileClick}
                >
                    <Avatar
                        alt={otherUser.name.charAt(0).toUpperCase()}
                        src={otherUser.photoURL}
                        sx={{
                            bgcolor: mode === 'light' ? deepDark : light,
                            height: 50,
                            width: 50,
                        }}
                    >
                        {otherUser.name.charAt(0).toUpperCase()}
                    </Avatar>
                    <Box sx={{ display: 'block' }}>
                        <Typography sx={{ fontWeight: '400', ml: 3, fontSize: '1rem' }}>
                            {otherUser.name}
                        </Typography>
                        <Typography
                            sx={{
                                fontWeight: '300',
                                ml: 3,
                                fontSize: '0.8rem',
                                color:
                                    mode === 'light'
                                        ? 'rgba(0, 0, 0, 0.54)'
                                        : 'rgba(255, 255, 255, 0.54)',
                            }}
                        >
                            {typing ? 'typing...' : '@' + otherUser.username}
                        </Typography>
                    </Box>
                </Box>
                <IconButton
                    onClick={startPersonalCall}
                    sx={{ position: 'absolute', right: '10px' }}
                >
                    <VideoCallIcon
                        sx={{
                            height: 40,
                            width: 40,
                            color: deepDark,
                        }}
                    />
                </IconButton>
            </AppBar>
            <Box
                sx={{
                    p: '20px',
                    pb: 0,
                    height: 'calc(100vh - 204px)',
                    overflowY: 'scroll',
                    overflowX: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundImage:
                        mode === 'dark'
                            ? `url('/assets/vectors/chat-background-dark.svg')`
                            : `url('/assets/vectors/chat-background.svg')`,
                    backgroundSize: '115px',
                }}
            >
                {messages?.length >= 10 && loadButtonVisible && (
                    <Button
                        onClick={() => loadConversation(pageNum + 1)}
                        endIcon={<LoopIcon />}
                        sx={{
                            alignSelf: 'center',
                            mb: '10px',
                            backgroundColor: mode === 'light' ? medium : light,
                            color: bluegrey,
                            font: 'Poppins, sans-serif',
                            ':hover': {
                                backgroundColor: medium,
                                color: 'black',
                            },
                            borderRadius: '20px',
                            width: '195px',
                            height: '30px',
                        }}
                        variant="contained"
                        disableElevation
                        color="success"
                    >
                        Load More Chats
                    </Button>
                )}
                {messages.length > 0 &&
                    messages.map((message, index) => {
                        const msgDate = formatDate(message.timestamp / 1000);
                        const nxtMsgDate = formatDate(
                            messages[index - 1]?.timestamp / 1000
                        );
                        if (index === 0 || msgDate !== nxtMsgDate) {
                            return (
                                <React.Fragment key={message._id}>
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            marginBottom: '5px',
                                        }}
                                    >
                                        <div
                                            style={{
                                                textAlign: 'center',
                                                color: 'white',
                                                fontSize: '11px',
                                                width: 'fit-content',
                                                padding: '2px 8px',
                                                background: '#898989',
                                                borderRadius: '10px',
                                            }}
                                        >
                                            {msgDate}
                                        </div>
                                    </div>
                                    <TextBody {...{ message, endRef }} />
                                </React.Fragment>
                            );
                        }
                        return <TextBody key={message._id} {...{ message, endRef }} />;
                    })}
            </Box>
            <Divider />
            <MessageInput
                handleSendMessage={handleSendMessage}
                inputRef={inputRef}
                mode={mode}
                uploadFile={uploadFile}
                textfieldOnChange={textfieldOnChange}
            />
            {profileInfoOpen && (
                <ProfileInfo {...{ mode, otherUser, setProfileInfoOpen }} />
            )}
        </Box>
    );
};

export default ChatInterface;
