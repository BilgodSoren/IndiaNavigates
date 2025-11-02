import React, { useState } from "react";
import SelectionPanel from "./SelectionPanel";
import CountryDetails from "./CountryDetails";
import StateDetails from "./StateDetails";
import CityDetails from "./CityDetails";
import MapView from "./MapView";
import { Box, Typography, Divider, Avatar } from "@mui/material";
import { MapPin, Layers, Compass, Search } from "lucide-react";
import "./LocationSelector.css";
import "./MapViewSection.css"; // ⬅️ new map-specific css file

const LocationSelector = () => {
  const [selected, setSelected] = useState({});

  const handleSelect = (payload) => {
    setSelected((prev) => ({ ...prev, ...payload }));
  };

  const coords =
    (selected.city &&
      ((selected.city.latitude && selected.city.longitude)
        ? [selected.city.latitude, selected.city.longitude]
        : selected.city.latlng || null)) ||
    (selected.state &&
      ((selected.state.latitude && selected.state.longitude)
        ? [selected.state.latitude, selected.state.longitude]
        : null)) ||
    (selected.country &&
      (selected.country.latlng
        ? [selected.country.latlng[0], selected.country.latlng[1]]
        : null)) ||
    (selected.coordinates && [
      Number(selected.coordinates.lat),
      Number(selected.coordinates.lon),
    ]) ||
    null;

  const label =
    selected.city?.name ||
    selected.state?.name ||
    selected.country?.name?.common ||
    selected.country?.name ||
    "Selected place";

  return (
    <Box className="gradient-dashboard">
      {/* Sidebar */}
      <Box className="gradient-sidebar">
        <Typography variant="h5" className="logo">
          🌐 GeoDash
          <Box className="selection-section">
            <Typography
              variant="subtitle2"
              sx={{ color: "#fff", mb: 1, fontWeight: 600 }}
            >
              Choose Location
            </Typography>
            <SelectionPanel onSelect={handleSelect} />
          </Box>
        </Typography>
      </Box>

      {/* Main Content */}
      <Box className="gradient-main">
        {/* Header */}
        <Box className="main-header">
          <Typography variant="h5" className="welcome-text">
            Welcome back, Explorer! 🌎
          </Typography>
          <Box className="header-actions">
            <Box className="search-bar">
              <Search size={18} color="#777" />
              <input placeholder="Search a place..." />
            </Box>
            <Avatar
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Explorer"
              alt="profile"
            />
          </Box>
        </Box>

        {/* Summary Cards */}
        <Box className="summary-row">
          <Box className="gradient-card pink">
            <MapPin size={26} />
            <Typography variant="subtitle1">Country</Typography>
            <Typography className="value">
              {selected.country?.name?.common || selected.country?.name || "--"}
            </Typography>
          </Box>
          <Box className="gradient-card blue">
            <Layers size={26} />
            <Typography variant="subtitle1">State</Typography>
            <Typography className="value">
              {selected.state?.name || "--"}
            </Typography>
          </Box>
          <Box className="gradient-card purple">
            <Compass size={26} />
            <Typography variant="subtitle1">City</Typography>
            <Typography className="value">
              {selected.city?.name || "--"}
            </Typography>
          </Box>
        </Box>

        {/* Details and Map Section */}
        <Box className="details-map-container">
          <Box className="details-column glass-card">
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
              Location Details
            </Typography>
            <Divider sx={{ mb: 2, borderColor: "rgba(255,255,255,0.2)" }} />
            <CountryDetails country={selected.country} />
            <StateDetails state={selected.state} />
            <CityDetails city={selected.city} />
          </Box>

          {/* ✅ Optimized Map Section */}
          <Box className="map-column glass-card map-view-section">
            {/* <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
              Map View
            </Typography>
            <Divider sx={{ mb: 2, borderColor: "rgba(255,255,255,0.2)" }} />
            <Box className="map-container">
              {/* <MapView  coords={coords}  /> */}
            </Box> 
          </Box>
        </Box>
      </Box>
    // </Box>
  );
};

export default LocationSelector;
