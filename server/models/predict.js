import pkg from "mongoose";
const { Schema, model, models, Types } = pkg;

const PredictionSchema = new Schema({
  userId: {
    type: Types.ObjectId,
    ref: "Users",
    required: [true, "Please enter user"],
  },

  songId: {
    type: Types.ObjectId,
    ref: "Songs",
    required: [true, "Please enter song"],
  },

  chords: [
    {
      end: {
        type: String,
      },
      note: {
        type: String,
      },
      start: {
        type: String,
      },
    },
  ],

  notes: [
    {
      end: {
        type: String,
      },
      note: {
        type: String,
      },
      start: {
        type: String,
      },
    },
  ],
});

const Prediction = models.Predictions || model("Predictions", PredictionSchema);

export default Prediction;
