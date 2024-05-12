import express from "express";
import dotenv from "dotenv";
import {
  newsAddValidation,
  newsUpdateValidation,
} from "../middlewares/newsValidation.js";
import {
  addAllNewsFromSrape,
  addNewsManually,
  deleteNewsById,
  getAllNews,
  getAllNewsCount,
  getNewsById,
  updateNews,
} from "../controllers/news.js";

dotenv.config();
const newsRouter = express.Router();

// Add all news from scrape
newsRouter.post("/addAll", addAllNewsFromSrape);
// Add news manually
newsRouter.post("/add", newsAddValidation, addNewsManually);
// Update news manually
newsRouter.put("/update/:newsId", newsUpdateValidation, updateNews);
// Delete news by Id
newsRouter.delete("/delete/:newsId", deleteNewsById);
// Get all news
newsRouter.get("/", getAllNews);
// Get All News Count
newsRouter.get("/count", getAllNewsCount);
// Get news by id
newsRouter.get("/:newsId", getNewsById);


export default newsRouter;
