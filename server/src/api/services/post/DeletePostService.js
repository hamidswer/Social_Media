import postModel from "../../models/PostModel.js";

const DeletePostService = async (postId, userId) => {
  try {
    const post = await postModel.findById(postId);
    if (post.userId.toHexString() === userId) {
      await post?.deleteOne();
      return { responseStatus: 200, message: "The post deleted." };
    } else {
      return { responseStatus: 403, message: "Action forbidden!" };
    }
  } catch (error) {
    return { responseStatus: 500, message: error };
  }
};
export default DeletePostService;
