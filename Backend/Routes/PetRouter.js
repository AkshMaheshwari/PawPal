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
Petrouter.post("/add", async (req, res) => {
  try {
    const pet = new Pet(req.body);
    const savedPet = await pet.save();
    res.status(201).json(savedPet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Delete Route - delete a pet by ID
Petrouter.delete("/:id", async(req, res) =>{
  try{
    const deletedPet = await Pet.findByIdAndDelete(req.params.id);
    if(!deletedPet)
    {
      return res.status(404).json({message: "Pet not found"});
    }
    res.status(204).send();
  }
  catch(error){
    res.status(500).json({message: error.message});
  }
});

Petrouter.put("/:id", async(req, res) =>{
  try{
    const id = req.params.id;
    const findPet = await(Pet.findById(id));
    if(!findPet){
      return res.status(404).json({message: "Pet not found"});
    }

    const updatedPet = await Pet.findByIdAndUpdate(id, req.body, {new: true});
    res.json(updatedPet);
  }
  catch(e){
    res.status(500).json({message: e.message});
  }
});
export default Petrouter;
