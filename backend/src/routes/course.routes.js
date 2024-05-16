import { Router } from "express";
import {
  courseEnrollment,
  deleteCourseEnrollment,
  getEnrollments,
  updateEnrollmentProgress,
} from "../controllers/enrollment.controller";
import { verifyJWT } from "../middlewares/auth.middlewares";

const router = Router();

router.route("/createcourse").post(verifyJWT, courseEnrollment);

router.route("/updateprogress/:id").patch(verifyJWT, updateEnrollmentProgress);

router.route("/deleteenrollment/:id").delete(verifyJWT, deleteCourseEnrollment);

router.route("/getenrollments/:id").get(verifyJWT, getEnrollments)

export default router;
