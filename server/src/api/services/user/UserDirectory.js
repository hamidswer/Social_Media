import fs from "fs-extra";
import path from "path";

const UserDirectory = async (userId) => {
  const __dirname = path.resolve();
  const imagePath = process.env.UPLOAD_IMAGE_PATH;
  const videoPath = process.env.UPLOAD_VIDEO_PATH;
  const imageDirectory = path.join(__dirname, imagePath) + `/`;
  const videoDirectory = path.join(__dirname, videoPath) + `/`;
  const userImageDirectory = imageDirectory + userId;
  const userVideoDirectory = videoDirectory + userId;
  // Image directory
  if (!fs.existsSync(userImageDirectory)) {
    fs.mkdirSync(userImageDirectory);
  }

  // video directory
  if (!fs.existsSync(userVideoDirectory)) {
    fs.mkdirSync(userVideoDirectory);
  }
};

export default UserDirectory;
