import React, { SyntheticEvent } from 'react';
import Alert, { AlertColor } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';

import { useSelector, useDispatch } from 'react-redux';
import { notifyAction } from '../actions/actions';

const Notify = () => {
    const dispatch = useDispatch();
    const notify = useSelector(
        (state: {
            notify: { open: boolean; severity: AlertColor | undefined; message: string };
        }) => state.notify
    );
    const handleClose = (event: Event | SyntheticEvent<any, Event>, reason?: string) => {
        if (reason === 'clickaway') return;
        dispatch(notifyAction(false, 'info', ''));
    };

    return (
        <Snackbar
            open={notify.open}
            autoHideDuration={4000}
            onClose={handleClose}
            sx={{
                top: '10% !important',
                maxWidth: '400px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            TransitionComponent={(props) => <Slide {...props} direction="down" />}
        >
            <Alert
                onClose={handleClose}
                severity={notify.severity}
                sx={{ borderRadius: '5px' }}
                variant="filled"
                elevation={6}
            >
                {notify.message}
            </Alert>
        </Snackbar>
    );
};

export default Notify;
