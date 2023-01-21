import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOutAction } from '../actions/actions';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Blogs from './Blogs';
import Spaces from './Spaces';
import Resources from './Resources';


function Home() {
    const [active, setActive] = useState('blogs');
    const [mode, setMode] = useState('light');

    const handleSwitch = (e) => {
        setActive(e.target.id);
    };

    const handleMode = () => {
        const updatedMode = mode === 'light' ? 'dark' : 'light';
        setMode(updatedMode);
    };

    useEffect(() => {
        const localMode = window.localStorage.getItem('healthAppTheme');
        if (localMode) {
            setMode(localMode);
        }
    }, []);

    useEffect(() => {
        window.localStorage.setItem('healthAppTheme', mode);
    }, [mode]);

    return (
        <Box>
            <Tabs
                value={active}
                onChange={handleSwitch}
                aria-label='home tabs'
            >
                <Tab id='blogs' label='Blogs' />
                <Tab id='spaces' label='Spaces' />
                <Tab id='resources' label='Resources' />
            </Tabs>

            {active === 'blogs' && <Blogs />}
            {active === 'spaces' && <Spaces />}
            {active === 'resources' && <Resources />}
        </Box>
    );
}

export default Home;
