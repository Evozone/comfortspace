import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import HeadsetIcon from '@mui/icons-material/Headset';
import HeadsetOffIcon from '@mui/icons-material/HeadsetOff';
import CallEndIcon from '@mui/icons-material/CallEnd';
import { useNavigate } from 'react-router';
import {
    useHMSActions,
    useHMSStore,
    selectIsConnectedToRoom,
    selectIsLocalAudioEnabled,
    selectPeers,
} from '@100mslive/hms-video-react';

import { bluegrey, light, deepDark } from '../utils/colors';
import PeerInRoom from './PeerInRoom';

function VoiceRoom({ mode }) {
    const peers = useHMSStore(selectPeers);
    const isConnected = useHMSStore(selectIsConnectedToRoom);
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
        if (!isConnected) {
            navigate('/groups');
        }
        return () => {
            hmsActions.leave();
        };
    }, []);

    const toggleDeafen = () => {
        setDeafen(!deafen);
        deafen ? setPeersVolume(100) : setPeersVolume(0);
    };

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
            <Paper
                sx={{
                    p: 2,
                    backgroundColor: deepDark,
                    height: 'calc(100vh - 170px)',
                    width: '100%',
                    mb: '1rem',
                    overflowY: 'auto',
                    display: 'grid',
                    borderRadius: '10px',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
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
                    backgroundColor: deepDark,
                }}
            >
                <Stack direction='row' spacing={2}>
                    {isLocalAudioEnabled ? (
                        <Tooltip title='Mute' arrow>
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
                        <Tooltip title='Mute' arrow>
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
                        <Tooltip title='Deafen' arrow>
                            <IconButton
                                sx={{ color: 'white' }}
                                onClick={toggleDeafen}
                            >
                                <HeadsetIcon />
                            </IconButton>
                        </Tooltip>
                    ) : (
                        <Tooltip title='Undeafen' arrow>
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
                            navigate('/groups');
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
