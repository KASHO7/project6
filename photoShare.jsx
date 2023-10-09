import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { Grid, Paper } from '@mui/material';
import TopBar from './components/topBar/TopBar';
import UserDetail from './components/userDetail/userDetail';
import UserList from './components/userList/userList';
import UserPhotos from './components/userPhotos/userPhotos';

class PhotoShare extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // TODO: Add state variables for logged-in user and current page
        };
    }

    // TODO: Add handlers for login, logout, and navigation

    render() {
        return (
            <Router>
                <div>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TopBar />
                        </Grid>
                        <Grid item sm={3}>
                            <Paper className="main-sidebar">
                                {/* Sidebar content goes here */}
                            </Paper>
                        </Grid>
                        <Grid item sm={9}>
                            <Paper className="main-content">
                                <Switch>
                                    <Route path="/users/:userId" component={UserDetail} />
                                    <Route path="/photos/:userId" component={UserPhotos} />
                                    <Route path="/" component={UserList} />
                                </Switch>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </Router>
        );
    }
}

// Check if the element with the ID `#photoshareapp` exists in the DOM.
// If it does not exist, create it.
const photoShareAppElement = document.getElementById('photoshareapp') || document.createElement('div');
photoShareAppElement.id = 'photoshareapp';
document.body.appendChild(photoShareAppElement);

// Render the PhotoShare component into the `#photoshareapp` element.
ReactDOM.render(<PhotoShare />, photoShareAppElement);
