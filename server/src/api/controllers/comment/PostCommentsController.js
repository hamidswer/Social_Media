import PostCommentsService from "../../services/comment/PostCommentsService.js";
const PostCommentsController = async (req, res) => {
  const postId = req.params.postId;
  const limit = req.params.limit;
  const skip = req.params.skip;
  const { responseStatus, data } = await PostCommentsService(
    postId,
    limit,
    skip
  );
  res.status(responseStatus).json(data);
};
export default PostCommentsController;
