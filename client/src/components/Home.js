import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';

import { useNavigate } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';

import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import Typography from '@mui/material/Typography';

import { customGlobalScrollBars, smoothScrolling } from './CustomGlobalCSS';
import { bluegrey, richBlack, light, medium, dark, deepDark } from './colors';

// Home takes in themeChange and mode as props
export default function Home({ themeChange, mode }) {
    const navigate = useNavigate();

    const spaces = [
        {
            id: '63cba2b6e228e865d89c181e',
            title: 'PSTD Space',
            description:
                'A space for people with PTSD to share their stories and experiences.',
            cover: 'https://picsum.photos/400',
        },
        {
            id: '7f6b2d6e828e865d89c181e',
            title: 'Anxiety Space',
            description:
                'A space for people who deal with anxiety to talk about their struggles and offer support.',
            cover: 'https://picsum.photos/403',
        },
        {
            id: '1a2b3c4d5e6f7g8h9i0j',
            title: 'Depression Space',
            description:
                'A space for people who are dealing with depression to share their experiences and get support.',
            cover: 'https://picsum.photos/404',
        },
        {
            id: '9z8y7x6w5v4u3t2s1r0q',
            title: 'ADHD Space',
            description:
                'A space for people who have low self-esteem and face difficulties in their daily works',
            cover: 'https://picsum.photos/500',
        },
        {
            id: '0q9w8e7r6t5y4u3i2o1p',
            title: 'OCD Space',
            description: 'A space for people who suffer from unwanted thoughts that leads to compulsion',
            cover: 'https://picsum.photos/400',
        }
    ];

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
                Support Groups
                <RecordVoiceOverIcon
                    sx={{ fontSize: '3rem', marginLeft: '1rem' }}
                />
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
                Find a space to talk about your mental health.
            </Typography>

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gridGap: '1rem',
                }}
            >
                {spaces.map((space) => (
                    <Card
                        key={space.id}
                        sx={{
                            backgroundColor:
                                mode === 'light' ? deepDark : richBlack,
                            color: mode === 'light' ? light : dark.concat('aa'),
                            borderRadius: '10px',
                            border:
                                mode === 'light'
                                    ? 'none'
                                    : `1px solid ${dark.concat('aa')}`,
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                        }}
                    >
                        <CardActionArea
                            onClick={() => navigate(`/home/${space.id}`)}
                        >
                            <CardMedia
                                image={space.cover}
                                sx={{
                                    height: '200px',
                                }}
                            />
                            <CardContent>
                                <Typography
                                    variant='h5'
                                    sx={{
                                        color:
                                            mode === 'light' ? light : medium,
                                        font: '600 1.5rem/1.5rem Poppins, sans-serif',
                                        mb: '1rem',
                                    }}
                                >
                                    {space.title}
                                </Typography>
                                <Box
                                    sx={{
                                        height: '5rem',
                                        overflow: 'hidden',
                                    }}
                                >
                                    <Typography
                                        variant='body1'
                                        sx={{
                                            font: '400 1rem/1.5rem Work Sans, sans-serif',
                                        }}
                                    >
                                        {space.description}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))}
            </Box>

            {/* To add another space (voice room) with a circular button */}
            <Tooltip title='Create a new space' placement='left'>
                <Fab
                    color='primary'
                    aria-label='add'
                    sx={{
                        position: 'fixed',
                        bottom: '2rem',
                        right: '2rem',
                        backgroundColor: mode === 'light' ? 'white' : deepDark,
                        color: mode === 'light' ? deepDark : light,

                        borderRadius: '50%',
                        height: '3.5rem',
                        width: '3.5rem',

                        display: 'grid',
                        placeItems: 'center',
                        cursor: 'pointer',

                        boxShadow: '0 0 10px 0 rgba(78,135,140, 0.5)',

                        '&:hover': {
                            backgroundColor:
                                mode === 'light' ? 'white' : deepDark,
                            color: mode === 'light' ? deepDark : light,
                            transform: 'scale(1.1) rotate(90deg)',
                            transition: 'transform 0.2s ease-in-out',
                        },
                    }}
                    onClick={() => navigate('/home/create')}
                >
                    <AddIcon />
                </Fab>
            </Tooltip>
        </Box>
    );
}
