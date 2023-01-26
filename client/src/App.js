import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Home from './components/Home';
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

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Routes>
                <Route path='/' element={<LandingPage />} />
                <Route
                    path='/home'
                    element={
                        <ProtectedRoute>
                            <HMSRoomProvider>
                                <MainAppbar
                                    themeChange={themeChange}
                                    mode={mode}
                                />
                                <Home themeChange={themeChange} mode={mode} />
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
                        <ProtectedRoute>
                            <MainAppbar themeChange={themeChange} mode={mode} />
                            <ViewBlog themeChange={themeChange} mode={mode} />
                        </ProtectedRoute>
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
