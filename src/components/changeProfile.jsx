import React, { useState, useEffect } from 'react';
import { Button, TextField, Box, Typography, Container, CssBaseline } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import UserAxios from '../axios/userAxios'; // עדכן את הנתיב בהתאם למיקום הקובץ
import { FillUsersData, currentUser as setCurrentUser } from '../redux/action/userAction';
import { useNavigate } from 'react-router-dom';
import DoneIcon from '@mui/icons-material/Done';

const ChangeProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const reduxUser = useSelector(state => state.userReducer.currentUser);

    const [profile, setProfile] = useState({
        username: '',
        email: '',
        password: '',
        phone: ''
    });

    useEffect(() => {
        if (reduxUser) {
            setProfile({
                username: reduxUser.username || '',
                email: reduxUser.email || '',
                password: reduxUser.password || '',
                phone: reduxUser.phone || ''
            });
        }
    }, [reduxUser]);

    const handleNavigation = (path) => {
        navigate(path);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }));
    };

    const save = async () => {
        try {
            const updatedUser = {
                ...reduxUser,
                ...profile
            };
            await UserAxios.updateUser(reduxUser.userId, updatedUser);
            dispatch(setCurrentUser(updatedUser));
            const allUsers = await UserAxios.getAllUsers();
            dispatch(FillUsersData(allUsers));
            console.log('פרופיל עודכן בהצלחה:', updatedUser);
            handleNavigation('/Home');
        } catch (error) {
            console.error('שגיאה בעדכון הפרופיל:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        save();
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
                        <DoneIcon/>

                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default ChangeProfile;
