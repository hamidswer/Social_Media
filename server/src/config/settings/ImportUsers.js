import UserModel from "../../api/models/UserModel.js";
import PostModel from "../../api/models/PostModel.js";
import UserDirectory from "../../api/services/user/UserDirectory.js";
import bcrypt from "bcrypt";
import fs from "fs-extra";
import path from "path";
import dotenv from "dotenv";

const ImportUsers = async (req, res) => {
  const users = await UserModel.find({ imported: "yes" });

  // Create user password.
  // users.map((newUser) => {
  //   createPassword(newUser);
  // });

  // Create user directory.
  // users.map((newUser) => {
  //   UserDirectory(newUser._id.toHexString());
  // });

  // Create user profile and cover pictures.
  // users.map((newUser) => {
  //   createUserPicture(newUser);
  // });

  // Create 4 posts.
  // users.map((newUser) => {
  //   createPost(newUser);
  // });

  res.status(200).json({ message: "Done!" });
};

const createPassword = async (newUser) => {
  const salt = await bcrypt.genSalt(10);
  const password = (await newUser.firstname.toLowerCase()) + 811394;
  const hashedPass = await bcrypt.hash(password, salt);
  newUser.password = hashedPass;
  await new UserModel(newUser).save();
};

const createUserPicture = async (newUser) => {
  dotenv.config();
  const __dirname = path.resolve();

  // user image path
  const userId = await newUser._id.toHexString();
  const userPicturePath = path.join(
    __dirname,
    process.env.UPLOAD_IMAGE_PATH,
    userId
  );

  // demo image path
  const demoImagePath = path.join(
    __dirname,
    process.env.UPLOAD_IMAGE_PATH,
    "demo"
  );

  const pictures = fs.readdirSync(demoImagePath);

  // creates profile picture
  const profilePicture = pictures[Math.floor(Math.random() * pictures.length)];
  const profilePicturePath = path.join(demoImagePath, profilePicture);
  const profilePictureName =
    newUser.firstname + "-" + newUser.lastname + "-profile-picture.jpg";
  const userProfilePicturePath = path.join(userPicturePath, profilePictureName);
  fs.copyFileSync(profilePicturePath, userProfilePicturePath);

  // creates cover picture
  const coverPicture = pictures[Math.floor(Math.random() * pictures.length)];
  const coverPicturePath = path.join(demoImagePath, coverPicture);
  const coverPictureName =
    newUser.firstname + "-" + newUser.lastname + "-cover-picture.jpg";
  const userCoverPicturePath = path.join(userPicturePath, coverPictureName);
  fs.copyFileSync(coverPicturePath, userCoverPicturePath);
};

const createPost = async (newUser) => {
  dotenv.config();
  const __dirname = path.resolve();

  // user image path
  const userId = await newUser._id.toHexString();
  const userPicturePath = path.join(
    __dirname,
    process.env.UPLOAD_IMAGE_PATH,
    userId
  );

  // demo image path
  const demoImagePath = path.join(
    __dirname,
    process.env.UPLOAD_IMAGE_PATH,
    "demo"
  );

  const pictures = fs.readdirSync(demoImagePath);

  // Create 4 posts
  for (let i = 1; i < 5; i++) {
    const postPicture = pictures[Math.floor(Math.random() * pictures.length)];
    const postPicturePath = path.join(demoImagePath, postPicture);
    const postPictureName =
      newUser.firstname + "-" + newUser.lastname + `-post-picture-${i}.jpg`;
    const userPostPicturePath = path.join(userPicturePath, postPictureName);
    fs.copyFileSync(postPicturePath, userPostPicturePath);

    const postContent = {
      userId: userId,
      image: postPictureName,
    };
    await new PostModel(postContent).save();
  }
};

export default ImportUsers;
