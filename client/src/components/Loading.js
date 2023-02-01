import { Backdrop, CircularProgress } from '@mui/material';
import React from 'react';

import { useSelector } from 'react-redux';

const Loading = () => {
    const loading = useSelector((state) => state.loading.isVisible);
    return (
        <Backdrop
            open={loading}
            sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}
        >
            <CircularProgress
                sx={{ color: 'white' }}
                data-testid='loading-spinner'
            />
        </Backdrop>
    );
};

export default Loading;
