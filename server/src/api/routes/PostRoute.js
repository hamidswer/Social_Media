import express from "express";
import Protected from "../helpers/user/Protected.js";
import CreatePost from "../controllers/post/CreatePostController.js";
import Post from "../controllers/post/PostController.js";
import UpdatePost from "../controllers/post/UpdatePostController.js";
import DeletePost from "../controllers/post/DeletePostController.js";
import LikePost from "../controllers/post/LikePostController.js";
import TimelinePosts from "../controllers/post/TimelinePostsController.js";
import MoreTimelinePosts from "../controllers/post/MoreTimelinePostsController.js";
import CreatePostMiddleware from "../middleware/post/CreatePostMiddleware.js";
import UserPosts from "../controllers/post/UserPostsController.js";
const router = express.Router();

// Get a new post by id
router.get("/:id", Post);

// Post a new post
router.post("/", Protected, CreatePostMiddleware, CreatePost);

// update a post
router.put("/:id", Protected, UpdatePost);

// delete a post
router.delete("/:id", Protected, DeletePost);

// like a post
router.put("/:id/like", Protected, LikePost);

// get all posts
router.get("/:id/timeline", TimelinePosts);

// get more timeline posts
router.get("/:id/timeline/more", MoreTimelinePosts);

// get posts of a user
router.get("/:id/posts/:skip/:limit", UserPosts);

export default router;
