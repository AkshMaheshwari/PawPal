import express from "express";
import dotenv from "dotenv";
import connectDB from "./Models/db.js";

dotenv.config(); // load env variables

const app = express();
const PORT = process.env.PORT || 5000;

// connect to MongoDB
connectDB();

app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("PawPal API running 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
