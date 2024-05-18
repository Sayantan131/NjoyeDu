import paypal from "@paypal/checkout-server-sdk";
import { asyncHandler } from "./AsyncHandler";

const environment = new paypal.core.SandboxEnvironment(
  process.env.PAYPAL_CLIENT_ID,
  process.env.PAYPAL_SECRET
);

const client = new paypal.core.PayPalHttpClient(environment);

const createOrder = asyncHandler(async (amount) => {
  const req = new paypal.orders.OrdersCreateRequest();
  req.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "INR",
          value: amount,
        },
      },
    ],
  });

  const order = await client.execute(req);
  return order.result;
});

const captureOrder = asyncHandler(async (orderId) => {
  const request = new paypal.orders.OrdersCaptureRequest(orderId);
  request.requestBody({});
  const capture = await client.execute(request);
  return capture.result;
});

export { createOrder, captureOrder };
