import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { signInAction, signOutAction } from './actions/actions';
import Home from './components/Home';
import Blogs from './components/Blogs';
import Resources from './components/Resources';
import LandingPage from './components/LandingPage';
import ProtectedRoute from './components/ProtectedRoute';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LogoutIcon from '@mui/icons-material/Logout';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { maximumBlueGreen, mayaBlue, magnolia, darkJungleGreen, neonBlue } from './components/colors';

function App() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const localTheme = window.localStorage.getItem('healthAppTheme');

    const [mode, setMode] = useState(localTheme ? localTheme : 'light');
    const [page, setPage] = useState('home');

    const darkTheme = createTheme({
        palette: {
            mode: mode,
        },

        typography: {
            fontFamily: "'Open Sans', sans-serif",
        },
    });

    const themeChange = () => {
        const updatedTheme = mode === 'light' ? 'dark' : 'light';
        window.localStorage.setItem('healthAppTheme', updatedTheme);
        setMode(updatedTheme);
    };

    // const isSignedIn = useSelector((state) => state.auth.isSignedIn);
    const isSignedIn = true;

    useEffect(() => {
        const auth = window.localStorage.getItem('healthApp');
        if (auth) {
            const { dnd } = JSON.parse(auth);
            const {
                sub: uid,
                email,
                name,
                picture: photoURL,
                iat: signInTime,
            } = jwtDecode(dnd);
            dispatch(signInAction(uid, email, name, photoURL, dnd, signInTime));
            if (window.location.pathname === '/') {
                navigate('/home');
            }
        }
    }, []);


    const handlePageChange = (page) => () => {
        setPage(page);
        navigate(`/${page}`);
    };

    const handleSignOut = () => {
        const choice = window.confirm('Please click on OK to Log Out.');
        if (choice) {
            dispatch(signOutAction());
            navigate('/');
        }
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            {/* Top bar */}
            {isSignedIn &&
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: mode === 'light' ? neonBlue : darkJungleGreen,
                        color: 'white',
                        zIndex: '1000',
                        padding: '5px',
                    }}
                >
                    <IconButton
                        onClick={themeChange}
                        sx={{ color: 'white' }}
                        aria-label='change theme'
                    >
                        {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
                    </IconButton>

                    {/* Swticher between 3 pages */}
                    <ToggleButtonGroup
                        sx={{
                            backgroundColor: mode === 'light' ? mayaBlue : maximumBlueGreen,
                        }}
                    >
                        <ToggleButton value="home" onClick={handlePageChange('home')}>
                            Spaces
                        </ToggleButton>
                        <ToggleButton value="blogs" onClick={handlePageChange('blogs')}>
                            Blogs
                        </ToggleButton>
                        <ToggleButton value="resources" onClick={handlePageChange('resources')}>
                            Resources
                        </ToggleButton>
                    </ToggleButtonGroup>

                    {/* Sign out */}
                    <IconButton
                        onClick={() => { handleSignOut() }}
                    >
                        <LogoutIcon sx={{ color: darkJungleGreen }} />
                    </IconButton>
                </Box>}

            <Routes>
                <Route path='/' element={<LandingPage />} />
                <Route
                    path='/home'
                    element={
                        // <ProtectedRoute>
                        <Home themeChange={themeChange} mode={mode} />
                        // </ProtectedRoute>
                    }
                />
                <Route
                    path='/blogs'
                    element={
                        // <ProtectedRoute>
                        <Blogs themeChange={themeChange} mode={mode} />
                        // </ProtectedRoute>
                    }
                />
                <Route
                    path='/resources'
                    element={
                        // <ProtectedRoute>
                        <Resources themeChange={themeChange} mode={mode} />
                        // </ProtectedRoute>
                    }
                />
            </Routes>
        </ThemeProvider >
    );
}

export default App;
