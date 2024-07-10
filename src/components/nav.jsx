import React from 'react'
import { AppBar, Button, Toolbar, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import HistoryIcon from '@mui/icons-material/History';
import LoginIcon from '@mui/icons-material/Login';
import PersonIcon from '@mui/icons-material/Person';

export const Nav = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Tooltip title="דף הבית" arrow>
                    <Button color="inherit" component={Link} to="/Home">
                        <HomeIcon />
                    </Button>
                </Tooltip>
                <Button color="inherit" component={Link} to="/Manager" >
                    מנהלת                </Button>
                <Tooltip title="חיפוש מועמדים" arrow>

                    <Button color="inherit" component={Link} to="/Filter">
                        <SearchIcon />
                    </Button>
                </Tooltip>
                <Button color="inherit" component={Link} to="/Secretary">
                    מזכירה
                </Button>
                <Button color="inherit" component={Link} to="/EditingFilters">
                    עריכת מסננים
                </Button>
                <Button color="inherit" component={Link} to="/WorkersManagement">
                    ניהול עובדים
                </Button>
                <Tooltip title="היסטוריית מועמד" arrow>

                    <Button color="inherit" component={Link} to="/History">
                        <HistoryIcon />
                    </Button>
                </Tooltip>
                <Tooltip title="פרופיל" arrow>

                    <Button color="inherit" component={Link} to="/Profile">
                        <PersonIcon />
                    </Button>
                </Tooltip>
                <Tooltip title="התחברות" arrow>

                    <Button color="inherit" component={Link} to="/Login" >
                        <LoginIcon />
                    </Button>
                </Tooltip>
                <Button color="inherit" component={Link} to="/SignUp">
                    הרשמה
                </Button>
            </Toolbar>
        </AppBar>
    );
}