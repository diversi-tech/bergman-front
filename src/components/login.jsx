// import {TextField} from '@mui/material';
// import { makeStyles } from '@material-ui/core/styles';

// //הגדרות עיצוב לטופס
// const useStyles = makeStyles((theme) => ({
//     root: {
//       display: 'flex',
//       flexDirection: 'column',
//       justifyContent: 'center',
//       alignItems: 'center',
//       height: '65vh', 
//     //   margin: theme.spacing(2),
//     },
//     // textField: {
//         // margin: theme.spacing(2),
//         // margin:'10000px',
//         // width: '300px',  
//     //   },
//   }));

// export const Login = ()=>{
//     const classes = useStyles();
//     return <div className = {classes.root}>
//       <TextField id="filled-basic" label="email" variant="filled" />   
//       <br></br>
//       <TextField id="filled-basic" label="password" variant="filled" /> 
//        </div>
// }


import { Box, Button, Container, TextField, Typography } from '@mui/material';
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
        minHeight="100vh"
      >
        <Typography variant="h4" component="h1" gutterBottom> התחברות</Typography>

        <TextField
          label="אימייל"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="סיסמא"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          fullWidth
          style={{ marginTop: '16px' }}
        >התחבר</Button>
      </Box>
    </Container>
  );
};

export default Login;


