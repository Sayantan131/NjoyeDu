import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares";
import {
  courseEnrollment,
  deleteCourseEnrollment,
  getEnrollments,
  updateEnrollmentProgress,
} from "../controllers/enrollment.controller";

const router = Router();

router.route("/enroll/:id").post(verifyJWT, courseEnrollment);

router.route("/get-enrollments").get(verifyJWT, getEnrollments);

Router.route("/update-enrollments-progress/:id").patch(
  verifyJWT,
  updateEnrollmentProgress
);

router
  .route("/delete-enrollment/:id")
  .delete(verifyJWT, deleteCourseEnrollment);

export default router;
