import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import {
  courseEnrollment,
  updateEnrollmentProgress,
  deleteCourseEnrollment,
  getEnrollments,
} from "../controllers/enrollment.controller.js";

const router = Router();

router.route("/enroll/:id").post(verifyJWT, courseEnrollment);

router.route("/get-enrollments").get(verifyJWT, getEnrollments);

router
  .route("/update-enrollments-progress/:id")
  .patch(verifyJWT, updateEnrollmentProgress);

router
  .route("/delete-enrollment/:id")
  .delete(verifyJWT, deleteCourseEnrollment);

export default router;
