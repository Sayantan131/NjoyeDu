import {Router} from 'express';
import { chnageCurrentPassword, loginUser, newUser } from '../controllers/user.controller.js';

const router = Router();

router.route("/register").post(newUser);


router.route("/login").post(loginUser);

router.route("/change-password").post(chnageCurrentPassword);

export default router;