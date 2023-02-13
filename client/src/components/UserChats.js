import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';

import { deepDark, medium } from '../utils/colors';
import { formatDate, formatTime12 } from '../utils/formatTimestamp';
import { notifyAction } from '../actions/actions';

function UserChats({
    handleChatClick,
    mode,
    socketRef,
    otherUser,
    onlineUsers,
    messageNotSeen,
    setMessageNotSeen,
    setValue,
}) {
    const currentUser = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [userChats, setUserChats] = useState([]);

    useEffect(() => {
        const getUserChats = async () => {
            try {
                const auth = window.localStorage.getItem('healthApp');
                const { dnd } = JSON.parse(auth);

                const { data } = await axios({
                    method: 'GET',
                    url: `${process.env.REACT_APP_SERVER_URL}/api/chat`,
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${dnd}`,
                    },
                });
                if (data.result.length === 0) {
                    dispatch(
                        notifyAction(
                            true,
                            'info',
                            'You have no chats yet, You can search for other users & start chatting with them :D'
                        )
                    );
                    setValue(1);
                }
                setUserChats(
                    data.result.map((chat) => {
                        const info =
                            chat.userTwo.uid === currentUser.uid
                                ? chat.userOne
                                : chat.userTwo;
                        return {
                            ...info,
                            lastMessageTime: chat.lastMessageTime,
                            lastMessage: chat?.lastMessage,
                            lastMessageDate: formatDate(
                                chat.lastMessageTime / 1000
                            ),
                        };
                    })
                );
            } catch (err) {
                dispatch(
                    notifyAction(
                        true,
                        'error',
                        'Sorry but something went wrong, please try again in a minute :('
                    )
                );
                console.log(err);
            }
        };
        getUserChats();
    }, []);

    useEffect(() => {
        socketRef.current?.on('recieve_message', (message) => {
            if (otherUser === null || message.senderId !== otherUser?.uid) {
                setMessageNotSeen((prev) => [...prev, message.senderId]);
            }
            setUserChats((prev) => {
                const index = prev.findIndex(
                    (user) => user.uid === message.senderId
                );
                if (index === -1) return prev;
                const user = prev[index];
                const newUser = {
                    ...user,
                    lastMessageTime: message.timestamp,
                    lastMessage: message.text,
                    lastMessageDate: formatDate(message.timestamp / 1000),
                };
                const newUsers = [...prev];
                newUsers.splice(index, 1);
                newUsers.unshift(newUser);
                return newUsers;
            });
        });
    }, [socketRef, otherUser]);

    useEffect(() => {
        const socket = socketRef?.current;
        socketRef.current?.on('update_user_chats', (message) => {
            setUserChats((prev) => {
                const index = prev.findIndex(
                    (user) => user.uid === message.receiverId
                );
                if (index === -1) return prev;
                const user = prev[index];
                const newUser = {
                    ...user,
                    lastMessageTime: message.timestamp,
                    lastMessage: message.text,
                    lastMessageDate: formatDate(message.timestamp / 1000),
                };
                const newUsers = [...prev];
                newUsers.splice(index, 1);
                newUsers.unshift(newUser);
                return newUsers;
            });
        });
        return () => {
            socket?.off('update_user_chats');
        };
    }, [socketRef, otherUser]);

    return (
        <List sx={{ p: 0 }}>
            {userChats.length > 0 &&
                userChats
                    .sort((a, b) =>
                        b.lastMessageTime > a.lastMessageTime
                            ? 1
                            : b.lastMessageTime < a.lastMessageTime
                            ? -1
                            : 0
                    )
                    .map((user) => (
                        <ListItemButton
                            key={user.uid}
                            sx={{
                                p: 0,
                                pl: 2,
                                height: '70px',
                                borderBottom:
                                    mode === 'light'
                                        ? '1px solid rgba(0, 0, 0, 0.12)'
                                        : '1px solid rgba(255, 255, 255, 0.12)',
                            }}
                            onClick={() => {
                                setMessageNotSeen((prev) => {
                                    const index = prev.findIndex(
                                        (id) => id === user.uid
                                    );
                                    if (index === -1) return prev;
                                    const newMessageNotSeen = [...prev];
                                    newMessageNotSeen.splice(index, 1);
                                    return newMessageNotSeen;
                                });
                                handleChatClick({ ...user, new: false });
                            }}
                        >
                            <Avatar
                                src={user?.photoURL}
                                alt='user avatar'
                                sx={{
                                    width: 50,
                                    height: 50,
                                    backgroundColor:
                                        mode === 'light' ? deepDark : medium,
                                }}
                            >
                                {user.name[0].toUpperCase()}
                            </Avatar>
                            {onlineUsers?.find(
                                (onlineUser) => onlineUser.userId === user.uid
                            ) && (
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: 47,
                                        left: 50,
                                        width: '13px',
                                        height: '13px',
                                        borderRadius: '50%',
                                        backgroundColor: '#4caf50',
                                    }}
                                />
                            )}
                            <Box
                                sx={{
                                    display: 'block',
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: '1rem',
                                        ml: 2,
                                    }}
                                >
                                    {user.name}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: '14px',
                                        fontFamily: 'Helvetica',
                                        color:
                                            mode === 'light'
                                                ? 'rgba(0, 0, 0, 0.54)'
                                                : 'rgba(255, 255, 255, 0.54)',
                                        ml: 2,
                                    }}
                                >
                                    {user.lastMessage?.length > 25
                                        ? user.lastMessage.substring(0, 25) +
                                          '...'
                                        : user.lastMessage}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: '12px',
                                        fontFamily: 'Helvetica',
                                        color:
                                            mode === 'light'
                                                ? 'rgba(0, 0, 0, 0.54)'
                                                : 'rgba(255, 255, 255, 0.54)',
                                        ml: 2,
                                        position: 'absolute',
                                        right: '15px',
                                        top: '10px',
                                    }}
                                >
                                    {user?.lastMessageDate}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: '11px',
                                        color:
                                            mode === 'light'
                                                ? 'rgba(0, 0, 0, 0.54)'
                                                : 'rgba(255, 255, 255, 0.54)',
                                        ml: 2,
                                        position: 'absolute',
                                        right: '15px',
                                        fontFamily: 'Helvetica',
                                        top: '25px',
                                    }}
                                >
                                    {formatTime12(user?.lastMessageTime / 1000)}
                                </Typography>
                                {messageNotSeen.includes(user.uid) && (
                                    <Box
                                        sx={{
                                            width: '10px',
                                            height: '10px',
                                            borderRadius: '50%',
                                            backgroundColor: '#25d366',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            position: 'absolute',
                                            right: '20px',
                                            bottom: '15px',
                                            '&::after': {
                                                width: '100%',
                                                height: '100%',
                                                borderRadius: '50%',
                                                animation:
                                                    'ripple 1.2s infinite ease-in-out',
                                                border: '1px solid #25d366',
                                                content: '""',
                                            },
                                            content: '""',
                                            '@keyframes ripple': {
                                                '0%': {
                                                    transform: 'scale(.8)',
                                                    opacity: 1,
                                                },
                                                '100%': {
                                                    transform: 'scale(2.4)',
                                                    opacity: 0,
                                                },
                                            },
                                        }}
                                    />
                                )}
                            </Box>
                        </ListItemButton>
                    ))}
        </List>
    );
}

export default UserChats;
