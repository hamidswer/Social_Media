import express from "express";
import CreateCommentController from "../controllers/comment/CreateCommentController.js";
import CreateCommentMiddleware from "../middleware/comment/CreateCommentMiddleware.js";
import DeleteCommentController from "../controllers/comment/DeleteCommentController.js";
import PostCommentsController from "../controllers/comment/PostCommentsController.js";
import LikeCommentController from "../controllers/comment/LikeCommentController.js";
const router = express.Router();

// Post a new comment
router.post("/", CreateCommentMiddleware, CreateCommentController);

// delete a comment
router.delete("/:commentId", DeleteCommentController);

// like a comment
router.put("/:commentId/like", LikeCommentController);

// get the comments of a post
router.get("/:postId/comments/:skip/:limit", PostCommentsController);

export default router;
