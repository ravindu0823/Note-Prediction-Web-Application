import pkg from "mongoose";
const { Schema, model, models, Types } = pkg;

const SongSchema = new Schema({
  songPath: {
    type: String,
    required: [true, "Please enter songPath"],
  },

  userId: {
    type: Types.ObjectId,
    ref: "Users",
    required: [true, "Please enter user"],
  },
});

const Song = models.Songs || model("Songs", SongSchema);

export default Song;
