import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto"; // ✅ Use crypto instead
import Order from "../Models/Donations.js";

const router = express.Router();

// Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Helper function to validate signature
const isValidSignature = (order_id, payment_id, signature) => {
  const generated_signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${order_id}|${payment_id}`)
    .digest("hex");
  return generated_signature === signature;
};

// ✅ Create Razorpay order & store in MongoDB
router.post("/create-order", async (req, res) => {
  try {
    const { amount, name, email, notes = {} } = req.body;

    const razorpayOrder = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes,
    });

    const order = new Order({
      order_id: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      receipt: razorpayOrder.receipt,
      name,
      email,
      notes,
    });

    await order.save();
    res.json(razorpayOrder);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating order");
  }
});

// ✅ Verify payment
router.post("/verify-payment", async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  try {
    const valid = isValidSignature(razorpay_order_id, razorpay_payment_id, razorpay_signature);
    if (!valid) return res.status(400).json({ status: "verification_failed" });

    const order = await Order.findOne({ order_id: razorpay_order_id });
    if (order) {
      order.status = "paid";
      order.payment_id = razorpay_payment_id;
      await order.save();
    }

    res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "Error verifying payment" });
  }
});

export default router;
