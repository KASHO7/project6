import React from "react";
import {
    List,
    ListItem,
    ListItemText,
    Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

function UserList() {
    const users = window.models.userListModel();

    return (
        <div>
            <Typography variant="body1">
                This is the user list, which takes up 3/12 of the window.
            </Typography>
            <List component="nav">
                {users.map((user) => (
                    <ListItem key={user.id}>
                        <Link to={`/users/${user.id}`}>
                            <ListItemText primary={user.first_name} />
                        </Link>
                    </ListItem>
                ))}
            </List>
        </div>
    );
}

export default UserList;
