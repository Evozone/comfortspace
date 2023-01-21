import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { useNavigate } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';

import { maximumBlueGreen, mayaBlue, magnolia, darkJungleGreen, neonBlue } from './colors';

function Blogs() {

    const navigate = useNavigate();

    const blogs = [
        {
            id: '63cba2b6e228e865d89c181e',
            title: 'The Beauty of Flowers',
            content:
                'Blog Content is also updated. This is a test blog post to see if the content is more than 60 words. The content should be unique and interesting to the readers. This is a test to check if the content is more than 60 words and also if it is unique and interesting.',
            cover: 'https://picsum.photos/400',
            authorId: '63caf7e256e281ca54a0d824',
            authorName: 'Manas Telavane',
            authorUsername: 'mandy',
            createdAt: '2023-01-21T08:30:46.739+00:00',
            updatedAt: '2023-01-21T08:32:21.005+00:00',
        },
        {
            id: '63cba2b6e228e865d89c181f',
            title: 'The Joys of Traveling',
            content:
                'This is another test blog post to check if the content is more than 60 words. The content should be unique and interesting to the readers. This is a test to check if the content is more than 60 words and also if it is unique and interesting.',
            cover: 'https://picsum.photos/400',
            authorId: '63caf7e256e281ca54a0d825',
            authorName: 'John Doe',
            authorUsername: 'johndoe',
            createdAt: '2023-01-21T08:30:46.739+00:00',
            updatedAt: '2023-01-21T08:32:21.005+00:00',
        },
        {
            id: '63cba2b6e228e865d89c1820',
            title: 'The Art of Photography',
            content:
                'This is a third test blog post to check if the content is more than 60 words. The content should be unique and interesting to the readers. This is a test to check if the content is more than 60 words and also if it is unique and interesting.',
            cover: 'https://picsum.photos/400',
            authorId: '63caf7e256e281ca54a0d826',
            authorName: 'Jane Smith',
            authorUsername: 'janesmith',
            createdAt: '2023-01-21T08:30:46.739+00:00',
            updatedAt: '2023-01-21T08:32:21.005+00:00',
        },
        {
            id: '63cba2b6e228e865d89c1821',
            title: 'The Power of Music',
            content:
                'This is a fourth test blog post to check if the content is more than 60 words. The content should be unique and interesting to the readers. This is a test to check if the content is more than 60 words and also if it is unique and interesting.',
            cover: 'https://picsum.photos/400',
            authorId: '63caf7e256e281ca54a0d827',
            authorName: 'Emily Johnson',
            authorUsername: 'emilyj',
            createdAt: '2023-01-21T08:30:46.739+00:00',
            updatedAt: '2023-01-21T08:32:21.005+00:00',
        },
        {
            id: '63cba2b6e228e865d89c1822',
            title: 'The Magic of Cooking',
            content:
                'This is a fifth test blog post to check if the content is more than 60 words. The content should be unique and interesting to the readers. This is a test to check if the content is more than 60 words and also if it is unique and interesting.',
            cover: 'https://picsum.photos/400',
            authorId: '63caf7e256e281ca54a0d828',
            authorName: 'David Smith',
            authorUsername: 'davidsmith',
            createdAt: '2023-01-21T08:30:46.739+00:00',
            updatedAt: '2023-01-21T08:32:21.005+00:00',
        }
    ];


    const handleClick = (id) => {
        navigate(`/blog/${id}`);
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                backgroundColor: magnolia,
                color: 'text.primary',
            }}
        >

            {/* Create a grid for Blogs */}
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                }}
            >
                {/* Map through the blogs array and display the blogs */}
                {blogs.map((blog) => (
                    <CardActionArea
                        key={blog.id}
                        sx={{
                            gridRow: 'span 2',
                            display: 'flex',
                            flexDirection: 'row',
                        }}
                        onClick={() => handleClick(blog.id)}
                    >
                        <Card key={blog.id}
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                width: '100%',
                                height: '300px',
                                borderRadius: '0',
                            }}
                            onClick={() => handleClick(blog.id)}
                        >
                            <CardMedia
                                image={blog.cover}
                                sx={{
                                    flex: '1',
                                }}
                            />
                            <CardContent
                                sx={{
                                    flex: '1',
                                }}
                            >
                                <Typography variant='h5'
                                    sx={{
                                        font: '600 2rem "Work Sans", sans-serif',
                                    }}>
                                    {blog.title}
                                </Typography>
                                <Typography variant='subtitle2' color='textSecondary'>
                                    by {blog.authorName}
                                </Typography>
                                <Typography variant='body1'>
                                    {blog.content.split(' ').slice(0, 15).join(' ')}...
                                </Typography>
                            </CardContent>
                        </Card>
                    </CardActionArea>
                ))}

            </Box>
        </Box >
    );
}

export default Blogs;