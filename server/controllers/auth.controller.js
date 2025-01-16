import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
const signToken = (id) => {
  //create jwt token
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "10d",
  });
};

const setCookie = (res, token) => {
  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 10 * 24 * 60 * 60 * 1000,
  });
};

export const signUp = async (req, res) => {
  try {
    const { name, email, password, age, gender, genderPreferences } = req.body;
    if (!name || !email || !password || !age || !gender || !genderPreferences) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    if (age < 18)
      return res.status(400).json({
        success: false,
        message: "You must be 18 or older to sign up",
      });

    const newUser = await userModel.create(
      name,
      email,
      password,
      age,
      gender,
      genderPreferences
    );
    //create token from the user id
    const token = signToken(newUser._id);
    //add max age of 10 days and save cookie
    setCookie(res, token);
    res.status(201).json({ success: true, content: newUser });
  } catch (error) {
    console.log("error in signup", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });

    const user = await userModel.findOne({ email });
    if (!user || !(await user.matchPassword(password)))
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    const token = signToken(user._id);
    setCookie(res, token);
    res.status(200).json({ success: true, content: user });
  } catch (error) {
    console.log("error in login", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ success: true, message: "Logged out" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
