import multer from "multer";
import dotenv from "dotenv";
import path from "path";
dotenv.config();

const limits = { fileSize: 104857600 };

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const __dirname = path.resolve();
    const videoPath = process.env.UPLOAD_VIDEO_PATH;
    const userId = req.params.userId;
    const userVideoFolder = path.join(
      __dirname,
      videoPath + `/` + userId + `/`
    );
    cb(null, userVideoFolder);
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
const upload = multer({
  storage: storage,
  limits: limits,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "video/mp4" || file.mimetype == "video/wmv") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .mp4 format allowed!"));
    }
  },
});

export default upload.single("file");
