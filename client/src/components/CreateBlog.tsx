import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { v4 as uuid } from 'uuid';

import {
    bluegrey,
    richBlack,
    light,
    medium,
    deepDark,
    superLight,
} from '../utils/colors';
import storage from '../appwrite';
import { notifyAction } from '../actions/actions';

const CreateBlog = ({ mode }: { mode: string }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [summary, setSummary] = useState<string>('');
    const [buttonStatus, setButtonStatus] = useState<boolean>(false);
    const [uploadStatus, setUploadStatus] = useState<string | null>(null);
    const [coverUrl, setCoverUrl] = useState<string | null>(null);

    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
            ['link', 'image'],
            ['clean'],
        ],
    };

    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            if (!event.target.files[0].type.match('image.*')) {
                alert('Please select an image');
                return;
            }
            setUploadStatus('Uploading...');
            const id = uuid();
            const bucketId = process.env.REACT_APP_APPWRITE_BUCKET_ID;
            await storage.createFile(bucketId || '', id, event.target.files[0]);
            const result = storage.getFilePreview(bucketId || '', id);
            setUploadStatus('Uploaded successfully ✅');
            setCoverUrl(result.href);
            setButtonStatus(false);
        }
    };

    const createNewPost = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!title || !content || !summary) {
            alert('Please fill all the text fields');
            return;
        }
        if (!coverUrl) {
            alert('Please upload a cover image');
            return;
        }
        if (summary.length > 55) {
            alert('Summary should be less than 55 characters');
            return;
        }
        const auth = window.localStorage.getItem('healthApp');
        const { dnd } = JSON.parse(auth || '');
        const data = {
            title,
            summary,
            content,
            cover: coverUrl,
        };
        try {
            const response = await axios({
                method: 'POST',
                url: `${process.env.REACT_APP_SERVER_URL}/api/blog`,
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${dnd}`,
                },
                data,
            });
            dispatch(notifyAction(true, 'success', 'Created a new Blog successfully!'));
            navigate(`/blog/${response.data.result._id}`);
        } catch (error) {
            console.log(error);
            dispatch(
                notifyAction(
                    true,
                    'error',
                    'It seems something is wrong, please log out and log in again. later :('
                )
            );
        }
    };

    return (
        <Box
            sx={{
                overflowY: 'auto',
                mt: '75px',
                height: 'calc(100vh - 75px)',
                maxHeight: 'calc(100vh - 75px)',
                backgroundColor: mode === 'light' ? light : bluegrey,
                padding: '5rem',
                pt: 0,
            }}
        >
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
                    variant="h3"
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        my: 2,
                        mb: 4,
                        color: mode === 'light' ? deepDark : light,
                        padding: '0',
                        fontWeight: '600',
                        fontSize: '2.5rem',
                    }}
                >
                    <DriveFileRenameOutlineIcon sx={{ fontSize: '2.5rem', mr: 1 }} />
                    Create a Blog
                </Typography>
                <form onSubmit={createNewPost}>
                    <TextField
                        fullWidth
                        required
                        id="outlined-required"
                        label="Title"
                        value={title}
                        color="success"
                        onChange={(e) => setTitle(e.target.value)}
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
                    <TextField
                        fullWidth
                        required
                        id="outlined-required"
                        label="Summary (max 55 characters)"
                        value={summary}
                        color="success"
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
                        <label
                            htmlFor="cover"
                            style={{
                                fontSize: '1.1rem',
                                fontWeight: '500',
                                color:
                                    mode === 'light'
                                        ? deepDark.concat('aa')
                                        : light.concat('aa'),
                            }}
                        >
                            Choose cover image -{' '}
                        </label>
                        <input
                            style={{
                                marginLeft: '5px',
                                padding: '7px',
                                backgroundColor:
                                    mode === 'light' ? 'whitesmoke' : richBlack,
                                borderRadius: '6px',
                                border: `1px solid ${deepDark.concat('a4')}`,
                            }}
                            title="cover"
                            placeholder="Cover"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        {uploadStatus && (
                            <Typography
                                variant="body1"
                                sx={{
                                    textAlign: 'center',
                                    ml: 1,
                                }}
                            >
                                {uploadStatus}
                            </Typography>
                        )}
                    </Box>
                    <ReactQuill
                        theme="snow"
                        modules={modules}
                        value={content}
                        onChange={(newValue) => setContent(newValue)}
                        style={{
                            backgroundColor: mode === 'light' ? 'whitesmoke' : richBlack,
                            borderRadius: '6px',
                            marginBottom: '24px',
                        }}
                    />
                    <Button
                        color="success"
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
                        variant="contained"
                        type="submit"
                        disabled={buttonStatus}
                    >
                        Create Post
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default CreateBlog;
