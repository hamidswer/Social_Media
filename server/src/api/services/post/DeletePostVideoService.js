import postModel from "../../models/PostModel.js";
import path from "path";
import fs from "fs-extra";
import dotenv from "dotenv";

const DeletePostVideoService = async (postId, userId) => {
  try {
    const post = await postModel.findById(postId);
    if (post.video && post.userId.toHexString() === userId) {
      dotenv.config();
      const videoPath = process.env.UPLOAD_VIDEO_PATH;
      const __dirname = path.resolve();
      const videoFolder = path.join(__dirname, videoPath + "/" + userId + `/`);
      const video = videoFolder + post.video;
      fs.unlinkSync(video);
    }
  } catch (error) {
    return console.log(error);
  }
};
export default DeletePostVideoService;
