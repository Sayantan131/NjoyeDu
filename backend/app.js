import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express from "express";
import process from "process";

import cors from "cors";
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(
  express.json({
    limit: "10mb",
    extended: true,
  })
);
app.use(
  express.urlencoded({
    extended: true,
    limit: "10mb",
  })
);
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("API working with /api/v1");
});

// ****** Routing *****
import contactRoutes from "./routes/contact.routes.js";
import userRoutes from "./routes/user.routes.js";

// using contact routes
app.use("/api/v1/contact", contactRoutes);

app.use("/api/v1/users",userRoutes)

export { app };

