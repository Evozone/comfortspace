import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ModeIcon from '@mui/icons-material/Mode';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import QuestionTable from './QuestionTable';

import {
    bluegrey,
    richBlack,
    light,
    medium,
    dark,
    deepDark,
} from '../utils/colors';
import { useSelector } from 'react-redux';

export default function Exam({ themeChange, mode }) {
    const currentUser = useSelector((state) => state.auth);

    return (
        <Box
            sx={{
                overflowY: 'auto',
                mt: '75px',
                height: 'calc(100vh - 75px)',
                maxHeight: 'calc(100vh - 75px)',
                backgroundColor: mode === 'light' ? light : bluegrey,
                padding: '5rem',
                pt: 0,
            }}
        >
            <Typography
                variant='h1'
                component='h2'
                sx={{
                    color: mode === 'light' ? deepDark : light,
                    margin: '2rem',
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

            {/* Disclaimer Box */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    padding: '2rem',
                    my: '2rem',
                    backgroundColor: mode === 'light' ? deepDark : richBlack,
                    color: mode === 'light' ? light : light,
                    fontSize: '1.1rem',
                    borderRadius: '15px',
                    border: mode === 'light' ? 'none' : `1px solid ${light}`,
                }}
            >
                <Typography
                    variant='h2'
                    component='h3'
                    sx={{
                        mb: '1rem',
                        fontWeight: 'medium',
                        fontSize: '2rem',
                        textAlign: 'left',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <PsychologyAltIcon
                        sx={{
                            height: '2.5rem',
                            width: '2.5rem',
                            mr: 1,
                        }}
                    ></PsychologyAltIcon>{' '}
                    How it Works ?
                </Typography>
                <Typography
                    sx={{
                        fontFamily: 'Work Sans',
                        fontWeight: '400',
                        fontSize: '1.1rem',
                        textAlign: 'left',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    Online screening tools are meant to be a quick snapshot of
                    your mental health. If your results indicate you may be
                    experiencing symptoms of a mental illness, consider sharing
                    your results with someone you trust. We can only provide you
                    some simple assessments, A mental health provider (such as a
                    doctor or a therapist) can give you a full assessment and
                    talk to you about options for how to feel better.<br></br>
                </Typography>
            </Box>

            <Box>
                <QuestionTable mode={mode} />
            </Box>
        </Box>
    );
}
