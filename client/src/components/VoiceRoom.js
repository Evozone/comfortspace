import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';

import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import HeadsetIcon from '@mui/icons-material/Headset';
import HeadsetOffIcon from '@mui/icons-material/HeadsetOff';
import CallEndIcon from '@mui/icons-material/CallEnd';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import axios from 'axios';
import { useNavigate, useParams } from 'react-router';

import {
    bluegrey,
    richBlack,
    black,
    light,
    medium,
    dark,
    deepDark,
} from './colors';
import { useSelector } from 'react-redux';

import {
    useHMSActions,
    useHMSStore,
    selectIsConnectedToRoom,
    selectIsPeerAudioEnabled,
    selectLocalPeer,
    selectIsLocalAudioEnabled,
    selectPeers,
} from '@100mslive/hms-video-react';

import { customGlobalScrollBars, smoothScrolling } from './CustomGlobalCSS';
import { IconButton } from '@mui/material';
import PeerInRoom from './PeerInRoom';

function VoiceRoom({ mode }) {
    const currentUser = useSelector((state) => state.auth);
    const peers = useHMSStore(selectPeers);
    const navigate = useNavigate();
    const hmsActions = useHMSActions();

    const [deafen, setDeafen] = useState(false);

    const isLocalAudioEnabled = useHMSStore(selectIsLocalAudioEnabled);

    const setPeersVolume = (volume) => {
        for (const peer of peers) {
            if (peer.audioTrack) {
                hmsActions.setVolume(volume, peer.audioTrack);
            }
        }
    };

    useEffect(() => {
        console.log(
            'Hey if u like this project, please star it on github :) https://github.com/Evozone/ok_to_be_not_ok/tree/prod'
        );
        return () => {
            hmsActions.leave();
        };
    }, []);

    const toggleDeafen = () => {
        setDeafen(!deafen);
        deafen ? setPeersVolume(100) : setPeersVolume(0);
    };

    // const clients = [
    //     { id: 1, username: 'A' },
    //     { id: 2, username: 'B' },
    //     { id: 3, username: 'C' },
    //     { id: 4, username: 'D' },
    //     { id: 5, username: 'E' },
    //     { id: 6, username: 'F' },
    //     { id: 7, username: 'G' },
    //     { id: 8, username: 'H' },
    //     { id: 9, username: 'I' },
    // { id: 10, username: 'J' },
    // { id: 11, username: 'K' },
    // { id: 12, username: 'L' },
    // { id: 13, username: 'M' },
    // { id: 14, username: 'N' },
    // { id: 15, username: 'O' },
    // { id: 16, username: 'P' },
    // { id: 17, username: 'Q' },
    // { id: 18, username: 'R' },
    // { id: 19, username: 'S' },
    // { id: 20, username: 'T' },
    // { id: 21, username: 'U' },
    // { id: 22, username: 'V' },
    // { id: 23, username: 'W' },
    // { id: 24, username: 'X' },
    // { id: 25, username: 'Y' },
    // { id: 26, username: 'Z' },
    // { id: 27, username: 'A' },
    // { id: 28, username: 'B' },
    // { id: 29, username: 'C' },
    // { id: 30, username: 'D' },
    // { id: 31, username: 'E' },
    // { id: 32, username: 'F' },
    // { id: 33, username: 'G' },
    // { id: 34, username: 'H' },
    // { id: 35, username: 'I' },
    // { id: 36, username: 'J' },
    // { id: 37, username: 'K' },
    // { id: 38, username: 'L' },
    // { id: 39, username: 'M' },
    // { id: 40, username: 'N' },
    // { id: 41, username: 'O' },
    // { id: 42, username: 'P' },
    // { id: 43, username: 'Q' },
    // { id: 44, username: 'R' },
    // { id: 45, username: 'S' },
    // { id: 46, username: 'T' },
    // { id: 47, username: 'U' },
    // { id: 48, username: 'V' },
    // { id: 49, username: 'W' },
    // { id: 50, username: 'X' },
    // ];
    return (
        <Box
            sx={{
                height: '100vh',
                backgroundColor: mode === 'light' ? light : bluegrey,
                color: 'text.primary',
                px: '5rem',
                pt: '5rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            {customGlobalScrollBars(mode)}
            {smoothScrolling()}
            <Paper
                sx={{
                    p: 2,
                    ...(mode === 'light' && { backgroundColor: deepDark }),
                    height: 'calc(100vh - 170px)',
                    mb: '1rem',
                    overflowY: 'auto',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(5, 1fr)',
                    gap: '24px 24px',
                    gridAutoFlow: 'dense',
                }}
            >
                {peers &&
                    peers.map((peer) => (
                        <PeerInRoom key={peer.id} peer={peer} mode={mode} />
                    ))}
            </Paper>
            <Paper
                sx={{
                    p: 1,
                    borderRadius: '30px',
                    ...(mode === 'light' && { backgroundColor: deepDark }),
                }}
            >
                <Stack direction='row' spacing={2}>
                    {/* <IconButton
                        sx={{
                            backgroundColor: 'white',
                            '&:hover': {
                                backgroundColor: 'white',
                            },
                        }}
                    >
                        <MicOffIcon sx={{ color: 'red' }} />
                    </IconButton>
                    <IconButton
                        sx={{
                            backgroundColor: 'white',
                            '&:hover': {
                                backgroundColor: 'white',
                            },
                        }}
                    >
                        <HeadsetOffIcon sx={{ color: 'red' }} />
                    </IconButton> */}
                    {isLocalAudioEnabled ? (
                        <Tooltip title='Mute' placement='right' arrow>
                            <IconButton
                                onClick={() =>
                                    hmsActions.setLocalAudioEnabled(
                                        !isLocalAudioEnabled
                                    )
                                }
                                sx={{ color: 'white' }}
                            >
                                <MicIcon />
                            </IconButton>
                        </Tooltip>
                    ) : (
                        <Tooltip title='Mute' placement='right' arrow>
                            <IconButton
                                onClick={() => {
                                    hmsActions.setLocalAudioEnabled(
                                        !isLocalAudioEnabled
                                    );
                                }}
                                sx={{
                                    backgroundColor: 'white',
                                    '&:hover': {
                                        backgroundColor: 'white',
                                    },
                                }}
                            >
                                <MicOffIcon sx={{ color: 'red' }} />
                            </IconButton>
                        </Tooltip>
                    )}
                    {!deafen ? (
                        <Tooltip title='Deafen' placement='right' arrow>
                            <IconButton
                                sx={{ color: 'white' }}
                                onClick={toggleDeafen}
                            >
                                <HeadsetIcon />
                            </IconButton>
                        </Tooltip>
                    ) : (
                        <Tooltip title='Undeafen' placement='right' arrow>
                            <IconButton
                                sx={{
                                    backgroundColor: 'white',
                                    '&:hover': {
                                        backgroundColor: 'white',
                                    },
                                }}
                                onClick={toggleDeafen}
                            >
                                <HeadsetOffIcon sx={{ color: 'red' }} />
                            </IconButton>
                        </Tooltip>
                    )}
                    <IconButton
                        sx={{
                            backgroundColor: 'white',
                            '&:hover': {
                                backgroundColor: 'white',
                            },
                        }}
                        onClick={() => {
                            hmsActions.leave();
                            navigate('/home');
                        }}
                    >
                        <CallEndIcon sx={{ color: 'red' }} />
                    </IconButton>
                </Stack>
            </Paper>
        </Box>
    );
}

export default VoiceRoom;
