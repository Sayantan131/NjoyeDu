import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  user: {
    tyoe: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  lectures: [
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      videoUrl: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
    },
  ],
  price: {
    type: Number,
    default: 0,
  },
});

const Course = mongoose.model("Course", CourseSchema);

export default Course;
