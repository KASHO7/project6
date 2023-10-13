import React from "react";
import { Typography, Grid, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

const DETAILS = "Info about ";

class UserDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            error: null,
        };
        this.userId = props.match.params.userId;
        console.log("User ID from URL:", this.userId); // Log the user ID to the console
    }

    async componentDidMount() {
        try {
            let newUserID = this.props.match.params.userId;
            let response = await fetchModel(`http://localhost:3000/user/${newUserID}`);
            let newUser = response.data;
            this.setState({ user: newUser });
            this.props.changeView(DETAILS, `${newUser.first_name} ${newUser.last_name}`);
        } catch (error) {
            console.error("Error loading user data:", error);
            this.setState({ error });
        }
    }

    render() {
        const { user, error } = this.state;

        if (error) {
            return <div>Error loading user data. Please try again later.</div>; // Display an error message
        }

        if (!user) {
            return <div>Loading...</div>; // Display a loading spinner or other loading indicator
        }

        return (
            <Grid container justifyContent="space-evenly" alignItems="center">
                <Grid item xs={6}>
                    <Typography variant="h3">{`${user.first_name} ${user.last_name}`}</Typography>
                    <Typography variant="h5">
                        {user.occupation} <br />
                        based in {user.location}
                    </Typography>
                    <Typography variant="body1">{user.description}</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Button variant="contained" size="large">
                        <Link to={`/photos/${user._id}`}>See photos</Link>
                    </Button>
                </Grid>
            </Grid>
        );
    }
}

export default UserDetail;
