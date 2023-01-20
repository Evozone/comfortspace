import { SIGN_IN, SIGN_OUT } from './types';
import axios from "axios";

export const signInAction = async(uid, email, name, photoURL, token, signInTime) => {
    const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const username=email.split('@')[0];
      const { data } = await axios.post(
        "http://localhost:5000/api/user/googleSignUp",
        {
            uid, email, name, photoURL, token, signInTime,username
        },
        config
      );
    //   console.log(data);
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
