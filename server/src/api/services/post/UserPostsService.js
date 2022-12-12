import postModel from "../../models/PostModel.js";

/**
 *
 * @param {String} userId
 * @param {Number} limit - limit the number of requested posts
 * @param {Number} skip - skip posts
 * @returns
 */
const UserPostsService = async (userId, limit, skip) => {
  const countPosts = await postModel.find({ userId: userId }).count();
  if (countPosts > skip) {
    const currentUserPosts = await postModel
      .find({ userId: userId })
      .populate("userId", "firstname lastname profilePicture")
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 })
      .populate("userId", "firstname profilePicture");
    return { responseStatus: 200, data: currentUserPosts };
  } else {
    return { responseStatus: 500, data: {} };
  }
};
export default UserPostsService;
