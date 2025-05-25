import userModel from "../models/user.module.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/getToken.js";
import jwt from "jsonwebtoken";


export const registerUser = async (req, res) => {
  try {
    const { username, fullname, email, password } = req.body;

    if (!username || !fullname || !email || !password) {
      return res.status(403).json({
        success: false,
        msg: "Missing fields",
      });
    }

    const isUserExist = await userModel.findOne({ username, email });

    if (isUserExist) {
      return res.status(403).json({
        success: false,
        msg: "username or email already exist",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const registeredUser = await userModel.create({
      username,
      fullname,
      email,
      password : hashedPassword,
      role : 'user'
    });
    generateToken(res, registeredUser, "User register successfully!");
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      success: false,
      msg: "registerUser : Something went wrong",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, password , role = "user" } = req.body;

    if (!username || !password) {
      return res.status(403).json({
        success: false,
        msg: "Missing fields",
      });
    }

    const user = await userModel.findOne({ username , role});

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "No such user found",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        msg: "Incorrect username or password",
      });
    }
    generateToken(res, user, `Welcome back ${user.fullname}`);
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      success: false,
      msg: "loginUser : Something went wrong",
    });
  }
};

export const logoutUser = async (_, res) => {
  try {
    return res.status(200).cookie("awasthi_token", "", { maxAge: 0 }).json({
      msg: "Logged out successfully.",
      success: true,
    });
  } catch (error) {
  
    return res.status(500).json({
      success: false,
      msg : "Failed to logout : Something went wrong",
    });
  }
};

export const getLoggedInUser = async (req, res) => {
  try {
    const token = req.cookies.awasthi_token;
    if (!token) {
      return res.status(401).json({ success: false, msg: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await userModel.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
  
    res.status(401).json({ success: false, msg: "Invalid token" });
  }
};