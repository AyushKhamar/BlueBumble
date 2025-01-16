import express from "express";
import { protectRoute } from "../middleware/auth.js";
import { updateProfile } from "../controllers/user.controller.js";

const router = new express.Router();

router.put("/update", protectRoute, updateProfile);

export { router as userRouter };
