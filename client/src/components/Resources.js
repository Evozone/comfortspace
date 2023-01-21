import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CoPresentIcon from '@mui/icons-material/CoPresent';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';

import { bluegrey, richBlack, light, medium, dark, deepDark } from './colors';

import { customGlobalScrollBars, smoothScrolling } from './CustomGlobalCSS';
import { CardActionArea } from '@mui/material';

const apps = [
    {
        id: '1',
        title: 'Talkspace',
        description: 'An online therapy platform that connects individuals with licensed therapists',
        cover: 'https://picsum.photos/400',
    },
    {
        id: '2',
        title: 'BetterHelp',
        description: 'An online counseling service that offers therapy sessions with licensed professionals',
        cover: 'https://picsum.photos/400',
    },
    {
        id: '3',
        title: '7 Cups',
        description: 'A free online support community where individuals can connect with trained listeners',
        cover: 'https://picsum.photos/400',
    },
    {
        id: '4',
        title: 'Headspace',
        description: 'An app that offers guided meditation and mindfulness exercises',
        cover: 'https://picsum.photos/400',
    },
    {
        id: '5',
        title: 'Moodgym',
        description: 'An interactive self-help program that teaches cognitive behavioral therapy skills',
        cover: 'https://picsum.photos/400',
    },
    {
        id: '6',
        title: 'What\'s Up',
        description: 'A free mental health app that offers cognitive behavioral therapy and ACT exercises',
        cover: 'https://picsum.photos/400',
    },
    {
        id: '7',
        title: 'Pacifica',
        description: 'An app that offers a variety of tools such as mood tracking, deep breathing exercises, and guided meditations to manage stress and anxiety',
        cover: 'https://picsum.photos/400',
    },
    {
        id: '8',
        title: 'Mental Health America',
        description: 'Website that provides information and resources on a wide range of mental health topics',
        cover: 'https://picsum.photos/400',
    },
    {
        id: '9',
        title: 'NAMI (National Alliance on Mental Illness)',
        description: 'Website that provides information, resources, and support for individuals living with mental illness and their loved ones',
        cover: 'https://picsum.photos/400',
    }
    // ... rest of the apps
]

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

            <Box>
                <Grid container spacing={3}>
                    {apps.map((app) => (
                        <Grid item xs={12} sm={6} md={4} key={app.id}>
                            <Card

                                onClick={() => window.open(app.link, '_blank')}
                            >
                                <CardActionArea>
                                    <CardMedia
                                        sx={{ height: 200 }}
                                        image={app.cover}
                                        title={app.title}
                                    />
                                    <CardContent>
                                        <Typography variant="h5" component="h2">
                                            {app.title}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {app.description}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

            </Box>

        </Box>
    );
};



