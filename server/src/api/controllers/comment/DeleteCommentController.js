import DeleteCommentService from "../../services/Comment/DeleteCommentService.js";
const DeleteCommentController = async (req, res) => {
  const CommentId = req.params.commentId;
  const { userId } = req.body;
  const { responseStatus, message } = await DeleteCommentService(
    CommentId,
    userId
  );
  res.status(responseStatus).json(message);
};
export default DeleteCommentController;
