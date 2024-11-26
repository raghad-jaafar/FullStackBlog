import express from "express"
import {addPost, deletePost, getPost, getPosts, updatePost} from "../controllers/post.js"
import { addComment, getComments } from "../controllers/comment.js"; // Import your comment controller
import { addLike, getLikeCount } from "../controllers/like.js"; // Import your like controller

const router=express.Router();

// Route to get all posts
router.get("/", getPosts);

// Route to get a single post by ID
router.get("/:id", getPost);

// Route to add a new post
router.post("/", addPost);

// Route to delete a post by ID
router.delete("/:id", deletePost);

// Route to update a post by ID
router.put("/:id", updatePost);
// ==============================
// Likes Routes
// ==============================

// Route to add a like to a post
router.post("/:id/likes", addLike);

// Route to get the like count of a post
router.get("/:id/likes", getLikeCount);

// ==============================
// Comments Routes
// ==============================

// Route to add a comment to a post
router.post("/:id/comments", addComment);

// Route to get all comments for a post
router.get("/:id/comments", getComments);
export default router