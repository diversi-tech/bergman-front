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
import BusinessIcon from '@mui/icons-material/Business';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

export const Nav = () => {
    const user = useSelector(state => state.userReducer.currentUser)
    return (
        <AppBar position="fixed">
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
                {/* <Tooltip title="ניהול עובדים" arrow>
                    <Button color="inherit" component={Link} to="/WorkersManagement">
                        <ManageAccountsIcon />
                    </Button>
                </Tooltip> */}
                <Tooltip title="ניהול חברות" arrow>
                    <Button color="inherit" component={Link} to="/CompanyManagement">
                        <BusinessIcon />
                    </Button>
                </Tooltip>
                <Box sx={{ flexGrow: 1 }}></Box>
                <Typography>שלום {user.person.firstName}</Typography>
            </Toolbar>
        </AppBar>
    );
};

