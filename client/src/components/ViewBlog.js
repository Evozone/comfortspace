import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import TwitterIcon from '@mui/icons-material/Twitter';

import { bluegrey, light, medium } from '../utils/colors';
import { notifyAction } from '../actions/actions';

function ViewBlog({ mode }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const blogId = params.id;
    const author = useSelector((state) => state.auth);
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            const { data } = await axios.get(
                `${process.env.REACT_APP_SERVER_URL}/api/blog/get/${blogId}`
            );
            setBlog(data.result);
        };
        fetchBlog();
    }, [blogId]);

    const deleteBlog = async () => {
        const choice = window.confirm('Are you sure you want to delete?');
        if (!choice) return;
        const auth = window.localStorage.getItem('healthApp');
        const { dnd } = JSON.parse(auth);
        try {
            await axios({
                method: 'DELETE',
                url: `${process.env.REACT_APP_SERVER_URL}/api/blog/delete/${blogId}`,
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${dnd}`,
                },
            });
            dispatch(
                notifyAction(true, 'success', 'Blog deleted successfully!')
            );
            navigate('/blogs');
        } catch (error) {
            console.log(error);
            dispatch(
                notifyAction(
                    true,
                    'error',
                    'Sorry :( but something went wrong!'
                )
            );
        }
    };

    const editBlog = () => {
        navigate(`/editBlog/${blogId}`, {
            state: {
                blog,
            },
        });
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
                pt: 2,
            }}
        >
            <Card>
                <CardMedia
                    component='img'
                    alt='green iguana'
                    height='350px'
                    image={blog?.cover}
                />
                <CardContent
                    sx={{
                        p: 4,
                    }}
                >
                    <Typography
                        sx={{ textAlign: 'center' }}
                        gutterBottom
                        variant='h3'
                        component='div'
                    >
                        {blog?.title}
                    </Typography>
                    <Typography
                        variant='subtitle1'
                        color='textSecondary'
                        sx={{
                            mb: 2,
                            textAlign: 'center',
                        }}
                    >
                        by{' '}
                        {`${blog?.authorName}  on   ${
                            blog?.createdAt.split('T')[0]
                        }`}
                    </Typography>
                    <div
                        className='content'
                        style={{ wordBreak: 'break-word' }}
                        dangerouslySetInnerHTML={{ __html: blog?.content }}
                    />
                </CardContent>
                <CardActions sx={{ px: 3, pb: 3 }}>
                    <Stack direction='row' spacing={1}>
                        <IconButton
                            onClick={() =>
                                window.open(
                                    `https://web.whatsapp.com/send?text=Heres the blog link ${window.location.href}`,
                                    '_blank'
                                )
                            }
                            color='success'
                            aria-label='WhatsAppIcon'
                        >
                            <WhatsAppIcon />
                        </IconButton>
                        <IconButton
                            onClick={() =>
                                window.open(
                                    `mailto:?body=Heres%the%blog%link%${window.location.href}`,
                                    '_blank'
                                )
                            }
                            aria-label='EmailIcon'
                            color='primary'
                        >
                            <EmailIcon />
                        </IconButton>
                        <IconButton
                            onClick={() =>
                                window.open(
                                    `https://twitter.com/intent/tweet/?url=${window.location.href}&text=Heres the blog link-`,
                                    '_blank'
                                )
                            }
                            color='primary'
                            aria-label='TwitterIcon'
                        >
                            <TwitterIcon />
                        </IconButton>
                    </Stack>
                    {blog?.authorId === author.uid && (
                        <>
                            <Button
                                variant='contained'
                                disableElevation
                                color='error'
                                onClick={deleteBlog}
                                size='small'
                                sx={{
                                    p: '6px',
                                    mx: '1rem',
                                    font: '500 0.9rem Poppins, sans-serif',
                                }}
                            >
                                Delete
                            </Button>
                            <Button
                                color='success'
                                disableElevation
                                onClick={editBlog}
                                sx={{
                                    backgroundColor:
                                        mode === 'light' ? medium : light,
                                    color: bluegrey,
                                    font: '500 0.9rem Poppins, sans-serif',
                                    ':hover': {
                                        backgroundColor: medium,
                                        color: 'black',
                                    },
                                }}
                                variant='contained'
                            >
                                Edit Blog
                            </Button>
                        </>
                    )}
                </CardActions>
            </Card>
        </Box>
    );
}

export default ViewBlog;
