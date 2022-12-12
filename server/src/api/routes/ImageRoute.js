import express from "express";
import UploadImageMiddleware from "../middleware/image/UploadImageMiddleware.js";
import CompressImageMiddleware from "../middleware/image/CompressImageMiddleware.js";
import UploadImageController from "../controllers/image/UploadImageController.js";
const router = express.Router();

// Upload a post image
router.post(
  "/:type/:userId",
  UploadImageMiddleware,
  CompressImageMiddleware,
  UploadImageController
);

export default router;
