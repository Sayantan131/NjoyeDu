import { Router } from "express";

import { verifyJWT } from "../middlewares/auth.middlewares.js";
import {
  capturePaymentOrder,
  createPaymentOrder,
} from "../controllers/payment.controller.js";

const router = Router();

router.route("/create-payment").post(verifyJWT, createPaymentOrder);

router.route("/capture-payment").post(verifyJWT, capturePaymentOrder);

export default Router;
