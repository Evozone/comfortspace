import {
    NOTIFY,
    SIGN_IN,
    SIGN_OUT,
    START_LOADING,
    STOP_LOADING,
} from './types';

export const notifyAction = (open, severity, message) => {
    return {
        type: NOTIFY,
        payload: {
            open,
            severity,
            message,
        },
    };
};

export const signInAction = (uid, email, name, photoURL, token, signInTime) => {
    return {
        type: SIGN_IN,
        payload: {
            uid,
            email,
            name,
            photoURL,
            token,
            signInTime,
        },
    };
};

export const signOutAction = () => {
    return {
        type: SIGN_OUT,
    };
};

export const startLoadingAction = () => {
    return {
        type: START_LOADING,
    };
};

export const stopLoadingAction = () => {
    return {
        type: STOP_LOADING,
    };
};
