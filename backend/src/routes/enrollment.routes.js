import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares";
import {
  courseEnrollment,
  deleteCourseEnrollment,
  getEnrollments,
  updateEnrollmentProgress,
} from "../controllers/enrollment.controller";

Router.route("/enroll/:id").post(verifyJWT, courseEnrollment);

Router.route("/get-enrollments").get(verifyJWT, getEnrollments);

Router.route("/update-enrollments-progress/:id").patch(
  verifyJWT,
  updateEnrollmentProgress
);

Router.route("/delete-enrollment/:id").delete(
  verifyJWT,
  deleteCourseEnrollment
);

export default router;
