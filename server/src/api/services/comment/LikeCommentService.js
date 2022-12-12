import CommentModel from "../../models/CommentModel.js";
import PostModel from "../../models/PostModel.js";
import LikeCommentNotificationService from "../notification/LikeCommentNotificationService.js";
const LikeCommentService = async (commentId, userId) => {
  try {
    const comment = await CommentModel.findById(commentId);
    const post = await PostModel.findById(comment.postId);
    const postId = post._id.toHexString();
    if (!comment.likes.includes(userId)) {
      await comment.updateOne({ $push: { likes: userId } });
      await LikeCommentNotificationService(comment, userId, "like");
      return { responseStatus: 200, message: postId };
    } else {
      await comment.updateOne({ $pull: { likes: userId } });
      await LikeCommentNotificationService(comment, userId, "unlike");
      return { responseStatus: 200, message: "comment unliked!" };
    }
  } catch (error) {
    return { responseStatus: 500, message: error };
  }
};
export default LikeCommentService;
