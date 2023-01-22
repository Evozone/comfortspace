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
} from './colors';
import { Button, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

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
                }}
            >
                <Typography variant='h3' sx={{ textAlign: 'center', mb: 3 }}>
                    Create a Blog
                </Typography>
                <form onSubmit={createNewPost}>
                    <TextField
                        fullWidth
                        required
                        id='outlined-required'
                        label='Title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        sx={{
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
                        onChange={(e) => setSummary(e.target.value)}
                        sx={{
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
                    <label htmlFor='cover'>Add a cover Image - </label>
                    <input
                        style={{ marginBottom: 24 }}
                        title='cover'
                        placeholder='Cover'
                        type='file'
                        accept='image/*'
                        onChange={handleImageChange}
                    />
                    {uploadStatus && (
                        <Typography
                            variant='body1'
                            sx={{ textAlign: 'center', mb: 3 }}
                        >
                            {uploadStatus}
                        </Typography>
                    )}
                    <ReactQuill
                        theme='snow'
                        modules={modules}
                        value={content}
                        onChange={(newValue) => setContent(newValue)}
                    />
                    <Button
                        color='success'
                        sx={{
                            mt: 3,
                            backgroundColor: mode === 'light' ? medium : light,
                            color: 'black',
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
