import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

function TopBar() {
    const { pathname } = useLocation();

    const getTitle = () => {
        switch (pathname) {
            case "/users":
                return "All Users";
            case `/users/:userId`:
                return "User Details";
            case `/photos/:userId`:
                return "Photos of User";
            default:
                return "Photo App";
        }
    };

    return (
        <AppBar className="topbar-appBar" position="absolute">
            <Toolbar>
                <Typography variant="h5" color="inherit">
                    {getTitle()}
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default TopBar;
