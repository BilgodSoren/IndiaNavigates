// frontend/src/components/LocationSelector/CityDetails.jsx
import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const CityDetails = ({ city }) => {
  if (!city) return null;
  return (
    <Card sx={{ mt: 2 }}>
      <CardContent>
        <Typography variant="h6">City</Typography>
        <Typography>Name: {city.name}</Typography>
        <Typography>Latitude: {city.latitude || city.lat || "N/A"}</Typography>
        <Typography>Longitude: {city.longitude || city.lng || "N/A"}</Typography>
        <Typography>Population: {city.population || "Unknown"}</Typography>
      </CardContent>
    </Card>
  );
};

export default CityDetails;
