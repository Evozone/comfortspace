import React, { useState, useRef } from 'react';
import { Button } from '@mui/material';
import { Google } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

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
        dispatch(
            signInAction(
                uid,
                email,
                name,
                photoURL,
                token,
                signInTime,
                email.split('@')[0]
            )
        );
        navigate('/home');
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
                    backgroundColor: '#03256C',
                    '&:hover': {
                        color: '#fff',
                        backgroundColor: '#03256C99',
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
