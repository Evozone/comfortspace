import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { styled } from '@mui/material/styles';

import { richBlack, light, medium, dark, deepDark } from './colors';

export const CustomSwitcherGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'light' ? deepDark : light,
    borderRadius: '50px',
    '& .MuiToggleButtonGroup-grouped': {
        margin: 0,
        border: 0,
        borderRadius: '50px',
        padding: '10px 15px',
        width: '150px',
        '&:not(:first-of-type)': {
            borderRadius: '50px',
            border: `6px solid ${theme.palette.mode === 'light' ? deepDark : light}`,
        },
        '&:first-of-type': {
            borderRadius: '50px',
            border: `6px solid ${theme.palette.mode === 'light' ? deepDark : light}`,
        },
    },
    '& .MuiToggleButton-root': {
        outline: 'none',
        borderRadius: '50px',
        backgroundColor: theme.palette.mode === 'light' ? light : medium,
        color: richBlack,
        font: '600 0.8rem Poppins, sans-serif',

        '&:hover': {
            backgroundColor: theme.palette.mode === 'light' ? medium : dark,
            color: 'black',
            transition: 'all 0.2s ease-in-out',
        },

        '&.Mui-selected': {
            backgroundColor: theme.palette.mode === 'light' ? dark : deepDark,
            color: 'white',

            '&:hover': {
                backgroundColor: theme.palette.mode === 'light' ? dark : deepDark,
                color: 'white',
            }
        },
    },
}));

export const CustomSwitcherButton = styled(ToggleButton)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
}));
