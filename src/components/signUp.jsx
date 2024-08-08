import { Box, Button, Container, TextField, Typography, Modal, Backdrop, Fade } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { store } from '../redux/store';
import { FillUsersData } from '../redux/action/userAction';
import { Provider, useDispatch } from 'react-redux';
import UserAxios from '../axios/userAxios';
import { useLocation } from 'react-router-dom';
import { createTheme, ThemeProvider, Theme } from '@mui/material/styles';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

const SignUp = () => {
  
  const location = useLocation();
  const initialEmail = location.state?.email || '';
  const initialPassword = location.state?.password || '';

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState(initialPassword);

    // הוספת משתני שגיאה לשדות
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const myDispatch = useDispatch();

    // פונקציות ולידציה
  const validateUsername = (username) => {
    if (!username) {
      return 'שם המשתמש הוא שדה חובה';
    }
    if (username.length < 3) {
      return 'שם המשתמש חייב להכיל לפחות 3 תווים';
    }
    return '';
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return 'האימייל הוא שדה חובה';
    }
    if (!emailRegex.test(email)) {
      return 'אנא הכנס כתובת אימייל חוקית';
    }
    return '';
  };

  const validatePassword = (password) => {
    if (!password) {
      return 'הסיסמה היא שדה חובה';
    }
    if (password.length < 6) {
      return 'הסיסמה חייבת להכיל לפחות 6 תווים';
    }
    return '';
  };


    // פונקציה להוספת שגיאות כאשר השדה מאבד פוקוס
  const handleBlur = (field, value) => {
    switch (field) {
      case 'username':
        setUsernameError(validateUsername(value));
        break;
      case 'email':
        setEmailError(validateEmail(value));
        break;
      case 'password':
        setPasswordError(validatePassword(value));
        break;
      default:
        break;
    }
  };

    // פונקציה לטיפול בהרשמה
  const handleSignUp = async () => {

    // ולידציה על השדות לפני הרשמה
    const newUsernameError = validateUsername(username);
    const newEmailError = validateEmail(email);
    const newPasswordError = validatePassword(password);

    setUsernameError(newUsernameError);    
    setEmailError(newEmailError);
    setPasswordError(newPasswordError);

    // אם יש שגיאות, לא נבצע הרשמה
    if (usernameError || emailError || passwordError) {
      return;
    }
    
    const newUser =
    {
      username,
      email,
      password,
      userType:2,
      createdAt: new Date().toISOString(), // הוסף את createdAt
      updatedAt: new Date().toISOString() // הוסף את updatedAt אם נדרש
      // createdAt: new Date().toISOString()
    };

    try {
      await UserAxios.addUser(newUser);
      const allUsers = await UserAxios.getAllUsers()
      myDispatch(FillUsersData(allUsers))
      alert('המשתמש נרשם בהצלחה');
    }
    catch (error) {
      console.error("Error creating user:", error);
      alert('הייתה בעיה ביצירת המשתמש');
    }
  };

  // הגדרת נושא לעיצוב קלטים בכיוון ימין לשמאל
  const theme =
    createTheme({
      direction: 'rtl',
      palette: {
        mode: "light"
      },
    });

  const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
  });


  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="10vh"
      >
        <Typography variant="h5" component="h1" gutterBottom>
          הרשמה
        </Typography>
        <CacheProvider value={cacheRtl}>
          <ThemeProvider theme={theme}>
            <div dir="rtl">
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                width="100%"
              >
                <TextField
                  label="שם משתמש"
                  value={username}
                  // onChange={(e) => setUsername(e.target.value)}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setUsernameError(validateUsername(e.target.value)); // ולידציה בזמן אמת
                  }}
                  onBlur={() => handleBlur('username', username)}
                  margin="normal"
                  error={Boolean(usernameError)}
                  helperText={usernameError}
                />
                <TextField
                  label="אימייל"
                  type="email"
                  value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError(validateEmail(e.target.value)); // ולידציה בזמן אמת
                  }}
                  onBlur={() => handleBlur('email', email)}
                  margin="normal"
                  error={Boolean(emailError)}
                  helperText={emailError}
                />
                <TextField
                  label="סיסמא"
                  type="password"
                  value={password}
                  // onChange={(e) => setPassword(e.target.value)}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError(validatePassword(e.target.value)); // ולידציה בזמן אמת
                  }}
                  onBlur={() => handleBlur('password', password)}
                  margin="normal"
                  error={Boolean(passwordError)}
                  helperText={passwordError}
                />
              </Box>
            </div>
          </ThemeProvider>
        </CacheProvider>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSignUp}
          style={{ marginTop: '16px' }}
          disabled={Boolean(usernameError || emailError || passwordError)} // מניעת לחיצה אם יש שגיאות
        >
          הירשם
        </Button>
      </Box>
    </Container>
  );
};

const SignUpModal = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <Provider store={store}>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={open}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            style={{
              position: 'absolute',
              top: '65%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 370,
              backgroundColor: 'white',
              // border: '2px solid lightblue',
              borderRadius: '15px',
              boxShadow: 24,
              padding: 16,
            }}
          >
            <SignUp />
          </Box>
        </Fade>
      </Modal>
    </Provider>
  );
};

export default SignUpModal;




