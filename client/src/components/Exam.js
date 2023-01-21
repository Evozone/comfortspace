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
import Resources from './Resources';


function Home() {
    return (
        // Color scheme: https://coolors.co/ff6b6b-ffe66d-ffffff-48dbfb-1dd1a1
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                backgroundColor: 'background.default',
                color: 'text.primary',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh',
                    backgroundColor: 'background.default',
                    color: 'text.primary',
                }}
            >
                <Typography
                    variant="h1"
                    sx={{
                        fontWeight: 'bold',
                        fontSize: '3rem',
                        color: 'primary.main',
                        textAlign: 'center',
                        marginBottom: '1rem',
                    }}
                >
                    Exam
                </Typography>
                <Typography
                    variant="h2"
                    sx={{
                        fontWeight: 'bold',
                        fontSize: '2rem',
                        color: 'primary.main',
                        textAlign: 'center',
                        marginBottom: '1rem',
                    }}
                >
                    Spaces go here
                </Typography>
            </Box>
        </Box>
    );
}

export default Home;
