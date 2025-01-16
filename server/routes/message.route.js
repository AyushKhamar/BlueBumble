import express from "express";
import { protectRoute } from "../middleware/auth.js";
import {
  getConversation,
  sendMessage,
} from "../controllers/message.controller.js";

const router = new express.Router();

router.post("/send", protectRoute, sendMessage);
router.get("/conversation/:userId", protectRoute, getConversation);

export { router as messageRouter };
