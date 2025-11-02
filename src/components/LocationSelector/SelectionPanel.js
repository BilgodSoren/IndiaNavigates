// frontend/src/components/LocationSelector/SelectionPanel.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  TextField,
  Button,
} from "@mui/material";
import { api } from "../../services/api";

const SelectionPanel = ({ onSelect }) => {
  const [data, setData] = useState({
    countries: [],
    states: [],
    cities: [],
  });
  const [selected, setSelected] = useState({
    country: "",
    state: "",
    city: "",
  });
  const [coords, setCoords] = useState({ lat: "", lon: "" });
  const [loading, setLoading] = useState(false);

  // 🔹 Load countries once
  useEffect(() => {
    api.getCountries()
      .then((res) => setData((d) => ({ ...d, countries: res })))
      .catch(console.error);
  }, []);

  // 🔹 Load states when country changes
  useEffect(() => {
    if (!selected.country) return;
    setLoading(true);
    Promise.all([
      api.getCountry(selected.country),
      api.getStates(selected.country),
    ])
      .then(([country, states]) => {
        setData((d) => ({ ...d, states }));
        onSelect({ country });
      })
      .finally(() => setLoading(false));
  }, [selected.country, onSelect]);

  // 🔹 Load cities when state changes
  useEffect(() => {
    if (!selected.state) return;
    setLoading(true);
    Promise.all([
      api.getState(selected.country, selected.state),
      api.getCities(selected.country, selected.state),
    ])
      .then(([state, cities]) => {
        setData((d) => ({ ...d, cities }));
        onSelect({ state });
      })
      .finally(() => setLoading(false));
  }, [selected.state, selected.country, onSelect]);

  // 🔹 Handle city select
  const handleCity = (name) => {
    setSelected((s) => ({ ...s, city: name }));
    const chosen = data.cities.find((c) => c.name === name);
    if (chosen) onSelect({ city: chosen });
  };

  // 🔹 Handle coordinate lookup
  const handleLookup = async () => {
    if (!coords.lat || !coords.lon) return alert("Enter coordinates");
    setLoading(true);
    try {
      const res = await api.byCoords(coords.lat, coords.lon);
      const place = res?.features?.[0]?.properties;
      if (place)
        onSelect({
          country: place.country,
          state: place.state,
          city: place.place || place.name,
          coordinates: coords,
        });
    } catch (e) {
      alert("Lookup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: "grid", gap: 2 }}>
      <FormControl fullWidth>
        <InputLabel>Country</InputLabel>
        <Select
          value={selected.country}
          onChange={(e) => setSelected({ country: e.target.value, state: "", city: "" })}
        >
          <MenuItem value="">Select country</MenuItem>
          {data.countries.map((c) => (
            <MenuItem key={c.iso2} value={c.iso2}>
              {c.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth disabled={!selected.country}>
        <InputLabel>State</InputLabel>
        <Select
          value={selected.state}
          onChange={(e) => setSelected((s) => ({ ...s, state: e.target.value, city: "" }))}
        >
          <MenuItem value="">Select state</MenuItem>
          {data.states.map((s) => (
            <MenuItem key={s.iso2} value={s.iso2}>
              {s.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth disabled={!selected.state}>
        <InputLabel>City</InputLabel>
        <Select value={selected.city} onChange={(e) => handleCity(e.target.value)}>
          <MenuItem value="">Select city</MenuItem>
          {data.cities.map((c) => (
            <MenuItem key={c.id || c.name} value={c.name}>
              {c.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box sx={{ display: "flex", gap: 1 }}>
        <TextField
          label="Lat"
          size="small"
          value={coords.lat}
          onChange={(e) => setCoords((c) => ({ ...c, lat: e.target.value }))}
        />
        <TextField
          label="Lon"
          size="small"
          value={coords.lon}
          onChange={(e) => setCoords((c) => ({ ...c, lon: e.target.value }))}
        />
        <Button variant="contained" onClick={handleLookup} disabled={loading}>
          Lookup
        </Button>
      </Box>

      {loading && <CircularProgress size={24} sx={{ mx: "auto" }} />}
    </Box>
  );
};

export default SelectionPanel;
