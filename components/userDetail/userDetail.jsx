import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import "./userDetail.css";
import fetchModel from "../../lib/fetchModelData.js";

class UserDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
    };
  }

  componentDidMount() {
    this.fetchUserData(this.props.match.params.userId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.userId !== this.props.match.params.userId) {
      this.fetchUserData(this.props.match.params.userId);
    }
  }

  fetchUserData(userId) {
    let promise = fetchModel(`http://localhost:3000/user/${userId}`);
    promise
      .then((response) => {
        let newUser = response.data;
        this.setState({ user: newUser });
        this.props.changeView(`${newUser.first_name} ${newUser.last_name}`);
      })
      .catch((error) => {
        // Handle errors, e.g., display an error message to the user
        console.error("Error fetching user data:", error);
      });
  }

  render() {
    return this.state.user ? (
      <Grid container justifyContent="space-between" alignItems="center">
        <Typography variant="h3" color="inherit">
          {`${this.state.user.first_name} ${this.state.user.last_name}`}
        </Typography>
        <Typography variant="h5">
          Occupation: {`${this.state.user.occupation}`}
        </Typography>
        <Typography variant="h5">
          Location: {`${this.state.user.location}`}
        </Typography>
        <Typography variant="body1">
          Description: {`${this.state.user.description}`}
        </Typography>
        <Typography variant="h3">
          <Link to={`/photos/${this.state.user._id}`}>Photos</Link>
        </Typography>
      </Grid>
    ) : (
      <div />
    );
  }
}

export default UserDetail;
