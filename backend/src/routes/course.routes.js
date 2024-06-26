import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";

import { verifyJWT } from "../middlewares/auth.middlewares.js";
import {
  createCourse,
  deleteCourse,
  getAllCourses,
  getCourse,
  updateCourse,
} from "../controllers/course.controller.js";

const router = Router();

router
  .route("/createcourse")
  .post(upload.array("lectureVideos"), verifyJWT, createCourse);

router.route("/get-all-courses").get(verifyJWT, getAllCourses);

router.route("/getcourse/:id").get(verifyJWT, getCourse);

router.route("/update-course/:id").patch(verifyJWT, updateCourse);

router.route("/delete-course/:id").delete(verifyJWT, deleteCourse);

export default router;
