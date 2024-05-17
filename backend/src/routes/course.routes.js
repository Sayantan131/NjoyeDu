import { Router } from "express";

import { verifyJWT } from "../middlewares/auth.middlewares.js";
import {
  createCourse,
  deleteCourse,
  getAllCourses,
  getCourse,
  updateCourse,
} from "../controllers/course.controller.js";

const router = Router();

router.route("/createcourse").post(verifyJWT, createCourse);

router.route("/get-all-courses").get(verifyJWT, getAllCourses);

router.route("/getcourse/:id").get(verifyJWT, getCourse);

router.route("/delete-course/:id").delete(verifyJWT, deleteCourse);

router.route("/update-course/:id").patch(verifyJWT, updateCourse);

export default router;
