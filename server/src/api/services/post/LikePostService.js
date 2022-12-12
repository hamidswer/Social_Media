import postModel from "../../models/PostModel.js";
import LikePostNotificationService from "../notification/LikePostNotificationService.js";
const LikePostService = async (postId, userId) => {
  try {
    const post = await postModel.findById(postId);
    if (!post.likes.includes(userId)) {
      // post like
      await LikePostNotificationService(post, userId, "like");
      await post.updateOne({ $push: { likes: userId } });
      return { responseStatus: 200, message: "Post liked!" };
    } else {
      await LikePostNotificationService(post, userId, "unlike");
      await post.updateOne({ $pull: { likes: userId } });
      return { responseStatus: 200, message: "Post unliked!" };
    }
  } catch (error) {
    return { responseStatus: 500, message: error };
  }
};
export default LikePostService;
