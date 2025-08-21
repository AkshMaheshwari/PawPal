import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../Models/User.js';
export const signUp = async (req, res) => {
  try {
    // your logic here
    const { name, email, password } = req.body;
    const user = await userModel.findOne({email});
    if(user){
        return res.status(400).send({ error: "User already exists" });
    }
    else{
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({ name, email, password: hashedPassword });
        await newUser.save();
        res.status(201).send({ message: "User created successfully", user: { name, email } });
    }

  } catch (err) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).send({ error: "User doesn't exist, please sign up first" });
    }

    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) {
      return res.status(400).send({ error: "Invalid credentials" });
    }

    const { password: hashedPassword, ...userData } = user._doc;
    const jwtToken = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.status(200).send({ message: "Login successful", user: userData, token: jwtToken });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Internal Server Error" });
  }
};
