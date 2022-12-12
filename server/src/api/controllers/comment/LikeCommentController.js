import LikeCommentService from "../../services/comment/LikeCommentService.js";
const LikeCommentController = async (req, res) => {
  const commentId = req.params.commentId;
  const { userId } = req.body;
  const { responseStatus, message } = await LikeCommentService(
    commentId,
    userId
  );
  res.status(responseStatus).json(message);
};
export default LikeCommentController;
