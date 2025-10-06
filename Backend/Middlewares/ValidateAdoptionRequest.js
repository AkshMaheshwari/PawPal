export const validateAdoptionRequest = (req, res, next) => {
  const { pet, adopterDetails } = req.body;

  // Validate pet ID (should be a string ID, not an object)
  if (!pet || typeof pet !== 'string') {
    return res.status(400).json({ 
      success: false, 
      message: "Missing or invalid pet ID" 
    });
  }

  // Validate adopterDetails exists and is an object
  if (!adopterDetails || typeof adopterDetails !== 'object') {
    return res.status(400).json({ 
      success: false, 
      message: "Missing adopter details" 
    });
  }

  // Validate required fields in adopterDetails
  const { fullName, email, phone, address } = adopterDetails;
  
  if (!fullName || !fullName.trim()) {
    return res.status(400).json({ 
      success: false, 
      message: "Full name is required" 
    });
  }

  if (!email || !email.trim()) {
    return res.status(400).json({ 
      success: false, 
      message: "Email is required" 
    });
  }

  if (!phone || !phone.trim()) {
    return res.status(400).json({ 
      success: false, 
      message: "Phone number is required" 
    });
  }

  if (!address || !address.trim()) {
    return res.status(400).json({ 
      success: false, 
      message: "Address is required" 
    });
  }

  next();
};