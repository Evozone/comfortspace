import React from 'react';
import Box from '@mui/material/Box';
import GoogleOneTapLogin from './GoogleOneTapLogin';
import Typography from '@mui/material/Typography';

function LandingPage() {
    return (
        <Box
            sx={{
                background: 'linear-gradient(-45deg, rgba(166, 195, 111, 1) 0% , rgba(190, 239, 158, 1) 100%)',
                height: '100vh',
                width: '100vw',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* insert a tree img  using a Box */}
            < Box
                component="img"
                src="/assets/vectors/tree-landing.svg"
                sx={{
                    height: '120%',
                    width: 'auto',
                    position: 'absolute',
                    top: -60,
                    right: -300,
                    opacity: 0.2,
                }
                }
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
                < Box
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
                    <div style={{ width: '100%', height: '75%' }}>
                        <iframe
                            title="spotify"
                            style={{
                                width: '100%',
                                height: '100%',
                                border: 0,
                                borderRadius: 12,
                            }}
                            src="https://open.spotify.com/embed/track/0zzVTGyRrWpQu8Fr28NRAv?utm_source=generator"
                            allow="encrypted-media"
                        />
                    </div>
                </Box >
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
                    <Box
                        sx={{
                            height: '100%',
                            width: '100%',
                            padding: '40px',
                            borderRadius: '60px',
                            // bgcolor: 'rgba(0, 0, 0, 0.5)',
                        }}
                    >
                        <h1 style={{
                            color: '#1E352F', fontSize: '3rem', fontFamily: 'Poppins', fontWeight: '700',
                        }}>Meadow Melodies</h1>
                        <Typography
                            variant="h6"
                            sx={{
                                color: '#1E352F',
                                fontSize: '1.1rem',
                                fontFamily: 'Poppins',
                            }}
                        >
                            Mental health includes our emotional, psychological, and social well-being. It affects how we think, feel, and act; it also determines how we handle stress and make healthy choices. Mental health is important at every stage of life, from childhood and adolescence through adulthood.
                        </Typography>
                        <GoogleOneTapLogin />
                    </Box>
                </Box>
            </Box >
        </Box>

    )
}

export default LandingPage;