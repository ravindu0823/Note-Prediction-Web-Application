import express from "express";
import dotenv from "dotenv";
import fs from "fs";
import axios from "axios";
import FormData from "form-data";
import Prediction from "../models/predict.js";
import upload from "../middlewares/fileUpload.js";
import Song from "../models/song.js";

dotenv.config();
const predictionRouter = express.Router();

predictionRouter.post(
  "/analyzeBoth/:userId",
  upload.single("file"),
  async (req, res) => {
    // Access the file inside the uploads folder
    const file = req.file;
    const { userId } = req.params;
    const songPath = file.path;
    const songData = {
      userId,
      songPath,
    };

    // Pass the file to the Flask server
    const formData = new FormData();
    formData.append("song", fs.createReadStream(file.path), {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    /* res.status(201).json({
      userId,
      songPath,
    }); */

    try {
      const response = await axios.post(
        "http://159.223.75.67:5000/analyzeBoth",
        formData
      );

      if (response.status !== 200) {
        res.status(500).json("An error occurred while processing the file");
      }

      const { notes, chords } = response.data;

      const savedAudioFile = new Song(songData);

      await savedAudioFile.save();

      if (!savedAudioFile) {
        res.status(500).json("An error occurred while saving the file");
      }

      const predictionData = {
        userId,
        songId: savedAudioFile._id,
        chords,
        notes,
      };

      const savedPrediction = new Prediction(predictionData);

      await savedPrediction.save();
      console.log(savedPrediction);

      res.status(201).json(savedPrediction);
    } catch (error) {
      console.error(error);
      res.status(500).json(error.message);
    }
  }
);

export default predictionRouter;
