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
import logo from "../images/logo1.png";
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
            style={{ width: "300px", height: "auto" }}
          />
        </Box>
      </Box>
      <Container sx={{ position: "relative", zIndex: 2, mt: 1, width: 600 }}>
        <Box>
          <Typography variant="h5" align="center" sx={{ color: "black" }}>
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
        <Box sx={{ textAlign: "center", mt: 0 }}>
          <Button
            variant="contained"
            sx={{ mt: 4, animation: `${pulseAnimation} 2s infinite` }}
            onClick={upload}
          >
            העלאת קורות חיים
            <FileUploadIcon />
          </Button>
        </Box>
      </Container>
      <Box
        component="footer"
        sx={{ py: 25, px: 2, textAlign: "center", mb: 0 }}
      ></Box>
    </React.Fragment>
  );
};
