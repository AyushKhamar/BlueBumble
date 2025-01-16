import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export const connectToMongoDb = async () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Connected to db");
    })
    .catch((error) => {
      console.log(error.message);
    });
};
