import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Fab from '@mui/material/Fab';
import Modal from '@mui/material/Modal';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import Typography from '@mui/material/Typography';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import CancelIcon from '@mui/icons-material/Cancel';
import { useHMSActions } from '@100mslive/hms-video-react';

import { bluegrey, richBlack, light, medium, dark, deepDark } from '../utils/colors';
import { startLoadingAction, stopLoadingAction, notifyAction } from '../actions/actions';
import { AuthState } from 'src/reducers/authReducer';

const Groups = ({ mode }: { mode: string }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const hmsActions = useHMSActions();
    const currentUser = useSelector((state: { auth: AuthState }) => state.auth);

    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [roomId, setRoomId] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [coverImgURL, setCoverImgURL] = useState<string | null>(null);
    const [groups, setGroups] = useState<any[]>([]);

    useEffect(() => {
        console.log(
            '%cHey if u like this project, consider giving it a star on github :) https://github.com/Evozone/comfortspace',
            'color: green; font-size: 26px;'
        );
        console.log(
            "%cIf someone told you to copy/paste something here, there's an 11/10 chance you're being scammed.",
            'font-size: 19px;'
        );
        console.log(
            '%cPasting anything in here could give attackers access to your Comfort Space account, so do not paste anything here.',
            'color:red; font-size: 19px;'
        );
        console.log('%c-inspired by discord', 'font-size: 17px;');
        const getGroups = async () => {
            dispatch(startLoadingAction());
            try {
                const res = await axios.get(
                    `${process.env.REACT_APP_SERVER_URL}/api/rooms/getRooms`
                );
                setGroups(res.data.result);
            } catch (error) {
                dispatch(
                    notifyAction(
                        true,
                        'error',
                        'Unable to load groups, please try again later.'
                    )
                );
                console.log(error);
            }
            dispatch(stopLoadingAction());
        };
        getGroups();
    }, []);

    useEffect(() => {
        const getManagementToken = async () => {
            generateCoverImgURL();
            var managementToken = '';
            await fetch(`${process.env.REACT_APP_SERVER_URL}/mtoken`, {
                method: 'GET',
            })
                .then((res) => res.json())
                .then((data) => {
                    managementToken = data.data.token;
                })
                .catch((error) => {
                    alert('Something went wrong, please try again later.');
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
                .then((data) => setRoomId(data.id))
                .catch((error) => {
                    alert('Something went wrong, please try again later.');
                });
        };
        modalVisible && getManagementToken();
        return () => {
            setRoomId('');
            setCoverImgURL(null);
        };
    }, [modalVisible]);

    const generateCoverImgURL = async () => {
        try {
            const apiKey = process.env.REACT_APP_UNSPLASH_API_KEY;
            const response = await fetch(
                `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=1&query=nature`
            );
            const data = await response.json();
            const url = data[0].urls.regular;
            setCoverImgURL(url);
        } catch (error) {
            console.log(error);
            alert('Something went wrong, please try again later.');
        }
    };

    const joinGroup = (roomId: string, createdById: string) => {
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
                dispatch(notifyAction(true, 'success', 'Joined a Group successfully!'));
                navigate(`/room/${roomId}`);
            })
            .catch((error) => {
                dispatch(stopLoadingAction());
                dispatch(
                    notifyAction(
                        true,
                        'error',
                        'It seems something is wrong, please log out and log in again. later :('
                    )
                );
                console.log('Token API Error', error);
            });
    };

    const getToken = async (roomId: string, createdById: string) => {
        var role = '';

        createdById.includes(currentUser.uid || '')
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

    const createNewGroup = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!title || !description || !coverImgURL) {
            alert('Please fill all the fields');
            return;
        }
        try {
            const auth = window.localStorage.getItem('healthApp');
            const { dnd } = JSON.parse(auth || '');
            const data = {
                roomId,
                title,
                description,
                cover: coverImgURL,
            };
            const response = await axios({
                method: 'POST',
                url: `${process.env.REACT_APP_SERVER_URL}/api/rooms/create`,
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${dnd}`,
                },
                data,
            });
            setModalVisible(false);
            setTitle('');
            setDescription('');
            setCoverImgURL(null);
            setGroups((prev) => {
                if (prev === null) {
                    return [response.data.result];
                } else {
                    return [...prev, response.data.result];
                }
            });
        } catch (error) {
            console.log(error);
            dispatch(
                notifyAction(
                    true,
                    'error',
                    'It seems something is wrong, please log out and log in again. later :('
                )
            );
        }
    };

    const deleteGroup = async (roomId: string) => {
        const choice = window.confirm('Are you sure you want to delete this group?');
        if (!choice) return;
        const auth = window.localStorage.getItem('healthApp');
        const { dnd } = JSON.parse(auth || '');
        try {
            await axios({
                method: 'DELETE',
                url: `${process.env.REACT_APP_SERVER_URL}/api/rooms/delete/${roomId}`,
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${dnd}`,
                },
            });
            window.location.reload();
            dispatch(notifyAction(true, 'success', 'Deleted a Group successfully!'));
        } catch (error) {
            console.log(error);
            dispatch(
                notifyAction(
                    true,
                    'error',
                    'It seems something is wrong, please log out and log in again. later :('
                )
            );
        }
    };

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
                variant="h1"
                component="h2"
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
                Support Groups
                <RecordVoiceOverIcon sx={{ fontSize: '3rem', marginLeft: '1rem' }} />
            </Typography>

            <Typography
                variant="h2"
                component="h3"
                sx={{
                    color: mode === 'light' ? deepDark.concat('aa') : light.concat('aa'),
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
                Find a support group to talk about your mental health.
            </Typography>

            <Box
                sx={{
                    display: 'grid',
                    borderRadius: '10px',
                    gridTemplateColumns: 'repeat(3, minmax(280px, 1fr))',
                    gap: '24px 24px',
                    gridAutoFlow: 'dense',
                }}
            >
                {groups.length > 0 &&
                    groups.map((space) => (
                        <Card
                            key={space.roomId}
                            sx={{
                                backgroundColor: mode === 'light' ? deepDark : richBlack,
                                color: mode === 'light' ? light : dark.concat('aa'),
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
                                    variant="h5"
                                    sx={{
                                        color: mode === 'light' ? light : medium,
                                        font: '600 1.5rem/1.5rem Poppins, sans-serif',
                                        mb: '0.5rem',
                                    }}
                                >
                                    {space.title}
                                </Typography>
                                <Typography
                                    variant="subtitle2"
                                    color="textSecondary"
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
                                        variant="body1"
                                        sx={{
                                            font: '400 1rem/1.5rem Work Sans, sans-serif',
                                        }}
                                    >
                                        {space.description}
                                    </Typography>
                                </Box>
                                <Button
                                    disableElevation
                                    color="success"
                                    variant="contained"
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
                                        joinGroup(space.roomId, space.createdById);
                                    }}
                                    endIcon={<PhoneInTalkIcon />}
                                >
                                    Join
                                </Button>
                                {space.createdById === currentUser.uid && (
                                    <Button
                                        sx={{ ml: 2 }}
                                        disableElevation
                                        variant="contained"
                                        color="error"
                                        endIcon={<DeleteIcon />}
                                        onClick={() => {
                                            deleteGroup(space._id);
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
                        maxHeight: '700px',
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
                        cursor="pointer"
                        onClick={() => {
                            setTitle('');
                            setDescription('');
                            setCoverImgURL('');
                            setModalVisible(false);
                            return;
                        }}
                    />
                    <Typography
                        variant="h4"
                        sx={{
                            textAlign: 'center',
                            mb: 3,
                            color: mode === 'light' ? deepDark : light,
                        }}
                    >
                        Create New Group
                    </Typography>
                    <form
                        onSubmit={createNewGroup}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '500px',
                        }}
                    >
                        <TextField
                            color="success"
                            fullWidth
                            required
                            id="outlined-required"
                            label="Title"
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
                            color="success"
                            fullWidth
                            required
                            id="outlined-required"
                            label="Description (max 55 characters)"
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
                            <img
                                style={{
                                    objectFit: 'fill',
                                    maxHeight: '300px',
                                    width: '455px',
                                    alignSelf: 'center',
                                    position: 'relative',
                                }}
                                alt="loading ..."
                                src={coverImgURL}
                            />
                        )}
                        <Button
                            disableElevation
                            color="success"
                            variant="contained"
                            sx={{
                                mt: 1,
                                alignSelf: 'center',
                                backgroundColor: mode === 'light' ? medium : light,
                                color: 'black',
                                ':hover': {
                                    backgroundColor: medium,
                                    color: 'black',
                                },
                            }}
                            onClick={generateCoverImgURL}
                        >
                            Change Cover Image
                        </Button>
                        <Button
                            color="success"
                            variant="contained"
                            disableElevation
                            sx={{
                                mt: 1,
                                mb: 1,
                                alignSelf: 'flex-end',
                                backgroundColor: mode === 'light' ? medium : light,
                                color: 'black',
                                ':hover': {
                                    backgroundColor: medium,
                                    color: 'black',
                                },
                            }}
                            type="submit"
                        >
                            Create
                        </Button>
                    </form>
                </Box>
            </Modal>
            <Tooltip title="Create a new Group">
                <Fab
                    color="primary"
                    aria-label="add"
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
};

export default Groups;
