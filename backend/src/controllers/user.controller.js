import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponce.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import jwt from "jsonwebtoken";

const generateAccessTokenAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.log(error.message);
    throw new ApiError(500, error.message);
  }
};

const isPasswordStrong = (password) => {
  // Implement your password strength checks here
  // Example: At least one special character, one capital letter, one number, and a minimum length of 6 characters
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasCapitalLetter = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasMinimumLength = password.length >= 6;

  return hasSpecialChar && hasCapitalLetter && hasNumber && hasMinimumLength;
};

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body;
  try {
    if (!name || !email || !password || !phone) {
      throw new ApiError(400, "All fields are required");
    }
    const existesUser = await User.findOne({ email });
    if (existesUser) {
      throw new ApiError(400, "User with this email already exists");
    }

    if (!isPasswordStrong(password)) {
      throw new ApiError(
        400,
        "Password should have at least one special character, one capital letter, one number, and a minimum length of 6 characters."
      );
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;

    if (!avatarLocalPath) {
      throw new ApiError(400, "Avatar file is required");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);

    if (!avatar) {
      throw new ApiError(400, "Error while uploading avatar on cloudinary");
    }

    const user = await User.create({
      avatar: avatar.url,
      name,
      email,
      password,
      phone,
    });

    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    if (!createdUser) {
      throw new ApiError(500, "Somethong went wrong while registering user");
    }

    return res.json(
      new ApiResponse(201, "User registered successfully", createdUser)
    );
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw new ApiError(400, "Email and password are required");
    }

    const user = await User.findOne({
      email,
    });

    if (!user) {
      throw new ApiError(404, "User with this email does not exist");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid user credentials");
    }

    const { accessToken, refreshToken } =
      await generateAccessTokenAndRefreshToken(user._id);

    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    const options = {
      httpOnly: false,
      secure: true,
      sameSite: "none",
      path: "/",
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(200, "User logged in successfully", {
          user: loggedInUser,
          accessToken,
          refreshToken,
        })
      );
  } catch (error) {
    console.log(error.message);
    throw new ApiError(500, error.message);
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  try {
    User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          refreshToken: undefined,
        },
      },
      {
        new: true,
      }
    );

    const options = {
      httpOnly: true,
      secure: true,
      path: "/",
    };

    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json(new ApiResponse(200, "User logged out successfully"));
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while logging out user",
      error
    );
  }
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  try {
    const incommingRefreshToken =
      req.cookies.refreshToken || req.body.refreshToken;

    if (!incommingRefreshToken) {
      throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(
      incommingRefreshToken,
      process.env.REFRESH_TOKEN_SCERETE
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid Refresh-Token");
    }

    if (incommingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh-token is expired or used");
    }

    const options = {
      httpOnly: true,
      secure: true,
      path: "/",
    };

    const { accessToken, newRefreshToken } =
      await generateAccessTokenAndRefreshToken(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(200, "Access Token Refreshed Successfully", {
          accessToken,
          refreshToken: newRefreshToken,
        })
      );
  } catch (error) {
    console.log(error.message);
    throw new ApiError(
      500,
      "Something went wrong while refreshing access token",
      error
    );
  }
});

const chageCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
    if (!oldPassword || !newPassword) {
      throw new ApiError(400, "Both old and new passwords are required");
    }

    const user = await User.findById(req.user?._id);

    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

    if (!isPasswordCorrect) {
      throw new ApiError(401, "Invalid old password");
    }

    user.password = newPassword;
    await user.save({ validateBeforeSave: false });

    return res
      .status(200)
      .json(new ApiResponse(200, "Password changed successfully"));
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(new ApiError(500, error.message));
  }
});

const getCurrentUser = asyncHandler(async (req, res) => {
  const user = req?.user;

  if (!user) return res.status(400).json(new ApiError(400, "please login"));

  return res.status(200).json(new ApiResponse(200, "User found", { user }));
});

const UpdateUserAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  if (!avatar.url) {
    throw new ApiError(400, "Error while uploading avatar on cloudinary");
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        avatar: avatar.url,
      },
    },
    {
      new: true,
    }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, "Avatar updated successfully", { user }));
});

const updateAccountDetails = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;

  try {
    if (req.body === "" || req.body === null || req.body === undefined) {
      return res
        .status(400)
        .json(new ApiError(400, "Please provide data to update"));
    }

    let updates = {};

    if (name) updates.name = name;
    if (email) updates.email = email;
    if (phone) updates.phone = phone;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: updates,
      },
      {
        new: true,
      }
    );

    if (!user) {
      return res.status(404).json(new ApiError(400, "User not found"));
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, "User details updated successfully", { user })
      );
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  chageCurrentPassword,
  getCurrentUser,
  UpdateUserAvatar,
  updateAccountDetails,
};
