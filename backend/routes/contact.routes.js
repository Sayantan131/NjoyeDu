import express from "express";
import sendEmail from "../controllers/sendEmail.controller.js";

const app = express.Router();

app.post("/send-email", sendEmail);

export default app;
