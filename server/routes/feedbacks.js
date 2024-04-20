import Feedback from "../models/feedback.js";
import { connectToDB } from "../db/conn.js";
import express from "express";
import dotenv from "dotenv";
import { validateFeedback } from "../middlewares/feedbackValidation.js";

dotenv.config();
const feedbacRouter = express.Router();

feedbacRouter.post("/add", validateFeedback, async (req, res) => {
  const { firstName, lastName, email, phoneNumber, feedback } = req.body;

  try {
    await connectToDB();

    const savedFeedback = new Feedback({
      firstName,
      lastName,
      email,
      phoneNumber,
      feedback,
    });

    await savedFeedback.save();

    console.log(savedFeedback);
    if (!savedFeedback) res.send("Not found").status(404);

    return res.status(201).json(savedFeedback);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

feedbacRouter.get("/all", async (req, res) => {
  try {
    await connectToDB();

    const feedbacks = await Feedback.find();

    if (!feedbacks) res.send("Not found").status(404);

    return res.status(200).json(feedbacks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

feedbacRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await connectToDB();

    const feedback = await Feedback.findById(id);

    if (!feedback) res.send("Not found").status(404);

    return res.status(200).json(feedback);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

feedbacRouter.put("/suspend/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await connectToDB();

    const feedback = await Feedback.findByIdAndUpdate(id, {
      status: "Suspended",
    });

    if (!feedback) res.send("Not found").status(404);

    const updatedFeedback = await Feedback.findById(id);

    return res.status(200).json(updatedFeedback);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

feedbacRouter.put("/activate/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await connectToDB();

    const feedback = await Feedback.findByIdAndUpdate(id, {
      status: "Active",
    });

    if (!feedback) res.send("Not found").status(404);

    const updatedFeedback = await Feedback.findById(id);

    return res.status(200).json(updatedFeedback);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

export default feedbacRouter;
