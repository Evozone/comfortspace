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
import Exam from './components/Exam';
import LandingPage from './components/LandingPage';
import ProtectedRoute from './components/ProtectedRoute';

import Groups2Icon from '@mui/icons-material/Groups2';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import FavoriteIcon from '@mui/icons-material/Favorite';
import QuizIcon from '@mui/icons-material/Quiz';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LogoutIcon from '@mui/icons-material/Logout';
import { CustomSwitcherGroup, CustomSwitcherButton } from './components/CustomSwitcher';

import { richBlack, light, medium, dark, deepDark } from './components/colors';

function App() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const localTheme = window.localStorage.getItem('healthAppTheme');

    const [mode, setMode] = useState(localTheme ? localTheme : 'light');
    const [page, setPage] = useState(`${window.location.pathname.split('/')[1]}`);

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


    const handlePageChange = (event, page) => {
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
                        position: 'fixed',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        bgcolor: mode === 'light' ? medium : richBlack,
                        boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.5)',
                        color: 'white',
                        zIndex: '1000',
                        padding: '7px',
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
                    <CustomSwitcherGroup
                        value={page}
                        onChange={handlePageChange}
                        exclusive
                    >
                        <CustomSwitcherButton value="home">
                            <Groups2Icon /> Spaces
                        </CustomSwitcherButton>
                        <CustomSwitcherButton value="blogs">
                            <LibraryBooksIcon /> Blogs
                        </CustomSwitcherButton>
                        <CustomSwitcherButton value="resources">
                            <FavoriteIcon /> Resources
                        </CustomSwitcherButton>
                        <CustomSwitcherButton value="exam">
                            <QuizIcon /> Take a Test
                        </CustomSwitcherButton>
                    </CustomSwitcherGroup>


                    {/* Sign out */}
                    <IconButton
                        onClick={() => { handleSignOut() }}
                    >
                        <LogoutIcon sx={{ color: mode === 'light' ? deepDark : light }} />
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
                <Route
                    path='/exam'
                    element={
                        // <ProtectedRoute>
                        <Exam themeChange={themeChange} mode={mode} />
                        // </ProtectedRoute>
                    }
                />
            </Routes>
        </ThemeProvider >
    );
}

export default App;
