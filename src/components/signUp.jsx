import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { Backdrop, Box, Button, Container, Fade, Modal, TextField, Typography,} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { Provider, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import UserAxios from "../axios/userAxios";
import { FillUsersData } from "../redux/action/userAction";
import { store } from "../redux/store";
import emailAxios from "../axios/emailAxios";
const SignUp = () => {
  debugger;
  const location = useLocation();
  const initialEmail = location.state?.email || "";
  const initialPassword = location.state?.password || "";

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState(initialPassword);

  // הוספת משתני שגיאה לשדות
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const myDispatch = useDispatch();

  // פונקציות ולידציה
  const validateFirstName = (firstName) => {
    if (!firstName) {
      return "שם פרטי הוא שדה חובה";
    }
    if (firstName.length < 2) {
      return "שם פרטי חייב להכיל לפחות 2 תווים";
    }
    return "";
  };

  const validateLastName = (lastName) => {
    if (!lastName) {
      return "שם משפחה הוא שדה חובה";
    }
    if (lastName.length < 2) {
      return "שם משפחה חייב להכיל לפחות 2 תווים";
    }
    return "";
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return "האימייל הוא שדה חובה";
    }
    if (!emailRegex.test(email)) {
      return "אנא הכנס כתובת אימייל חוקית";
    }
    return "";
  };

  const validatePassword = (password) => {
    if (!password) {
      return "הסיסמה היא שדה חובה";
    }
    if (password.length < 6) {
      return "הסיסמה חייבת להכיל לפחות 6 תווים";
    }
    return "";
  };

  // פונקציה להוספת שגיאות כאשר השדה מאבד פוקוס
  const handleBlur = (field, value) => {
    switch (field) {
      case "firstName":
        setFirstNameError(validateFirstName(value));
        break;
      case "lastName":
        setLastNameError(validateLastName(value));
        break;
      case "email":
        setEmailError(validateEmail(value));
        break;
      case "password":
        setPasswordError(validatePassword(value));
        break;
      default:
        break;
    }
  };

  // פונקציה לטיפול בהרשמה
  const handleSignUp = async () => {
    // ולידציה על השדות לפני הרשמה
    const newFirstNameError = validateFirstName(firstName);
    const newLastNameError = validateLastName(lastName);
    const newEmailError = validateEmail(email);
    const newPasswordError = validatePassword(password);

    setFirstNameError(newFirstNameError);
    setLastNameError(newLastNameError);
    setEmailError(newEmailError);
    setPasswordError(newPasswordError);

    // אם יש שגיאות, לא נבצע הרשמה
    if (
      newFirstNameError ||
      newLastNameError ||
      newEmailError ||
      newPasswordError
    ) {
      return;
    }

    const newUser = {
      firstName,
      lastName,
      email,
      password,
      userType: 2,
      createdAt: new Date().toISOString(), // הוסף את createdAt
      updatedAt: new Date().toISOString(), // הוסף את updatedAt אם נדרש
      // createdAt: new Date().toISOString()
    };

    try {
      await UserAxios.addUser(newUser);
      // הבאת כל המשתמשים לאחר ההוספה
      const allUsers = await UserAxios.getAllUsers();
      myDispatch(FillUsersData(allUsers));

      // שליחת מייל למשתמש החדש
      try {
        const message = {
          to: [newUser.email],
          subject: "הצטרפת בהצלחה",
          body: `
          <html>
          <head>
            <style>
              body {
                font-family: 'Arial', sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
                color: #333;
                text-align: right;
                direction: rtl;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                padding: 20px;
                text-align: right;
              }
              h1 {
                color: #4CAF50;
                font-size: 24px;
                margin-top: 0;
              }
              p {
                color: #555;
                line-height: 1.6;
              }
              .button {
                display: inline-block;
                padding: 10px 20px;
                font-size: 16px;
                font-weight: bold;
                color: #ffffff;
                background-color: #4CAF50;
                text-decoration: none;
                border-radius: 5px;
                margin-top: 20px;
                text-align: center;
              }
              .footer {
                font-size: 14px;
                color: #777;
                text-align: right;
                margin-top: 20px;
              }
              img {
                max-width: 100%;
                border-radius: 8px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>${newUser.firstName} שלום</h1>
              <p>הצטרפת בהצלחה אלינו! אנו שמחים לקבל אותך כחלק משלנו</p>
              <a href="http://localhost:3000/" class="button">...לאתר</a>
              <div class="footer">
                <p>בברכה<br/>הצוות</p>
              </div>
            </div>
          </body>
          </html>
      `,
        };

        alert(message.to);
        debugger;
        await emailAxios.addEmail(message, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        alert("ddddd");
      } catch (error) {
        console.error("Error creating user:", error);
      }
    } catch (error) {
      console.error("Error creating user:", error);
      alert("הייתה בעיה ביצירת המשתמש");
    }
  };

  // הגדרת נושא לעיצוב קלטים בכיוון ימין לשמאל
  const theme = createTheme({
    direction: "rtl",
    palette: {
      mode: "light",
    },
  });

  const cacheRtl = createCache({
    key: "muirtl",
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
                  label="שם פרטי"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    setFirstNameError(validateFirstName(e.target.value)); // ולידציה בזמן אמת
                  }}
                  onBlur={() => handleBlur("firstName", firstName)}
                  margin="normal"
                  error={Boolean(firstNameError)}
                  helperText={firstNameError}
                />
                <TextField
                  label="שם משפחה"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    setLastNameError(validateLastName(e.target.value)); // ולידציה בזמן אמת
                  }}
                  onBlur={() => handleBlur("lastName", lastName)}
                  margin="normal"
                  error={Boolean(lastNameError)}
                  helperText={lastNameError}
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
                  onBlur={() => handleBlur("email", email)}
                  margin="normal"
                  fullWidth
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
                  onBlur={() => handleBlur("password", password)}
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
          style={{ marginTop: "16px" }}
          disabled={Boolean(
            firstNameError ||
              lastNameError ||
              emailError ||
              passwordError ||
              !firstName ||
              !lastName ||
              !email ||
              !password
          )} // מניעת לחיצה אם יש שגיאות או שדות ריקים
        >
          הירשם
        </Button>
      </Box>
    </Container>
  );
};

const SignUpModal = () => {
  debugger;
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
              position: "absolute",
              top: "65%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 370,
              backgroundColor: "white",
              // border: '2px solid lightblue',
              borderRadius: "15px",
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
