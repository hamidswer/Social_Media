import express from "express";
import UploadVideoMiddleware from "../middleware/video/UploadVideoMiddleware.js";
import UploadVideoController from "../controllers/video/UploadVideoController.js";
import VideoUserDirectory from "../middleware/video/VideoUserDirectory.js";
const router = express.Router();

// Upload a post video
router.post(
  "/:userId",
  UploadVideoMiddleware,
  VideoUserDirectory,
  UploadVideoController
);

export default router;
