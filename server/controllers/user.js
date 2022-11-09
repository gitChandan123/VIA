import bcrypt from "bcrypt";
import User from "../models/user.js";

export const signin = async (req, res) => {
  let { email, password } = req.body;
  email = email.trim().toLowerCase();
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist." });
    else {
      const isPasswordCorrect = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (!isPasswordCorrect)
        return res.status(400).json({ message: "Invalid credentials." });
      else res.status(200).json({ result: existingUser });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const signup = async (req, res) => {
  let { email, password, confirmPassword, firstName, lastName } = req.body;
  email = email.trim().toLowerCase();
  firstName = firstName.trim();
  lastName = lastName.trim();
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exist." });
    } else if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords don't match." });
    else {
      const encryptedPassword = await bcrypt.hash(password, 12);
      const result = await User.create({
        email,
        password: encryptedPassword,
        name: `${firstName} ${lastName}`,
      });
      res.status(200).json({ message: "User Registered. Login to continue!" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("name _id email");
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
