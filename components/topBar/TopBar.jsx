import React from "react";
import { Grid, AppBar, Toolbar, Typography } from "@material-ui/core";
import fetchModel from "../../lib/fetchModelData";

class TopBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            view: this.props.view || "",
            version: ""
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.view !== this.props.view) {
            this.setState({ view: this.props.view || "" });
            let prom = fetchModel("http://localhost:3000/test/info");
            prom.then(response => {
                this.setState({ version: response.data.__v });
            });
        }
    }

    render() {
        const { view } = this.state;

        return (
            <AppBar className="cs142-topbar-appBar" position="absolute">
                <Toolbar>
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between" // Updated prop here
                        alignItems="center"
                    >
                        <Typography variant="h5" color="inherit">
                            Your Name
                        </Typography>
                        <Typography variant="body1">
                            version: {this.state.version}
                        </Typography>
                        <Typography variant="h5">{view}</Typography>
                    </Grid>
                </Toolbar>
            </AppBar>
        );
    }
}

export default TopBar;
