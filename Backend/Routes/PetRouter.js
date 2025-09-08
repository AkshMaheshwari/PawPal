import express from "express";
import Pet from "../Models/Pet.js";

const Petrouter = express.Router();

// GET all pets (with optional filters later)
Petrouter.get("/", async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST - add new pet
Petrouter.post("/", async (req, res) => {
  try {
    const pet = new Pet(req.body);
    const savedPet = await pet.save();
    res.status(201).json(savedPet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default Petrouter;
