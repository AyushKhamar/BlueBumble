import express from "express";
import { login, logout, signUp } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.js";

const router = new express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", protectRoute, (req, res) => {
  return res.status(200).json({ success: true, content: req.user });
});

export default router;
