import React, { useState } from 'react';
import { Button, TextField, Box, Typography, Container, CssBaseline } from '@mui/material';

export const ChangeProfile = () => {
    const [profile, setProfile] = useState({
        username: '',
        email: '',
        password: '',
        phone: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // כאן תוסיף את הקוד לשמירת השינויים
        console.log('פרופיל נשמר:', profile);
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    שינוי פרופיל
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="שם משתמש"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={profile.username}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="אימייל"
                        name="email"
                        autoComplete="email"
                        value={profile.email}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        label="סיסמא"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        value={profile.password}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="phone"
                        label="פלאפון"
                        name="phone"
                        autoComplete="phone"
                        value={profile.phone}
                        onChange={handleChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        שמור שינויים
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};


