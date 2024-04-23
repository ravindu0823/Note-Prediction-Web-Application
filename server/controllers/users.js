import { connectToDB } from "../db/conn.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const userRegister = async (req, res) => {
  const { userData } = await req.body;

  try {
    await connectToDB();

    const validateUserName = await User.findOne({
      userName: userData.userName,
    });

    if (validateUserName)
      return res.status(400).json({ error: "Username already exists" });

    const savedUser = new User({
      ...userData,
      status: "Active",
    });

    savedUser.password = savedUser.generateHash(userData.password);

    await savedUser.save();

    console.log(savedUser);
    if (!savedUser) return res.send("Not found").status(404);

    const token = jwt.sign(
      { userId: savedUser._id, fullName: savedUser.fullName },
      process.env.JWT_SECRET,
      {
        expiresIn: "10m",
      }
    );

    return res.status(201).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const userLogin = async (req, res) => {
  const { userData } = await req.body;
  const { userName } = userData;
  const { password } = userData;

  try {
    await connectToDB();

    const loggedUser = await User.findOne({ userName, status: "Active" });

    if (!loggedUser) return res.status(404).json({ error: "User not found" });

    if (!loggedUser.validPassword(password, loggedUser.password))
      return res.status(401).json({ error: "Incorrect password" });

    // password matched. proceed forward
    console.log("password matched");
    const token = jwt.sign(
      { userId: loggedUser._id, fullName: loggedUser.fullName },
      process.env.JWT_SECRET,
      {
        expiresIn: "10m",
      }
    );
    return res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const updateUserById = async (req, res) => {
  const { userId } = req.params;
  const { userData } = await req.body;

  try {
    await connectToDB();

    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ error: "User not found" });

    const updatedUser = await User.findByIdAndUpdate(userId, userData);

    if (!updatedUser)
      return res.status(404).json({ error: "User cannot updated" });

    const newUser = await User.findById(userId);

    return res.status(200).json({ newUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const reactivateUserById = async (req, res) => {
  const { userId } = req.params;

  try {
    await connectToDB();

    const reactivatedUser = await User.findByIdAndUpdate(userId, {
      status: "Active",
    });

    if (!reactivatedUser)
      return res.status(404).json({ error: "User not found" });

    return res.status(200).json({ message: "User reactivated" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const deleteUserById = async (req, res) => {
  const { userId } = req.params;

  try {
    await connectToDB();

    const deletedUser = await User.findByIdAndUpdate(userId, {
      status: "Deleted",
    });

    if (!deletedUser) return res.status(404).json({ error: "User not found" });

    return res.status(200).json({ message: "User deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    await connectToDB();

    const users = await User.find();

    if (users.length == 0) {
      return res.status(400).json({ message: "Unauthorized" });
    }

    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const authenticateUserToken = async (req, res) => {
  try {
    const authHeader = await req.headers.authorization;
    // console.log(authHeader);
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // console.log(decoded.userId);

    if (!decoded)
      return res.status(400).json({ message: "Expired. Unauthorized" });

    if (decoded.exp < Date.now() / 1000)
      return res.status(400).json({ message: "Expired. Unauthorized" });

    // If the token is valid, return some protected data
    return res.status(200).json({ data: "Protected data" });
  } catch (error) {
    console.log("Token Verification Error: ", error);
    return res.status(400).json({ message: "Unauthorized" });
  }
};

export const getUserDataById = async (req, res) => {
  const { userId } = req.params;

  console.log(userId);

  try {
    await connectToDB();

    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ error: "No Users" });

    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};
