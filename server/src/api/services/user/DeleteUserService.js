import PostModel from "../../models/PostModel.js";
import userModel from "../../models/userModel.js";
import DeletePostCommentService from "../post/DeletePostCommentService.js";
import DeletePostImageService from "../post/DeletePostImageService.js";
import DeletePostVideoService from "../post/DeletePostVideoService.js";
import DeletePostService from "../post/DeletePostService.js";
import path from "path";
import fs from "fs-extra";
const DeleteUserService = async (validUserId) => {
  const id = validUserId;
  const posts = await PostModel.find({ userId: id });

  posts.map(async (post) => await DeletePostCommentService(post._id));

  posts.map(async (post) => await DeletePostImageService(post._id, id));

  posts.map(async (post) => await DeletePostVideoService(post._id, id));

  posts.map(async (post) => await DeletePostService(post._id, id));

  const user = await userModel.findById(id);
  await user?.deleteOne();

  const __dirname = path.resolve();
  const imagePath = process.env.UPLOAD_IMAGE_PATH;
  const userImageFolder = path.join(__dirname, imagePath + `/` + id);
  const videoPath = process.env.UPLOAD_VIDEO_PATH;
  const videoFolder = path.join(__dirname, videoPath + "/" + id);
  fs.rmSync(userImageFolder, { recursive: true, force: true });
  fs.rmSync(videoFolder, { recursive: true, force: true });

  return { responseStatus: 200, message: "user deleted." };
};

export default DeleteUserService;
