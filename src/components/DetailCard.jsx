import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";

const DetailCard = ({ details }) => {
  return (
    <Card>
      <CardContent>
        <Grid container spacing={2}>
          {Object.keys(details).map((key) => (
            <Grid item xs={6} key={key}>
              <Typography variant="subtitle2">{key}</Typography>
              <Typography variant="body1">{details[key]}</Typography>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default DetailCard;
