import postModel from "../../models/PostModel.js";
import DeletePostImageService from "./DeletePostImageService.js";
import DeletePostVideoService from "./DeletePostVideoService.js";
const UpdatePostService = async (postId, postContent) => {
  try {
    const post = await postModel.findById(postId);
    let response;
    if (postContent.image) {
      await DeletePostImageService(postId, postContent.userId);
      await DeletePostVideoService(postId, postContent.userId);
      response = await post.updateOne({ $set: { image: "", video: "" } });
    }
    if (postContent.video) {
      await DeletePostVideoService(postId, postContent.userId);
      await DeletePostImageService(postId, postContent.userId);
      response = await post.updateOne({ $set: { image: "", video: "" } });
    }
    response = await post.updateOne({ $set: postContent });
    return { responseStatus: 500, message: response };
  } catch (error) {
    return { responseStatus: 500, message: error };
  }
};
export default UpdatePostService;
