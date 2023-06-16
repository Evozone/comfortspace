import React from 'react';
import jwtDecode from 'jwt-decode';
import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { HMSRoomProvider } from '@100mslive/hms-video-react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import type { PaletteMode } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

import MainAppbar from './components/MainAppbar';
import Loading from './components/Loading';
import Notify from './components/Notify';
import LandingPage from './components/LandingPage.js';
import ProtectedRoute from './components/ProtectedRoute.js';
import Exam from './components/Exam.js';

import Groups from './components/Groups.js';
import VoiceRoom from './components/VoiceRoom.js';

import Blogs from './components/Blogs.js';
import ViewBlog from './components/ViewBlog.js';
import CreateBlog from './components/CreateBlog.js';
import EditBlog from './components/EditBlog.js';

import Connect from './components/Connect.js';
import PersonalCall from './components/PersonalCall.js';

import { customGlobalScrollBars, smoothScrolling } from './components/CustomGlobalCSS';
import { signInAction } from './actions/actions';
import { AuthState } from './reducers/authReducer';

function App() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const localTheme = window.localStorage.getItem('healthAppTheme');

    const [mode, setMode] = useState<PaletteMode>(
        localTheme ? (localTheme as PaletteMode) : 'light'
    );
    const [supportsPWA, setSupportsPWA] = useState<boolean>(false);
    const [promptInstall, setPromptInstall] = useState<Event | null>(null);

    const darkTheme = createTheme({
        palette: {
            mode: mode,
        },
        typography: {
            fontFamily: ['Poppins', 'Work Sans', 'sans-serif'].join(','),
        },
    });

    const themeChange = () => {
        const updatedTheme = mode === 'light' ? 'dark' : 'light';
        window.localStorage.setItem('healthAppTheme', updatedTheme);
        setMode(updatedTheme);
    };

    const isSignedIn = useSelector((state: { auth: AuthState }) => state.auth.isSignedIn);

    useEffect(() => {
        const handler = (e: Event) => {
            e.preventDefault();
            setSupportsPWA(true);
            setPromptInstall(e);
        };
        window.addEventListener('beforeinstallprompt', handler);
        const token = window.localStorage.getItem('healthApp') as string;
        const auth = JSON.parse(token);
        if (auth?.isSignedIn) {
            const { dnd } = auth;
            const { uid, email, name, photoURL, username, socialLinks } = jwtDecode(
                dnd
            ) as AuthState;
            dispatch(
                signInAction(true, uid, email, name, photoURL, username, socialLinks, dnd)
            );
            if (
                location.pathname.includes('/connect/pc/') ||
                location.pathname.includes('/blog/')
            ) {
                navigate(location.pathname);
                return;
            }
            const value = window.localStorage.getItem('healthAppLastPage');
            if (value && value !== undefined) {
                navigate(`/${value}`);
            } else {
                navigate('/groups');
            }
        }
        return () => window.removeEventListener('transitionend', handler);
    }, []);

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Loading />
            <Notify />
            {customGlobalScrollBars(mode)}
            {smoothScrolling()}
            {isSignedIn && (
                <MainAppbar
                    {...{
                        themeChange,
                        mode,
                        supportsPWA,
                        promptInstall,
                    }}
                />
            )}
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route
                    path="/groups"
                    element={
                        <ProtectedRoute>
                            <HMSRoomProvider>
                                <Groups themeChange={themeChange} mode={mode} />
                            </HMSRoomProvider>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/room/:id"
                    element={
                        <ProtectedRoute>
                            <HMSRoomProvider>
                                <VoiceRoom themeChange={themeChange} mode={mode} />
                            </HMSRoomProvider>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/blogs"
                    element={
                        <ProtectedRoute>
                            <Blogs themeChange={themeChange} mode={mode} />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/blog/:id"
                    element={
                        <>
                            <MainAppbar
                                {...{
                                    themeChange,
                                    mode,
                                    supportsPWA,
                                    promptInstall,
                                }}
                            />
                            <ViewBlog themeChange={themeChange} mode={mode} />
                        </>
                    }
                />
                <Route
                    path="/createBlog"
                    element={
                        <ProtectedRoute>
                            <CreateBlog themeChange={themeChange} mode={mode} />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/editBlog/:id"
                    element={
                        <ProtectedRoute>
                            <EditBlog themeChange={themeChange} mode={mode} />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/connect"
                    element={
                        <ProtectedRoute>
                            <Connect mode={mode} />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/connect/pc/:id"
                    element={
                        <ProtectedRoute>
                            <PersonalCall mode={mode} />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/exam"
                    element={
                        <ProtectedRoute>
                            <Exam themeChange={themeChange} mode={mode} />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </ThemeProvider>
    );
}

export default App;
