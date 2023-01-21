import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CoPresentIcon from '@mui/icons-material/CoPresent';

import { bluegrey, richBlack, light, medium, dark, deepDark } from './colors';

import { customGlobalScrollBars, smoothScrolling } from './CustomGlobalCSS';

export default function Resources({ themeChange, mode }) {
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
            <Typography variant="h1" component="h2"
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
                Resources
                <CoPresentIcon sx={{ fontSize: '3rem', marginLeft: '1rem' }} />
            </Typography>

            <Typography variant="h2" component="h3"
                sx={{
                    color: mode === 'light' ? deepDark.concat('aa') : light.concat('aa'),
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
                We believe in you and your ability to get through this.
            </Typography>
        </Box >
    );
};



