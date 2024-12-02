// routes/comments.js
import express from "express";
import { getComments, addComment } from "../controllers/comment.js";

const router = express.Router();

// Get all comments for a specific post
router.get("/:postId", getComments);

// Add a new comment to a specific post
router.post("/:postId", addComment);  // Include postId in the URL path

export default router;
