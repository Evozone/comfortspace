import React, { useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import AddCommentIcon from '@mui/icons-material/AddComment';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

import { dark, deepDark, medium } from '../utils/colors';
import { notifyAction } from '../actions/actions';
import ProfileInfo from './ProfileInfo';

function SearchUser({ mode, handleChatClick }) {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth);
    const [searchStatus, setSearchStatus] = useState(null);
    const [searchResults, setSearchResults] = useState(null);
    const [timer, setTimer] = useState(null);
    const [profileInfoOpen, setProfileInfoOpen] = useState(false);
    const [otherUser, setOtherUser] = useState(null);

    const handleSearch = (event) => {
        if (event.target.value.length > 0) {
            clearTimeout(timer);
            setSearchStatus('Searching...');
            const newTimer = setTimeout(async () => {
                try {
                    const { data } = await axios.get(
                        `${process.env.REACT_APP_SERVER_URL}/api/user/${currentUser.uid}?search=${event.target.value}`
                    );
                    setSearchResults(data.result);
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
                setSearchStatus(null);
            }, 1100);
            setTimer(newTimer);
        } else {
            setSearchResults(null);
        }
    };

    const createChat = async (user) => {
        const chatId =
            currentUser.uid > user.uid
                ? currentUser.uid + user.uid
                : user.uid + currentUser.uid;
        const lastMessageTime = Date.now();
        try {
            await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/chat`, {
                chatId,
                userOneInfo: user,
                userTwoInfo: currentUser,
                lastMessageTime,
            });
            handleChatClick({ ...user, new: true });
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

    const handleShowProfileInfo = (user) => {
        setOtherUser(user);
        setProfileInfoOpen(true);
    };

    return (
        <List sx={{ p: 0 }}>
            <TextField
                autoFocus
                label='Search for users'
                onChange={handleSearch}
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
                    '& .MuiInputLabel-root.Mui-focused': {
                        color: dark,
                    },
                }}
                InputProps={{
                    endAdornment: (
                        <Tooltip title='Search for users by typing their name or username'>
                            <InputAdornment position='end'>
                                <IconButton>
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        </Tooltip>
                    ),
                }}
                size='small'
            />
            <Divider />
            {searchStatus && (
                <Typography
                    sx={{
                        fontSize: '1.1rem',
                        ml: 2,
                        mt: 2,
                        mb: 1,
                    }}
                >
                    {searchStatus}
                </Typography>
            )}
            {searchResults &&
                searchResults.map((user) => (
                    <ListItem
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
                        <Typography
                            sx={{
                                fontSize: '1rem',
                                ml: 2,
                            }}
                        >
                            {user.name}
                        </Typography>
                        <Tooltip
                            title={`View ${user.name}'s Profile`}
                            placement='bottom'
                        >
                            <IconButton
                                sx={{
                                    ml: 'auto',
                                }}
                                onClick={() => handleShowProfileInfo(user)}
                            >
                                <RemoveRedEyeIcon
                                    sx={{
                                        fontSize: '30px',
                                        color: deepDark,
                                    }}
                                />
                            </IconButton>
                        </Tooltip>
                        <Tooltip
                            title={`Start a conversation with ${user.name}`}
                            placement='right'
                        >
                            <IconButton
                                sx={{
                                    mr: 1,
                                }}
                                onClick={() => createChat(user)}
                            >
                                <AddCommentIcon
                                    sx={{
                                        fontSize: '30px',
                                        color: deepDark,
                                    }}
                                />
                            </IconButton>
                        </Tooltip>
                    </ListItem>
                ))}
            {searchResults && searchResults.length === 0 && (
                <Typography
                    sx={{
                        fontSize: '1.1rem',
                        ml: 2,
                        mt: 2,
                        mb: 1,
                    }}
                >
                    No results found
                </Typography>
            )}
            {profileInfoOpen && (
                <ProfileInfo {...{ mode, otherUser, setProfileInfoOpen }} />
            )}
        </List>
    );
}

export default SearchUser;
