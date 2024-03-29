import React from 'react';
import Backdrop from '@mui/material/Backdrop';

import { useSelector } from 'react-redux';

const Loading = () => {
    const loading = useSelector(
        (state: { loading: { isVisible: boolean } }) => state.loading.isVisible
    );
    return (
        <Backdrop open={loading} sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}>
            <img
                data-testid="loading-spinner"
                style={{ alignSelf: 'center', width: '160px', height: '160px' }}
                src="/assets/vectors/page-loading-1.svg"
                alt=""
            />
        </Backdrop>
    );
};

export default Loading;
