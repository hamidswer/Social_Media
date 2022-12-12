import DeletePostService from "../../services/post/DeletePostService.js";
import DeletePostImageService from "../../services/post/DeletePostImageService.js";
import DeletePostCommentService from "../../services/post/DeletePostCommentService.js";
const DeletePostController = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;
  await DeletePostImageService(postId, userId);
  await DeletePostCommentService(postId);
  const { responseStatus, message } = await DeletePostService(postId, userId);
  res.status(responseStatus).json(message);
};
export default DeletePostController;
