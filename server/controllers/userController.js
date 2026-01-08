import User from "../models/User.js";
import bcrypt from "bcrypt";
import { response } from "express";
import jwt from "jsonwebtoken";
import Resume from "../models/Resume.js";

const generateToken = (userID) => {
  const token = jwt.sign({ userID }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  return token;
};

//controller for user registration
//POST :/api/users/register
export async function registerUser(req, res) {
  try {
    const { name, email, password } = req.body;

    //check if required fields are present
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "missing required field",
      });
    }

    //check if the users is already present
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    //hash password before createing the user
    const hashedPassword = await bcrypt.hash(password, 10);

    // create new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    //generate token

    const token = generateToken(newUser._id);
    newUser.password = undefined;

    return response
      .status(201)
      .json({ message: "user created successfully" }, token, { user: newUser });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

//controller for user login
//POST : /api/users/login

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    //check if the user exists

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "invalid email" });
    }

    //check if password is correct
    if (!user.comparePassword(password)) {
      return res.status(400).json({ message: "password is wrong" });
    }

    //return success message with the token

    const token = generateToken(user._id);
    user.password = undefined;

    return res.status(201).json({
      message: "loggin success",
      token,
      user,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
}

//controller for getting user by id
//GET:/api/user/data

export async function getUserById(req, res) {
  try {
    const userID = req.userID;

    const user = await User.findOne(userID);

    if (!user) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    user.password = undefined;

    return res.status(201).json({
      user,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

//controller for getting user resumes
//GET:/api/users/resume

export const getUserResume = async (req, res) => {
  try {
    const userId = req.userID;

    //return user resumes

    const resume = await Resume.find({ userId });
    return res.status(200).json({ resumes });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};


