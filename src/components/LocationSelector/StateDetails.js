// frontend/src/components/LocationSelector/StateDetails.jsx
import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const StateDetails = ({ state }) => {
  if (!state) return null;
  return (
    <Card sx={{ mt: 2 }}>
      <CardContent>
        <Typography variant="h6">State</Typography>
        <Typography>Name: {state.name}</Typography>
        <Typography>ISO: {state.iso2 || state.iso_code || "N/A"}</Typography>
        <Typography>Latitude: {state.latitude || "N/A"} </Typography>
        <Typography>Longitude: {state.longitude || "N/A"} </Typography>
      </CardContent>
    </Card>
  );
};

export default StateDetails;
