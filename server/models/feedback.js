import pkg from "mongoose";
const { Schema, model, models } = pkg;

const FeedbackSchema = new Schema({
  userId: {
    type: Types.ObjectId,
    ref: "Users",
    required: [true, "Please enter user"],
  },

  feedback: {
    type: String,
    required: [true, "Please enter feedback"],
  },
});

const Feedback = models.Feedbacks || model("Feedbacks", FeedbackSchema);

export default Feedback;
