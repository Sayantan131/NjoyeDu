import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponce.js";
import { User } from "../model/user.model.js";

const newUser = asyncHandler(async (req, res) => {
  const { name, email, password, gender } = req.body;
  if (!name && !email && !password && !gender) {
    throw new ApiError(400, "All fields are required");
  }

  const exitedUser = await User.findOne({
    email,
  });

  if (exitedUser) {
    throw new ApiError(409, "User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    gender,
  });
  const createdUser = await User.findById(user._id).select("-password");

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering a user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User created successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email && !password) {
    throw new ApiError(400, "Username or email is required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User doesnot exists");
  }

  //   const isPasswordValid = await user.isPasswordValid(password);
  //   if (!isPasswordValid) {
  //     throw new ApiError(401, "Invalid user credentials");
  //   }

  if (user.password !== password) {
    throw new ApiError(401, "Invalid user credentials");
  }
  const loggedInUser = await User.findById(user._id).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, loggedInUser, "User logged in successfully"));
});

const chnageCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user?._id);

  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid old password");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});

export { newUser, loginUser, chnageCurrentPassword };
