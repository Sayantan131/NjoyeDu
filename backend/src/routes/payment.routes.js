import { Router } from "express";

import { verifyJWT } from "../middlewares/auth.middlewares.js";
import {
  capturePaymentOrder,
  createPaymentOrder,
} from "../controllers/payment.controller.js";

Router.route("/create-payment").post(verifyJWT, createPaymentOrder);

Router.route("/capture-payment").post(verifyJWT, capturePaymentOrder);

export default Router;
