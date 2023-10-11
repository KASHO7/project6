import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch } from "react-router-dom";
import { Grid, Paper } from "@material-ui/core";
import "./styles/main.css";

// import necessary components
import TopBar from "./components/topBar/TopBar";
import UserDetail from "./components/userDetail/userDetail";
import UserList from "./components/userList/userList";
import UserPhotos from "./components/userPhotos/userPhotos";

class PhotoShare extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            view: ""
        };
    }

    changeView = (newView, name) => {
        this.setState({ view: newView + (name ? ` ${name}` : "") });
    };

    render() {
        return (
            <HashRouter>
                <div>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TopBar view={this.state.view} />
                        </Grid>
                        <Grid item sm={3}>
                            <Paper className="cs142-main-grid-item">
                                <UserList />
                            </Paper>
                        </Grid>
                        <Grid item sm={9}>
                            <Paper className="cs142-main-grid-item">
                                <Switch>
                                    <Route
                                        path="/users/:userId"
                                        render={props => (
                                            <UserDetail {...props} changeView={this.changeView} />
                                        )}
                                    />
                                    <Route
                                        path="/photos/:userId"
                                        render={props => (
                                            <UserPhotos changeView={this.changeView} {...props} />
                                        )}
                                    />
                                    <Route
                                        path="/users"
                                        render={props => (
                                            <UserList {...props} changeView={this.changeView} />
                                        )}
                                    />
                                </Switch>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </HashRouter>
        );
    }
}

ReactDOM.render(<PhotoShare />, document.getElementById("photoshareapp"));
