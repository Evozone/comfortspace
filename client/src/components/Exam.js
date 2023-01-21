import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ModeIcon from '@mui/icons-material/Mode';

import QuestionTable from './QuestionTable';

import { bluegrey, richBlack, light, medium, dark, deepDark } from './colors';
import { customGlobalScrollBars, smoothScrolling } from './CustomGlobalCSS';
import { useSelector } from 'react-redux';

export default function Exam({ themeChange, mode }) {
    const currentUser = useSelector((state) => state.auth);

    return (
        <Box
            sx={{
                minHeight: '100vh',
                backgroundColor: mode === 'light' ? light : bluegrey,
                padding: '5rem',
            }}
        >
            {customGlobalScrollBars(mode)}
            {smoothScrolling()}
            <Typography
                variant='h1'
                component='h2'
                sx={{
                    color: mode === 'light' ? deepDark : light,
                    margin: '2rem',
                    fontFamily: 'Poppins, Work Sans',
                    fontWeight: 'bold',
                    fontSize: '3rem',
                    textAlign: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                Take a Test!
                <ModeIcon sx={{ fontSize: '3rem', marginLeft: '1rem' }} />
            </Typography>
            <Typography
                variant='h2'
                component='h3'
                sx={{
                    color:
                        mode === 'light'
                            ? deepDark.concat('aa')
                            : light.concat('aa'),
                    margin: '2rem',
                    fontFamily: 'Work Sans',
                    fontWeight: 'medium',
                    fontSize: '1.5rem',
                    textAlign: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                Hey {currentUser.name}, You are not alone :)
            </Typography>

            <Box>
                <QuestionTable mode={mode} />
            </Box>
        </Box>
    );
}
