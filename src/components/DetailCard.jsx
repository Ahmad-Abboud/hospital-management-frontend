import React from "react";
import { Card, CardContent, Typography, Grid2 } from "@mui/material";

const DetailCard = ({ details }) => {
  return (
    <Card>
      <CardContent>
        <Grid2 container spacing={2}>
          {Object.keys(details).map((key) => (
            <Grid2 size={{ xs: 6 }} key={key}>
              <Typography variant="subtitle2">{key}</Typography>
              <Typography variant="body1">{details[key]}</Typography>
            </Grid2>
          ))}
        </Grid2>
      </CardContent>
    </Card>
  );
};

export default DetailCard;
