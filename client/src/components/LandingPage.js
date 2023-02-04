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
            {/* insert a tree img  using a Box */}
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
                    <div style={{ width: '100%' }}>
                        <iframe
                            title='spotify'
                            style={{
                                width: '100%',
                                height: '352px',
                                border: 0,
                                borderRadius: 12,
                            }}
                            src='https://open.spotify.com/embed/track/0zzVTGyRrWpQu8Fr28NRAv?utm_source=generator'
                            allow='encrypted-media'
                        />
                        {/* <iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/0zzVTGyRrWpQu8Fr28NRAv?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe> */}
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
                                fontWeight: 'bold',
                                fontSize: '3rem',
                                fontFamily: 'Poppins',
                                fontWeight: '700',
                            }}
                        >
                            Meadow Melodies
                        </h1>
                        <Typography
                            variant='h6'
                            sx={{
                                color: '#1B262C',
                                fontSize: '1.1rem',
                                fontFamily: 'Poppins',
                            }}
                        >
                            Mental health includes our emotional, psychological,
                            and social well-being. It affects how we think,
                            feel, and act; it also determines how we handle
                            stress and make healthy choices. Mental health is
                            important at every stage of life, from childhood and
                            adolescence through adulthood.
                        </Typography>
                        <GoogleOneTapLogin />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default LandingPage;
