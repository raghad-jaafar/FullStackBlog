// routes/likes.js
import express from "express";
import { likePost, unlikePost, getLikes } from "../controllers/like.js";

const router = express.Router();

// Add a like to a post
router.post("/:postId", likePost);

// Remove a like from a post
router.delete("/:postId/:userId", unlikePost);

// Get all likes for a specific post
router.get("/:postId", getLikes);

export default router;
