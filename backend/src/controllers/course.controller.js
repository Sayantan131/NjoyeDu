import Course from "../models/course.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponce";
import AsyncHandler, { asyncHandler } from "../utils/AsyncHandler";
import { uploadOnCloudinary } from "../utils/Cloudinary";

const createCourse = AsyncHandler(async (req, res) => {
  try {
    const { title, lectures } = req.body;
    if (!title || !lectures) {
      return res
        .status(400)
        .json({ message: "Please provide title and lectures" });
    }

    const videoLocalPath = req.files?.lectures[0].path;

    if (!videoLocalPath) {
      return res.status(400).json({ message: "Video file is required" });
    }

    const video = await uploadOnCloudinary(videoLocalPath);

    if (!video.url) {
      return res
        .status(400)
        .json({ message: "Error while uploading video on cloudinary" });
    }

    const course = new Course({
      title,
      lectures: [
        {
          title: lectures[0].title,
          description: lectures[0].description,
          videoUrl: video.url,
          content: lectures[0].content,
        },
      ],
      user: req.user._id,
    });

    return res.json(
      new ApiResponse(201, "Course created successfully", course)
    );
  } catch (error) {
    return res.json(
      new ApiError(500, "Something went wrong while creating course", error)
    );
  }
});

const getAllCourses = AsyncHandler(async (req, res) => {
  try {
    const courses = await Course.find().populate("user", "name email");

    if (!courses) {
      throw new ApiError(404, "No courses found");
    }

    return res.json(
      new ApiResponse(200, "Courses fetched successfully", courses)
    );
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while fetching courses",
      error
    );
  }
});

const getCourse = AsyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const course = await Course.findById(id);

    if (!course) {
      throw new ApiError(404, "Course not found");
    }

    return res.json(
      new ApiResponse(200, "Course fetched successfully", course)
    );
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while fetching course",
      error
    );
  }
});

const deleteCourse = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      throw new ApiError(400, "id is required");
    }
    const course = await Course.findByIdAndDelete(id);
    if (!course) {
      throw new ApiError(404, "Course not found");
    }

    return res.json(
      new ApiResponse(200, "Course deleted successfully", course)
    );
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while deleting course",
      error
    );
  }
});

const updateCourse = asyncHandler(async (req, res) => {
  try {
    const {title,lectures} = req.body;
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while updating course",
      error
    );
  }
});

export { createCourse, getAllCourses, getCourse, deleteCourse };
