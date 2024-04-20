import pkg from "mongoose";
const { Schema, model, models } = pkg;

const FeedbackSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "Please enter firstName"],
  },

  lastName: {
    type: String,
    required: [true, "Please enter lastName"],
  },

  email: {
    type: String,
    required: [true, "Please enter email"],
  },

  phoneNumber: {
    type: String,
    required: [true, "Please enter phoneNumber"],
  },

  feedback: {
    type: String,
    required: [true, "Please enter feedback"],
  },

  status: {
    type: String,
    default: "Active",
  },
});

const Feedback = models.Feedbacks || model("Feedbacks", FeedbackSchema);

export default Feedback;
