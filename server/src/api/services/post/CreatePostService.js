import postModel from "../../models/PostModel.js";
/**
 * Create a new post by user.
 * @param {JSON} postContent The content that the user wants to post.
 * @returns A new post.
 */
const CreatePostService = async (postContent) => {
  try {
    let newPost = new postModel(postContent);
    const data = await newPost.save();
    const currentPost = await postModel
      .findById(data._id)
      .populate("userId", "firstname profilePicture");
    currentPost._id = currentPost._id.toHexString();
    return { responseStatus: 200, data: currentPost };
  } catch (error) {
    return { responseStatus: 500, data: error };
  }
};
export default CreatePostService;
