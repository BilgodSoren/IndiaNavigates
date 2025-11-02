// frontend/src/components/LocationSelector/CountryDetails.jsx
import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";

const CountryDetails = ({ country }) => {
  if (!country) return null;
  // country from CSC API enriched with restcountries in backend route
  const name = country.name?.common || country.name || country;
  const capital = country.capital?.[0] || country.capital || (country?.rest?.capital?.[0]) || "N/A";
  const population = country.population || country?.rest?.population || "N/A";
  const region = country.region || country?.rest?.region || "N/A";
  const latlng = country.latlng || country?.rest?.latlng || [];

  return (
    <Card sx={{ mt: 2 }}>
      <CardContent>
        <Typography variant="h6">Country</Typography>
        <Grid container spacing={1}>
          <Grid item xs={6}><Typography> Name: {name} </Typography></Grid>
          <Grid item xs={6}><Typography> Capital: {capital} </Typography></Grid>
          <Grid item xs={6}><Typography> Population: {population.toLocaleString ? population.toLocaleString() : population} </Typography></Grid>
          <Grid item xs={6}><Typography> Region: {region} </Typography></Grid>
          <Grid item xs={12}><Typography> Coordinates: {latlng.length ? `${latlng[0]}, ${latlng[1]}` : "N/A"} </Typography></Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CountryDetails;
