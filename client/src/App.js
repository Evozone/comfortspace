import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
import Connect from './components/Connect';
import PersonalCall from './components/PersonalCall';

function App() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const localTheme = window.localStorage.getItem('healthAppTheme');

    const [mode, setMode] = useState(localTheme ? localTheme : 'light');

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

    const isSignedIn = useSelector((state) => state.auth.isSignedIn);

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
            if (location.pathname.includes('/connect/pc/')) {
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
                    }}
                />
            )}
            <Routes>
                <Route path='/' element={<LandingPage />} />
                <Route
                    path='/groups'
                    element={
                        <ProtectedRoute>
                            <HMSRoomProvider>
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
                            <CreateBlog themeChange={themeChange} mode={mode} />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/editBlog/:id'
                    element={
                        <ProtectedRoute>
                            <EditBlog themeChange={themeChange} mode={mode} />
                        </ProtectedRoute>
                    }
                />
                {/* <Route
                    path='/connect'
                    element={
                        <ProtectedRoute>
                            <MainAppbar themeChange={themeChange} mode={mode} />
                            <Resources themeChange={themeChange} mode={mode} />
                        </ProtectedRoute>
                    }
                /> */}
                <Route
                    path='/connect'
                    element={
                        <ProtectedRoute>
                            <Connect mode={mode} />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/connect/pc/:id'
                    element={
                        <ProtectedRoute>
                            <PersonalCall mode={mode} />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/exam'
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
