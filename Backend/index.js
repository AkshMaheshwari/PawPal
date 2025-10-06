// Backend/index.js
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import AuthRouter from "./Routes/AuthRouter.js";
import PetRouter from "./Routes/PetRouter.js";
import AdoptionRequestRouter from "./Routes/AdoptionRequestRouter.js";
import connectDB from "./Models/db.js";

const app = express();
const PORT = process.env.PORT || 3000;

// connect the db
connectDB();

// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use("/Auth", AuthRouter);
app.use("/api/pets", PetRouter);
app.use("/api/requests", AdoptionRequestRouter); // ✅ Added new route

// start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
