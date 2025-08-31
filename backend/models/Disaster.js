// backend/models/Disaster.js
import mongoose from "mongoose";

const disasterSchema = new mongoose.Schema({
  type: String, // earthquake, fire, flood, cyclone
  place: String,
  magnitude: Number,
  coords: [Number], // [lon, lat]
  time: Date,
});

export default mongoose.model("Disaster", disasterSchema);
