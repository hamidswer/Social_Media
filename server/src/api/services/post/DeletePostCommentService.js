import CommentModel from "../../models/CommentModel.js";
const DeletePostCommentService = async (postId) => {
  await CommentModel.find({ postId: postId })?.deleteMany();
};

export default DeletePostCommentService;
