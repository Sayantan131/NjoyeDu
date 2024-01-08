import express from "express";

import bodyParser from "body-parser";
import dotenv from "dotenv";
import process from "process";
import cors from "cors";

import contactRoutes from "./routes/contact.routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("API working with /api/v1");
});

// using contact routes
app.use("/api/v1/contact", contactRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
