import React from 'react';
import Box from '@mui/material/Box';
import GoogleOneTapLogin from './GoogleOneTapLogin';
import Typography from '@mui/material/Typography';

function LandingPage() {
    return (
        <Box
            sx={{
                background:
                    'linear-gradient(-45deg,  rgba(147, 229, 171, 1) 0% , rgba(101, 184, 145, 1) 100%)',
                height: '100vh',
                width: '100vw',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <Box
                component='img'
                src='/assets/vectors/tree-landing.svg'
                sx={{
                    height: '120%',
                    width: 'auto',
                    position: 'absolute',
                    top: -60,
                    right: -300,
                    opacity: 0.15,
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                    width: '100vw',
                    color: 'primary.contrastText',
                    padding: '20px',
                    zIndex: 1,
                }}
            >
                {/* Left Side (Spotify) */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        width: '100%',
                        borderRadius: '10px',
                        padding: '20px',
                    }}
                >
                    <div
                        style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <img
                            src={'/assets/vectors/logo-800x800.svg'}
                            alt='logo'
                            style={{
                                width: '500px',
                                height: '500px',
                                borderRadius: '50%',
                                boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.3)',
                            }}
                        />
                    </div>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        borderRadius: '10px',
                        padding: '20px',
                    }}
                >
                    <Box
                        sx={{
                            height: '100%',
                            width: '100%',
                            padding: '40px',
                            borderRadius: '60px',
                            // bgcolor: 'rgba(0, 0, 0, 0.5)',
                        }}
                    >
                        <h1
                            style={{
                                color: '#1B262C',
                                fontSize: '3rem',
                            }}
                        >
                            Comfort Space
                        </h1>
                        <Typography
                            variant='h6'
                            sx={{
                                color: '#1B262C',
                                fontSize: '1.1rem',
                                p: 2,
                                background: ' rgba(255, 255, 255, 0.26)',
                                borderRadius: '6px',
                                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                                backdropFilter: 'blur(3.1px)',
                                border: '1px solid rgba(255, 255, 255, 0.8)',
                            }}
                        >
                            ComfortSpace is a web app which focuses on creating
                            a safe and supportive environment. Whether you're
                            looking for a community to connect with or
                            professional guidance, ComfortSpace is here to help.
                            Remember, <br />
                            it's OK Not To Be OK.
                        </Typography>
                        <Box sx={{ mt: 3 }}>
                            <iframe
                                title='spotify'
                                style={{
                                    width: '60%',
                                    height: '85px',
                                    mt: '20px',
                                    border: 0,
                                }}
                                src='https://open.spotify.com/embed/track/0zzVTGyRrWpQu8Fr28NRAv?utm_source=generator'
                                allow='encrypted-media'
                            />
                        </Box>
                        <GoogleOneTapLogin />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default LandingPage;
