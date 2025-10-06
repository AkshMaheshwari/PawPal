import mongoose from "mongoose";

const adoptionRequestSchema = new mongoose.Schema({
  pet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pet", // Must match your Pet model name exactly
    required: true
  },
  adopterDetails: {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    experienceWithPets: { type: String },
    reasonForAdoption: { type: String },
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const AdoptionRequest = mongoose.model("AdoptionRequest", adoptionRequestSchema);
export default AdoptionRequest;