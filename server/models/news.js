import pkg from "mongoose";
const { Schema, model, models } = pkg;

const NewsSchema = new Schema({
  category: {
    type: String,
    required: [true, "Please enter category"],
  },

  title: {
    type: String,
    required: [true, "Please enter title"],
  },

  target: {
    type: String,
    required: [true, "Please enter target"],
  },

  desc: {
    type: String,
    required: [true, "Please enter desc"],
  },

  date: {
    type: String,
    required: [true, "Please enter date"],
  },

  image: {
    type: String,
    required: [true, "Please enter image"],
  },
});

const News = models.News || model("News", NewsSchema);

export default News;
