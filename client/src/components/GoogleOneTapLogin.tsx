import React, { useState, useRef } from 'react';
import { Button, Typography } from '@mui/material';
import { Google } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

import { useDispatch } from 'react-redux';
import { signInAction, startLoadingAction, stopLoadingAction } from '../actions/actions';

import { light, deepDark } from '../utils/colors';

declare global {
    interface Window {
        google: any;
    }
}

const GoogleOneTapLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const googleButton = useRef<HTMLDivElement>(null);

    const [displayType, setDisplayType] = useState<string>('flex');
    const [gBtnDisplay, setGBtnDisplay] = useState<string>('none');

    const handleResponse = async (response: { credential: {} }) => {
        dispatch(startLoadingAction());
        const token = response.credential as string;
        const {
            sub: uid,
            email,
            name,
            picture: photoURL,
        } = jwtDecode(token) as {
            sub: string;
            email: string;
            name: string;
            picture: string;
        };
        const username = email.split('@')[0];
        const config = {
            headers: {
                'Content-type': 'application/json',
            },
        };
        await axios
            .post(
                `${process.env.REACT_APP_SERVER_URL}/api/user/googleSignUp`,
                {
                    uid,
                    email,
                    name,
                    photoURL,
                    username,
                    socialLinks: {
                        twitter: '',
                        instagram: '',
                    },
                },
                config
            )
            .then((result) => {
                const user = result.data.result;
                dispatch(
                    signInAction(
                        true,
                        user.uid,
                        user.email,
                        user.name,
                        user.photoURL,
                        user.username,
                        user.socialLinks,
                        user.token
                    )
                );
                window.localStorage.setItem('healthAppLastPage', 'groups');
                navigate('/groups');
            })
            .catch((error) => {
                console.log(error);
                alert('Something went wrong, please try again later.');
            });
        dispatch(stopLoadingAction());
    };

    const handleGoogleLogIn = () => {
        try {
            window.google.accounts.id.initialize({
                client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
                ux_mode: 'popup',
                callback: handleResponse,
            });
            window.google.accounts.id.renderButton(googleButton.current, {
                theme: 'filled_blue',
                size: 'large',
                width: 280,
                text: 'continue_with',
            });
            window.google.accounts.id.prompt((notification: any) => {
                if (notification.isNotDisplayed()) {
                    setDisplayType('none');
                    setGBtnDisplay('flex');
                    alert('Please allow Third Party Cookies');
                }
                if (notification.isSkippedMoment() || notification.isDismissedMoment()) {
                    setDisplayType('none');
                    setGBtnDisplay('flex');
                }
            });
        } catch (error) {
            alert('Log In Failed. Please try again');
        }
    };

    return (
        <React.Fragment>
            <Button
                variant="contained"
                startIcon={<Google />}
                sx={{
                    display: displayType,
                    width: 'fit-content',
                    mt: 3,
                    backgroundColor: light,
                    color: deepDark,
                    '&:hover': {
                        color: '#fff',
                        backgroundColor: deepDark,
                    },
                }}
                onClick={handleGoogleLogIn}
            >
                <Typography
                    sx={{
                        fontFamily: 'Poppins',
                        fontWeight: 600,
                    }}
                >
                    Login with Google
                </Typography>
            </Button>
            <div style={{ display: gBtnDisplay }} ref={googleButton}></div>
        </React.Fragment>
    );
};

export default GoogleOneTapLogin;
