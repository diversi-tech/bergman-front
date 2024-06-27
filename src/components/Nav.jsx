import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import React from 'react'

export const Nav = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Button color="inherit" component={Link} to="/Home">
                    עמוד בית
                </Button>
                <Button color="inherit" component={Link} to="/Manager" >
                    מנהלת                </Button>
                <Button color="inherit" component={Link} to="/Filter">
                    מסננים
                </Button>
                <Button color="inherit" component={Link} to="/Secretary">
                    מזכירה
                </Button>
                <Button color="inherit" component={Link} to="/Editing_filters">
                    עריכת מסננים
                </Button>
                <Button color="inherit" component={Link} to="/Workers_management">
                    ניהול עובדים
                </Button>
                <Button color="inherit" component={Link} to="/History">
                היסטוריה
                </Button>
                <Button color="inherit" component={Link} to="/Profile">
                פרופיל
                </Button>
            </Toolbar>
        </AppBar>
    );
}