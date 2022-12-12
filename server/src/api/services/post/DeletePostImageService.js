import postModel from "../../models/PostModel.js";
import path from "path";
import fs from "fs-extra";
import dotenv from "dotenv";

const DeletePostImageService = async (postId, userId) => {
  try {
    const post = await postModel.findById(postId);
    if (post.image && post.userId.toHexString() === userId) {
      dotenv.config();
      const imagePath = process.env.UPLOAD_IMAGE_PATH;
      const __dirname = path.resolve();
      const imageFolder = path.join(__dirname, imagePath + "/" + userId + `/`);
      const image = imageFolder + post.image;
      fs.unlinkSync(image);
    }
  } catch (error) {
    return console.log(error);
  }
};
export default DeletePostImageService;
