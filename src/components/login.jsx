

import { Box, Button, Container, TextField, Typography, Modal, Backdrop, Fade } from '@mui/material';
import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // הוספת הלוגיקה להתחברות כאן
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="10vh"
      >
        <Typography variant="h4" component="h1" gutterBottom>
          התחברות
        </Typography>

        <TextField
          label="אימייל"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          // fullWidth
          margin="normal"
        />
        <TextField
          label="סיסמא"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          // fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          // fullWidth
          style={{ marginTop: '16px' }}
        >
          התחבר
        </Button>
      </Box>
    </Container>
  );
};

const Home1 = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        פתח התחברות
      </Button>
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
              // border: '2px solid #000', צבע מסגרת שחור
              border: '2px solid lightblue', // שינוי צבע המסגרת לתכלת
              borderRadius: '15px', //מסגרת עגולה
              boxShadow: 24,
              padding: 16,
            }}
          >
            <Login />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default Home1;




