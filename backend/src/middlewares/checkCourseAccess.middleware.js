import Enrollment from "../models/enrollment.model.js";
import Course from "../models/course.model.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError";

export const checkCourseAccess = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const courseId = req.params.courseId;
  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.json(ApiError(400, "Course not found"));
    }

    if (course.price === 0) {
      return next();
    }

    const enrollment = await Enrollment.findOne({
      user: userId,
      course: courseId,
      completed: true,
    });

    if (!enrollment) {
      return res.json(ApiError(403, "You are not enrolled in this course"));
    }

    next();
  } catch (error) {
    return res.json(
      ApiError(500, "Something went wrong while checking course access", error)
    );
  }
});
