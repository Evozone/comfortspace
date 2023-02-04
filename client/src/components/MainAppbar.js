import React from 'react';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Groups2Icon from '@mui/icons-material/Groups2';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import FavoriteIcon from '@mui/icons-material/Favorite';
import QuizIcon from '@mui/icons-material/Quiz';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LogoutIcon from '@mui/icons-material/Logout';
import { CustomSwitcherGroup, CustomSwitcherButton } from './CustomSwitcher';

import { richBlack, light, medium, deepDark } from './colors';
import { signOutAction } from '../actions/actions';

function MainAppbar({ mode, themeChange }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSignOut = () => {
        const choice = window.confirm('Please click on OK to Log Out.');
        if (choice) {
            dispatch(signOutAction());
            window.localStorage.removeItem('healthAppLastPage');
            navigate('/');
        }
    };

    const handleNavigation = (value) => {
        window.localStorage.setItem('healthAppLastPage', value);
        navigate(`/${value}`);
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
            }}
        >
            <IconButton
                onClick={themeChange}
                sx={{ color: 'white' }}
                aria-label='change theme'
            >
                {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
            <CustomSwitcherGroup exclusive>
                <CustomSwitcherButton
                    onClick={() => handleNavigation('groups')}
                >
                    <Groups2Icon /> Groups
                </CustomSwitcherButton>
                <CustomSwitcherButton onClick={() => handleNavigation('blogs')}>
                    <LibraryBooksIcon /> Blogs
                </CustomSwitcherButton>
                <CustomSwitcherButton
                    onClick={() => handleNavigation('resources')}
                >
                    <FavoriteIcon /> Resources
                </CustomSwitcherButton>
                <CustomSwitcherButton onClick={() => handleNavigation('exam')}>
                    <QuizIcon /> Take a Test
                </CustomSwitcherButton>
            </CustomSwitcherGroup>

            {/* Sign out */}
            <IconButton
                onClick={() => {
                    handleSignOut();
                }}
            >
                <LogoutIcon
                    sx={{ color: mode === 'light' ? deepDark : light }}
                />
            </IconButton>
        </Box>
    );
}

export default MainAppbar;
