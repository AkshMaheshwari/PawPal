import mongoose from "mongoose";

const donationsSchema = new mongoose.Schema(
  {
    order_id: { type: String, required: true, unique: true }, // Razorpay order ID
    amount: { type: Number, required: true },
    currency: { type: String, default: "INR" },
    receipt: { type: String },
    status: { type: String, default: "created" }, // created | paid
    payment_id: { type: String }, // filled after payment
    notes: { type: Object },
    name: { type: String }, // donor name
    email: { type: String }, // donor email
  },
  { timestamps: true }
);

const Donations = mongoose.model("Donations", donationsSchema);

export default Donations;
