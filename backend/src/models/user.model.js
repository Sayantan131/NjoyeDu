import bcrypt from "bcrypt";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "required"],
    },
    phone: {
      type: Number,
      required: true,
    },
    refrshToken: {
      type: String,
    },
    avatar: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
