import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { sendEmail } from "../utils/sendMail.js";

const contactController = AsyncHandler(async (req, res) => {
  try {
    const { email, name, phone, message } = req.body;
    if (!email || !name || !phone || !message) {
      return res.json(ApiError(400, "All fields are required!"));
    }

    await sendEmail({
      user: { name, email },
      details: { name, phone, email, message },
    });
  } catch (error) {
    throw new ApiError(500, "Failed to send email", error);
  }
});
