// backend/server.js
import express from "express";
import fetch from "node-fetch";
import mongoose from "mongoose";
import cors from "cors";
import csv from "csvtojson"; // for parsing CSV

// MongoDB schema
import Disaster from "./models/Disaster.js";

const app = express();
app.use(cors());

// ----------------- EARTHQUAKES -----------------
app.get("/api/earthquakes", async (req, res) => {
  try {
    // USGS API for India region
    const response = await fetch(
      "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&minlatitude=6.5&maxlatitude=37.0&minlongitude=68.0&maxlongitude=97.5&limit=50"
    );
    const data = await response.json();

    // Map and store Indian earthquakes in DB
    await Disaster.insertMany(
      data.features.map((eq) => ({
        type: "earthquake",
        place: eq.properties.place,
        magnitude: eq.properties.mag,
        coords: eq.geometry.coordinates.slice(0, 2), // [lon, lat]
        time: new Date(eq.properties.time),
      })),
      { ordered: false } // ignore duplicates
    ).catch(() => {});

    res.json(data.features);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching earthquakes from India");
  }
});

// ----------------- FIRES -----------------
const VALID_SOURCES = [
  "MODIS_NRT",
  "VIIRS_SNPP_NRT",
  "VIIRS_NOAA20_NRT",
  "VIIRS_NOAA21_NRT",
];

app.get("/api/fires", async (req, res) => {
  try {
    const url =
      "https://firms.modaps.eosdis.nasa.gov/api/area/csv/a4e08933d4fc9c3a4be96d4d01089ef7/MODIS_NRT/world/1/2025-08-25";
    console.log("👉 Fetching:", url);

    const response = await fetch(url);
    console.log("👉 Status:", response.status);

    if (!response.ok) {
      return res.status(500).json({ error: "Bad response from FIRMS", status: response.status });
    }

    const csvData = await response.text();
    console.log("👉 CSV length:", csvData.length);
    console.log("👉 CSV preview:\n", csvData.split("\n").slice(0, 5).join("\n"));

    const fires = await csv().fromString(csvData);
    console.log("👉 Parsed rows:", fires.length);

    res.json({
      status: "success",
      total: fires.length,
      preview: fires.slice(0, 5),
    });
  } catch (err) {
    console.error("🔥 Caught error:", err);
    res.status(500).json({ error: err.message, stack: err.stack });
  }
});



// app.get("/api/fires", async (req, res) => {
//   try {
//     const response = await fetch(
//       "https://firms.modaps.eosdis.nasa.gov/api/area/csv/MODIS_C6_1_Global_24h.csv"
//     );
//     const csvData = await response.text();

//     // Convert CSV to JSON
//     const fires = await csv().fromString(csvData);

//     // Filter fires in India
//     const indiaFires = fires.filter((f) => {
//       const lat = parseFloat(f.latitude);
//       const lon = parseFloat(f.longitude);
//       return lat >= 6.5 && lat <= 37 && lon >= 68 && lon <= 97.5;
//     });

//     // Insert into DB
//     await Disaster.insertMany(
//       indiaFires.map((f) => ({
//         type: "fire",
//         place: f["location"] || "Unknown",
//         magnitude: parseFloat(f["brightness"]) || 0, // use brightness as intensity
//         coords: [parseFloat(f.longitude), parseFloat(f.latitude)],
//         time: new Date(
//           f.acq_date + "T" + f.acq_time.slice(0, 2) + ":" + f.acq_time.slice(2, 4) + ":00Z"
//         ),
//       })),
//       { ordered: false } // ignore duplicates
//     ).catch(err => console.error(err));

//     res.json(indiaFires);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Error fetching fires");
//   }
// });

// ----------------- MONGODB CONNECTION -----------------
mongoose
  .connect("mongodb://localhost:27017/disasterdb")
  .then(() => {
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
