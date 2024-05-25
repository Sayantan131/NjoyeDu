import { asyncHandler } from "../utils/AsyncHandler.js";
import { createOrder, captureOrder } from "../utils/Paypal.config.js";
import { ApiResponse } from "../utils/ApiResponce.js";
import { ApiError } from "../utils/ApiError.js";
import { Payment } from "../models/payment.model.js";
import Enrollment from "../models/enrollment.model.js";

const createPaymentOrder = asyncHandler(async (req, res, next) => {
  try {
    const { enrollId, amount } = req.body;
    if (!enrollId || !amount) {
      return next(new ApiError(400, "all fields are required"));
    }

    const enrollment = await Enrollment.findById(enrollId);

    if (!enrollment) {
      return next(new ApiError(404, "Enrollment not found"));
    }

    const order = await createOrder.createOrder(amount);

    if (!order) {
      return next(new ApiError(500, "order is not created"));
    }
    return res.json(
      new ApiResponse(201, "Order created successfully", {
        orderId: order.id,
        enrollId,
      })
    );
  } catch (error) {
    throw new ApiError(500, "Something went wrong", error.message);
  }
});

const capturePaymentOrder = asyncHandler(async (req, res) => {
  const { orderId, courseId } = req.body;
  const userId = req.user.id;
  try {
    const capture = await captureOrder.captureOrder(orderId);

    const paymentDetails = capture.purchase_units[0].payments.captures[0];

    const paymentData = {
      userId,
      courseId,
      orderId: capture.id,
      paymentId: paymentDetails.id,
      amount: capture.purchase_units[0].amount.value,
      currency: capture.purchase_units[0].amount.currency_code,
      status: paymentDetails.status,
      paymentMethod: paymentDetails.payment_method || "PayPal",
    };

    const payment = new Payment(paymentData);
    await payment.save();

    return ApiResponse(200, "Payment captured successfully", payment);
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while capturing payment",
      error.message
    );
  }
});

export { createPaymentOrder, capturePaymentOrder };
