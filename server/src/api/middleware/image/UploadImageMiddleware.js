import multer from "multer";
import dotenv from "dotenv";

dotenv.config();
const imagePath = process.env.UPLOAD_IMAGE_PATH;
const limits = { fileSize: 1024 * 1024 * 1024 };
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imagePath);
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
const upload = multer({
  storage: storage,
  limits: limits,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

export default upload.single("file");
