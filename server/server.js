import express from "express";
import dotenv from "dotenv";
import { connectToMongoDb } from "./utils/connectToMongoDB.js";
import authRouter from "./routes/auth.route.js";
import { userRouter } from "./routes/user.route.js";
import { matchRouter } from "./routes/match.route.js";
import { messageRouter } from "./routes/message.route.js";
import cookieParser from "cookie-parser";
//configs
dotenv.config();

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//routes
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/matches", matchRouter);
app.use("/api/messages", messageRouter);

app.listen(process.env.PORT | 3000, async () => {
  console.log("Server running at port ", process.env.PORT);
  await connectToMongoDb();
});
