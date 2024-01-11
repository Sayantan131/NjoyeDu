import mongoose from "mongoose";
import process from "process";

import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(`Mongodb connected || DB HOST : ${connectionInstance.connection.host}`)
  } catch (error) {
    console.log("Error While Connecting database", error);
    process.exit(1);
  }
};

export default connectDB;
