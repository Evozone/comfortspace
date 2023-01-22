import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { v4 as uuid } from 'uuid';

import {
    bluegrey,
    richBlack,
    black,
    light,
    medium,
    dark,
    deepDark,
    superLight,
} from './colors';

import { Button, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

import storage from '../appwrite';
import { customGlobalScrollBars, smoothScrolling } from './CustomGlobalCSS';

function CreateBlog({ mode }) {
    const navigate = useNavigate();

    const author = useSelector((state) => state.auth);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [summary, setSummary] = useState('');
    const [uploadStatus, setUploadStatus] = useState(null);
    const [coverUrl, setCoverUrl] = useState(null);

    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [
                { list: 'ordered' },
                { list: 'bullet' },
                { indent: '-1' },
                { indent: '+1' },
            ],
            ['link', 'image'],
            ['clean'],
        ],
    };

    const handleImageChange = async (e) => {
        if (e.target.files[0]) {
            if (!e.target.files[0].type.match('image.*')) {
                alert('Please select an image');
                return;
            }
            setUploadStatus('Uploading...');
            const id = uuid();
            await storage.createFile(
                process.env.REACT_APP_APPWRITE_BUCKET_ID,
                id,
                e.target.files[0]
            );

            const result = storage.getFilePreview(
                process.env.REACT_APP_APPWRITE_BUCKET_ID,
                id
            );
            setUploadStatus('Uploaded successfully');
            setCoverUrl(result.href);
        }
    };

    const createNewPost = async (e) => {
        e.preventDefault();
        if (!title || !content || !summary) {
            alert('Please fill all the text fields');
            return;
        }

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            title,
            summary,
            content,
            cover: coverUrl,
            authorId: author.uid,
            authorName: author.name,
            authorUsername: author.username,
        };

        const response = await axios.post(
            `${process.env.REACT_APP_SERVER_URL}/api/blog/create`,
            config
        );
        console.log(response);
        if (response.data.success) {
            navigate('/blogs');
        } else {
            alert('Something went wrong, please try again');
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                backgroundColor: mode === 'light' ? light : bluegrey,
                color: 'text.primary',
                p: '5rem',
            }}
        >
            {customGlobalScrollBars(mode)}
            {smoothScrolling()}
            <Paper
                sx={{
                    p: 2,
                    mt: 2,
                    backgroundColor: mode === 'light' ? superLight : richBlack,
                    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.3)',
                    border: mode === 'light' ? 'none' : `1px solid ${light}`,
                    borderRadius: '15px',
                }}
            >
                <Typography variant='h3'
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        my: 2,
                        mb: 4,
                        color:
                            mode === 'light'
                                ? deepDark
                                : light,
                        padding: '0',
                        fontFamily: 'Poppins',
                        fontWeight: '600',
                        fontSize: '2.5rem',
                    }}>
                    <DriveFileRenameOutlineIcon sx={{ fontSize: '2.5rem', mr: 1 }} />
                    Create a Blog
                </Typography>
                <form onSubmit={createNewPost}>
                    <TextField
                        fullWidth
                        required
                        id='outlined-required'
                        label='Title'
                        value={title}
                        color='success'
                        onChange={(e) => setTitle(e.target.value)}
                        sx={{
                            fontFamily: 'Poppins, Work Sans',
                            backgroundColor: mode === 'light' ? 'whitesmoke' : richBlack,
                            borderRadius: '6px',
                            mb: 3,
                            '& .MuiInputBase-input': {
                                p: 1,
                            },
                            '& .MuiInputLabel-root': {
                                top: -5,
                                fontSize: '0.9rem',
                            },
                        }}
                    />
                    <TextField
                        fullWidth
                        required
                        id='outlined-required'
                        label='Summary (max 55 characters)'
                        value={summary}
                        color='success'
                        onChange={(e) => setSummary(e.target.value)}
                        sx={{
                            backgroundColor: mode === 'light' ? 'whitesmoke' : richBlack,
                            borderRadius: '6px',
                            mb: 3,
                            '& .MuiInputBase-input': {
                                p: 1,
                            },
                            '& .MuiInputLabel-root': {
                                top: -5,
                                fontSize: '0.9rem',
                            },
                        }}
                    />
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            mb: 3,
                        }}
                    >
                        <label htmlFor='cover'
                            style={{
                                fontSize: '1.1rem',
                                fontWeight: '500',
                                color:
                                    mode === 'light'
                                        ? deepDark.concat('aa')
                                        : light.concat('aa'),
                            }}

                        >Choose cover image - </label>
                        <input
                            style={{
                                marginLeft: '5px',
                                padding: '7px',
                                backgroundColor: mode === 'light' ? 'whitesmoke' : richBlack,
                                borderRadius: '6px',
                                border: `1px solid ${deepDark.concat('a4')}`,
                            }}
                            title='cover'
                            placeholder='Cover'
                            type='file'
                            accept='image/*'
                            onChange={handleImageChange}
                        />
                        {uploadStatus && (
                            <Typography
                                variant='body1'
                                sx={{
                                    textAlign: 'center',
                                    mb: 3,
                                }}
                            >
                                {uploadStatus}
                            </Typography>
                        )}
                    </Box>

                    <ReactQuill
                        theme='snow'
                        modules={modules}
                        value={content}
                        onChange={(newValue) => setContent(newValue)}
                        sx={{
                            backgroundColor: mode === 'light' ? 'whitesmoke' : richBlack,
                            borderRadius: '6px',
                            mb: 3,
                            '& .ql-editor': {
                                p: 1,
                            },
                            '& .ql-container': {
                                p: 1,
                            },
                        }}
                    />

                    <Button
                        color='success'
                        sx={{
                            mt: 3,
                            backgroundColor: mode === 'light' ? medium : light,
                            color: bluegrey,
                            font: '500 0.9rem Poppins, sans-serif',
                            ':hover': {
                                backgroundColor: medium,
                                color: 'black',
                            },
                        }}
                        variant='contained'
                        type='submit'
                    >
                        Create Post
                    </Button>
                </form>
            </Paper>
        </Box>
    );
}

export default CreateBlog;
