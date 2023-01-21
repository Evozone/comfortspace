import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function Resources() {
    return (
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
                    Resources
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
                    Resources go here
                </Typography>
            </Box>
        </Box>
    );
}

export default Resources;