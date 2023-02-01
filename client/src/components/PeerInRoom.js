import React from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

import IconButton from '@mui/material/IconButton';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';

import { light, bluegrey } from './colors';

import {
    useHMSActions,
    useHMSStore,
    selectIsConnectedToRoom,
    selectIsPeerAudioEnabled,
    selectLocalPeer,
    selectPeers,
} from '@100mslive/hms-video-react';
import { richBlack, medium, dark, deepDark } from './colors';
import { Typography } from '@mui/material';

function PeerInRoom({ peer, mode }) {
    const hmsActions = useHMSActions();
    const audioEnabled = useHMSStore(selectIsPeerAudioEnabled(peer.id));
    const localPeer = useHMSStore(selectLocalPeer);
    const isModerator = localPeer.roleName === 'moderator';
    // const isModerator = true;
    const mutePeer = () => {
        if (isModerator) {
            hmsActions.setRemoteTrackEnabled(peer.audioTrack, false);
        }
    };

    return (
        <Box
            key={peer.id}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: mode === 'light' ? light : bluegrey,
                padding: '0.9rem',
                px: '3.5rem',
                py: '3rem',
                borderRadius: '10px',
                position: 'relative',
                width: '100%',
            }}
        >
            {!audioEnabled ? (
                <MicOffIcon
                    sx={{
                        position: 'absolute',
                        top: '10px',
                        right: '8px',
                    }}
                />
            ) : isModerator ? (
                <Tooltip title={`Mute ${peer.name.split('@')[0]}`}>
                    <IconButton
                        sx={{
                            position: 'absolute',
                            top: '2px',
                            right: 0,
                        }}
                        onClick={mutePeer}
                    >
                        <MicIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <MicIcon
                    sx={{
                        position: 'absolute',
                        top: '10px',
                        right: '8px',
                    }}
                />
            )}
            <Tooltip title={peer.name.split('@')[0]}>
                <Avatar
                    alt={peer.name.charAt(0).toUpperCase()}
                    src={peer.name.split('@')[1]}
                    sx={{
                        width: 100,
                        height: 100,
                        bgcolor: '#25D366',
                        color: 'white',
                        fontSize: '2.5rem',
                    }}
                >
                    {peer.name.charAt(0).toUpperCase()}
                </Avatar>
            </Tooltip>

            <Typography
                sx={{
                    fontSize: '1.8rem',
                    mt: '0.9rem',
                    color: mode === 'light' ? deepDark : light,
                    position: 'absolute',
                    top: '70%',
                }}
            >
                {peer.name.split('@')[0]}
            </Typography>
            <Typography
                sx={{
                    fontSize: '1rem',
                    color: mode === 'light' ? deepDark : light,
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                }}
            >
                {peer.roleName.charAt(0).toUpperCase() + peer.roleName.slice(1)}
                {/* {peer.name.split('@')[0]} */}
            </Typography>
        </Box>
    );
}

export default PeerInRoom;
