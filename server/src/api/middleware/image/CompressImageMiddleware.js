import sharp from "sharp";
import path from "path";
import fs from "fs-extra";
import dotenv from "dotenv";

const compressPostImage = async (
  image,
  imageName,
  imageFormat,
  userImageFolder
) => {
  const postImage = userImageFolder + imageName + "." + imageFormat;
  await sharp(image)
    .resize({
      width: 1080,
    })
    .toFile(postImage);
};

const compressCoverImage = async (
  image,
  imageName,
  imageFormat,
  userImageFolder
) => {
  const coverImage = userImageFolder + imageName + "." + imageFormat;
  await sharp(image)
    .resize({
      width: 1024,
    })
    .toFile(coverImage);
};

const compressProfileImage = async (
  image,
  imageName,
  imageFormat,
  userImageFolder
) => {
  const profileImage = userImageFolder + imageName + "." + imageFormat;
  await sharp(image)
    .resize({
      width: 360,
    })
    .toFile(profileImage);
};

const CompressImageMiddleware = async (req, res, next) => {
  dotenv.config();
  const imagePath = process.env.UPLOAD_IMAGE_PATH;
  const __dirname = path.resolve();
  const type = req.params.type;
  const userId = req.params.userId;
  const imageFolder = path.join(__dirname, imagePath + `/`);
  const userImageFolder = path.join(__dirname, imagePath + `/` + userId + `/`);
  const image = imageFolder + req.file.filename;
  const imageName = req.file.filename.split(".")[0];
  const imageFormat = req.file.filename.split(".")[1];

  try {
    switch (type) {
      case "post":
        await compressPostImage(image, imageName, imageFormat, userImageFolder);
        break;
      case "cover":
        await compressCoverImage(
          image,
          imageName,
          imageFormat,
          userImageFolder
        );
        break;
      case "profile":
        await compressProfileImage(
          image,
          imageName,
          imageFormat,
          userImageFolder
        );
        break;
      default:
        "";
    }
    // delete temporary image
    fs.unlinkSync(image);
    next();
  } catch (error) {
    next(error);
  }
};

export default CompressImageMiddleware;
