// backend/services/countryStateCityService.js
const axios = require("axios");
const KEY = process.env.CSC_API_KEY;
const BASE = "https://api.countrystatecity.in/v1";

const client = axios.create({
  baseURL: BASE,
  headers: { "X-CSCAPI-KEY": KEY },
});

module.exports = {
  getCountries: async () => {
    const r = await client.get("/countries");
    return r.data;
  },
  getCountry: async (iso2) => {
    const r = await client.get(`/countries/${iso2}`);
    return r.data;
  },
  getStates: async (iso2) => {
    const r = await client.get(`/countries/${iso2}/states`);
    return r.data;
  },
  getState: async (iso2, stateCode) => {
    const r = await client.get(`/countries/${iso2}/states/${stateCode}`);
    return r.data;
  },
  getCities: async (iso2, stateCode) => {
    const r = await client.get(`/countries/${iso2}/states/${stateCode}/cities`);
    return r.data;
  },
};
