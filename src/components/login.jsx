
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { Backdrop, Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fade, Modal, TextField, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import UserAxios from '../axios/userAxios';
import { currentUser, FillUsersData, setMyUser } from '../redux/action/userAction';
import { store } from '../redux/store';


export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usersList, setUsersList] = useState([]);
  const [error, setError] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false); // מצב חדש עבור משתמש חדש

  // מצב לדיאלוג איפוס סיסמה
  const [openResetDialog, setOpenResetDialog] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetEmailError, setResetEmailError] = useState('');


  // הוספת משתני שגיאה חדשים
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const myDispatch = useDispatch();
  const myNavigate = useNavigate();
  const users = useSelector(state => state.listUsers);
  // const userType = useSelector(state=>state.currentUserType);
  // const [type,setType]=useState()
  const loggedInUser = useSelector(state => state.myUser); // הוספת סלקטור למשתמש המחובר

  useEffect(() => {
    const fetchUsers = async () => {
      if (users > 0)
        setUsersList(users)
      else {
        try {
          const response = await UserAxios.getAllUsers()
          setUsersList(response)
          myDispatch(FillUsersData(response.data))
        }
        catch (error) {
          console.error("Error fetching users:", error);
        }
      }
    }
    fetchUsers()
  }, [myDispatch, users]);

  // הוספת פונקציות ולידציה
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

  const handleBlur = (field, value) => {
    switch (field) {
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


  const handleLogin = () => {

    // ולידציה על השדות לפני התחברות
    const emailValidationError = validateEmail(email);
    const passwordValidationError = validatePassword(password);
    setEmailError(emailValidationError);
    setPasswordError(passwordValidationError);

    if (emailValidationError || passwordValidationError) {
      setError(true);
      return;
    }
    // הוספת הלוגיקה להתחברות כאן
    const user = usersList.find((x) => x.person.email ==email && x.password ==password);
    if (user) {
      myDispatch(setMyUser(user.userType.id))
      myDispatch(currentUser(user))
      console.log(user)
      if (user.userType.id == 1) {
        myNavigate('/Manager')
      }
      else if (user.userType.id == 2)
        myNavigate('/Home')
      else if(user.userType.id == 3)
        myNavigate('/Secretary')
    }
    else {
      setError(true);
      setIsNewUser(true); // אם המשתמש לא נמצא, נחשב אותו כמשתמש חדש
    }
  };

  const handleSignUp = () => {

    // ולידציה על השדות לפני הרשמה
    const emailValidationError = validateEmail(email);
    const passwordValidationError = validatePassword(password);
    setEmailError(emailValidationError);
    setPasswordError(passwordValidationError);

    if (emailValidationError || passwordValidationError) {
      setError(true);
      return;
    }

    // לוגיקה להרשמה
    // alert("ניווט לעמוד הרשמה");
    myNavigate('/SignUp', { state: { email, password } });
  };


  // פתיחה וסגירה של דיאלוג איפוס סיסמה
  const handleOpenResetDialog = () => {
    setOpenResetDialog(true);
  };

  const handleCloseResetDialog = () => {
    setOpenResetDialog(false);
    setResetEmail('');
    setResetEmailError('');
  };

  const handleResetPassword = () => {
    const emailValidationError = validateEmail(resetEmail);
    setResetEmailError(emailValidationError);

    if (emailValidationError) {
      return;
    }

    // כאן תוכל להוסיף את הלוגיקה לאיפוס סיסמה, למשל שליחת אימייל לאיפוס
    alert('קישור לאיפוס סיסמה נשלח לכתובת האימייל שלך');
    handleCloseResetDialog();
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
        {/* ///////////////// */}
        {loggedInUser ? (
          <Box display="flex" alignItems="center" justifyContent="center">
            <Typography variant="h6" component="span" style={{ marginRight: '8px' }}>
              שלום, {loggedInUser.name}
            </Typography>
            <Button variant="contained" color="primary">
              פרופיל משתמש
            </Button>
          </Box>
        ) : (
          <>

            <Typography variant="h5" component="h1" gutterBottom>
              התחברות
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
                      label="אימייל"
                      type="email"
                      value={email}
                      // onChange={(e) => setEmail(e.target.value)}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setEmailError(validateEmail(e.target.value));
                      }}
                      onBlur={() => handleBlur('email', email)}
                      // fullWidth
                      margin="normal"
                      variant="outlined"
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
                        setPasswordError(validatePassword(e.target.value));
                      }}
                      onBlur={() => handleBlur('password', password)}
                      // fullWidth
                      margin="normal"
                      variant="outlined"
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
              onClick={handleLogin}
              // fullWidth
              style={{ marginTop: '16px' }}
              disabled={Boolean(emailError || passwordError)}
            >
              התחבר
            </Button>

            <Button
              variant="text"
              onClick={handleOpenResetDialog}
              // style={{ marginTop: '16px' }}
              color="error" style={{ fontSize: '13px' }}
            >
              ?שכחת סיסמא
            </Button>
            {error && (
              <Box display="flex" flexDirection="column" alignItems="center" marginTop="16px">
                <Typography color="error" style={{ fontSize: '13px' }}>אתה משתמש חדש</Typography>
                <Button
                  variant="outlined"
                  // color="secondary"
                  // color="primary"
                  onClick={handleSignUp}
                  style={{ marginTop: '16px' }}
                  disabled={Boolean(emailError || passwordError)}
                >
                  להרשמה
                </Button>
              </Box>
            )}
          </>
        )}


        {/* דיאלוג לאיפוס סיסמה */}
        <Dialog open={openResetDialog} onClose={handleCloseResetDialog}>
          <DialogTitle>איפוס סיסמא</DialogTitle>
          <DialogContent>
            <DialogContentText>
              אנא הכנס את כתובת האימייל שלך ונשלח לך קישור לאיפוס סיסמה.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="resetEmail"
              label="אימייל"
              type="email"
              fullWidth
              variant="standard"
              value={resetEmail}
              onChange={(e) => {
                setResetEmail(e.target.value);
                setResetEmailError(validateEmail(e.target.value));
              }}
              error={Boolean(resetEmailError)}
              helperText={resetEmailError}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseResetDialog}>ביטול</Button>
            <Button onClick={handleResetPassword} disabled={Boolean(resetEmailError)}>שלח</Button>
          </DialogActions>
        </Dialog>

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




























