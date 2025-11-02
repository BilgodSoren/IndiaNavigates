// backend/routes/location.js
const express = require("express");
const router = express.Router();
const csc = require("../services/countryStateCityService");
const rest = require("../services/restCountriesService");
const boundaries = require("../services/boundariesService");

/**
 * GET /api/location/countries
 * GET /api/location/countries/:iso
 * GET /api/location/countries/:iso/states
 * GET /api/location/countries/:iso/states/:stateCode
 * GET /api/location/countries/:iso/states/:stateCode/cities
 * GET /api/location/by-coords?lat=&lon=
 */

router.get("/countries", async (req, res) => {
  try {
    const data = await csc.getCountries();
    res.json(data);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.get("/countries/:iso", async (req, res) => {
  try {
    const data = await csc.getCountry(req.params.iso);
    // enrich from restcountries
    const restData = await rest.getByAlpha(req.params.iso);
    res.json({ ...data, rest: restData });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.get("/countries/:iso/states", async (req, res) => {
  try {
    const data = await csc.getStates(req.params.iso);
    res.json(data);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.get("/countries/:iso/states/:stateCode", async (req, res) => {
  try {
    const data = await csc.getState(req.params.iso, req.params.stateCode);
    res.json(data);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.get("/countries/:iso/states/:stateCode/cities", async (req, res) => {
  try {
    const data = await csc.getCities(req.params.iso, req.params.stateCode);
    res.json(data);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// reverse lookup by coords (Boundaries.io via RapidAPI)
router.get("/by-coords", async (req, res) => {
  try {
    const { lat, lon, combine } = req.query;
    if (!lat || !lon) return res.status(400).json({ error: "lat & lon required" });
    const data = await boundaries.getByCoordinates(lat, lon, combine === "true");
    res.json(data);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

module.exports = router;
