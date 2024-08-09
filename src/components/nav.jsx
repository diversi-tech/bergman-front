import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import BusinessIcon from "@mui/icons-material/Business";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import { useSelector } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

export const Nav = () => {
  const [user, setUser] = useState(
    useSelector((state) => state.userReducer.currentUser)
  );
  const navigate = useNavigate()
  useEffect(() => {
    const token = Cookies.get("jwtToken");
    try {
      const decodedToken = jwtDecode(token);
      // עדכן את hasAccess לפי סוג המשתמש בתוקן
      setUser(decodedToken);
    } catch (error) {
      console.error("Failed to decode token:", error);
    }
  }, []);
  const onLogout = () => {
    Cookies.remove("jwtToken"); // או שם העוגיה שברצונך למחוק
    // הפניה לעמוד הראשי תוך רענון
    window.location.replace("/");
  };
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <AppBar position="fixed">
      {/* <Toolbar>
        <Button color="inherit" component={Link} to="/">
          <HomeIcon />
        </Button>
        <Button color="inherit" component={Link} to="/Manager">
          מנהלת
        </Button>
        <Tooltip title="חיפוש מועמדים" arrow>
          <Button color="inherit" component={Link} to="/Filter">
            <PersonSearchIcon />
          </Button>
        </Tooltip>
        <Button color="inherit" component={Link} to="/CompanyManagement">
          חברות
        </Button>
        <Tooltip title="עריכת מסננים" arrow>
          <Button color="inherit" component={Link} to="/EditingFilters">
            <ManageSearchIcon />
          </Button>
        </Tooltip>
        <Tooltip title="ניהול עובדים" arrow>
          <Button color="inherit" component={Link} to="/WorkersManagement">
            <ManageAccountsIcon />
          </Button>
        </Tooltip> 
         <Box sx={{ flexGrow: 1 }}></Box>
         <Typography>
          <Button
            id="profile"
            onClick={() => handleNavigation("/changeProfile")}
            sx={{ borderRadius: "50%" }}
          >
            <Tooltip title="שינוי פרופיל " arrow>
              <AccountCircleIcon fontSize="large" sx={{ color: "white" }} />
            </Tooltip>
          </Button>
          שלום {user.firstName}
          <Tooltip title="התנתקות" arrow>
          <IconButton onClick={onLogout}>
            <LogoutIcon sx={{ color: "white" }} />
          </IconButton>
          </Tooltip>
        </Typography>
      </Toolbar> */}
      <Toolbar>
        <Tooltip title=" ניהול" arrow>
          <Button color="inherit" component={Link} to="/Manager" >
            <AdminPanelSettingsIcon />
          </Button>
        </Tooltip>
        <Tooltip title="חיפוש מועמדים" arrow>
          <Button color="inherit" component={Link} to="/Filter">
            <PersonSearchIcon />
          </Button>
        </Tooltip>
        <Tooltip title="עריכת מסננים" arrow>
          <Button color="inherit" component={Link} to="/EditingFilters">
            <ManageSearchIcon />
          </Button>
        </Tooltip>
        <Tooltip title="ניהול חברות" arrow>
          <Button color="inherit" component={Link} to="/CompanyManagement">
            <BusinessIcon />
          </Button>
        </Tooltip>
        <Box sx={{ flexGrow: 1 }}></Box>
        <Typography>
          <Button
            id="profile"
            onClick={() => handleNavigation("/changeProfile")}
            sx={{ borderRadius: "50%" }}
          >
            <Tooltip title="שינוי פרופיל " arrow>
              <AccountCircleIcon fontSize="large" sx={{ color: "white" }} />
            </Tooltip>
          </Button>
          שלום {user.firstName}
          <Tooltip title="התנתקות" arrow>
            <IconButton onClick={onLogout}>
              <LogoutIcon sx={{ color: "white" }} />
            </IconButton>
          </Tooltip>
        </Typography>
        {/* <Box sx={{ flexGrow: 1 }}></Box>
        <Typography>שלום {user.person.firstName}</Typography> */}
      </Toolbar>
    </AppBar>
  );
};
