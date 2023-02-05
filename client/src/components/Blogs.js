import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import ChromeReaderModeIcon from '@mui/icons-material/ChromeReaderMode';

import axios from 'axios';

import { useNavigate } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';

import {
    bluegrey,
    richBlack,
    black,
    light,
    medium,
    dark,
    deepDark,
} from './colors';
import { Tooltip } from '@mui/material';

function Blogs({ mode }) {
    const navigate = useNavigate();

    const [blogs, setBlogs] = useState(null);

    // const blogs = [
    //     {
    //         id: '63cba2b6e228e865d89c181e',
    //         title: 'The Beauty of Flowers',
    //         content:
    //             'Blog Content is also updated. This is a test blog post to see if the content is more than 60 words. The content should be unique and interesting to the readers. This is a test to check if the content is more than 60 words and also if it is unique and interesting.',
    //         cover: 'https://picsum.photos/400',
    //         authorId: '63caf7e256e281ca54a0d824',
    //         authorName: 'Manas Telavane',
    //         authorUsername: 'mandy',
    //         createdAt: '2023-01-21T08:30:46.739+00:00',
    //         updatedAt: '2023-01-21T08:32:21.005+00:00',
    //     },
    //     {
    //         id: '63cba2b6e228e865d89c181f',
    //         title: 'The Joys of Traveling',
    //         content:
    //             'This is another test blog post to check if the content is more than 60 words. The content should be unique and interesting to the readers. This is a test to check if the content is more than 60 words and also if it is unique and interesting.',
    //         cover: 'https://picsum.photos/400',
    //         authorId: '63caf7e256e281ca54a0d825',
    //         authorName: 'John Doe',
    //         authorUsername: 'johndoe',
    //         createdAt: '2023-01-21T08:30:46.739+00:00',
    //         updatedAt: '2023-01-21T08:32:21.005+00:00',
    //     },
    //     {
    //         id: '63cba2b6e228e865d89c1820',
    //         title: 'The Art of Photography',
    //         content:
    //             'This is a third test blog post to check if the content is more than 60 words. The content should be unique and interesting to the readers. This is a test to check if the content is more than 60 words and also if it is unique and interesting.',
    //         cover: 'https://picsum.photos/400',
    //         authorId: '63caf7e256e281ca54a0d826',
    //         authorName: 'Jane Smith',
    //         authorUsername: 'janesmith',
    //         createdAt: '2023-01-21T08:30:46.739+00:00',
    //         updatedAt: '2023-01-21T08:32:21.005+00:00',
    //     },
    //     {
    //         id: '63cba2b6e228e865d89c1821',
    //         title: 'The Power of Music',
    //         content:
    //             'This is a fourth test blog post to check if the content is more than 60 words. The content should be unique and interesting to the readers. This is a test to check if the content is more than 60 words and also if it is unique and interesting.',
    //         cover: 'https://picsum.photos/400',
    //         authorId: '63caf7e256e281ca54a0d827',
    //         authorName: 'Emily Johnson',
    //         authorUsername: 'emilyj',
    //         createdAt: '2023-01-21T08:30:46.739+00:00',
    //         updatedAt: '2023-01-21T08:32:21.005+00:00',
    //     },
    //     {
    //         id: '63cba2b6e228e865d89c1822',
    //         title: 'The Magic of Cooking',
    //         content:
    //             'This is a fifth test blog post to check if the content is more than 60 words. The content should be unique and interesting to the readers. This is a test to check if the content is more than 60 words and also if it is unique and interesting.',
    //         cover: 'https://picsum.photos/400',
    //         authorId: '63caf7e256e281ca54a0d828',
    //         authorName: 'David Smith',
    //         authorUsername: 'davidsmith',
    //         createdAt: '2023-01-21T08:30:46.739+00:00',
    //         updatedAt: '2023-01-21T08:32:21.005+00:00',
    //     },
    // ];

    useEffect(() => {
        const getBlogs = async () => {
            const blogsFromServer = await axios.get(
                `${process.env.REACT_APP_SERVER_URL}/api/blog/getList`
            );
            setBlogs(blogsFromServer.data.result);
        };
        getBlogs();
    }, []);

    const handleClick = (id) => {
        navigate(`/blog/${id}`);
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                backgroundColor: mode === 'light' ? light : bluegrey,
                padding: '5rem',
            }}
        >
            <Typography
                variant='h1'
                component='h2'
                sx={{
                    color: mode === 'light' ? deepDark : light,
                    margin: '2rem',
                    fontFamily: 'Poppins, Work Sans',
                    fontWeight: 'bold',
                    fontSize: '3rem',
                    textAlign: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                Read Blogs
                <ChromeReaderModeIcon
                    sx={{ fontSize: '3rem', marginLeft: '1rem' }}
                />
            </Typography>

            <Typography
                variant='h2'
                component='h3'
                sx={{
                    color:
                        mode === 'light'
                            ? deepDark.concat('aa')
                            : light.concat('aa'),
                    margin: '2rem',
                    fontFamily: 'Work Sans',
                    fontWeight: 'medium',
                    fontSize: '1.5rem',
                    textAlign: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                You can share your experience or read others' experiences here.
            </Typography>

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gridGap: '2rem',
                }}
            >
                {blogs &&
                    blogs.map((blog) => (
                        <Card
                            key={blog._id}
                            sx={{
                                backgroundColor:
                                    mode === 'light' ? deepDark : richBlack,
                                color:
                                    mode === 'light'
                                        ? light
                                        : dark.concat('aa'),
                                borderRadius: '10px',
                                border:
                                    mode === 'light'
                                        ? 'none'
                                        : `1px solid ${dark.concat('aa')}`,

                                width: '100%',
                                maxHeight: '420px',
                                cursor: 'pointer',
                            }}
                            onClick={() => handleClick(blog._id)}
                        >
                            <CardMedia
                                component='img'
                                height='270px'
                                image={blog.cover}
                            />
                            <CardContent
                                sx={{
                                    flex: '1',
                                }}
                            >
                                <Typography variant='h5'>
                                    {blog.title}
                                </Typography>
                                <Typography
                                    variant='subtitle2'
                                    color='textSecondary'
                                    sx={{
                                        mb: 1,
                                    }}
                                >
                                    by{' '}
                                    {`${blog.authorName}  on   ${
                                        blog.createdAt.split('T')[0]
                                    }`}
                                </Typography>
                                <Typography
                                    variant='body1'
                                    sx={{ wordBreak: 'breakWord' }}
                                >
                                    {blog.summary}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
            </Box>
            <Tooltip title='Create a new Blog'>
                <Fab
                    color='primary'
                    aria-label='add'
                    sx={{
                        position: 'fixed',
                        bottom: '2rem',
                        right: '2rem',
                        color: mode === 'light' ? 'white' : deepDark,
                        backgroundColor: mode === 'light' ? deepDark : light,

                        borderRadius: '50%',
                        height: '3.5rem',
                        width: '3.5rem',

                        display: 'grid',
                        placeItems: 'center',
                        cursor: 'pointer',

                        boxShadow: '0 0 10px 0 rgba(78,135,140, 0.5)',

                        '&:hover': {
                            backgroundColor: mode === 'dark' ? light : deepDark,
                            color: mode === 'dark' ? deepDark : light,
                            transform: 'scale(1.1) rotate(90deg)',
                            transition: 'transform 0.2s ease-in-out',
                        },
                    }}
                    onClick={() => navigate('/createBlog')}
                >
                    <AddIcon />
                </Fab>
            </Tooltip>
        </Box>
    );
}

export default Blogs;
