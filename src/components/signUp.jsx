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
  debugger
  const location = useLocation();
  const initialEmail = location.state?.email || '';
  const initialPassword = location.state?.password || '';

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState(initialPassword);
  const myDispatch = useDispatch();


  const handleSignUp = async () => {
    debugger
    const newUser =
    {
      username,
      email,
      password,
      userType:2
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

  //inputs right
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
                  onChange={(e) => setUsername(e.target.value)}
                  margin="normal"
                />
                <TextField
                  label="אימייל"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  margin="normal"
                />
                <TextField
                  label="סיסמא"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  margin="normal"
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
        >
          הירשם
        </Button>
      </Box>
    </Container>
  );
};

const SignUpModal = () => {
  debugger
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
