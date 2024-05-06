import { connectToDB } from "../db/conn.js";
import Feedback from "../models/feedback.js";

export const createNewFeedback = async (req, res) => {
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
};

export const getAllFeedbacks = async (req, res) => {
  try {
    await connectToDB();

    const feedbacks = await Feedback.find();

    if (!feedbacks) res.send("Not found").status(404);

    return res.status(200).json(feedbacks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const getFeedbackById = async (req, res) => {
  const { id } = req.params;

  try {
    await connectToDB();

    const feedback = await Feedback.findById(id);

    if (!feedback) {
      return res.status(404).json({ error: "Feedback not found" });
    }

    return res.status(200).json(feedback);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const suspendFeedbackById = async (req, res) => {
  const { id } = req.params;

  try {
    await connectToDB();

    const validateFeedback = await Feedback.findById(id);

    if (!validateFeedback) {
      return res.status(404).json({ error: "Feedback not found" });
    }

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
};

export const activateFeedbackById = async (req, res) => {
  const { id } = req.params;

  try {
    await connectToDB();

    const validateFeedback = await Feedback.findById(id);

    if (!validateFeedback) {
      return res.status(404).json({ error: "Feedback not found" });
    }

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
};
