import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import MicIcon from '@mui/icons-material/Mic';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import MicOffIcon from '@mui/icons-material/MicOff';
import CallEndIcon from '@mui/icons-material/CallEnd';

import { light, bluegrey, deepDark } from '../utils/colors';
import { initSocket } from '../socket';
import { useSelector } from 'react-redux';
import { notifyAction } from '../actions/actions';

function PersonalCall({ mode }) {
    const socketRef = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const pcRef = useRef();
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const { id: roomId } = useParams();

    const currentUser = useSelector((state) => state.auth);
    const [audioMuted, setAudioMuted] = useState(false);
    const [videoMuted, setVideoMuted] = useState(false);
    const [remoteUser, setRemoteUser] = useState(null);
    const [remoteAudioMute, setRemoteAudioMute] = useState(null);

    const pc_config = {
        iceServers: [
            {
                urls: 'stun:stun.l.google.com:19302',
            },
        ],
    };

    const setVideoTracks = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
            });
            if (localVideoRef.current) {
                localVideoRef.current.srcObject = stream;
            }
            if (!(pcRef.current && socketRef.current)) {
                return;
            }
            // console.log('stream - ', stream);
            stream.getTracks().forEach((track) => {
                if (!pcRef.current) {
                    return;
                }
                // console.log('track - ', track, ' - stream - ', stream);
                pcRef.current.addTrack(track, stream);
            });
            pcRef.current.onicecandidate = (event) => {
                if (event.candidate) {
                    if (!socketRef.current) {
                        return;
                    }
                    // console.log('onicecandidate');
                    socketRef.current.emit('candidate', {
                        candidate: event.candidate,
                        roomId,
                    });
                }
            };
            pcRef.current.oniceconnectionstatechange = (event) => {
                // console.log(event);
            };
            pcRef.current.ontrack = (event) => {
                // console.log('add remotetrack success');
                if (remoteVideoRef.current) {
                    remoteVideoRef.current.srcObject = event.streams[0];
                }
            };
            toggleAudio();
            socketRef.current.emit('join_room', {
                roomId,
                name: currentUser.name,
            });
        } catch (error) {
            console.error(error);
            alert('Please reload and allow camera and microphone access');
        }
    };

    const createOffer = async (userId) => {
        // console.log('create offer');
        if (!(pcRef.current && socketRef.current)) {
            return;
        }
        try {
            const sdp = await pcRef.current.createOffer({
                offerToReceiveAudio: true,
                offerToReceiveVideo: true,
            });
            await pcRef.current.setLocalDescription(
                new RTCSessionDescription(sdp)
            );
            // console.log(remoteUser);
            socketRef.current.emit('offer', { sdp, userId });
        } catch (error) {
            console.error(error);
            alert('Something went wrong, please reload the page');
        }
    };

    const createAnswer = async (sdp, userId) => {
        if (!(pcRef.current && socketRef.current)) {
            return;
        }
        try {
            await pcRef.current.setRemoteDescription(
                new RTCSessionDescription(sdp)
            );
            // console.log('answer set remote description success');
            const mySdp = await pcRef.current.createAnswer({
                offerToReceiveVideo: true,
                offerToReceiveAudio: true,
            });
            // console.log('create answer');
            await pcRef.current.setLocalDescription(
                new RTCSessionDescription(mySdp)
            );
            // console.log('set local description success - ', mySdp);
            socketRef.current.emit('answer', {
                sdp: mySdp,
                userId,
            });
        } catch (error) {
            console.error(error);
            alert('Something went wrong, please reload the page');
        }
    };

    const toggleAudio = () => {
        if (localVideoRef) {
            setAudioMuted(!audioMuted);
            localVideoRef.current.srcObject.getAudioTracks()[0].enabled =
                audioMuted;
            socketRef.current.emit('toggle_audio', {
                roomId,
                audioMuted,
            });
        }
    };

    const toggleVideo = () => {
        if (localVideoRef) {
            setVideoMuted(!videoMuted);
            localVideoRef.current.srcObject.getVideoTracks()[0].enabled =
                videoMuted;
        }
    };

    useEffect(() => {
        const init = async () => {
            socketRef.current = await initSocket('personalCall');
            pcRef.current = new RTCPeerConnection(pc_config);

            socketRef.current.on('all_users', (allUsers) => {
                if (allUsers.length > 0) {
                    setRemoteUser(allUsers[0]);
                    createOffer(allUsers[0].id);
                }
            });

            socketRef.current.on('user_joined', (user) => {
                setRemoteUser(user);
            });

            socketRef.current.on('getOffer', ({ sdp, userId }) => {
                // console.log(sdp);
                // console.log('get offer');
                createAnswer(sdp, userId);
            });

            socketRef.current.on('getAnswer', (sdp) => {
                // console.log('get answer');
                if (!pcRef.current) {
                    return;
                }
                // console.log('set remote description', sdp);
                pcRef.current.setRemoteDescription(
                    new RTCSessionDescription(sdp)
                );
                // console.log(sdp);
            });

            socketRef.current.on('getCandidate', async (candidate) => {
                if (!pcRef.current) {
                    return;
                }
                await pcRef.current.addIceCandidate(
                    new RTCIceCandidate(candidate)
                );
                // console.log('candidate add success');
            });

            socketRef.current.on('toggle_audio', (audioMuted) => {
                setRemoteAudioMute(audioMuted);
            });

            socketRef.current.on('user_left', (user) => {
                setRemoteUser(null);
                dispatch(
                    notifyAction(
                        true,
                        'success',
                        `${user.name} has left the call`
                    )
                );
            });

            setVideoTracks();
        };
        init();
        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
            if (pcRef.current) {
                pcRef.current.close();
            }
        };
    }, []);

    return (
        <Box
            sx={{
                height: '100vh',
                backgroundColor: mode === 'light' ? light : bluegrey,
                color: 'text.primary',
                px: '1.5rem',
                pt: '5.5rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Paper
                sx={{
                    p: 2,
                    ...(mode === 'light' && { backgroundColor: deepDark }),
                    height: 'calc(100vh - 170px)',
                    width: '100%',
                    mb: '1rem',
                    overflowY: 'auto',
                    borderRadius: '10px',
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <Box
                    sx={{
                        position: 'relative',
                        width: remoteUser ? '98%' : '100%',
                    }}
                >
                    <Typography
                        variant='h6'
                        sx={{
                            zIndex: 1,
                            position: 'absolute',
                            bottom: '6px',
                            left: '36px',
                            color: mode === 'light' ? 'white' : 'text.primary',
                        }}
                    >
                        {currentUser.name}
                    </Typography>
                    <video
                        style={{
                            height: '100%',
                            width: 'inherit',
                            borderRadius: '10px',
                            objectFit: remoteUser ? 'cover' : 'contain',
                            transform: 'scaleX(-1)',
                        }}
                        muted
                        ref={localVideoRef}
                        autoPlay
                    ></video>
                    {audioMuted && (
                        <MicOffIcon
                            sx={{
                                position: 'absolute',
                                bottom: '10px',
                                left: '10px',
                                color:
                                    mode === 'light' ? 'white' : 'text.primary',
                            }}
                        />
                    )}
                </Box>
                {remoteUser && (
                    <Box
                        sx={{
                            borderRadius: '10px',
                            position: 'relative',
                            width: '98%',
                        }}
                    >
                        <Typography
                            variant='h6'
                            sx={{
                                zIndex: 1,
                                position: 'absolute',
                                bottom: '6px',
                                left: '36px',
                                color:
                                    mode === 'light' ? 'white' : 'text.primary',
                            }}
                        >
                            {remoteUser?.name}
                        </Typography>
                        <video
                            id='remotevideo'
                            style={{
                                height: '100%',
                                width: 'inherit',
                                borderRadius: '10px',
                                objectFit: 'cover',
                                transform: 'scaleX(-1)',
                            }}
                            ref={remoteVideoRef}
                            autoPlay
                        ></video>
                        {!remoteAudioMute && (
                            <MicOffIcon
                                sx={{
                                    position: 'absolute',
                                    bottom: '10px',
                                    left: '10px',
                                    color:
                                        mode === 'light'
                                            ? 'white'
                                            : 'text.primary',
                                }}
                            />
                        )}
                    </Box>
                )}
            </Paper>
            <Paper
                sx={{
                    p: 1,
                    borderRadius: '30px',
                    backgroundColor: deepDark,
                }}
            >
                <Stack direction='row' spacing={2}>
                    {audioMuted ? (
                        <Tooltip title='Turn On Mic' arrow>
                            <IconButton
                                sx={{
                                    color: 'red',
                                    backgroundColor: 'white',
                                    '&:hover': {
                                        backgroundColor: 'white',
                                    },
                                }}
                                onClick={toggleAudio}
                            >
                                <MicOffIcon />
                            </IconButton>
                        </Tooltip>
                    ) : (
                        <Tooltip title='Turn Off Mic' arrow>
                            <IconButton
                                sx={{ color: 'white' }}
                                onClick={toggleAudio}
                            >
                                <MicIcon />
                            </IconButton>
                        </Tooltip>
                    )}
                    {videoMuted ? (
                        <Tooltip title='Turn On Camera' arrow>
                            <IconButton
                                sx={{
                                    color: 'red',
                                    backgroundColor: 'white',
                                    '&:hover': {
                                        backgroundColor: 'white',
                                    },
                                }}
                                onClick={toggleVideo}
                            >
                                <VideocamOffIcon />
                            </IconButton>
                        </Tooltip>
                    ) : (
                        <Tooltip title='Turn Off Camera' arrow>
                            <IconButton
                                sx={{
                                    color: 'white',
                                }}
                                onClick={toggleVideo}
                            >
                                <VideocamIcon />
                            </IconButton>
                        </Tooltip>
                    )}

                    <Tooltip title='Leave Call' arrow>
                        <IconButton
                            sx={{
                                backgroundColor: 'white',
                                '&:hover': {
                                    backgroundColor: 'white',
                                },
                            }}
                            onClick={() => {
                                navigate('/connect');
                                window.location.reload();
                            }}
                        >
                            <CallEndIcon sx={{ color: 'red' }} />
                        </IconButton>
                    </Tooltip>
                </Stack>
            </Paper>
        </Box>
    );
}

export default PersonalCall;
