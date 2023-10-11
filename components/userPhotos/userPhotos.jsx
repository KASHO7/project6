import React from "react";
import {
    Typography,
    Grid,
    Card,
    CardHeader,
    CardMedia,
    CardContent
} from "@material-ui/core";
import { Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

/**
 * Define UserPhotos, a React component of the PhotoApp
 */
class UserPhotos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            photos: []
        };
        this.userId = props.match.params.userId;

        this.fetchUserData();
        this.fetchUserPhotos();
    }

    fetchUserData() {
        fetchModel(`http://localhost:3000/user/${this.userId}`).then(response => {
            this.setState({ user: response.data });
            this.props.changeView(
                "Photos of",
                `${response.data.first_name} ${response.data.last_name}`
            );
        });
    }

    fetchUserPhotos() {
        fetchModel(`http://localhost:3000/photosOfUser/${this.userId}`).then(response => {
            this.setState({ photos: response.data });
        });
    }

    render() {
        const { user, photos } = this.state;

        return (
            <div className="user-photos">
                {user ? (
                    <div>
                        <Typography variant="h3">
                            {user.first_name} {user.last_name}'s photos
                        </Typography>
                        <Grid container spacing={3}>
                            {photos.map(photo => (
                                <Grid item xs={12} sm={6} md={4} key={photo._id}>
                                    <Card className="card">
                                        <CardHeader title={photo.date_time} />
                                        <CardMedia
                                            component="img"
                                            alt={`${user.first_name}'s Photo`}
                                            height="300"
                                            width="300"
                                            image={`/images/${photo.file_name}`}
                                            title={`${user.first_name}'s Photo`}
                                        />
                                        <CardContent>
                                            <Typography variant="body2" color="textSecondary">
                                                {photo.comments
                                                    ? photo.comments.map(comment => (
                                                        <div key={comment._id}>
                                                            <Typography variant="caption">{comment.date_time}</Typography>
                                                            <Link to={`/users/${comment.user._id}`}>
                                                                {`${comment.user.first_name} ${comment.user.last_name}`}
                                                            </Link>
                                                            <Typography variant="body2">{comment.comment}</Typography>
                                                        </div>
                                                    ))
                                                    : null}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                ) : (
                    <div>User not found</div>
                )}
            </div>
        );
    }
}

export default UserPhotos;
