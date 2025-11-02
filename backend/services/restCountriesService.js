// backend/services/restCountriesService.js
const axios = require("axios");
const BASE = "https://restcountries.com/v3.1/alpha";

module.exports = {
  getByAlpha: async (iso2) => {
    try {
      const r = await axios.get(`${BASE}/${iso2}`);
      return r.data[0]; // restcountries returns array
    } catch (e) {
      return null;
    }
  },
};
