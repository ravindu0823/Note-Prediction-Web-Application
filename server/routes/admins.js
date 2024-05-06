import express from "express";
import dotenv from "dotenv";
import {
  validateAdminAdd,
  validateAdminLogin,
} from "../middlewares/adminValidation.js";
import {
  addAdmin,
  adminLogin,
  validateAdminSession,
} from "../controllers/admins.js";

dotenv.config();
const adminRouter = express.Router();

// Add admin to the database from postman
adminRouter.post("/add", validateAdminAdd, addAdmin);
// Login admin
adminRouter.post("/login", validateAdminLogin, adminLogin);
// Vlidate admin sessions
adminRouter.get("/protected", validateAdminSession);

export default adminRouter;
