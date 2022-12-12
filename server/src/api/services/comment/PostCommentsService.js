import CommentModel from "../../models/CommentModel.js";
/**
 *
 * @param {String} postId
 * @param {Number} limit - limit the number of requested comments
 * @param {Number} skip - skip comments
 * @returns
 */
const PostCommentsService = async (postId, limit, skip) => {
  const countComments = await CommentModel.find({ postId: postId }).count();
  if (countComments > skip) {
    const currentPostComments = await CommentModel.find({ postId: postId })
      .populate("userId", "firstname profilePicture")
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 });
    return { responseStatus: 200, data: currentPostComments };
  } else {
    return { responseStatus: 200, data: {} };
  }
};
export default PostCommentsService;
