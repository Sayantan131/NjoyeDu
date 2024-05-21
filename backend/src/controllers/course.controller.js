import Course from "../models/course.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponce.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";

const createCourse = asyncHandler(async (req, res) => {
  const { title, price, lectures } = req.body;
  const lectureVideos = req.files.lectureVideos;
  console.log(req.body);

  console.log("req.files.lectureVideos:", req.files.lectureVideos);
  try {
    if (!title || !lectures || !price || !lectureVideos) {
      throw new ApiError(400, "All fields are required");
    }

    if (lectures.length !== lectureVideos.length) {
      return res
        .status(400)
        .json({ message: "Each lecture should have a video" });
    }

    const lecturesWithVideos = await Promise.all(
      lectures.map(async (lecture, index) => {
        const videoLocalPath = lectureVideos[index].path;

        if (!videoLocalPath) {
          throw new Error("Video file is required");
        }

        const video = await uploadOnCloudinary(videoLocalPath);

        if (!video.url) {
          throw new Error("Error while uploading video on cloudinary");
        }

        return {
          ...lecture,
          videoUrl: video.url,
        };
      })
    );

    const course = new Course({
      title,
      price,
      lectures: lecturesWithVideos,
      user: req.user._id,
    });

    await course.save();

    return res.json(
      new ApiResponse(201, "Course created successfully", course)
    );
  } catch (error) {
    console.log(error.message);
    throw new ApiError(
      500,
      "Something went wrong while creating course",
      error.message
    );
  }
});

const getAllCourses = asyncHandler(async (req, res) => {
  try {
    const courses = await Course.find();

    if (!courses) {
      throw new ApiError(404, "No courses found");
    }

    return res.json(
      new ApiResponse(200, "Courses fetched successfully", { courses })
    );
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while fetching courses",
      error
    );
  }
});

const getCourse = asyncHandler(async (req, res) => {
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
    const courseId = req.params.id;
    const { title, lectures } = req.body;

    const courseToUpdate = await Course.findById(courseId);

    if (!courseToUpdate) {
      throw new ApiError(404, "Course not found");
    }

    if (req.files && req.files.video && req.files.video[0]) {
      const videoLocalPath = req.files.video[0].path;
      const video = await uploadOnCloudinary(videoLocalPath);

      if (!video.url) {
        throw new ApiError(400, "Error while uploading video on cloudinary");
      }

      for (let lecture of lectures) {
        lecture.videoUrl = video.url;
      }
    }

    if (title) courseToUpdate.title = title;

    courseToUpdate.lectures = lectures;

    await courseToUpdate.save();

    return res.json(
      new ApiResponse(200, "Course updated successfully", courseToUpdate)
    );
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while updating course",
      error
    );
  }
});

export { createCourse, getAllCourses, getCourse, deleteCourse, updateCourse };
