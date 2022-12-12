import PostService from "../../services/post/PostService.js";

const PostController = async (req, res) => {
  const postId = req.params.id;
  const { responseStatus, data } = await PostService(postId);
  res.status(responseStatus).json(data);
};

export default PostController;
