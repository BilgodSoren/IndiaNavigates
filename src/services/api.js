// frontend/src/services/api.js
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000/api/location";

export const api = {
  getCountries: () => axios.get(`${API_BASE}/countries`).then(r => r.data),
  getCountry: (iso) => axios.get(`${API_BASE}/countries/${iso}`).then(r => r.data),
  getStates: (iso) => axios.get(`${API_BASE}/countries/${iso}/states`).then(r => r.data),
  getState: (iso, stateCode) => axios.get(`${API_BASE}/countries/${iso}/states/${stateCode}`).then(r => r.data),
  getCities: (iso, stateCode) => axios.get(`${API_BASE}/countries/${iso}/states/${stateCode}/cities`).then(r => r.data),
  byCoords: (lat, lon) => axios.get(`${API_BASE}/by-coords`, { params: { lat, lon } }).then(r => r.data),
};
