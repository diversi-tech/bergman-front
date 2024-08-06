import React, { useState } from 'react';
import { Button, Box, Container, Typography, Toolbar, CssBaseline, Tooltip, keyframes, AppBar, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import logo from '../images/logo1.png'
import { useSelector } from 'react-redux';

const pulseAnimation = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
`;

export const Home = () => {
    const userType = useSelector(state => state.userReducer.currentUserType);
    const user = useSelector(state => state.userReducer.currentUser)
    const navigate = useNavigate();
    const handleNavigation = (path) => {
        navigate(path);
    };
    const upload = () => {
        if (userType !== 0)
            handleNavigation('/Profile')
        else {
            alert("על מנת להעלות קורות חיים יש להתחבר תחילה")
            handleNavigation('/login')
        }
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position='fixed'>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Box sx={{
                        border: '1px solid white', borderRadius: '30px', display: 'flex',
                        direction: 'column', alignItems: 'center', justifyContent: 'center'
                    }}>
                        {(userType !== 0 && userType !== 1) && (
                            <Box >
                                <Button
                                    id="profile"
                                    onClick={() => handleNavigation('/changeProfile')}
                                    sx={{ borderRadius: '50%' }}
                                >
                                    <Tooltip title='שינוי פרופיל ' arrow>
                                        <AccountCircleIcon fontSize='large' sx={{ color: 'white' }} />
                                    </Tooltip>
                                </Button>
                            </Box>
                        )}
                        {(userType !== 0 && userType !== 1) && (
                            <Box sx={{ paddingLeft: '10px' }}>
                                <Typography variant='body5' >שלום {user.person.firstName}</Typography>
                            </Box>
                        )}
                    </Box>

                    {(userType === 0) && (<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Button variant='contained' id="register" onClick={() => handleNavigation('/login')}>
                            התחברות
                        </Button>
                    </Box>)}

                </Toolbar>
            </AppBar>

            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    pt: '60px'
                }}
            >
                <Box>
                    <img src={logo} alt='לוגו' style={{ width: '300px', height: 'auto' }} />
                </Box>
            </Box>
            <Container sx={{ position: 'relative', zIndex: 2, mt: 1, width: 600 }}>
                <Box>
                    <Typography variant='h5' align='center' sx={{ color: "black" }}>
                        חנה ברגמן מתמחה במתן פתרונות גיוס מדויקים בתחום ההייטק.<br />
                        מטרתנו היא לחבר בין כישרונות מובילים לבין חברות מובילות בתעשייה, תוך הבטחת התאמה מושלמת הן למועמדים והן למעסיקים.<br />
                        עם הבנה עמוקה של הדרישות הייחודיות של תחום ההייטק,<br /> אנו גאים בגישה המדוקדקת שלנו להשמה ושואפים למצוינות ודיוק בכל תהליך הגיוס.
                    </Typography>
                </Box>
                <Box sx={{ textAlign: 'center', mt: 0 }}>
                    <Button variant='contained' sx={{ mt: 4, animation: `${pulseAnimation} 2s infinite` }} onClick={upload}>
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
