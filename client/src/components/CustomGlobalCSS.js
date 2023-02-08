import GlobalStyles from '@mui/material/GlobalStyles';

import { bluegrey, light, dark, deepDark } from '../utils/colors';

export const customGlobalScrollBars = (mode) => {
    const component = (
        <GlobalStyles
            styles={{
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
                    border:
                        mode === 'dark'
                            ? `3px solid ${bluegrey}`
                            : `3px solid ${light}`,
                },
                '*::-webkit-scrollbar-thumb:hover': {
                    backgroundColor: mode === 'dark' ? dark : deepDark,
                },
            }}
        />
    );

    return component;
};

export const smoothScrolling = () => {
    const component = (
        <GlobalStyles
            styles={{
                html: {
                    scrollBehavior: 'smooth',
                },
            }}
        />
    );

    return component;
};
