import AdoptionRequest from "../Models/AdoptionRequests.js";
import Pet from "../Models/Pet.js"; // Adjust path based on your project structure

export const submitAdoptionRequest = async (req, res) => {
  try {
    const { pet, adopterDetails } = req.body;
    
    // Validate that the pet exists
    const petExists = await Pet.findById(pet);
    if (!petExists) {
      return res.status(404).json({ 
        success: false, 
        message: "Pet not found" 
      });
    }

    const newRequest = new AdoptionRequest({ 
      pet, 
      adopterDetails 
    });
    await newRequest.save();

    res.status(201).json({
      success: true,
      message: "Adoption request submitted successfully!",
      data: newRequest,
    });
  } catch (error) {
    console.error("Error submitting adoption request:", error);
    res.status(500).json({ 
      success: false, 
      message: error.message || "Server Error" 
    });
  }
};

export const getAllRequests = async (req, res) => {
  try {
    const requests = await AdoptionRequest.find()
      .populate('pet') // This will include full pet details
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: requests });
  } catch (error) {
    console.error("Error fetching adoption requests:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await AdoptionRequest.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate('pet'); // Populate pet details in response

    if (!updated)
      return res.status(404).json({ 
        success: false, 
        message: "Request not found" 
      });

    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    console.error("Error updating request status:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};