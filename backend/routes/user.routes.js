import { Router } from "express";
import {
    chnageCurrentPassword,
    loginUser,
    logoutUser,
    newUser,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(newUser);

router.route("/login").post(loginUser);

router.route("/logout").post(verifyJWT, logoutUser);

router.route("/change-password").post(verifyJWT, chnageCurrentPassword);

export default router;
