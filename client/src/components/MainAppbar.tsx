import React, { useState, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import Modal from '@mui/material/Modal';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Groups2Icon from '@mui/icons-material/Groups2';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import QuizIcon from '@mui/icons-material/Quiz';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LogoutIcon from '@mui/icons-material/Logout';
import CloseIcon from '@mui/icons-material/Close';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import DownloadIcon from '@mui/icons-material/Download';

import storage from '../appwrite';
import { CustomSwitcherGroup, CustomSwitcherButton } from '../utils/CustomSwitcher';
import { richBlack, light, medium, deepDark, bluegrey } from '../utils/colors';
import {
    signOutAction,
    stopLoadingAction,
    startLoadingAction,
    signInAction,
    notifyAction,
} from '../actions/actions';
import { AuthState } from 'src/reducers/authReducer';

interface MainAppbarProps {
    mode: string;
    themeChange: () => void;
    supportsPWA: boolean;
    promptInstall: any;
}

const MainAppbar: React.FC<MainAppbarProps> = ({
    mode,
    themeChange,
    supportsPWA,
    promptInstall,
}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector((state: { auth: AuthState }) => state.auth);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selected, setSelected] = useState<string>(
        window.localStorage.getItem('healthAppLastPage') || 'groups'
    );
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [twitterProfile, setTwitterProfile] = useState<string | undefined>(
        currentUser?.socialLinks?.twitter
    );
    const [instagramProfile, setInstagramProfile] = useState<string | undefined>(
        currentUser?.socialLinks?.instagram
    );
    const [avatarURL, setAvatarURL] = useState<null | string>(currentUser?.photoURL);
    const [name, setName] = useState<null | string>(currentUser?.name);
    const [buttonStatus, setButtonStatus] = useState<boolean>(true);

    const onInstallClick = () => {
        if (!supportsPWA) {
            alert(
                'Either you have already installed the app or your browser does not support PWA :('
            );
            return;
        }
        promptInstall.prompt();
    };

    const renderInstallOption = () => {
        if (window.matchMedia('(display-mode: standalone)').matches) {
            return;
        } else {
            return (
                <MenuItem
                    onClick={() => {
                        onInstallClick();
                        handleMenuClose();
                    }}
                >
                    <DownloadIcon
                        sx={{
                            color: mode === 'light' ? deepDark : light,
                            fontSize: '1.7rem',
                            ml: -0.5,
                        }}
                    />
                    <ListItemText sx={{ ml: 1 }} primary="Install" />
                </MenuItem>
            );
        }
    };

    const handleSignOut = () => {
        const choice = window.confirm('Please click on OK to Log Out.');
        if (choice) {
            dispatch(signOutAction());
            window.localStorage.removeItem('healthAppLastPage');
            navigate('/');
        }
    };

    const handleNavigation = (value: string) => {
        setSelected(value);
        window.localStorage.setItem('healthAppLastPage', value);
        navigate(`/${value}`);
    };

    const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
        setButtonStatus(false);
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (name === 'twitter') {
            setTwitterProfile(value);
        } else {
            setInstagramProfile(value);
        }
        setButtonStatus(false);
    };

    const removePhotoURL = () => {
        setAvatarURL(
            'https://media.istockphoto.com/id/1214428300/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=vftMdLhldDx9houN4V-g3C9k0xl6YeBcoB_Rk6Trce0='
        );
        setButtonStatus(false);
    };

    const changeAvatar = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event?.target.files?.[0];
        if (file) {
            const fileExt = file?.name.split('.').pop();
            if (fileExt === 'jpg' || fileExt === 'jpeg' || fileExt === 'png') {
                const localUrl = URL.createObjectURL(file);
                setImageFile(file);
                setAvatarURL(localUrl);
                setButtonStatus(false);
            } else {
                alert('Please upload a valid image file of type jpg, jpeg or png');
            }
        }
    };

    const saveChanges = async () => {
        if (!avatarURL || !name) {
            alert('Name cannot be empty');
            return;
        }
        const auth = window.localStorage.getItem('healthApp');
        const { dnd } = JSON.parse(auth ? auth : '');
        try {
            dispatch(startLoadingAction());
            let newURL = avatarURL;
            if (imageFile !== null) {
                newURL = (await uploadFile(imageFile)).toString();
            }
            const data = {
                name,
                photoURL: newURL,
                socialLinks: {
                    twitter: twitterProfile,
                    instagram: instagramProfile,
                },
            };
            const result = await axios({
                method: 'PATCH',
                url: `${process.env.REACT_APP_SERVER_URL}/api/user/edit`,
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${dnd}`,
                },
                data,
            });
            setButtonStatus(true);
            setName(result.data.result.name);
            setAvatarURL(result.data.result.photoURL);
            setTwitterProfile(result.data.result.socialLinks.twitter);
            setInstagramProfile(result.data.result.socialLinks.instagram);
            dispatch(
                signInAction(
                    true,
                    result.data.result.uid,
                    result.data.result.email,
                    result.data.result.name,
                    result.data.result.photoURL,
                    result.data.result.username,
                    result.data.result.socialLinks,
                    result.data.result.token
                )
            );
            dispatch(stopLoadingAction());
            dispatch(notifyAction(true, 'success', 'Profile Updated Successfully'));
        } catch (error) {
            console.log(error);
        }
    };

    const uploadFile = async (file: File) => {
        const id = uuid();
        await storage.createFile(
            process.env.REACT_APP_APPWRITE_BUCKET_ID || '',
            id,
            file
        );
        const result = storage.getFilePreview(
            process.env.REACT_APP_APPWRITE_BUCKET_ID || '',
            id
        );
        return result;
    };

    const handleModalClose = () => {
        setModalVisible(false);
        setName(currentUser.name);
        setAvatarURL(currentUser.photoURL);
        setTwitterProfile(currentUser?.socialLinks?.twitter);
        setInstagramProfile(currentUser?.socialLinks?.instagram);
        setButtonStatus(true);
    };

    return (
        <Box
            sx={{
                position: 'fixed',
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                bgcolor: mode === 'light' ? medium : richBlack,
                boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.5)',
                color: 'white',
                zIndex: '1000',
                padding: '7px',
                top: '0',
            }}
        >
            <img
                src={'/assets/vectors/logo-800x800.svg'}
                alt="chat"
                style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                }}
            />
            {currentUser.isSignedIn ? (
                <>
                    <CustomSwitcherGroup exclusive>
                        <CustomSwitcherButton
                            onClick={() => handleNavigation('groups')}
                            value="groups"
                            selected={selected === 'groups'}
                        >
                            <Groups2Icon /> Groups
                        </CustomSwitcherButton>
                        <CustomSwitcherButton
                            onClick={() => handleNavigation('blogs')}
                            value="blogs"
                            selected={selected === 'blogs'}
                        >
                            <LibraryBooksIcon /> Blogs
                        </CustomSwitcherButton>
                        <CustomSwitcherButton
                            onClick={() => handleNavigation('connect')}
                            value="connect"
                            selected={selected === 'connect'}
                        >
                            <GroupAddIcon /> Connect
                        </CustomSwitcherButton>
                        <CustomSwitcherButton
                            onClick={() => handleNavigation('exam')}
                            value="exam"
                            selected={selected === 'exam'}
                        >
                            <QuizIcon /> Take a Test
                        </CustomSwitcherButton>
                    </CustomSwitcherGroup>
                    <IconButton sx={{ p: '6px' }} onClick={handleMenuClick}>
                        <Avatar
                            alt={currentUser?.name?.charAt(0).toUpperCase()}
                            src={currentUser.photoURL || ''}
                            sx={{
                                bgcolor: mode === 'light' ? deepDark : light,
                                color: mode === 'light' ? light : deepDark,
                                height: 50,
                                width: 50,
                                border: '2px solid',
                            }}
                        >
                            {currentUser?.name?.charAt(0).toUpperCase()}
                        </Avatar>
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                        sx={{
                            '& .MuiPaper-root': {
                                backgroundColor: mode === 'light' ? light : bluegrey,
                            },
                        }}
                    >
                        <MenuItem
                            onClick={() => {
                                themeChange();
                            }}
                        >
                            {mode === 'light' ? (
                                <DarkModeIcon
                                    sx={{
                                        color: mode === 'light' ? deepDark : light,
                                        fontSize: '1.7rem',
                                        ml: -0.5,
                                    }}
                                />
                            ) : (
                                <LightModeIcon
                                    sx={{
                                        color: mode === 'light' ? deepDark : light,
                                        fontSize: '1.7rem',
                                        ml: -0.5,
                                    }}
                                />
                            )}
                            <ListItemText sx={{ ml: 1 }} primary="Theme" />
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                handleMenuClose();
                                setModalVisible(true);
                            }}
                        >
                            <AccountBoxIcon
                                sx={{
                                    color: mode === 'light' ? deepDark : light,
                                    fontSize: '1.7rem',
                                    ml: -0.5,
                                }}
                            />
                            <ListItemText sx={{ ml: 1 }} primary="Profile" />
                        </MenuItem>
                        {renderInstallOption()}
                        <MenuItem
                            onClick={() => {
                                handleSignOut();
                            }}
                        >
                            <LogoutIcon
                                sx={{
                                    color: mode === 'light' ? deepDark : light,
                                }}
                            />
                            <ListItemText sx={{ ml: 1 }} primary="Logout" />
                        </MenuItem>
                    </Menu>
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
                                py: 2,
                                px: 4,
                                border: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection: 'column',
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    width: '100%',
                                }}
                            >
                                <Typography
                                    variant="h5"
                                    sx={{
                                        color: mode === 'light' ? deepDark : light,
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Profile
                                </Typography>
                                <IconButton onClick={handleModalClose}>
                                    <CloseIcon
                                        sx={{
                                            color: mode === 'light' ? deepDark : light,
                                        }}
                                    />
                                </IconButton>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-around',
                                    width: '100%',
                                    py: 4,
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Avatar
                                        alt={currentUser?.name?.charAt(0).toUpperCase()}
                                        src={avatarURL || ''}
                                        sx={{
                                            bgcolor: mode === 'light' ? deepDark : light,
                                            color: mode === 'light' ? light : deepDark,
                                            height: 150,
                                            width: 150,
                                            border: '2px solid',
                                        }}
                                    >
                                        {currentUser?.name?.charAt(0).toUpperCase()}
                                    </Avatar>
                                    <Box sx={{ mt: 1 }}>
                                        <input
                                            accept="image/*"
                                            id="changeAvatar"
                                            type="file"
                                            style={{ display: 'none' }}
                                            onChange={changeAvatar}
                                        />

                                        <Button
                                            sx={{ mr: 1 }}
                                            color="success"
                                            variant="outlined"
                                            size="small"
                                        >
                                            <label
                                                style={{ cursor: 'pointer' }}
                                                htmlFor="changeAvatar"
                                            >
                                                Change
                                            </label>
                                        </Button>
                                        <Button
                                            color="error"
                                            variant="outlined"
                                            size="small"
                                            onClick={removePhotoURL}
                                        >
                                            Remove
                                        </Button>
                                    </Box>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <TextField
                                        label="Name"
                                        color="success"
                                        variant="outlined"
                                        value={name}
                                        onChange={handleNameChange}
                                    />
                                    <Typography
                                        variant="subtitle1"
                                        sx={{
                                            mt: 2,
                                            color: mode === 'light' ? deepDark : light,
                                        }}
                                    >
                                        Username - {currentUser.username}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-end',
                                    width: '100%',
                                }}
                            >
                                <TextField
                                    sx={{
                                        width: '390px',
                                        mb: 4,
                                        mr: 1.5,
                                        color: mode === 'light' ? deepDark : light,
                                    }}
                                    value={twitterProfile}
                                    onChange={handleInputChange}
                                    InputLabelProps={{
                                        sx: {
                                            color: mode === 'light' ? deepDark : light,
                                        },
                                    }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <TwitterIcon
                                                    sx={{
                                                        color:
                                                            mode === 'light'
                                                                ? deepDark
                                                                : light,
                                                        fontSize: '2rem',
                                                    }}
                                                />
                                            </InputAdornment>
                                        ),
                                    }}
                                    color="success"
                                    variant="outlined"
                                    name="twitter"
                                    label="Twitter Profile Link"
                                />
                                <TextField
                                    color="success"
                                    name="instagram"
                                    value={instagramProfile}
                                    label="Instagram Profile Link"
                                    sx={{
                                        width: '390px',
                                        color: mode === 'light' ? deepDark : light,
                                        mb: 0.5,
                                        mr: 1.5,
                                    }}
                                    onChange={handleInputChange}
                                    InputLabelProps={{
                                        sx: {
                                            color: mode === 'light' ? deepDark : light,
                                        },
                                    }}
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <InstagramIcon
                                                    sx={{
                                                        color:
                                                            mode === 'light'
                                                                ? deepDark
                                                                : light,
                                                        fontSize: '2rem',
                                                    }}
                                                />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Box>
                            <Button
                                color="success"
                                sx={{
                                    mt: 3,
                                    backgroundColor: mode === 'light' ? medium : light,
                                    color: bluegrey,
                                    font: '500 0.9rem Poppins, sans-serif',
                                    ':hover': {
                                        backgroundColor: medium,
                                        color: 'black',
                                    },
                                }}
                                variant="contained"
                                disabled={buttonStatus}
                                onClick={saveChanges}
                            >
                                Save
                            </Button>
                        </Box>
                    </Modal>
                </>
            ) : (
                <Box sx={{ p: '3px' }}>
                    <CustomSwitcherGroup>
                        <CustomSwitcherButton onClick={() => navigate('/')} value="/">
                            <GroupAddIcon /> Join Now
                        </CustomSwitcherButton>
                    </CustomSwitcherGroup>
                </Box>
            )}
        </Box>
    );
};

export default MainAppbar;
