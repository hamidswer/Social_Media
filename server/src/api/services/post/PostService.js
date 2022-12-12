import postModel from "../../models/PostModel.js";

const PostService = async (postId) => {
  try {
    const post = await postModel
      .findById(postId)
      .populate("userId", "firstname lastname profilePicture");
    return { responseStatus: 200, data: post };
  } catch (error) {
    return { responseStatus: 500, data: error };
  }
};
export default PostService;
