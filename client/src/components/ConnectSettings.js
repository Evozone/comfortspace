import { useState } from 'react';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';

function ConnectSettings({ setConnectSettings, connectSettings }) {
    const [checkState, setCheckState] = useState({
        showNotifications: connectSettings.showNotifications,
        textContent: connectSettings.textContent,
        playSound: connectSettings.playSound,
        onlineStatus: connectSettings.onlineStatus,
        typingStatus: connectSettings.typingStatus,
    });

    const notificationPrompt = () => {
        Notification.requestPermission().then((result) => {
            if (result === 'granted') {
                const notification = new Notification('Comfort Space', {
                    body: 'You will be notified like this when you receive a new message',
                    icon: '/icon-192x192.png',
                    tag: 'example notification',
                });
                const audio = new Audio('/assets/audio/notification.mp3');
                checkState.playSound && audio.play();
                notification.onclick = () => {
                    window.focus();
                    audio.pause();
                };

                setCheckState({
                    ...checkState,
                    showNotifications: true,
                });
                setConnectSettings({
                    ...checkState,
                    showNotifications: true,
                });
                window.localStorage.setItem(
                    'connectSettings',
                    JSON.stringify({
                        ...checkState,
                        showNotifications: true,
                    })
                );
            } else {
                setCheckState({
                    ...checkState,
                    showNotifications: false,
                });
                setConnectSettings({
                    ...checkState,
                    showNotifications: false,
                });
                window.localStorage.setItem(
                    'connectSettings',
                    JSON.stringify({
                        ...checkState,
                        showNotifications: false,
                    })
                );
            }
        });
    };

    const handleCheckboxChange = (event) => {
        if (
            event.target.name === 'showNotifications' &&
            !checkState.showNotifications
        ) {
            notificationPrompt();
            return;
        }
        setCheckState({
            ...checkState,
            [event.target.name]: event.target.checked,
        });
        setConnectSettings({
            ...checkState,
            [event.target.name]: event.target.checked,
        });
        window.localStorage.setItem(
            'connectSettings',
            JSON.stringify({
                ...checkState,
                [event.target.name]: event.target.checked,
            })
        );
    };

    return (
        <Box sx={{ p: 3, pl: 4 }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <FormControlLabel
                    sx={{ mb: 2 }}
                    control={
                        <Checkbox
                            checked={checkState.showNotifications}
                            onChange={handleCheckboxChange}
                            color='success'
                            name='showNotifications'
                        />
                    }
                    label='Show notifications'
                />
                {checkState.showNotifications && (
                    <>
                        <FormControlLabel
                            sx={{ mb: 2 }}
                            control={
                                <Checkbox
                                    checked={checkState.textContent}
                                    onChange={handleCheckboxChange}
                                    color='success'
                                    name='textContent'
                                />
                            }
                            label='Show text content in notifications'
                        />
                        <FormControlLabel
                            sx={{ mb: 2 }}
                            control={
                                <Checkbox
                                    checked={checkState.playSound}
                                    onChange={handleCheckboxChange}
                                    color='success'
                                    name='playSound'
                                />
                            }
                            label='Play sound on notifications'
                        />
                    </>
                )}
                <FormControlLabel
                    sx={{ mb: 2 }}
                    control={
                        <Checkbox
                            checked={checkState.typingStatus}
                            onChange={handleCheckboxChange}
                            color='success'
                            name='typingStatus'
                        />
                    }
                    label='Show typing status'
                />
                <FormControlLabel
                    sx={{ mb: 2 }}
                    control={
                        <Checkbox
                            checked={checkState.onlineStatus}
                            onChange={handleCheckboxChange}
                            color='success'
                            name='onlineStatus'
                        />
                    }
                    label='Show online status'
                />
                <FormHelperText>
                    *Online status change will take effect once you refresh the
                    page or log out and log in again.
                </FormHelperText>
            </Box>
        </Box>
    );
}

export default ConnectSettings;
