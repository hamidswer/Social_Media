import path from "path";
import fs from "fs-extra";
import dotenv from "dotenv";

const DeleteImageService = async (user, type) => {
  dotenv.config();
  const __dirname = path.resolve();
  const imagePath = process.env.UPLOAD_IMAGE_PATH;
  const userId = user._id;
  const userImageFolder = path.join(__dirname, imagePath + `/` + userId + `/`);
  try {
    if (user.profilePicture && type === "profile") {
      const profilePicture = userImageFolder + user.profilePicture;
      if (fs.existsSync(profilePicture)) {
        fs.unlinkSync(profilePicture);
      }
    }
    if (user.coverPicture && type === "cover") {
      const coverPicture = userImageFolder + user.coverPicture;
      if (fs.existsSync(coverPicture)) {
        fs.unlinkSync(coverPicture);
      }
    }
  } catch (error) {
    console.log(error);
  }
};
export default DeleteImageService;
