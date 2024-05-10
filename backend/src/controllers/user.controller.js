import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponce } from "../utils/ApiResponce.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";

const generateAccessTokenAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating accesstoken and refreshtoken"
    );
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

const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password || !phone || !avatar) {
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
      "-passwordc-refreshToken"
    );

    if (!createdUser) {
      throw new ApiError(500, "Somethong went wrong while registering user");
    }

    return res
      .status(201)
      .json(new ApiResponce(201, "User registered successfully", createdUser));
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while registering user",
      error
    );
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

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

    const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(
      user._id
    );

    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );
    
    const options = {
      httpOnly: false,
      secure:true,
      sameSite: "none",
      path:'/'
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponce(200, "User logged in successfully", 
    {user: loggedInUser,
    accessToken,
    refreshToken}
  ));
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while logging in user",
      error
    );
  }
};

export { registerUser };
