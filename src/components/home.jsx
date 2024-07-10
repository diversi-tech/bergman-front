
import React, { useState } from 'react';
// import './newHomePage.css';
import { Button, Box, Container, Typography, AppBar, Toolbar, CssBaseline, Modal, Backdrop, Fade } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ChangeProfile } from './changeProfile';
import FileUploadIcon from '@mui/icons-material/FileUpload';
const background = require('../images/background.jpg')
const img1 = require('../images/logo small.jpg');

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
            <AppBar position="static">
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Box>
                        <Button color="inherit" id="profile" onClick={handleOpen}>
                            שינוי פרופיל
                        </Button>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box>
                            <Button color="inherit" id="register" onClick={() => handleNavigation('/register')}>
                                התחברות
                            </Button>
                        </Box>
                        <Box ml={1}>
                            <Button color="inherit" onClick={() => handleNavigation('/register')}>
                                הרשמה
                            </Button>
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>
            {/* <Container>
                <Typography variant="h4" gutterBottom align="center" sx={{ mt: 9 }}>
                    <img src={img1} alt="תיאור תמונה" className='image' />
                </Typography>
                <Typography >
                <img src={background} alt="תיאור תמונה" className='image' />
                </Typography>
                <Button variant='contained'>העלאת קורות חיים
                    <FileUploadIcon/>
                </Button>
            </Container> */}
            <Box
                sx={{
                    backgroundImage: 'url(/images/background.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '10vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    color: 'white',
                }}
            >
                {/* <Typography variant="h3">
        ברוכים הבאים לאתר להעלאת קורות חיים
      </Typography> */}
                {/* <img src={background} alt="תמונת רקע"  /> */}
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
            <Box component="footer" sx={{ py: 3, px: 2, mt: 'calc(30rem - 30px)', backgroundColor: (theme) => theme.palette.grey[200], textAlign: 'center' }}>
                <Container maxWidth="sm">
                    <Typography variant="body1">
                        <span> צור קשר: חנה ברגמן </span>
                        <span> פל': 055-555-555  </span>
                        אימייל: kkk@gmail.com
                    </Typography>
                </Container>
            </Box>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 370,
                            backgroundColor: 'white',
                            border: '2px solid lightblue',
                            borderRadius: '15px',
                            boxShadow: 24,
                            padding: 16,
                        }}
                    >
                        <ChangeProfile />
                    </Box>
                </Fade>
            </Modal>
        </React.Fragment>
    );
};




