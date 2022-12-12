import express from "express";
import notificationController from "../controllers/notification/notificationController.js";
const router = express.Router();

router.get("/:id", notificationController);

export default router;
