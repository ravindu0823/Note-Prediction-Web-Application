import express from "express";
import dotenv from "dotenv";
import fs from "fs";
import FormData from "form-data";
import Prediction from "../models/predict.js";
import upload from "../middlewares/fileUpload.js";
import Song from "../models/song.js";
import axios from "axios";

dotenv.config();
const predictionRouter = express.Router();
const FLASK_SERVER =
  process.env.NODE_ENV === "prod"
    ? process.env.REMOTEHOST
    : process.env.LOCALHOST;

console.log(FLASK_SERVER);

predictionRouter.post(
  "/analyzeNotes/:userId",
  upload.single("file"),
  async (req, res) => {
    // Access the file inside the uploads folder
    const file = req.file;
    const { userId } = req.params;
    const songPath = file.filename;
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

    try {
      const response = await axios.post(
        `${FLASK_SERVER}/analyzeNotes`,
        formData
      );

      if (response.status !== 200) {
        res.status(500).json("An error occurred while processing the file");
      }

      const { notes } = response.data;

      const savedAudioFile = new Song(songData);

      await savedAudioFile.save();

      if (!savedAudioFile) {
        res.status(500).json("An error occurred while saving the file");
      }

      const predictionData = {
        userId,
        songId: savedAudioFile._id,
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

predictionRouter.post(
  "/analyzeChords/:userId",
  upload.single("file"),
  async (req, res) => {
    // Access the file inside the uploads folder
    const file = req.file;
    const { userId } = req.params;
    const songPath = file.filename;
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

    try {
      const response = await axios.post(
        `${FLASK_SERVER}/analyzeChords`,
        formData
      );

      if (response.status !== 200) {
        res.status(500).json("An error occurred while processing the file");
      }

      const { chords } = response.data;

      const savedAudioFile = new Song(songData);

      await savedAudioFile.save();

      if (!savedAudioFile) {
        res.status(500).json("An error occurred while saving the file");
      }

      const predictionData = {
        userId,
        songId: savedAudioFile._id,
        chords,
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

predictionRouter.post(
  "/analyzeBoth/:userId",
  upload.single("file"),
  async (req, res) => {
    // Access the file inside the uploads folder
    const file = req.file;
    const { userId } = req.params;
    const songPath = file.filename;
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

    try {
      const response = await axios.post(
        `${FLASK_SERVER}/analyzeBoth`,
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

predictionRouter.get("/all", async (req, res) => {
  try {
    const predictions = await Prediction.find()
      .populate("songId")
      .populate("userId");

    if (!predictions) {
      res.status(404).json("No predictions found");
    }

    res.status(200).json(predictions);
  } catch (error) {
    console.error(error);
    res.status(500).json(error.message);
  }
});

predictionRouter.get("/count", async (req, res) => {
  try {
    const predictions = await Prediction.find();

    if (!predictions) {
      res.status(404).json("No predictions found");
    }

    res.status(200).json({ count: predictions.length });
  } catch (error) {
    console.error(error);
    res.status(500).json(error.message);
  }
});

predictionRouter.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const predictions = await Prediction.find({ userId })
      .populate("songId")
      .populate("userId");

    if (!predictions) {
      res.status(404).json("No predictions found");
    }

    res.status(200).json(predictions);
  } catch (error) {
    console.error(error);
    res.status(500).json(error.message);
  }
});

predictionRouter.delete("/delete/:predictionId", async (req, res) => {
  const { predictionId } = req.params;

  try {
    const prediction = await Prediction.findByIdAndDelete(predictionId);

    if (!prediction) {
      res.status(404).json("Prediction not found");
    }

    res.status(200).json("Prediction deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json(error.message);
  }
});

export default predictionRouter;
