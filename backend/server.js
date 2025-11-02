// backend/server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const locationRoutes = require("./routes/location");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/location", locationRoutes);

app.get("/", (req, res) => res.send({ status: "ok", service: "location_service_api" }));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Backend running on http://localhost:${port}`));