// import { Box, Button, Container, TextField, Typography, Modal, Backdrop, Fade } from '@mui/material';
// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { FillUsersData, setMyUser} from '../redux/action/userAction';
// import { store } from '../redux/store'
// import { Provider } from 'react-redux';
// import UserAxios from '../axios/userAxios';
// import { useNavigate } from 'react-router-dom';
// import { createTheme, ThemeProvider, Theme } from '@mui/material/styles';
// import rtlPlugin from 'stylis-plugin-rtl';
// import { prefixer } from 'stylis';
// import { CacheProvider } from '@emotion/react';
// import createCache from '@emotion/cache';



// export const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [usersList, setUsersList] = useState([]);
//   const [error, setError] = useState(false);

//   const myDispatch = useDispatch();
//   const myNavigate = useNavigate();
//   const users = useSelector(state => state.listUsers);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       if (users.length > 0) {
//         setUsersList(users);
//       } else {
//         try {
//           const response = await UserAxios.getAllUsers();
//           setUsersList(response.data);
//           myDispatch(FillUsersData(response.data));
//         } catch (error) {
//           console.error("Error fetching users:", error);
//         }
//       }
//     };
//     fetchUsers();
//   }, [myDispatch, users]);

//   const handleLogin = () => {
//     const user = usersList.find(user => user.email === email && user.password === password);
//     if (user) {
//       myDispatch(setMyUser(user));
//       if (user.userType === 1) {
//         myNavigate('/Manager');
//       } else if (user.userType === 2) {
//         myNavigate('/Home');
//       } else {
//         myNavigate('/Secretary');
//       }
//     } else {
//       setError(true);
//     }
//   };

//   const handleSignUp = () => {
//     myNavigate('/SignUp', { state: { email, password } });
//   };

//   const theme = createTheme({
//     direction: 'rtl',
//     palette: {
//       mode: "light"
//     },
//   });

//   const cacheRtl = createCache({
//     key: 'muirtl',
//     stylisPlugins: [prefixer, rtlPlugin],
//   });

//   return (
//     <Container maxWidth="sm">
//       <Box
//         display="flex"
//         flexDirection="column"
//         alignItems="center"
//         justifyContent="center"
//         minHeight="10vh"
//       >
//         <Typography variant="h5" component="h1" gutterBottom>
//           התחברות
//         </Typography>
//         <CacheProvider value={cacheRtl}>
//           <ThemeProvider theme={theme}>
//             <div dir="rtl">
//               <Box
//                 display="flex"
//                 flexDirection="column"
//                 alignItems="center"
//                 justifyContent="center"
//                 width="100%"
//               >
//                 <TextField
//                   label="אימייל"
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   margin="normal"
//                   variant="outlined"
//                 />
//                 <TextField
//                   label="סיסמא"
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   margin="normal"
//                   variant="outlined"
//                 />
//               </Box>
//             </div>
//           </ThemeProvider>
//         </CacheProvider>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={handleLogin}
//           style={{ marginTop: '16px' }}
//         >
//           התחבר
//         </Button>
//         {error && (
//           <Box display="flex" flexDirection="column" alignItems="center" marginTop="16px">
//             <Typography color="error" style={{ fontSize: '15px' }}>אתה משתמש חדש</Typography>
//             <Button
//               variant="outlined"
//               color="primary"
//               onClick={handleSignUp}
//               style={{ marginTop: '16px' }}
//             >
//               להרשמה
//             </Button>
//           </Box>
//         )}
//       </Box>
//     </Container>
//   );
// };

// const LoginModal = () => {
//   const [open, setOpen] = useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   useEffect(() => {
//     handleOpen();
//   }, []);

//   return (
//     <Provider store={store}>
//       <div>
//         <Modal
//           aria-labelledby="transition-modal-title"
//           aria-describedby="transition-modal-description"
//           open={open}
//           onClose={handleClose}
//           closeAfterTransition
//           BackdropComponent={Backdrop}
//           BackdropProps={{
//             timeout: 500,
//           }}
//         >
//           <Fade in={open}>
//             <Box
//               display="flex"
//               flexDirection="column"
//               alignItems="center"
//               justifyContent="center"
//               style={{
//                 position: 'absolute',
//                 top: '60%',
//                 left: '50%',
//                 transform: 'translate(-50%, -50%)',
//                 width: 370,
//                 backgroundColor: 'white',
//                 borderRadius: '15px',
//                 boxShadow: 24,
//                 padding: 16,
//               }}
//             >
//               <Login />
//             </Box>
//           </Fade>
//         </Modal>
//       </div>
//     </Provider>
//   );
// };

// export default LoginModal;


