import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

import {
    bluegrey,
    richBlack,
    light,
    medium,
    deepDark,
    superLight,
} from './colors';
import { useLocation } from 'react-router';

import { Button, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

import { customGlobalScrollBars, smoothScrolling } from './CustomGlobalCSS';

function EditBlog({ mode }) {
    const location = useLocation();
    const navigate = useNavigate();

    const author = useSelector((state) => state.auth);
    const blog = location.state.blog;

    const oldTitle = blog.title;
    const oldContent = blog.content;
    const oldSummary = blog.summary;
    const [title, setTitle] = useState(blog.title);
    const [content, setContent] = useState(blog.content);
    const [summary, setSummary] = useState(blog.summary);

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

    const editPost = async (e) => {
        e.preventDefault();
        if (!title || !content || !summary) {
            alert('Please fill all the text fields');
            return;
        }
        if (
            title === oldTitle &&
            content === oldContent &&
            summary === oldSummary
        ) {
            alert('No changes made');
            return;
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            title,
            content,
            summary,
            authorId: author.uid,
        };
        await axios.patch(
            `${process.env.REACT_APP_SERVER_URL}/api/blog/edit/${blog._id}`,
            config
        );
        navigate(`/blog/${blog._id}`);
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
                <Typography
                    variant='h3'
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        my: 2,
                        mb: 4,
                        color: mode === 'light' ? deepDark : light,
                        padding: '0',
                        fontFamily: 'Poppins',
                        fontWeight: '600',
                        fontSize: '2.5rem',
                    }}
                >
                    <DriveFileRenameOutlineIcon
                        sx={{ fontSize: '2.5rem', mr: 1 }}
                    />
                    Create a Blog
                </Typography>
                <form onSubmit={editPost}>
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
                            backgroundColor:
                                mode === 'light' ? 'whitesmoke' : richBlack,
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
                            backgroundColor:
                                mode === 'light' ? 'whitesmoke' : richBlack,
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
                    <ReactQuill
                        theme='snow'
                        modules={modules}
                        value={content}
                        onChange={(newValue) => setContent(newValue)}
                        sx={{
                            backgroundColor:
                                mode === 'light' ? 'whitesmoke' : richBlack,
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
                        Save Changes
                    </Button>
                </form>
            </Paper>
        </Box>
    );
}

export default EditBlog;
