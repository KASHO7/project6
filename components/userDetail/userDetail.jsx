import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Link,
} from "@mui/material";
import { useParams } from "react-router-dom";

function UserDetail() {
  const { userId } = useParams();
  const user = window.models.userModel(userId);

  return (
      <Card>
        <CardContent>
          <h1>{user.first_name} {user.last_name}</h1>
          <p>{user.occupation}</p>
          <p>{user.location}</p>
          <p>{user.description}</p>
        </CardContent>
        <CardActions>
          <Link to={`/photos/${userId}`}>
            <Button variant="contained">See Photos</Button>
          </Link>
        </CardActions>
      </Card>
  );
}

export default UserDetail;
