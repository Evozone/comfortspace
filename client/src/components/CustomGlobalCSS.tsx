import React from 'react';
import { light, bluegrey, deepDark, dark } from '../utils/colors';
import GlobalStyles from '@mui/material/GlobalStyles';
import { CSSObject } from '@emotion/react';

export const customGlobalScrollBars = (mode: string): JSX.Element => {
    const styles = {
        '*::-webkit-scrollbar': {
            width: '0.6rem',
        },
        '*::-webkit-scrollbar-track': {
            backgroundColor: mode === 'dark' ? bluegrey : light,
            border: 'none',
        },
        '*::-webkit-scrollbar-thumb': {
            backgroundColor: mode === 'dark' ? deepDark : dark,
            borderRadius: '0.3rem',
            border: mode === 'dark' ? `3px solid ${bluegrey}` : `3px solid ${light}`,
        },
        '*::-webkit-scrollbar-thumb:hover': {
            backgroundColor: mode === 'dark' ? dark : deepDark,
        },
    };

    return <GlobalStyles styles={styles} />;
};

export const smoothScrolling = (): JSX.Element => {
    const styles: CSSObject = {
        html: {
            scrollBehavior: 'smooth',
        },
    };

    return <GlobalStyles styles={styles} />;
};
