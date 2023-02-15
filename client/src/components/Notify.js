import { Alert, Snackbar, Slide } from '@mui/material';
import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { notifyAction } from '../actions/actions';

const Notify = () => {
    const dispatch = useDispatch();
    const notify = useSelector((state) => state.notify);
    const handleClose = (e, reason) => {
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
            TransitionComponent={(props) => (
                <Slide {...props} direction='down' />
            )}
        >
            <Alert
                onClose={handleClose}
                severity={notify.severity}
                sx={{ borderRadius: '5px' }}
                variant='filled'
                elevation={6}
            >
                {notify.message}
            </Alert>
        </Snackbar>
    );
};

export default Notify;
