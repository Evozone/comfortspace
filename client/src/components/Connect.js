import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import ChatIcon from '@mui/icons-material/Chat';
import ExploreIcon from '@mui/icons-material/Explore';

import { light, bluegrey, deepDark, medium, richBlack, dark } from './colors';
import ChatInterface from './ChatInterface';

function Connect({ mode }) {
    const [value, setValue] = useState(0);
    const [chat, setChat] = useState(null);
    const users = [
        {
            id: 1,
            name: 'peer1',
            audioTrack: true,
        },
        {
            id: 2,
            name: 'peer2',
            audioTrack: true,
        },
        {
            id: 3,
            name: 'peer3',
            audioTrack: true,
        },
        {
            id: 4,
            name: 'peer4',
            audioTrack: true,
        },
        // {
        //     id: 5,
        //     name: 'peer5',
        //     audioTrack: true,
        // },
        // {
        //     id: 6,
        //     name: 'peer6',
        //     audioTrack: true,
        // },
        // {
        //     id: 7,
        //     name: 'peer7',
        //     audioTrack: true,
        // },
        // {
        //     id: 8,
        //     name: 'peer8',

        //     audioTrack: true,
        // },
        // {
        //     id: 9,
        //     name: 'peer9',
        //     audioTrack: true,
        // },
        // {
        //     id: 10,
        //     name: 'peer10',
        //     audioTrack: true,
        // },
        // {
        //     id: 11,
        //     name: 'peer11',
        //     audioTrack: true,
        // },
        // {
        //     id: 12,
        //     name: 'peer12',
        //     audioTrack: true,
        // },
        // {
        //     id: 13,
        //     name: 'peer13',
        //     audioTrack: true,
        // },
        // {
        //     id: 14,
        //     name: 'peer14',
        //     audioTrack: true,
        // },
        // {
        //     id: 15,
        //     name: 'peer15',
        //     audioTrack: true,
        // },
        // {
        //     id: 16,
        //     name: 'peer16',
        //     audioTrack: true,
        // },
        // {
        //     id: 17,
        //     name: 'peer17',
        //     audioTrack: true,
        // },
        // {
        //     id: 18,
        //     name: 'peer18',
        //     audioTrack: true,
        // },
        // {
        //     id: 19,
        //     name: 'peer19',
        //     audioTrack: true,
        // },
        // {
        //     id: 20,
        //     name: 'peer20',
        //     audioTrack: true,
        // },
        // {
        //     id: 21,
        //     name: 'peer21',
        //     audioTrack: true,
        // },
        // {
        //     id: 22,
        //     name: 'peer22',
        //     audioTrack: true,
        // },
        // {
        //     id: 23,
        //     name: 'peer23',
        //     audioTrack: true,
        // },
        // {
        //     id: 24,
        //     name: 'peer24',
        //     audioTrack: true,
        // },
        // {
        //     id: 25,
        //     name: 'peer25',
        //     audioTrack: true,
        // },
        // {
        //     id: 26,
        //     name: 'peer26',
        //     audioTrack: true,
        // },
        // {
        //     id: 27,
        //     name: 'peer27',
        //     audioTrack: true,
        // },
        // {
        //     id: 28,
        //     name: 'peer28',
        //     audioTrack: true,
        // },
        // {
        //     id: 29,
        //     name: 'peer29',
        //     audioTrack: true,
        // },
        // {
        //     id: 30,
        //     name: 'peer30',
        //     audioTrack: true,
        // },
        // {
        //     id: 31,
        //     name: 'peer31',
        //     audioTrack: true,
        // },
        // {
        //     id: 32,
        //     name: 'peer32',
        //     audioTrack: true,
        // },
        // {
        //     id: 33,
        //     name: 'peer33',
        //     audioTrack: true,
        // },
        // {
        //     id: 34,
        //     name: 'peer34',
        //     audioTrack: true,
        // },
        // {
        //     id: 35,
        //     name: 'peer35',
        //     audioTrack: true,
        // },
        // {
        //     id: 36,
        //     name: 'peer36',
        //     audioTrack: true,
        // },
        // {
        //     id: 37,
        //     name: 'peer37',
        //     audioTrack: true,
        // },
        // {
        //     id: 38,
        //     name: 'peer38',
        //     audioTrack: true,
        // },
        // {
        //     id: 39,
        //     name: 'peer39',
        //     audioTrack: true,
        // },
        // {
        //     id: 40,
        //     name: 'peer40',
        //     audioTrack: true,
        // },
        // {
        //     id: 41,
        //     name: 'peer41',
        //     audioTrack: true,
        // },
    ];

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChatClick = (user) => {
        setChat(user);
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
                            icon={<ExploreIcon sx={{ fontSize: '34px' }} />}
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
                        <List sx={{ p: 0 }}>
                            {users.map((user) => (
                                <ListItemButton
                                    key={user.id}
                                    sx={{
                                        p: 0,
                                        pl: 2,
                                        height: '70px',
                                        borderBottom:
                                            mode === 'light'
                                                ? '1px solid rgba(0, 0, 0, 0.12)'
                                                : '1px solid rgba(255, 255, 255, 0.12)',
                                    }}
                                    onClick={() => handleChatClick(user)}
                                >
                                    <Avatar
                                        src={user?.avatar}
                                        alt='user avatar'
                                        sx={{
                                            width: 50,
                                            height: 50,
                                            backgroundColor:
                                                mode === 'light'
                                                    ? deepDark
                                                    : medium,
                                        }}
                                    >
                                        {user.name[0].toUpperCase()}
                                    </Avatar>
                                    <Box
                                        sx={{
                                            display: 'block',
                                        }}
                                    >
                                        <Typography
                                            sx={{ fontSize: '1.1rem', ml: 2 }}
                                        >
                                            {user.name}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                fontSize: '14px',
                                                color:
                                                    mode === 'light'
                                                        ? 'rgba(0, 0, 0, 0.54)'
                                                        : 'rgba(255, 255, 255, 0.54)',
                                                ml: 2,
                                            }}
                                        >
                                            {user.name}
                                        </Typography>
                                    </Box>
                                </ListItemButton>
                            ))}
                        </List>
                    )}
                    {value === 1 && (
                        <List sx={{ p: 0 }}>
                            <TextField
                                label='username'
                                sx={{
                                    m: 2,
                                    width: '90%',
                                    '& .MuiOutlinedInput-root': {
                                        paddingRight: '6px',
                                        borderRadius: '20px',

                                        '&.Mui-focused fieldset': {
                                            borderColor: dark,
                                        },
                                    },
                                    '& .css-1uyx2m5-MuiFormLabel-root-MuiInputLabel-root.Mui-focused':
                                        {
                                            color: dark,
                                        },
                                    '& .css-zi2b99-MuiFormLabel-root-MuiInputLabel-root.Mui-focused':
                                        {
                                            color: dark,
                                        },
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <IconButton
                                            // onClick={handleSearch}
                                            >
                                                <SearchIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                size='small'
                                // value={searchText}
                                // onChange={(e) => handleSearchText(e)}
                                // onKeyDown={handleKey}
                            />
                            <Divider />
                            <Typography
                                sx={{
                                    fontSize: '1.1rem',
                                    ml: 2,
                                    mt: 2,
                                    mb: 1,
                                }}
                            >
                                Search for users
                            </Typography>
                        </List>
                    )}
                </Box>
            </Box>
            {!chat ? (
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
                            fontFamily: 'Poppins, Work Sans',
                            fontWeight: '700',
                            fontSize: '2rem',
                            color: mode === 'light' ? deepDark : medium,
                        }}
                    >
                        Here you can chat with your friends
                    </Typography>
                </Box>
            ) : (
                <ChatInterface mode={mode} />
            )}
        </Box>
    );
}

export default Connect;
