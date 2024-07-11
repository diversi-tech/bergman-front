
import React, { useState } from 'react';
// import './newHomePage.css';
import { Button, Box, Container, Typography, AppBar, Toolbar, CssBaseline, Modal, Backdrop, Fade, Tooltip, keyframes } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ChangeProfile } from './changeProfile';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import PersonIcon from '@mui/icons-material/Person';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Avatar from '@mui/material/Avatar';
import { Height } from '@mui/icons-material';
import { auto } from '@popperjs/core';


const background = require('../images/background.jpg')
const logo = require('../images/logo small.jpg')



const blinkAnimation = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;
const pulseAnimation = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
`;

export const Home = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const handleNavigation = (path) => {
        navigate(path);
    };
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <React.Fragment>
            <CssBaseline />
            {/* <AppBar position="static"> */}
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Box>
                    <Button
                        // color="inherit"
                        id="profile"
                        onClick={handleOpen}
                        sx={{ borderRadius: '50%' }}
                    >
                        <Tooltip title='שינוי פרופיל ' arrow>
                            <AccountCircleIcon fontSize='large'

                            />
                        </Tooltip>
                        {/* <Avatar>H</Avatar> */}
                    </Button>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box>
                        <Button variant='contained' id="register" onClick={() => handleNavigation('/register')}>
                            התחברות
                        </Button>
                    </Box>
                    <Box >
                        <Button variant='contained' onClick={() => handleNavigation('/register')}>
                            הרשמה
                        </Button>
                    </Box>
                </Box>
            </Toolbar>
            {/* </AppBar> */}
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                // height: '50vh', // גובה חצי המסך
                textAlign: 'center',
                mt: 4,
            }}>
                <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                // height: '50vh', // גובה חצי המסך
                textAlign: 'center',
                mt: 4,
                // width:'20px'
                }}>
                {/* <img src={logo} sx={{ position: 'relative', zIndex: 2, mt: 0}} /> */}
                </Box>
                <Typography variant='h4' align='center' sx={{ position: 'relative', zIndex: 2, mt: 0, width: 1000 }}>חנה ברגמן - השמה מדוייקת בהייטק</Typography>
            </Box>
            <Container sx={{ position: 'relative', zIndex: 2, mt: 4, width: 600 }}>
                {/* <Typography variant="h4" gutterBottom align="center" sx={{ mt: 9 }}>
                    <img src={img1} alt="תיאור תמונה" className='image' />
                </Typography> */}
                {/* <Typography >
                <img src={background} alt="תיאור תמונה" className='image' />
                </Typography> */}
                <Typography variant='h6' align='center'>
                    חנה ברגמן מתמחה במתן פתרונות גיוס מדויקים בתחום ההייטק.<br />
                    מטרתנו היא לחבר בין כישרונות מובילים לבין חברות מובילות בתעשייה, תוך הבטחת התאמה מושלמת הן למועמדים והן למעסיקים.<br />
                    עם הבנה עמוקה של הדרישות הייחודיות של תחום ההייטק,<br /> אנו גאים בגישה המדוקדקת שלנו להשמה ושואפים למצוינות ודיוק בכל תהליך הגיוס.
                </Typography>
                <Button variant='contained' sx={{ mt: 8, animation: `${pulseAnimation} 2s infinite` }}>
                    העלאת קורות חיים
                    <FileUploadIcon />
                </Button>
            </Container>
            <Box
                sx={{
                    // backgroundImage: 'url(/images/background.jpg)',
                    // backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '0vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    color: 'white',
                }}
            >
                <Box
                    component="img"
                    src={background}
                    alt="תמונת רקע"
                    sx={{
                        width: '100%', // גודל מלא של הרוחב
                        height: 'auto', // גובה אוטומטי ביחס לרוחב
                    }}
                />
            </Box>
            <Box component="footer" sx={{ py: 25, px: 2, textAlign: 'center' }}>
            </Box>
        </React.Fragment>
    );
};




