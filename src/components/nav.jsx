import React, { useEffect, useState } from 'react'
import { AppBar, Box, Button, Toolbar, Tooltip, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import PersonIcon from '@mui/icons-material/Person';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { useSelector } from 'react-redux';

export const Nav = () => {
    const user = useSelector(state => state.userReducer.currentUser)


    return (
        <AppBar position="fixed">
            <Toolbar>
                <Tooltip title="דף הבית" arrow>
                    <Button color="inherit" component={Link} to="/Home">
                        <HomeIcon />
                    </Button>
                </Tooltip>

                <Button color="inherit" component={Link} to="/Manager" >
                    מנהלת
                </Button>
                <Tooltip title="חיפוש מועמדים" arrow>
                    <Button color="inherit" component={Link} to="/Filter">
                        <PersonSearchIcon />
                    </Button>
                </Tooltip>

                <Button color="inherit" component={Link} to="/Secretary">
                    מזכירה
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

                {/* <Tooltip title="פרופיל" arrow>
                    <Button color="inherit" component={Link} to="/Profile">
                        <PersonIcon />
                    </Button>
                </Tooltip> */}

                <Tooltip title="התחברות" arrow>
                    <Button color="inherit" component={Link} to="/Login" >
                        <LoginIcon />
                    </Button>
                </Tooltip>
                <Button color="inherit" component={Link} to="/SignUp">
                    הרשמה
                </Button>
                <Box sx={{ flexGrow: 1 }}></Box>
                <Typography>שלום {user.person.firstName}</Typography>
            </Toolbar>
        </AppBar>
    );
};

