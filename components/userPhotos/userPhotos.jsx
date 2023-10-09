import React from "react";
import { Grid, Card, CardContent } from "@mui/material";
import { useParams } from "react-router-dom";

function UserPhotos() {
  const { userId } = useParams();
  const photos = window.models.photoOfUserModel(userId);

  return (
      <Grid container spacing={2}>
        {photos.map((photo) => (
            <Grid item key={photo.id} xs={12} md={6}>
              <Card>
                <CardContent>
                  <img src={photo.file_name} alt={photo.id} />
                  <h4>{photo.date_time}</h4>
                  <p>{photo.description}</p>
                </CardContent>
              </Card>
            </Grid>
        ))}
      </Grid>
  );
}

export default UserPhotos;
