import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import axios from 'axios';
import { useNavigate, useParams } from 'react-router';

import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import TwitterIcon from '@mui/icons-material/Twitter';

import {
    bluegrey,
    richBlack,
    black,
    light,
    medium,
    dark,
    deepDark,
} from './colors';
import { useSelector } from 'react-redux';

import { customGlobalScrollBars, smoothScrolling } from './CustomGlobalCSS';

function ViewBlog({ mode }) {
    const [blog, setBlog] = useState(null);

    const params = useParams();
    const blogId = params.id;
    const navigate = useNavigate();

    const author = useSelector((state) => state.auth);

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
        await axios.delete(
            `${process.env.REACT_APP_SERVER_URL}/api/blog/delete/${blogId}/${author.uid}`
        );
        navigate('/blogs');
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
            <Card>
                <CardMedia
                    component='img'
                    alt='green iguana'
                    height='350px'
                    image={blog?.cover}
                    sx={{
                        objectFit: 'fill',
                    }}
                />
                <CardContent
                    sx={{
                        p: 4,
                    }}
                >
                    <Typography
                        sx={{ textAlign: 'center' }}
                        gutterBottom
                        variant='h2'
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
                    {/* <Typography variant='body1' color='text'>
                        {blog?.content}
                    </Typography> */}
                    <div
                        className='content'
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
                                    `https://twitter.com/intent/tweet?text=Heres%the%blog%link%${window.location.href}`,
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
                        <Button color='error' onClick={deleteBlog} size='small'>
                            Delete
                        </Button>
                    )}
                </CardActions>
            </Card>
        </Box>
    );
}

export default ViewBlog;
