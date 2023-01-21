import React, { useState, useRef } from 'react';
import { Button } from '@mui/material';
import { Google } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

import { useDispatch } from 'react-redux';
import { signInAction } from '../actions/actions';

const GoogleOneTapLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const googleButton = useRef(null);

    const [displayType, setDisplayType] = useState('flex');
    const [gBtnDisplay, setGBtnDisplay] = useState('none');

    const handleResponse = async (response) => {
        const token = response.credential;
        const {
            sub: uid,
            email,
            name,
            picture: photoURL,
            iat: signInTime,
        } = jwtDecode(token);
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
                    token,
                    signInTime,
                    username,
                },
                config
            )
            .then((res) => {
                console.log(res);
                dispatch(
                    signInAction(
                        uid,
                        email,
                        name,
                        photoURL,
                        token,
                        signInTime,
                        username
                    )
                );
                navigate('/home');
            })
            .catch((err) => {
                console.log(err);
                alert('Something went wrong, please try again later.');
            });
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
            window.google.accounts.id.prompt((notification) => {
                if (notification.isNotDisplayed()) {
                    setDisplayType('none');
                    setGBtnDisplay('flex');
                    alert('Please allow Third Party Cookies');
                }
                if (
                    notification.isSkippedMoment() ||
                    notification.isDismissedMoment()
                ) {
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
                variant='contained'
                startIcon={<Google />}
                sx={{
                    display: displayType,
                    width: 'fit-content',
                    mt: 3,
                    backgroundColor: '#335145',
                    '&:hover': {
                        color: '#fff',
                        backgroundColor: '#0D1A0B99',
                    },
                }}
                onClick={handleGoogleLogIn}
            >
                Login with Google
            </Button>
            <div style={{ display: gBtnDisplay }} ref={googleButton}></div>
        </React.Fragment>
    );
};

export default GoogleOneTapLogin;
