import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js";
import courseRoutes from "./routes/course.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import enrollmentRoutes from "./routes/enrollment.routes.js";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.static("public"));
app.use(cookieParser());

//routes
app.use("/api/v1/users", userRoutes);

app.use("/api/v1/courses", courseRoutes);

app.use("/api/v1/enrollments", enrollmentRoutes);

app.use("/api/v1/payment", paymentRoutes);

export { app };
