import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import MessageInput from './MessageInput';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import VideoCallIcon from '@mui/icons-material/VideoCall';

import { light, bluegrey, deepDark, medium, dark, richBlack } from './colors';

function ChatInterface({ mode }) {
    const inputRef = useRef();

    const currentUser = useSelector((state) => state.auth);

    const messages = [
        {
            id: 1,
            message:
                'Helloppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp',
            sender: true,
        },
        { id: 2, message: 'Hi', sender: false },
        { id: 3, message: 'How are you?', sender: true },
        { id: 4, message: 'I am fine', sender: false },
        { id: 5, message: 'Hello', sender: true },
        { id: 6, message: 'Hi', sender: false },
        { id: 7, message: 'How are you?', sender: true },
        { id: 8, message: 'I am fine', sender: false },
        { id: 9, message: 'Hello', sender: true },
        { id: 10, message: 'Hi', sender: false },
        { id: 11, message: 'How are you?', sender: true },
        { id: 12, message: 'I am fine', sender: false },
        { id: 13, message: 'Hello', sender: true },
        { id: 14, message: 'Hi', sender: false },
        { id: 15, message: 'How are you?', sender: true },
        { id: 16, message: 'I am fine', sender: false },
        { id: 17, message: 'Hello', sender: true },
        { id: 18, message: 'Hi', sender: false },
        { id: 19, message: 'How are you?', sender: true },
        { id: 20, message: 'I am fine', sender: false },
        { id: 21, message: 'Hello', sender: true },
        { id: 22, message: 'Hi', sender: false },
        { id: 23, message: 'How are you?', sender: true },
        { id: 24, message: 'I am fine', sender: false },
        { id: 25, message: 'Hello', sender: true },
        { id: 26, message: 'Hi', sender: false },
        { id: 27, message: 'How are you?', sender: true },
        { id: 28, message: 'I am fine', sender: false },
        { id: 29, message: 'Hello', sender: true },
        { id: 30, message: 'Hi', sender: false },
        { id: 31, message: 'How are you?', sender: true },
        { id: 32, message: 'I am fine', sender: false },
        { id: 33, message: 'Hello', sender: true },
        { id: 34, message: 'Hi', sender: false },
        { id: 35, message: 'How are you?', sender: true },
        { id: 36, message: 'I am fine', sender: false },
        { id: 37, message: 'Hello', sender: true },
        { id: 38, message: 'Hi', sender: false },
        { id: 39, message: 'How are you?', sender: true },
        { id: 40, message: 'I am fine', sender: false },
        { id: 41, message: 'Hello', sender: true },
        { id: 42, message: 'Hi', sender: false },
        { id: 43, message: 'How are you?', sender: true },
        { id: 44, message: 'I am fine', sender: false },
        { id: 45, message: 'Hello', sender: true },
        { id: 46, message: 'Hi', sender: false },
        { id: 47, message: 'How are you?', sender: true },
        { id: 48, message: 'I am fine', sender: false },
        { id: 49, message: 'Hello', sender: true },
        { id: 50, message: 'Hi', sender: false },
    ];

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
                color='inherit'
                position='static'
            >
                <Avatar
                    alt={currentUser.name.charAt(0).toUpperCase()}
                    src={currentUser.photoURL}
                    sx={{
                        bgcolor: mode === 'light' ? deepDark : light,
                        height: 50,
                        width: 50,
                    }}
                >
                    {currentUser.name.charAt(0).toUpperCase()}
                </Avatar>
                <Typography sx={{ fontWeight: '400', ml: 3 }} variant='h6'>
                    {currentUser.username}
                </Typography>
                <IconButton sx={{ position: 'absolute', right: '10px' }}>
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
                {messages &&
                    messages.map((message) => (
                        <Box
                            key={message.id}
                            sx={{
                                borderRadius: '20px',
                                borderBottomLeftRadius: '2px',
                                maxWidth: '18rem',
                                width: 'fit-content',
                                p: '12px',
                                color: 'white',
                                display: 'flex',
                                alignItems: 'end',
                                ...(message.sender
                                    ? {
                                          alignSelf: 'flex-end',
                                          borderBottomLeftRadius: '20px',
                                          borderBottomRightRadius: '1px',
                                          backgroundColor: deepDark,
                                      }
                                    : {
                                          backgroundColor: medium,
                                          color: richBlack,
                                      }),
                            }}
                        >
                            <Typography sx={{ wordBreak: 'break-word' }}>
                                {message.message}
                            </Typography>
                        </Box>
                    ))}
            </Box>
            <Divider />
            <MessageInput
                // handleSendMessage={handleSendMessage}
                inputRef={inputRef}
                mode={mode}
                // uploadFile={uploadFile}
            />
        </Box>
    );
}

export default ChatInterface;
