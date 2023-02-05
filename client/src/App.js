import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Groups from './components/Groups';
import VoiceRoom from './components/VoiceRoom';
import Blogs from './components/Blogs';
import Resources from './components/Resources';
import Exam from './components/Exam';
import LandingPage from './components/LandingPage';
import ProtectedRoute from './components/ProtectedRoute';
import ViewBlog from './components/ViewBlog';
import CreateBlog from './components/CreateBlog';
import { HMSRoomProvider } from '@100mslive/hms-video-react';

import MainAppbar from './components/MainAppbar';
import Loading from './components/Loading';
import EditBlog from './components/EditBlog';
import Notify from './components/Notify';
import {
    customGlobalScrollBars,
    smoothScrolling,
} from './components/CustomGlobalCSS';
import { signInAction } from './actions/actions';

function App() {
    const localTheme = window.localStorage.getItem('healthAppTheme');

    const [mode, setMode] = useState(localTheme ? localTheme : 'light');

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

    const dispatch = useDispatch();
    const navigate = useNavigate();

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
            const value = window.localStorage.getItem('healthAppLastPage');
            if (value && value !== undefined) {
                navigate(`/${value}`);
            } else {
                navigate('/groups');
            }
        }
    }, []);

    return (
        <ThemeProvider theme={darkTheme}>
            {customGlobalScrollBars(mode)}
            {smoothScrolling()}
            <CssBaseline />
            <Loading />
            <Notify />
            <Routes>
                <Route path='/' element={<LandingPage />} />
                <Route
                    path='/groups'
                    element={
                        <ProtectedRoute>
                            <HMSRoomProvider>
                                <MainAppbar
                                    themeChange={themeChange}
                                    mode={mode}
                                />
                                <Groups themeChange={themeChange} mode={mode} />
                            </HMSRoomProvider>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/room/:id'
                    element={
                        <ProtectedRoute>
                            <HMSRoomProvider>
                                <MainAppbar
                                    themeChange={themeChange}
                                    mode={mode}
                                />
                                <VoiceRoom
                                    themeChange={themeChange}
                                    mode={mode}
                                />
                            </HMSRoomProvider>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/blogs'
                    element={
                        <ProtectedRoute>
                            <MainAppbar themeChange={themeChange} mode={mode} />
                            <Blogs themeChange={themeChange} mode={mode} />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/blog/:id'
                    element={
                        <>
                            <MainAppbar themeChange={themeChange} mode={mode} />
                            <ViewBlog themeChange={themeChange} mode={mode} />
                        </>
                    }
                />
                <Route
                    path='/createBlog'
                    element={
                        <ProtectedRoute>
                            <MainAppbar themeChange={themeChange} mode={mode} />
                            <CreateBlog themeChange={themeChange} mode={mode} />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/editBlog/:id'
                    element={
                        <ProtectedRoute>
                            <MainAppbar themeChange={themeChange} mode={mode} />
                            <EditBlog themeChange={themeChange} mode={mode} />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/resources'
                    element={
                        <ProtectedRoute>
                            <MainAppbar themeChange={themeChange} mode={mode} />
                            <Resources themeChange={themeChange} mode={mode} />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/exam'
                    element={
                        <ProtectedRoute>
                            <MainAppbar themeChange={themeChange} mode={mode} />
                            <Exam themeChange={themeChange} mode={mode} />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </ThemeProvider>
    );
}

export default App;
