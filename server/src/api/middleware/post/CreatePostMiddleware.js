import hasImage from "../../validations/post/hasImage.js";
import hasContent from "../../validations/post/hasContent.js";
import hasVideo from "../../validations/post/hasVideo.js";
const CreatePostMiddleware = (req, res, next) => {
  if (hasImage(req.body) || hasContent(req.body) || hasVideo(req.body)) {
    next();
  } else {
    res.status(500).json({ message: "No content for creating a new post!" });
  }
};
export default CreatePostMiddleware;
