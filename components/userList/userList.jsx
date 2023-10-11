import React from "react";
import { List, ListItem, ListItemText, Divider } from "@material-ui/core";
import { Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

/**
 * Define UserList, a React component of the PhotoApp
 */
class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        };

        this.fetchUserList();
    }

    fetchUserList() {
        fetchModel(`http://localhost:3000/user/list`).then(response => {
            this.setState({ users: response.data });
        });
    }

    render() {
        const { users } = this.state;

        return (
            <div className="user-list">
                <List component="nav">
                    {users.length > 0 ? (
                        users.map(user => (
                            <Link to={`/users/${user._id}`} key={user._id} style={{ textDecoration: 'none' }}>
                                <ListItem button>
                                    <ListItemText primary={`${user.first_name} ${user.last_name}`} />
                                </ListItem>
                                <Divider />
                            </Link>
                        ))
                    ) : (
                        <ListItem>
                            <ListItemText primary="No users available" />
                        </ListItem>
                    )}
                </List>
            </div>
        );
    }
}

export default UserList;
