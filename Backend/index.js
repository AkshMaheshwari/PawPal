// Backend/index.js
import dotenv from 'dotenv';
dotenv.config();                           
import express from 'express';
const app = express();
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './Models/db.js'; 
import AuthRouter from './Routes/AuthRouter.js';   


app.use(cors());
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize database connection
connectDB();

app.use("/Auth", AuthRouter);

app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
});
