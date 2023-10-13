import React from "react";
import { List, ListItem, ListItemText, Paper, Typography } from "@material-ui/core";
import "./userList.css";
import { Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userList: [],
            error: null,
        };
    }

    async componentDidMount() {
        try {
            let response = await fetchModel("http://localhost:3000/user/list");
            let userList = response.data;
            this.setState({ userList });
        } catch (error) {
            console.error("Error loading user list:", error);
            this.setState({ error });
        }
    }

    render() {
        const { userList, error } = this.state;

        if (error) {
            return <div>Error loading user list. Please try again later.</div>;
        }

        return (
            <Paper className="userList">
                <Typography variant="h6">Users</Typography>
                <List>
                    {userList.map((user) => (
                        <Link to={`/users/${user._id}`} key={user._id} className="userLink">
                            <ListItem button>
                                <ListItemText primary={`${user.first_name} ${user.last_name}`} />
                            </ListItem>
                        </Link>
                    ))}
                </List>
            </Paper>
        );
    }
}

export default UserList;
