import React, { useEffect } from "react";
import {
  Button,
  Box,
  Container,
  Typography,
  Toolbar,
  CssBaseline,
  Tooltip,
  keyframes,
  AppBar,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import logo from '../images/image (10).png'
import LogoutIcon from "@mui/icons-material/Logout";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { Nav } from "./nav";

const pulseAnimation = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
`;
export const Home = () => {
  const navigate = useNavigate();
  let userType = 0;
  let user = {};
  useEffect(() => {
    const token = Cookies.get("jwtToken");
    if (token !== undefined) {
      try {
        // נסה לפרש את התוקן
        const decodedToken = jwtDecode(token);
        userType = decodedToken.userTypeId;
        user = decodedToken;
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, []);
  if (userType === 0) {
    try {
      const token = Cookies.get("jwtToken");
      const decodedToken = jwtDecode(token);
      userType = decodedToken.userTypeId;
      user = decodedToken;
    } catch (error) {
      console.error("Failed to decode token:", error);
    }
  }
  const handleNavigation = (path) => {
    navigate(path);
  };

  const upload = () => {
    if (userType !== 0) {
      handleNavigation("/Profile");
    } else {
        
      handleNavigation("/login");
    }
  };
  const onLogout = () => {
    Cookies.remove("jwtToken"); // או שם העוגיה שברצונך למחוק
    window.location.replace("/");
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box
            sx={{
              border: "1px solid white",
              borderRadius: "30px",
              display: "flex",
              direction: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {userType !== 0 && (
              <Box>
                <Button
                  id="profile"
                  onClick={() => handleNavigation("/changeProfile")}
                  sx={{ borderRadius: "50%" }}
                >
                  <Tooltip title="שינוי פרופיל " arrow>
                    <AccountCircleIcon
                      fontSize="large"
                      sx={{ color: "white" }}
                    />
                  </Tooltip>
                </Button>
              </Box>
            )}
            {userType !== 0 && userType !== 1 && (
              <Box
                sx={{
                  paddingLeft: "10px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{ color: "white", marginRight: "10px" }}
                >
                  שלום {user.firstName}
                </Typography>
                <Tooltip title="התנתקות" arrow>
                <IconButton onClick={onLogout}>
                  <LogoutIcon sx={{ color: "white" }} />
                </IconButton>
                </Tooltip>
              </Box>
            )}
            {userType === 1 && <Nav />}
          </Box>

          {/* תנאי להציג את כפתור התחברות */}
          {userType === 0 && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Button
                variant="contained"
                id="register"
                onClick={() => handleNavigation("/login")}
              >
                התחברות
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          pt: "60px",
        }}
      >
        <Box>
          <img
            src={logo}
            alt="לוגו"
            style={{ width: "100%", height: "auto" }}
          />
        </Box>
      </Box>
      <Container sx={{ position: "relative", zIndex: 2, mt: 1, maxWidth: '100%' }}>
      <Box
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.5)", // רקע שחור שקוף יותר
          padding: 3, // ריפוד סביב התוכן
          borderRadius: 2, // פינות מעוגלות
          marginBottom: 4, // רווח בין הרקע השחור לכפתור
        }}
      >
        <Typography
          variant="h6" // טקסט גדול יותר
          align="center"
          sx={{
            color: "white",
            maxWidth: '800px', // מקסימום רוחב הטקסט
            margin: '0 auto', // מרכז את הטקסט
            lineHeight: 1.6, // גובה קו לקריאות טובה יותר
          }}
        >
          חנה ברגמן מתמחה במתן פתרונות גיוס מדויקים בתחום ההייטק.
          <br />
          מטרתנו היא לחבר בין כישרונות מובילים לבין חברות מובילות בתעשייה, תוך
          הבטחת התאמה מושלמת הן למועמדים והן למעסיקים.
          <br />
          עם הבנה עמוקה של הדרישות הייחודיות של תחום ההייטק,
          <br /> אנו גאים בגישה המדוקדקת שלנו להשמה ושואפים למצוינות ודיוק בכל
          תהליך הגיוס.
        </Typography>
      </Box>
      
    </Container>

    <Box sx={{ textAlign: "center", mt: 4 }}>
          <Button
            variant="contained"
            sx={{ animation: `${pulseAnimation} 2s infinite` }}
            onClick={upload}
          >
            העלאת קורות חיים
            <FileUploadIcon />
          </Button>
        </Box>
      <Box
        component="footer"
        sx={{ py: 25, px: 2, textAlign: "center", mb: 0 }}
      ></Box>
    </React.Fragment>
  );
};
