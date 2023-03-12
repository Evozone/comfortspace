import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import ChatIcon from '@mui/icons-material/Chat';
import SettingsIcon from '@mui/icons-material/Settings';

import { initSocket } from '../socket';
import { light, bluegrey, deepDark, medium, richBlack } from '../utils/colors';
import ChatInterface from './ChatInterface';
import UserChats from './UserChats';
import SearchUser from './SearchUser';
import ConnectSettings from './ConnectSettings';

function Connect({ mode }) {
    const socketRef = useRef(null);
    const [value, setValue] = useState(0);
    const [otherUser, setOtherUser] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [messageNotSeen, setMessageNotSeen] = useState([]);
    const [connectSettings, setConnectSettings] = useState();

    const currentUser = useSelector((state) => state.auth);

    useEffect(() => {
        if (!(Notification.permission === 'granted')) {
            const data = {
                showNotifications: false,
                textContent: false,
                playSound: true,
                onlineStatus: true,
                typingStatus: true,
            };
            window.localStorage.setItem(
                'connectSettings',
                JSON.stringify(data)
            );
            setConnectSettings(data);
        } else {
            const data = {
                showNotifications: true,
                textContent: false,
                playSound: true,
                onlineStatus: true,
                typingStatus: true,
            };
            window.localStorage.setItem(
                'connectSettings',
                JSON.stringify(data)
            );
            setConnectSettings(data);
        }
    }, []);

    useEffect(() => {
        const init = async () => {
            socketRef.current = await initSocket('chat');
            socketRef.current.on('connect_error', (error) =>
                handleErrors(error)
            );
            socketRef.current.on('connect_failed', (error) =>
                handleErrors(error)
            );
            function handleErrors(error) {
                console.log('socket error', error);
                alert(
                    'Socket connection failed, Please close the tab & try again later.'
                );
            }
            socketRef.current.emit('join', {
                newUserId: currentUser.uid,
                onlineStatus: connectSettings?.onlineStatus,
            });
            socketRef.current.on('online_users', (users) => {
                if (connectSettings.onlineStatus) {
                    setOnlineUsers(
                        users.filter((user) => user.onlineStatus === true)
                    );
                } else {
                    setOnlineUsers([]);
                }
            });
        };
        init();
        return () => {
            socketRef.current?.disconnect();
            socketRef.current?.off('connect_error');
            socketRef.current?.off('connect_failed');
            socketRef.current?.off('online_users');
            socketRef.current?.off('recieve_message');
            socketRef.current?.off('typing_status');
        };
    }, [currentUser, connectSettings]);

    useEffect(() => {
        socketRef.current?.on('recieve_notification', (message) => {
            if (
                (otherUser === null || message.senderId !== otherUser.uid) &&
                connectSettings?.showNotifications
            ) {
                const audio = new Audio('/assets/audio/notification.mp3');
                const body = connectSettings?.textContent
                    ? 'New message from ' +
                      message.senderName +
                      ' - ' +
                      message.text
                    : 'New message from ' + message.senderName;
                const notification = new Notification('Dev Chat+', {
                    body,
                    icon: '/icon-192x192.png',
                    tag: message.senderId,
                });
                connectSettings?.playSound && audio.play();
                notification.onclick = () => {
                    window.focus();
                    setValue(0);
                };
            }
        });
        return () => {
            socketRef.current?.off('recieve_notification');
        };
    });

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChatClick = (user) => {
        setOtherUser(user);
        if (user.new) {
            setValue(0);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                overflowY: 'auto',
                mt: '75px',
                maxHeight: 'calc(100vh - 75px)',
            }}
        >
            <Box sx={{ width: '400px' }}>
                <AppBar elevation={0} color='inherit' position='static'>
                    <Tabs
                        sx={{
                            alignItems: 'center',
                            // boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.5)',
                            backgroundColor:
                                mode === 'light' ? medium : bluegrey,
                            '& .MuiTabs-indicator': {
                                backgroundColor:
                                    mode === 'light' ? deepDark : medium,
                            },
                        }}
                        value={value}
                        onChange={handleChange}
                        textColor='inherit'
                        variant='fullWidth'
                    >
                        <Tab
                            sx={{
                                fontSize: '1.1rem',
                                borderRight:
                                    mode === 'light'
                                        ? '1px solid rgba(255, 255, 255, 0.52)'
                                        : '1px solid rgba(255, 255, 255, 0.22)',
                                borderBottom:
                                    mode === 'light'
                                        ? '1px solid rgba(255, 255, 255, 0.52)'
                                        : '1px solid rgba(255, 255, 255, 0.22)',
                            }}
                            icon={<ChatIcon sx={{ fontSize: '36px' }} />}
                        />
                        <Tab
                            sx={{
                                fontSize: '1.1rem',
                                borderBottom:
                                    mode === 'light'
                                        ? '1px solid rgba(255, 255, 255, 0.52)'
                                        : '1px solid rgba(255, 255, 255, 0.22)',
                            }}
                            icon={
                                <PersonSearchIcon sx={{ fontSize: '34px' }} />
                            }
                        />
                        <Tab
                            sx={{
                                fontSize: '1.1rem',
                                borderLeft:
                                    mode === 'light'
                                        ? '1px solid rgba(255, 255, 255, 0.52)'
                                        : '1px solid rgba(255, 255, 255, 0.22)',
                                borderBottom:
                                    mode === 'light'
                                        ? '1px solid rgba(255, 255, 255, 0.52)'
                                        : '1px solid rgba(255, 255, 255, 0.22)',
                                borderRight:
                                    mode === 'light'
                                        ? '1px solid rgba(255, 255, 255, 0.52)'
                                        : '1px solid rgba(255, 255, 255, 0.22)',
                            }}
                            icon={<SettingsIcon sx={{ fontSize: '34px' }} />}
                        />
                    </Tabs>
                </AppBar>
                <Box
                    sx={{
                        width: '100%',
                        height: 'calc(100vh - 136px)',
                        overflowY: 'auto',
                        borderRight:
                            mode === 'light'
                                ? '1px solid rgba(0, 0, 0, 0.12)'
                                : '1px solid rgba(255, 255, 255, 0.12)',
                        backgroundColor: mode === 'light' ? light : richBlack,
                    }}
                >
                    {value === 0 && (
                        <UserChats
                            {...{
                                handleChatClick,
                                mode,
                                socketRef,
                                otherUser,
                                onlineUsers,
                                messageNotSeen,
                                setMessageNotSeen,
                                setValue,
                            }}
                        />
                    )}
                    {value === 1 && (
                        <SearchUser
                            mode={mode}
                            handleChatClick={handleChatClick}
                        />
                    )}
                    {value === 2 && (
                        <ConnectSettings
                            setConnectSettings={setConnectSettings}
                            connectSettings={connectSettings}
                        />
                    )}
                </Box>
            </Box>
            {!otherUser ? (
                <Box
                    sx={{
                        height: 'calc(100vh - 75px)',
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: mode === 'light' ? light : bluegrey,
                    }}
                >
                    <img
                        src={
                            mode === 'dark'
                                ? '/assets/vectors/welcome-screen-dark.svg'
                                : '/assets/vectors/welcome-screen.svg'
                        }
                        alt='chat'
                        style={{ width: '400px', height: '400px' }}
                    />
                    <Typography
                        sx={{
                            fontWeight: '700',
                            fontSize: '2rem',
                            color: mode === 'light' ? deepDark : medium,
                            textAlign: 'center',
                        }}
                    >
                        Here you can chat with your friends
                    </Typography>
                </Box>
            ) : (
                <ChatInterface
                    {...{ mode, otherUser, socketRef, connectSettings }}
                />
            )}
        </Box>
    );
}

export default Connect;
