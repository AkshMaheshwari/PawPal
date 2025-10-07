import express from "express";
import Contact from "../Models/Contact.js";

const Contactrouter = express.Router();

//POST Route
Contactrouter.post("/", async(req, res)=>{
    try {
        const {name, email, subject, message} = req.body;
        if(!name || !email || !subject || !message){
            return res.status(400).json({message: "All fields are required"});
        }

        
        const contactModel = new Contact({name, email, subject, message});
        await contactModel.save();
        console.log(res);
        return res.status(201).json({message: "Message sent successfully"});

    } catch (error) {
        return res.status(500).json({message: "Internal server error"});
    }
});

export default Contactrouter;