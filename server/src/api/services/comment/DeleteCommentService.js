import CommentModel from "../../models/CommentModel.js";
import UserModel from "../../models/UserModel.js";

const DeleteCommentService = async (CommentId, userId) => {
  try {
    const comment = await CommentModel.findById(CommentId);
    await UserModel.findById(comment.userId);
    if (comment.userId.toHexString() === userId) {
      await comment.deleteOne();
      return { responseStatus: 200, message: "The Comment deleted." };
    } else {
      return { responseStatus: 403, message: "Action forbidden!" };
    }
  } catch (error) {
    return { responseStatus: 500, message: error };
  }
};
export default DeleteCommentService;
