import {
    NOTIFY,
    SIGN_IN,
    SIGN_OUT,
    START_LOADING,
    STOP_LOADING,
} from './types';
import { AuthState } from '../reducers/authReducer';

export const notifyAction = (open: boolean, severity: string, message: string) => {
    return {
        type: NOTIFY,
        payload: {
            open,
            severity,
            message,
        },
    };
};

export const signInAction = (
    isSignedIn: boolean,
    uid: string | null,
    email: string | null,
    name: string | null,
    photoURL: string | null,
    username: string | null,
    socialLinks: { twitter: string; instagram: string } | null,
    token: string | null
) : { type: string, payload: AuthState }  => {
    return {
        type: SIGN_IN,
        payload: {
            isSignedIn,
            uid,
            email,
            name,
            photoURL,
            username,
            socialLinks,
            token,
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
