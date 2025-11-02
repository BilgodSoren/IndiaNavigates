// backend/services/boundariesService.js
const axios = require("axios");
const KEY = process.env.BOUNDARIES_RAPIDAPI_KEY;
const HOST = process.env.BOUNDARIES_RAPIDAPI_HOST;
const BASE = `https://${HOST}/reaperfire/rest/v1/public/boundary/place/within`;

module.exports = {
  getByCoordinates: async (latitude, longitude, combine = false) => {
    const opts = {
      method: "GET",
      url: BASE,
      params: { latitude, longitude, combine },
      headers: {
        "x-rapidapi-key": KEY,
        "x-rapidapi-host": HOST,
      },
    };
    const r = await axios.request(opts);
    return r.data;
  },
};
