import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import userRouter from "./routes/users.js";
import newsRouter from "./routes/news.js";
import predictionRouter from "./routes/predicts.js";
import adminRouter from "./routes/admins.js";
import feedbacRouter from "./routes/feedbacks.js";
import emailRouter from "./routes/emails.js";

dotenv.config();

const app = express();
const corsOptions = {
  origin: [
    "http://localhost:8080",
    "http://159.223.74.216:8080",
    "http://139.59.12.43:8080",
    "http://localhost:5000",
    "http://159.223.74.216:5000",
    "http://139.59.12.43:5000",
  ],
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Middleware setup
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.use(express.json());

app.use("/users", userRouter);
app.use("/news", newsRouter);
app.use("/predict", predictionRouter);
app.use("/admin", adminRouter);
app.use("/feedback", feedbacRouter);
app.use("/emails", emailRouter);

export default app;
