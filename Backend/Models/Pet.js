// models/Pet.js
import mongoose from "mongoose";

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ageMonths: { type: Number, required: true },
  type: { type: String, enum: ["Dog", "Cat", "Rabbit"], required: true },
  location: { type: String, enum: ["Mumbai", "Pune"], required: true },
  img: { type: String, required: true },
  rating: { type: Number, default: 0 },

  // new structured attributes
  isVaccinated: { type: Boolean, default: false },
  isHealthy: { type: Boolean, default: true },
  isPlayful: { type: Boolean, default: false },

  tags: [String] // still allow free-form tags
}, { timestamps: true });

export default mongoose.model("Pet", petSchema);
