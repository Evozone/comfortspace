import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function Resources() {
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3001/resources')
            .then((res) => {
                if (!res.ok) {
                    throw Error('Could not fetch the data for that resource');
                }
                return res.json();
            })
            .then((data) => {
                setResources(data);
                setLoading(false);
                setError(null);
            })
            .catch((err) => {
                setLoading(false);
                setError(err.message);
            });
    }, []);

    return (
        <Box>
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {resources.map((resource) => (
                <Box key={resource.id}>
                    <h2>{resource.title}</h2>
                    <p>Written by {resource.author}</p>
                </Box>
            ))}
        </Box>
    );
}

export default Resources;