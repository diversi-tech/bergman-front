import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Box,
  IconButton,
  InputAdornment,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import { resetPassword } from "../axios/passwordResetAxios";
export const PasswordReset = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = params.get("token");
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password.length < 6) {
      setMessage("הסיסמא חייבת להיות באורך של לפחות 6 תווים");
      return;
    }
    if (password !== confirmPassword) {
      setMessage("הסיסמאות אינן תואמות");
      return;
    }
    try {
      debugger
      const response = await resetPassword(token, password);
      if(response){
      navigate("/Home");
    }
    } catch (error) {
      setMessage("שגיאה באיפוס הסיסמא");
    }
  };
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });
  const theme = createTheme({
    direction: "rtl",
    palette: {
      mode: "light",
    },
  });
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          maxWidth: "400px",
          width: "100%",
          padding: 3,
          borderRadius: 2,
          backgroundColor: "white", // צבע הרקע של הטופס
          boxShadow: 3,
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ width: "100%" }}
        >
          <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={theme}>
              <div dir="rtl">
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="סיסמא חדשה"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="הצגת הסיסמא"
                          onClick={handleClickShowPassword}
                          onMouseDown={(e) => e.preventDefault()}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                    sx: {
                      textAlign: "right",
                    },
                  }}
                  InputLabelProps={{
                    sx: {
                      textAlign: "right", // מיקום הכיתוב בצד ימין
                      direction: "rtl", // בכדי לתמוך בשפות מימין לשמאל
                    },
                  }}
                />
              </div>
            </ThemeProvider>
          </CacheProvider>
          <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={theme}>
              <div dir="rtl">
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="אימות סיסמא"
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="הצגת הסיסמא"
                          onClick={handleClickShowPassword}
                          onMouseDown={(e) => e.preventDefault()}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                    sx: {
                      textAlign: "right",
                    },
                  }}
                  InputLabelProps={{
                    sx: {
                      textAlign: "right", // מיקום הכיתוב בצד ימין
                      // direction: 'rtl' // בכדי לתמוך בשפות מימין לשמאל
                    },
                  }}
                />
              </div>
            </ThemeProvider>
          </CacheProvider>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2, mb: 2 }}
          >
            איפוס סיסמא
          </Button>
          {message && <p>{message}</p>}
        </Box>
      </Box>
    </Box>
  );
};
