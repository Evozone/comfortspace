import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Groups2Icon from '@mui/icons-material/Groups2';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import QuizIcon from '@mui/icons-material/Quiz';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LogoutIcon from '@mui/icons-material/Logout';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

import { CustomSwitcherGroup, CustomSwitcherButton } from './CustomSwitcher';
import { richBlack, light, medium, deepDark, bluegrey } from './colors';
import { signOutAction } from '../actions/actions';
import { Avatar } from '@mui/material';

function MainAppbar({ mode, themeChange }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selected, setSelected] = useState(
        window.localStorage.getItem('healthAppLastPage') || 'groups'
    );

    const handleSignOut = () => {
        const choice = window.confirm('Please click on OK to Log Out.');
        if (choice) {
            dispatch(signOutAction());
            window.localStorage.removeItem('healthAppLastPage');
            navigate('/');
        }
    };

    const handleNavigation = (value) => {
        setSelected(value);
        window.localStorage.setItem('healthAppLastPage', value);
        navigate(`/${value}`);
    };

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box
            sx={{
                position: 'fixed',
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                bgcolor: mode === 'light' ? medium : richBlack,
                boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.5)',
                color: 'white',
                zIndex: '1000',
                padding: '7px',
                top: '0',
            }}
        >
            <IconButton
                onClick={themeChange}
                sx={{ color: 'white', height: 45, width: 45 }}
                aria-label='change theme'
            >
                {mode === 'light' ? (
                    <DarkModeIcon sx={{ height: 33, width: 33 }} />
                ) : (
                    <LightModeIcon sx={{ height: 33, width: 33 }} />
                )}
            </IconButton>
            {currentUser.isSignedIn ? (
                <>
                    <CustomSwitcherGroup exclusive>
                        <CustomSwitcherButton
                            onClick={() => handleNavigation('groups')}
                            value='groups'
                            selected={selected === 'groups'}
                        >
                            <Groups2Icon /> Groups
                        </CustomSwitcherButton>
                        <CustomSwitcherButton
                            onClick={() => handleNavigation('blogs')}
                            value='blogs'
                            selected={selected === 'blogs'}
                        >
                            <LibraryBooksIcon /> Blogs
                        </CustomSwitcherButton>
                        <CustomSwitcherButton
                            onClick={() => handleNavigation('connect')}
                            value='connect'
                            selected={selected === 'connect'}
                        >
                            <GroupAddIcon /> Connect
                        </CustomSwitcherButton>
                        <CustomSwitcherButton
                            onClick={() => handleNavigation('exam')}
                            value='exam'
                            selected={selected === 'exam'}
                        >
                            <QuizIcon /> Take a Test
                        </CustomSwitcherButton>
                    </CustomSwitcherGroup>
                    <IconButton onClick={handleMenuClick}>
                        <Avatar
                            alt={currentUser.name.charAt(0).toUpperCase()}
                            src={currentUser.photoURL}
                            sx={{
                                bgcolor: mode === 'light' ? deepDark : light,
                                color: mode === 'light' ? light : deepDark,
                                height: 45,
                                width: 45,
                                border: '2px solid',
                            }}
                        >
                            {currentUser.name.charAt(0).toUpperCase()}
                        </Avatar>
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                        sx={{
                            '& .MuiPaper-root': {
                                backgroundColor:
                                    mode === 'light' ? light : bluegrey,
                            },
                        }}
                    >
                        <MenuItem
                            onClick={() => {
                                handleSignOut();
                            }}
                        >
                            <LogoutIcon
                                sx={{
                                    color: mode === 'light' ? deepDark : light,
                                }}
                            />
                            <ListItemText sx={{ ml: 1 }} primary='Logout' />
                        </MenuItem>
                    </Menu>
                </>
            ) : (
                <CustomSwitcherGroup>
                    <CustomSwitcherButton
                        onClick={() => navigate('/')}
                        value='/'
                    >
                        <GroupAddIcon /> Join Now
                    </CustomSwitcherButton>
                </CustomSwitcherGroup>
            )}
        </Box>
    );
}

export default MainAppbar;
