import React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

import { light, deepDark, bluegrey } from '../utils/colors';
import { otherUser } from './Connect';

interface ProfileInfoProps {
    mode: string;
    otherUser: otherUser | null;
    setProfileInfoOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({
    mode,
    otherUser,
    setProfileInfoOpen,
}) => {
    return (
        <Box
            sx={{
                position: 'fixed',
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
                <IconButton onClick={() => setProfileInfoOpen(false)}>
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
                    pt: 4,
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
                        alt={otherUser?.name.charAt(0).toUpperCase()}
                        src={otherUser?.photoURL}
                        sx={{
                            bgcolor: mode === 'light' ? deepDark : light,
                            color: mode === 'light' ? light : deepDark,
                            height: 150,
                            width: 150,
                            border: '2px solid',
                        }}
                    >
                        {otherUser?.name.charAt(0).toUpperCase()}
                    </Avatar>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        flexDirection: 'column',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            alignItems: 'end',
                        }}
                    >
                        <Typography
                            variant="subtitle1"
                            sx={{
                                mr: 1,
                                color: mode === 'light' ? deepDark : light,
                            }}
                        >
                            Name -
                        </Typography>
                        <Chip
                            sx={{
                                fontSize: '1rem',
                            }}
                            label={otherUser?.name}
                            color="success"
                            size="medium"
                        />
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            alignItems: 'end',
                            mt: 2,
                        }}
                    >
                        <Typography
                            variant="subtitle1"
                            sx={{
                                mt: 2,
                                mr: 1,
                                color: mode === 'light' ? deepDark : light,
                            }}
                        >
                            Username -
                        </Typography>
                        <Chip
                            sx={{
                                fontSize: '1rem',
                            }}
                            label={otherUser?.username}
                            color="success"
                            size="medium"
                        />
                    </Box>
                </Box>
            </Box>
            {(otherUser?.socialLinks?.twitter !== '' ||
                otherUser?.socialLinks?.instagram !== '') && (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        width: '100%',
                        mb: 2,
                    }}
                >
                    <TwitterIcon
                        sx={{
                            color: mode === 'light' ? deepDark : light,
                            fontSize: '2rem',
                            mr: 2,
                            cursor: 'pointer',
                        }}
                        onClick={() => {
                            window.open(otherUser?.socialLinks?.twitter, '_blank');
                        }}
                    />
                    <InstagramIcon
                        sx={{
                            color: mode === 'light' ? deepDark : light,
                            fontSize: '2rem',
                            mr: 1,
                            cursor: 'pointer',
                        }}
                        onClick={() => {
                            window.open(otherUser?.socialLinks?.instagram, '_blank');
                        }}
                    />
                </Box>
            )}
        </Box>
    );
};

export default ProfileInfo;
