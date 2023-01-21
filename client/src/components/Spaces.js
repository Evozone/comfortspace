import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function Spaces() {
    const [spaces, setSpaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3001/spaces')
            .then((res) => {
                if (!res.ok) {
                    throw Error('Could not fetch the data for that resource');
                }
                return res.json();
            })
            .then((data) => {
                setSpaces(data);
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
            {spaces.map((space) => (
                <Box key={space.id}>
                    <h2>{space.title}</h2>
                    <p>Written by {space.author}</p>
                </Box>
            ))}
        </Box>
    );
}

export default Spaces;