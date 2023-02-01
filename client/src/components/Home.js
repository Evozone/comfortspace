import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';

import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Fab from '@mui/material/Fab';
import Modal from '@mui/material/Modal';
import AddIcon from '@mui/icons-material/Add';
import { Delete } from '@mui/icons-material';
import Tooltip from '@mui/material/Tooltip';
import { TextField } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Button from '@mui/material/Button';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import Typography from '@mui/material/Typography';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import CancelIcon from '@mui/icons-material/Cancel';
import { v4 as uuid } from 'uuid';

import axios from 'axios';
import { customGlobalScrollBars, smoothScrolling } from './CustomGlobalCSS';
import { bluegrey, richBlack, light, medium, dark, deepDark } from './colors';

import {
    useHMSActions,
    useHMSStore,
    selectIsConnectedToRoom,
} from '@100mslive/hms-video-react';
import { startLoadingAction, stopLoadingAction } from '../actions/actions';

// Home takes in themeChange and mode as props
export default function Home({ themeChange, mode }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const hmsActions = useHMSActions();
    const currentUser = useSelector((state) => state.auth);

    const [modalVisible, setModalVisible] = useState(false);
    const [roomId, setRoomId] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [coverImgURL, setCoverImgURL] = useState(null);

    const [spaces, setSpaces] = useState(null);

    useEffect(() => {
        const getSpaces = async () => {
            await axios
                .get(`${process.env.REACT_APP_SERVER_URL}/api/rooms/getRooms`)
                .then((res) => {
                    setSpaces(res.data.result);
                })
                .catch((err) => {
                    alert('Something went wrong, please try again later.');
                });
        };
        getSpaces();
    }, []);

    useEffect(() => {
        const getManagementToken = async () => {
            var managementToken = '';
            await fetch(`${process.env.REACT_APP_SERVER_URL}/mtoken`, {
                method: 'GET',
            })
                .then((res) => res.json())
                .then((data) => {
                    managementToken = data.data.token;
                });
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${managementToken}`,
                },
                body: JSON.stringify({
                    name: `${currentUser.username}-${uuid()}`,
                    description: 'This is a sample description for the room',
                    template_id: '63b72b6a447a48e7edc226bf',
                    region: 'us',
                }),
            };
            await fetch('https://api.100ms.live/v2/rooms', requestOptions)
                .then((response) => response.json())
                .then((data) => setRoomId(data.id));
        };
        modalVisible && getManagementToken();
        return () => {
            setRoomId('');
        };
    }, [modalVisible]);

    const generateCoverImgURL = async () => {
        const apiKey = 'EZOSMplMfr7b0a00AP3Puje9yEH0sTBqFRZ_mPtuMEw';
        const response = await fetch(
            `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=1&query=nature`
        );
        const data = await response.json();
        const url = data[0].urls.regular;
        setCoverImgURL(url);
    };

    const joinCall = (roomId, createdById) => {
        dispatch(startLoadingAction());
        getToken(roomId, createdById)
            .then(async (token) => {
                await hmsActions.join({
                    userName: `${currentUser.username}@${currentUser.photoURL}`,
                    authToken: token,
                    settings: {
                        isAudioMuted: true,
                    },
                    initEndpoint: process.env.REACT_APP_100MS_TOKEN_ENDPOINT,
                });
                dispatch(stopLoadingAction());

                navigate(`/room/${roomId}`);
            })
            .catch((error) => {
                dispatch(stopLoadingAction());
                alert('Something went wrong, please try again later.');
                console.log('Token API Error', error);
            });
    };

    const getToken = async (roomId, createdById) => {
        var role = '';
        createdById.includes(currentUser.uid)
            ? (role = 'moderator')
            : (role = 'participant');
        const response = await fetch(
            `${process.env.REACT_APP_100MS_TOKEN_ENDPOINT}api/token`,
            {
                method: 'POST',
                body: JSON.stringify({
                    user_id: currentUser.uid,
                    role,
                    room_id: roomId,
                }),
            }
        );
        const { token } = await response.json();
        return token;
    };

    const createNewSpace = async (e) => {
        e.preventDefault();
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            createdByUsername: currentUser.username,
            createdById: currentUser.uid,
            createdByName: currentUser.name,
            roomId,
            title,
            description,
            cover: coverImgURL,
        };
        const response = await axios.post(
            `${process.env.REACT_APP_SERVER_URL}/api/rooms/create`,
            config
        );
        if (response.data.success) {
            setModalVisible(false);
            window.open(`${process.env.REACT_APP_BASE_URL}/home`, '_self');
        } else {
            alert('Something went wrong, please try again');
        }
    };

    const deleteSpace = async (roomId) => {
        const result = await axios.delete(
            `${process.env.REACT_APP_SERVER_URL}/api/rooms/delete/${roomId}`
        );
        if (result.data.success) {
            window.location.reload();
            alert('Space deleted successfully');
        } else {
            alert('Something went wrong, please try again');
        }
    };

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
            <Typography
                variant='h1'
                component='h2'
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
                Support Groups
                <RecordVoiceOverIcon
                    sx={{ fontSize: '3rem', marginLeft: '1rem' }}
                />
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
                Find a space to talk about your mental health.
            </Typography>

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gridGap: '1rem',
                }}
            >
                {spaces &&
                    spaces.map((space) => (
                        <Card
                            key={space.roomId}
                            sx={{
                                backgroundColor:
                                    mode === 'light' ? deepDark : richBlack,
                                color:
                                    mode === 'light'
                                        ? light
                                        : dark.concat('aa'),
                                borderRadius: '10px',
                                border:
                                    mode === 'light'
                                        ? 'none'
                                        : `1px solid ${dark.concat('aa')}`,
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                            }}
                        >
                            <CardMedia
                                image={space.cover}
                                sx={{
                                    height: '200px',
                                }}
                            />
                            <CardContent>
                                <Typography
                                    variant='h5'
                                    sx={{
                                        color:
                                            mode === 'light' ? light : medium,
                                        font: '600 1.5rem/1.5rem Poppins, sans-serif',
                                        mb: '0.5rem',
                                    }}
                                >
                                    {space.title}
                                </Typography>
                                <Typography
                                    variant='subtitle2'
                                    color='textSecondary'
                                    sx={{
                                        m: 0,
                                    }}
                                >
                                    by{' '}
                                    {`${space.createdByUsername}  on   ${
                                        space.createdAt.split('T')[0]
                                    }`}
                                </Typography>
                                <Box
                                    sx={{
                                        height: '4rem',
                                        overflow: 'hidden',
                                    }}
                                >
                                    <Typography
                                        variant='body1'
                                        sx={{
                                            font: '400 1rem/1.5rem Work Sans, sans-serif',
                                        }}
                                    >
                                        {space.description}
                                    </Typography>
                                </Box>
                                <Button
                                    disableElevation
                                    color='success'
                                    variant='contained'
                                    sx={{
                                        mt: 0,
                                        backgroundColor:
                                            mode === 'light' ? medium : light,
                                        color: 'black',
                                        ':hover': {
                                            backgroundColor: light,
                                            color: 'black',
                                        },
                                    }}
                                    onClick={() => {
                                        joinCall(
                                            space.roomId,
                                            space.createdById
                                        );
                                    }}
                                    endIcon={<PhoneInTalkIcon />}
                                >
                                    Join
                                </Button>
                                {space.createdById === currentUser.uid && (
                                    <Button
                                        sx={{ ml: 2 }}
                                        disableElevation
                                        variant='contained'
                                        color='error'
                                        endIcon={<Delete />}
                                        onClick={() => {
                                            deleteSpace(space._id);
                                        }}
                                    >
                                        Delete
                                    </Button>
                                )}
                                {/* <AvatarGroup max={4}>
                                    <Avatar
                                        alt='Remy Sharp'
                                        src='/static/images/avatar/1.jpg'
                                    />
                                    <Avatar
                                        alt='Travis Howard'
                                        src='/static/images/avatar/2.jpg'
                                    />
                                    <Avatar
                                        alt='Cindy Baker'
                                        src='/static/images/avatar/3.jpg'
                                    />
                                    <Avatar
                                        alt='Agnes Walker'
                                        src='/static/images/avatar/4.jpg'
                                    />
                                    <Avatar
                                        alt='Trevor Henderson'
                                        src='/static/images/avatar/5.jpg'
                                    />
                                </AvatarGroup> */}
                            </CardContent>
                        </Card>
                    ))}
            </Box>
            <Modal open={modalVisible}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        minWidth: 600,
                        maxWidth: 700,
                        height: 670,
                        backgroundColor: mode === 'light' ? light : bluegrey,
                        boxShadow: 24,
                        borderRadius: '10px',
                        p: 2,
                        pb: 1,
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                    }}
                >
                    <CancelIcon
                        sx={{
                            position: 'absolute',
                            top: 10,
                            right: 10,
                        }}
                        cursor='pointer'
                        onClick={() => {
                            setModalVisible(false);
                        }}
                    />
                    <Typography
                        variant='h4'
                        sx={{
                            textAlign: 'center',
                            mb: 3,
                            color: mode === 'light' ? deepDark : light,
                        }}
                    >
                        Create New Space
                    </Typography>
                    <form
                        onSubmit={createNewSpace}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '500px',
                        }}
                    >
                        <TextField
                            fullWidth
                            required
                            id='outlined-required'
                            label='Title'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            sx={{
                                mb: 3,
                                '& .MuiInputBase-input': {
                                    p: 1,
                                },
                                '& .MuiInputLabel-root': {
                                    top: -5,
                                    fontSize: '0.9rem',
                                },
                            }}
                        />
                        <TextField
                            fullWidth
                            required
                            id='outlined-required'
                            label='Description (max 55 characters)'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            sx={{
                                mb: 3,
                                '& .MuiInputBase-input': {
                                    p: 1,
                                },
                                '& .MuiInputLabel-root': {
                                    top: -5,
                                    fontSize: '0.9rem',
                                },
                            }}
                        />
                        {coverImgURL && (
                            <>
                                <img
                                    style={{
                                        objectFit: 'fill',
                                        height: '350px',
                                        width: '455px',
                                        alignSelf: 'center',
                                        position: 'relative',
                                    }}
                                    alt='loading ...'
                                    src={coverImgURL}
                                />
                                <CancelIcon
                                    sx={{
                                        position: 'absolute',
                                        top: 210,
                                        right: 80,
                                    }}
                                    cursor='pointer'
                                    onClick={() => {
                                        setCoverImgURL(null);
                                    }}
                                />
                            </>
                        )}
                        <Button
                            color='success'
                            variant='contained'
                            sx={{
                                mt: 1,
                                backgroundColor:
                                    mode === 'light' ? medium : light,
                                color: 'black',
                                ':hover': {
                                    backgroundColor: medium,
                                    color: 'black',
                                },
                            }}
                            onClick={generateCoverImgURL}
                        >
                            Generate Cover Image
                        </Button>
                        <Button
                            color='success'
                            variant='contained'
                            sx={{
                                position: 'absolute',
                                bottom: 10,
                                right: 15,
                                mb: 1,
                                alignSelf: 'flex-end',
                                // mr: 7,
                                backgroundColor:
                                    mode === 'light' ? medium : light,
                                color: 'black',
                                ':hover': {
                                    backgroundColor: medium,
                                    color: 'black',
                                },
                            }}
                            // endIcon={<SendIc}
                            type='submit'
                        >
                            Create
                        </Button>
                    </form>
                </Box>
            </Modal>
            <Tooltip title='Create a new space' placement='left'>
                <Fab
                    color='primary'
                    aria-label='add'
                    sx={{
                        position: 'fixed',
                        bottom: '2rem',
                        right: '2rem',
                        color: mode === 'light' ? 'white' : deepDark,
                        backgroundColor: mode === 'light' ? deepDark : light,

                        borderRadius: '50%',
                        height: '3.5rem',
                        width: '3.5rem',

                        display: 'grid',
                        placeItems: 'center',
                        cursor: 'pointer',

                        boxShadow: '0 0 10px 0 rgba(78,135,140, 0.5)',

                        '&:hover': {
                            backgroundColor: mode === 'dark' ? light : deepDark,
                            color: mode === 'dark' ? deepDark : light,
                            transform: 'scale(1.1) rotate(90deg)',
                            transition: 'transform 0.2s ease-in-out',
                        },
                    }}
                    onClick={() => {
                        setModalVisible(true);
                    }}
                >
                    <AddIcon />
                </Fab>
            </Tooltip>
        </Box>
    );
}
