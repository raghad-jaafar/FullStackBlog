import express from "express"
import {addPost, deletePost, getPost, getPosts, updatePost} from "../controllers/post.js"


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


export default router