import express from "express";
import dotenv from "dotenv";
import {
  validateUserAdd,
  validateUserLogin,
  validateUserUpdate,
} from "../middlewares/userValidation.js";
import {
  authenticateUserToken,
  deleteUserById,
  getAllActiveUserCount,
  getAllUsers,
  getUserDataById,
  reactivateUserById,
  updateUserById,
  userLogin,
  userRegister,
} from "../controllers/users.js";

dotenv.config();
const userRouter = express.Router();

// Register new users
userRouter.post("/register", validateUserAdd, userRegister);
// Login Existing Users
userRouter.post("/login", validateUserLogin, userLogin);
// Update user by userId
userRouter.put("/update/:userId", validateUserUpdate, updateUserById);
// Reactivate user by userId
userRouter.put("/reactivate/:userId", reactivateUserById);
// Suspend the user by userId
userRouter.delete("/delete/:userId", deleteUserById);
// Get all users
userRouter.get("/", getAllUsers);
// Authenticate user
userRouter.get("/protected", authenticateUserToken);
// Get user by id
userRouter.get("/:userId", getUserDataById);
// Get All Active User Count
userRouter.get("/active/count", getAllActiveUserCount);

export default userRouter;
