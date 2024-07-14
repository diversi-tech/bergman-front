import React, { useState } from 'react';
import { Button, Box, Container, Typography, Toolbar, CssBaseline, Tooltip, keyframes } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import logo from '../images/logo1.png'

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

    // const handleUploadClick = () => {
    //     navigate('/Login');
    // };

    return (
        <React.Fragment>
            <CssBaseline />
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Box>
                        <Button
                            id="profile"
                            onClick={handleOpen}
                            sx={{ borderRadius: '50%' }}
                        >
                            <Tooltip title='שינוי פרופיל ' arrow>
                                <AccountCircleIcon fontSize='large' />
                            </Tooltip>
                        </Button>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Button variant='contained' id="register" onClick={() => handleNavigation('/login')}>
                            התחברות
                        </Button>
                        <Button variant='contained' onClick={() => handleNavigation('/SignUp')}>
                            הרשמה
                        </Button>
                    </Box>
                </Toolbar>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                    }}
                >
                    <Box>
                        <img src={logo} alt='לוגו' style={{ width: '350px', height: 'auto' }} />
                    </Box>
                </Box>
                <Container sx={{ position: 'relative', zIndex: 2, mt: 1, width: 600 }}>
                    <Box
                        sx={{
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            padding: '10px',
                            borderRadius: '8px',
                        }}
                    >
                        <Typography variant='h5' align='center'>
                            חנה ברגמן מתמחה במתן פתרונות גיוס מדויקים בתחום ההייטק.<br />
                            מטרתנו היא לחבר בין כישרונות מובילים לבין חברות מובילות בתעשייה, תוך הבטחת התאמה מושלמת הן למועמדים והן למעסיקים.<br />
                            עם הבנה עמוקה של הדרישות הייחודיות של תחום ההייטק,<br /> אנו גאים בגישה המדוקדקת שלנו להשמה ושואפים למצוינות ודיוק בכל תהליך הגיוס.
                        </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center', mt: 0 }}>
                        <Button variant='contained' sx={{ mt: 4, animation: `${pulseAnimation} 2s infinite` }} onClick={() => handleNavigation('/login')}>
                            העלאת קורות חיים
                            <FileUploadIcon />
                        </Button>
                    </Box>
                </Container>
                <Box component="footer" sx={{ py: 25, px: 2, textAlign: 'center', mb: 0 }}>
                </Box>
        </React.Fragment>
    );
};
