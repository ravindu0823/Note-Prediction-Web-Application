import express from "express";
import dotenv from "dotenv";
import { validateFeedback } from "../middlewares/feedbackValidation.js";
import {
  activateFeedbackById,
  createNewFeedback,
  getActiveFeedbackCount,
  getAllActiveFeedbacks,
  getAllFeedbacks,
  getFeedbackById,
  suspendFeedbackById,
} from "../controllers/feedbacks.js";

dotenv.config();
const feedbacRouter = express.Router();

// Create a new feedback
feedbacRouter.post("/add", validateFeedback, createNewFeedback);
// Get all feedbacks from database
feedbacRouter.get("/all", getAllFeedbacks);
// Get all Active Feddbacks
feedbacRouter.get("/active", getAllActiveFeedbacks);
// Get feedback by id
feedbacRouter.get("/:id", getFeedbackById);
// Suspend feedback by id
feedbacRouter.put("/suspend/:id", suspendFeedbackById);
// Activate feedback by id
feedbacRouter.put("/activate/:id", activateFeedbackById);
// Get all Active Feedback Count
feedbacRouter.get("/active/count", getActiveFeedbackCount);

export default feedbacRouter;
