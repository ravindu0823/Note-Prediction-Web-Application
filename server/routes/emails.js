import express from "express";
import dotenv from "dotenv";
import { sendEmailUsingNodeMailer } from "../controllers/emails.js";

dotenv.config();
const emailRouter = express.Router();

emailRouter.post("/send", sendEmailUsingNodeMailer);

export default emailRouter;
