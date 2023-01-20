import { SIGN_IN, SIGN_OUT } from './types';

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
