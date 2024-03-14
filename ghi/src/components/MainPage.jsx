import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const MainPage = () => {
    const [backgroundImageUrl, setBackgroundImageUrl] = useState('');
    const [apiKey, setApiKey] = useState('');

    useEffect(() => {
        const fetchApiKey = async () => {
            try {
                const response = await fetch('/api/api-key');
                const data = await response.json();
                setApiKey(data.api_key);
            } catch (error) {
                console.error('Error Fetching API Key:', error);
            }
        };
        fetchApiKey
    }, []);

    useEffect(() => {
        if (apiKey) {
            const fetchBackgroundImage = async () => {
                const url = `https://api.pexels.com/v1/search?query=gym&per_page=1`;
                try {
                    const response = await fetch(url, {
                        headers: {
                            Authorization: apiKey
                        }
                    });
                    const data = await response.json();
                    if (data.photos.length > 0) {
                        setBackgroundImageUrl(data.photos[0].src.original);
                    }
                }   catch (error) {
                    console.error('Error fetching image from Pexels:', error);
                }
            };

            fetchBackgroundImage();
        }
    }, [apiKey]);

    const containerStyle = {
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        color: '#fff'
    };


     return (
        <div className="container" style={containerStyle}>
            <h1>Buffbunny Hop</h1>
            <p>From Fluff To Buff</p>
            <Link to="/login" className="btn btn-primary">
                Login
            </Link>
            <Link to="/signup" className="btn btn-secondary">
                Sign Up
            </Link>
        </div>
    );
};

export default MainPage;
