import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Box,
  Typography,
  Container,
  CssBaseline,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import UserAxios from "../axios/userAxios"; // עדכן את הנתיב בהתאם למיקום הקובץ
import {
  FillUsersData,
  currentUser as setCurrentUser,
} from "../redux/action/userAction";
import { useNavigate } from "react-router-dom";
import DoneIcon from "@mui/icons-material/Done";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";

const ChangeProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reduxUser = useSelector((state) => state.userReducer.currentUser);

  const [profile, setProfile] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
  });
  useEffect(() => {
    const token = Cookies.get("jwtToken");
    if (token !== undefined) {
      try {
        // נסה לפרש את התוקן
        const decodedToken = jwtDecode(token);
        setProfile({
          username: decodedToken.firstName + " " + decodedToken.lastName || "",
          email: decodedToken.sub || "",
          password: decodedToken.password || "",
          phone: decodedToken.phoneNumber || "",
        });
      } catch (err) {
        console.log(err);
      }
    }
  }, []);
  // useEffect(() => {
  //     if (reduxUser) {
  //         setProfile({
  //             username: reduxUser.username || '',
  //             email: reduxUser.email || '',
  //             password: reduxUser.password || '',
  //             phone: reduxUser.phone || ''
  //         });
  //     }
  // }, [reduxUser]);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const save = async () => {
    try {
      const updatedUser = {
        ...reduxUser,
        ...profile,
      };
      await UserAxios.updateUser(reduxUser.userId, updatedUser);
      dispatch(setCurrentUser(updatedUser));
      const allUsers = await UserAxios.getAllUsers();
      dispatch(FillUsersData(allUsers));
      console.log("פרופיל עודכן בהצלחה:", updatedUser);
      handleNavigation("/Home");
    } catch (error) {
      console.error("שגיאה בעדכון הפרופיל:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    save();
  };
  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });
  const theme = createTheme({
    direction: "rtl",
    palette: {
      mode: "light",
    },
    components: {
        // שינוי סגנון של רכיב Button
        MuiButton: {
          styleOverrides: {
            root: {
              padding: '16px 32px', // שינוי padding (מרווחים פנימיים) כדי להגדיל את התיבה
              fontSize: '16px',     // שינוי גודל הפונט בתוך הכפתור
            },
          },
        },
        MuiTextField: {
            styleOverrides: {
              root: {
                width: '100%', // שינוי רוחב השדה
                maxWidth: '500px', // הגדרת רוחב מקסימלי
              },
            },
          },
    }
  });
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5" color={"black"}>
          שינוי פרופיל
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={theme}>
              <div dir="rtl">
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="שם משתמש"
                  name="username"
                  autoFocus
                  value={profile.username}
                  onChange={handleChange}
                />
              </div>
            </ThemeProvider>
          </CacheProvider>
          <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={theme}>
              <div dir="rtl">
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="אימייל"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                />
              </div>
            </ThemeProvider>
          </CacheProvider>
          <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={theme}>
              <div dir="rtl">
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="password"
                  label="סיסמא"
                  name="password"
                  type="password"
                  value={profile.password}
                  onChange={handleChange}
                />
              </div>
            </ThemeProvider>
          </CacheProvider>
          <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={theme}>
              <div dir="rtl">
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="phone"
                  label="פלאפון"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                />
              </div>
            </ThemeProvider>
          </CacheProvider>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            שמור שינויים
            <DoneIcon />
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ChangeProfile;
