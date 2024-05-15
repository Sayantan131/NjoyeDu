import asyncHandler from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Course } from "../models/Course.js";
import { Enrollment } from "../models/enrollment.model.js";
import { ApiResponce } from "../utils/ApiResponce.js";

const courseEnrollment = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.body;
    const courseId = req.params.id;

    if (
      userId === "" ||
      courseId === "" ||
      userId === undefined ||
      courseId === undefined ||
      userId === null ||
      courseId === null
    ) {
      throw new ApiError(400, "Please provide userId and courseId");
    }

    const course = await Course.findById(courseId);

    if (!course) {
      throw new ApiError(404, "Course not found");
    }

    const enrollment = new Enrollment({
      user: userId,
      course: courseId,
      enrollAt: Date.now(),
    });
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while enrolling in course",
      error
    );
  }
});

const calculateProgress = (sectionsCompleted, totalSections) => {
  if (totalSections === 0) return 0;
  const progress = (sectionsCompleted / totalSections) * 100;
  return Math.min(Math.max(progress, 0), 100);
};

const updateEnrollmentProgress = asyncHandler(async (req, res) => {
  const { sectionsCompleted, totalSections } = req.body;
  const enrollmentId = req.params.id;

  const newProgress = calculateProgress(sectionsCompleted, totalSections);
  const isCompleted = newProgress === 100;

  try {
    const updatedEnrollment = await Enrollment.findByIdAndUpdate(
      enrollmentId,
      { progress: newProgress, completed: isCompleted },
      { new: true, runValidators: true }
    );

    if (updatedEnrollment) {
      res.json(
        ApiResponce(200, "Enrollment updated successfully", updatedEnrollment)
      );
    } else {
      res.json(ApiError(404, "Enrollment not found"));
    }
  } catch (error) {
    res.json(
      ApiError(500, "Something went wrong while updating enrollment", error)
    );
  }
});

export { courseEnrollment, updateEnrollmentProgress };
