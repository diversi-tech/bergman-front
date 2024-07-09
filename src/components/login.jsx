
import { Box, Button, Container, TextField, Typography, Modal, Backdrop, Fade } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FillUsersData } from '../redux/action/userAction';
import { store } from '../redux/store'
import { Provider } from 'react-redux';
import UserAxios  from '../axios/userAxios';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  debugger
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usersList, setUsersList] = useState([]);
  const [error, setError] = useState(false); 

  const myDispatch = useDispatch();
  const myNavigate = useNavigate();
  const users = useSelector(state => state.listUsers);

  useEffect(() => {
    const fetchUsers = async ()=>{
      debugger
      if(users > 0)
          setUsersList(users)
        else {
          try{
            const response = await UserAxios.getAllUsers()
            setUsersList(response)
            myDispatch(FillUsersData(response))
             }
          catch(error){
            console.error("Error fetching users:", error);
          }
        }
    }
    fetchUsers()
  }, [myDispatch, users]);


  const handleLogin = () => {
    debugger
    // הוספת הלוגיקה להתחברות כאן
    // console.log('Email:', email);
    // console.log('Password:', password);
    const user = usersList.find(user => user.email === email && user.password === password);
    if (user) {
      if(user.userType === 1)
        myNavigate('/Manager')
      else if(user.userType === 2)
        myNavigate('/Home')
       else
       myNavigate('/Secretary')
      }
     else {
      setError(true);
    }
  };

  const handleSignUp = () => {
    // לוגיקה להרשמה
    // alert("ניווט לעמוד הרשמה");
    myNavigate('/SignUp', { state: { email, password } });
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
        <Typography variant="h5" component="h1" gutterBottom>
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
        {error && (
          <Box display="flex" flexDirection="column" alignItems="center" marginTop="16px">
            <Typography color="error"  style={{ fontSize: '15px' }}>אתה משתמש חדש</Typography>
            <Button
              variant="outlined"
              // color="secondary"
              color="primary"
              onClick={handleSignUp}
              style={{ marginTop: '16px' }}
            >
              להרשמה
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
};

 const LoginModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    handleOpen();
  }, []);

  return (
    <Provider store={store}>
    <div>
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
              top: '60%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 370,
              backgroundColor: 'white',
              // border: '2px solid lightblue', // שינוי צבע המסגרת לתכלת
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
   </Provider>
  );
};

export default LoginModal

