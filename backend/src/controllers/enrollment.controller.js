import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import Course from "../models/course.model.js";
import Enrollment from "../models/enrollment.model.js";
import { ApiResponse } from "../utils/ApiResponce.js";
import { User } from "../models/user.model.js";

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
    const user = await User.findById(userId);

    if (!user) throw new ApiError(404, "User not found");

    if (!course) {
      throw new ApiError(404, "Course not found");
    }

    const enrollment = new Enrollment({
      user: userId,
      course: courseId,
      enrollAt: Date.now(),
    });

    await enrollment.save();

    return res.json(
      new ApiResponse(201, "Enrollment successfully", enrollment)
    );
  } catch (error) {
    console.log(error.message);
    throw new ApiError(
      500,
      "Something went wrong while enrolling in course",
      error
    );
  }
});

const calculateProgress = (sectionsCompleted, totalSections) => {
  if (totalSections === 0) return 0;
  const progress = (sectionsCompleted / totalSections) * 10;
  return Math.min(Math.max(progress, 0), 10);
};

const getEnrollments = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  try {
    const enrollments = await Enrollment.find({ user: userId })
      .populate("course")
      .sort({ enrolledAt: -1 });

    res.json(
      new ApiResponse(200, "Enrollments fetched successfully", enrollments)
    );
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while fetching enrollments",
      error
    );
  }
});

const updateEnrollmentProgress = asyncHandler(async (req, res) => {
  const { sectionsCompleted, totalSections } = req.body;
  const enrollmentId = req.params.id;

  if (!sectionsCompleted || !totalSections) {
    throw new ApiError(
      400,
      "Please provide sectionsCompleted and totalSections"
    );
  }

  if (!enrollmentId) throw new ApiError(400, "Please provide enrollmentId");

  const enrollment = await Enrollment.findById(enrollmentId);

  if (!enrollment) throw new ApiError(404, "Enrollment not found");

  const newProgress = calculateProgress(sectionsCompleted, totalSections);
  const isCompleted = newProgress === 10;

  try {
    const updatedEnrollment = await Enrollment.findByIdAndUpdate(
      enrollmentId,
      { progress: newProgress, completed: isCompleted },
      { new: true, runValidators: true }
    );

    if (updatedEnrollment) {
      res.json(
        new ApiResponse(
          200,
          "Enrollment updated successfully",
          updatedEnrollment
        )
      );
    } else {
      throw new ApiError(404, "Enrollment not found");
    }
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while updating enrollment",
      error
    );
  }
});

const deleteCourseEnrollment = asyncHandler(async (req, res) => {
  const enrollmentId = req.params.id;
  try {
    console.log(enrollmentId);
    if (!enrollmentId) throw new ApiError(400, "Please provide enrollmentId");

    const enrollment = await Enrollment.findById(enrollmentId);
    console.log(enrollment);

    if (!enrollment) {
      throw new ApiError(404, "Enrollment not found");
    } else {
      await Enrollment.deleteOne({ _id: enrollmentId });
    }

    return res.json(new ApiResponse(200, "Enrollment deleted successfully"));
  } catch (error) {
    console.log(error.message);
    throw new ApiError(
      500,
      "Something went wrong while deleting enrollment",
      error
    );
  }
});

export {
  courseEnrollment,
  updateEnrollmentProgress,
  deleteCourseEnrollment,
  getEnrollments,
};
