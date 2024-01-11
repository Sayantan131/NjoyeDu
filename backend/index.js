import { app } from "./app.js";
import connectDB from "./db/index.js";
import dotenv from "dotenv";
import process from "process";

dotenv.config({ path: ".env" });

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port ${process.env.PORT}`);
      app.on("error", (error) => {
        console.log(error);
        throw error;
      });
    });
  })
  .catch((error) => {
    console.log("Mongodb Connection failed !!! ", error);
  });
