import News from "../models/news.js";
import { connectToDB } from "../db/conn.js";
import express from "express";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();
const newsRouter = express.Router();

// Register new users
newsRouter.post("/addAll", async (req, res) => {
  try {
    await connectToDB();

    const response = await axios.get("http://localhost:5000/getScrapeNews");

    const newsData = response.data;

    newsData.map(async (news) => {
      const data = new News(news);

      await data.save();
    });

    const news = await News.find();

    return res.status(200).json({ news });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

newsRouter.get("/", async (req, res) => {
  try {
    await connectToDB();

    // find first 10 news
    const news = await News.find();

    return res.status(200).json({ news });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

export default newsRouter;
