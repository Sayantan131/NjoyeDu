import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./db/index.js";

dotenv.config({ path: "./.env" });

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on port ${process.env.PORT || 8000}`);
      app.on("error", (error) => {
        console.log(error);
        throw error;
      });
    });
  })
  .catch((error) => {
    console.log("Mongodb connection failed !!!", error);
  });
