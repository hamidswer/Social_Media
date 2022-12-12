import PostModel from "../../models/PostModel.js";
const hasPost = async (data) => {
  if (data.postId.length === 0) {
    return false;
  }
  try {
    await PostModel.findById(data.postId);
    return true;
  } catch (error) {
    return false;
  }
};
export default hasPost;
