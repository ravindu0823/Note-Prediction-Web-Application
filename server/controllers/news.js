import axios from "axios";
import { connectToDB } from "../db/conn.js";
import News from "../models/news.js";

export const addAllNewsFromSrape = async (req, res) => {
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
};

export const addNewsManually = async (req, res) => {
  const { category, title, target, desc, date, image } = req.body;

  try {
    await connectToDB();

    const news = new News({
      category,
      title,
      target,
      desc,
      date,
      image,
    });

    await news.save();

    if (!news) {
      return res.status(404).json({ error: "News not found" });
    }

    return res.status(201).json(news);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const updateNews = async (req, res) => {
  const { newsId } = req.params;
  const { category, title, target, desc, date, image } = req.body;

  try {
    await connectToDB();

    const news = await News.findByIdAndUpdate(newsId, {
      category,
      title,
      target,
      desc,
      date,
      image,
    });

    if (!news) {
      return res.status(404).json({ error: "News not found" });
    }

    const updatedNews = await News.findById(newsId);

    return res.status(200).json(updatedNews);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteNewsById = async (req, res) => {
  const { newsId } = req.params;

  try {
    await connectToDB();

    const news = await News.findByIdAndDelete(newsId);

    if (!news) {
      return res.status(404).json({ error: "News not found" });
    }

    return res.status(200).json({ message: "News deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const getAllNews = async (req, res) => {
  try {
    await connectToDB();

    // find first 10 news
    const news = await News.find();

    return res.status(200).json({ news });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const getNewsById = async (req, res) => {
  try {
    await connectToDB();

    const { newsId } = req.params;

    const news = await News.findById(newsId);

    if (!news) {
      return res.status(404).json({ error: "News not found" });
    }

    return res.status(200).json(news);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const getAllNewsCount = async (req, res) => {
  try {
    await connectToDB();

    const news = await News.find();

    if (!news) {
      return res.status(404).json({ error: "News not found" });
    }

    return res.status(200).json({ count: news.length });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
