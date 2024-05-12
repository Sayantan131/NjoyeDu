import { Router } from "express";
import {
    UpdateUserAvatar,
  chageCurrentPassword,
  getCurrentUser,
  loginUser,
  refreshAccessToken,
  registerUser,
  updateAccountDetails,
} from "../controllers/user.controller";
import { verifyJWT } from "../middlewares/auth.middlewares";

const router = Router();

router
  .route("/register")
  .post(uploas.fields([{ name: "avatar", maxCount: 1 }]), registerUser);

router.route("/login").post(loginUser);

router.route("/logout").post(verifyJWT, logoutUser);

router.route("/refresh-token").post(refreshAccessToken);

router.route("/change-password").post(verifyJWT, chageCurrentPassword);

router.route("/me").get(verifyJWT, getCurrentUser);

router.route("/update-account").post(verifyJWT, updateAccountDetails);

router.route("/update-avatar").patch(verifyJWT, upload.single("avatar"), UpdateUserAvatar);

export default router;
