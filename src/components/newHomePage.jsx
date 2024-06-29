import React from 'react';
import './newHomePage.css';
import { Button, Box, Container, Typography, AppBar, Toolbar, CssBaseline } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const img1 = require('../images/logo small.jpg');


const NewHomePage = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="static">
                <Toolbar sx={{ justifyContent: 'space-between' }}>

                    <Box>
                        <Button color="inherit" id="profile" onClick={() => handleNavigation('/profile')}>
                            שינוי פרופיל
                        </Button>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box>
                            <Button color="inherit" id="register"onClick={() => handleNavigation('/register')}>
                                הרשמה
                            </Button>
                        </Box>
                        <Box ml={1}>
                            <Button color="inherit" onClick={() => handleNavigation('/login')}>
                                כניסה
                            </Button>
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>
            <Container>
                <Typography variant="h4" gutterBottom align="center" sx={{ mt: 9 }}>
                    <img src={img1} alt="תיאור תמונה" className='image' />
                </Typography>

            </Container>
            <Box component="footer" sx={{ py: 3, px: 2, mt: 'calc(30rem - 30px)', backgroundColor: (theme) => theme.palette.grey[200], textAlign: 'center' }}>
                <Container maxWidth="sm">
                    <Typography variant="body1">

                        <span> צור קשר: חנה ברגמן </span>
                        <span> פל': 055-555-555  </span>
                        אימייל: kkk@gmail.com
                    </Typography>
                </Container>
            </Box>

        </React.Fragment>
    );
};

export default NewHomePage;
