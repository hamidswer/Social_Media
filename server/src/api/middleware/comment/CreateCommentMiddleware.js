import hasContent from "../../validations/comment/hasContent.js";
import hasPost from "../../validations/comment/hasPost.js";
import hasUser from "../../validations/comment/hasUser.js";
const CreateCommentMiddleware = (req, res, next) => {
  if (hasContent(req.body) && hasPost(req.body) && hasUser(req.body)) {
    next();
  } else {
    res.status(500).json({ message: "No content for creating a new comment!" });
  }
};
export default CreateCommentMiddleware;
