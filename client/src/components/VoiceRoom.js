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

    //create a dummy peers array and the object should have id and name key
    // const peers = [
    //     {
    //         id: 1,
    //         name: 'peer1',
    //         audioTrack: true,
    //     },
    //     {
    //         id: 2,
    //         name: 'peer2',
    //         audioTrack: true,
    //     },
    //     {
    //         id: 3,
    //         name: 'peer3',
    //         audioTrack: true,
    //     },
    //     {
    //         id: 4,
    //         name: 'peer4',
    //         audioTrack: true,
    //     },
    //     {
    //         id: 5,
    //         name: 'peer5',
    //         audioTrack: true,
    //     },
    //     {
    //         id: 6,
    //         name: 'peer6',
    //         audioTrack: true,
    //     },
    //     {
    //         id: 7,
    //         name: 'peer7',
    //         audioTrack: true,
    //     },
    //     {
    //         id: 8,
    //         name: 'peer8',

    //         audioTrack: true,
    //     },
    //     {
    //         id: 9,
    //         name: 'peer9',
    //         audioTrack: true,
    //     },
    //     {
    //         id: 10,
    //         name: 'peer10',
    //         audioTrack: true,
    //     },
    //     {
    //         id: 11,
    //         name: 'peer11',
    //         audioTrack: true,
    //     },
    //     {
    //         id: 12,
    //         name: 'peer12',
    //         audioTrack: true,
    //     },
    //     {
    //         id: 13,
    //         name: 'peer13',
    //         audioTrack: true,
    //     },
    //     {
    //         id: 14,
    //         name: 'peer14',
    //         audioTrack: true,
    //     },
    //     {
    //         id: 15,
    //         name: 'peer15',
    //         audioTrack: true,
    //     },
    //     {
    //         id: 16,
    //         name: 'peer16',
    //         audioTrack: true,
    //     },
    //     {
    //         id: 17,
    //         name: 'peer17',
    //         audioTrack: true,
    //     },
    //     {
    //         id: 18,
    //         name: 'peer18',
    //         audioTrack: true,
    //     },
    //     {
    //         id: 19,
    //         name: 'peer19',
    //         audioTrack: true,
    //     },
    //     {
    //         id: 20,
    //         name: 'peer20',
    //         audioTrack: true,
    //     },
    //     {
    //         id: 21,
    //         name: 'peer21',
    //         audioTrack: true,
    //     },
    //     {
    //         id: 22,
    //         name: 'peer22',
    //         audioTrack: true,
    //     },
    //     {
    //         id: 23,
    //         name: 'peer23',
    //         audioTrack: true,
    //     },
    //     {
    //         id: 24,
    //         name: 'peer24',
    //         audioTrack: true,
    //     },
    //     {
    //         id: 25,
    //         name: 'peer25',
    //         audioTrack: true,
    //     },
    //     {
    //         id: 26,
    //         name: 'peer26',
    //         audioTrack: true,
    //     },
    //     {
    //         id: 27,
    //         name: 'peer27',
    //         audioTrack: true,
    //     },
    //     {
    //         id: 28,
    //         name: 'peer28',
    //         audioTrack: true,
    //     },
    //     {
    //         id: 29,
    //         name: 'peer29',
    //         audioTrack: true,
    //     },
    //     {
    //         id: 30,
    //         name: 'peer30',
    //         audioTrack: true,
    //     },
    //     {
    //         id: 31,
    //         name: 'peer31',
    //         audioTrack: true,
    //     },
    //     {
    //         id: 32,
    //         name: 'peer32',
    //         audioTrack: true,
    //     },
    //     {
    //         id: 33,
    //         name: 'peer33',
    //         audioTrack: true,
    //     },
    //     {
    //         id: 34,
    //         name: 'peer34',
    //         audioTrack: true,
    //     },
    //     {
    //         id: 35,
    //         name: 'peer35',
    //         audioTrack: true,
    //     },
    //     {
    //         id: 36,
    //         name: 'peer36',
    //         audioTrack: true,
    //     },
    //     {
    //         id: 37,
    //         name: 'peer37',
    //         audioTrack: true,
    //     },
    //     {
    //         id: 38,
    //         name: 'peer38',
    //         audioTrack: true,
    //     },
    //     {
    //         id: 39,
    //         name: 'peer39',
    //         audioTrack: true,
    //     },
    //     {
    //         id: 40,
    //         name: 'peer40',
    //         audioTrack: true,
    //     },
    //     {
    //         id: 41,
    //         name: 'peer41',
    //         audioTrack: true,
    //     },
    // ];

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
            'Hey if u like this project, please star it on github :) https://github.com/Evozone/ok_to_be_not_ok'
        );
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
