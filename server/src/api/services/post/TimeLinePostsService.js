import postModel from "../../models/PostModel.js";
import UserModel from "../../models/UserModel.js";
const TimelinePostsService = async (req) => {
  req.session.numberOfRequest = 0;
  const userId = req.params.id;
  try {
    const currentUserPosts = await postModel
      .find({ userId: userId })
      .populate("userId", "firstname profilePicture");
    const user = await UserModel.findById(userId);
    let postsss = [];
    let userFollowings = user.following;
    await Promise.all(
      await userFollowings.map(async (usrId) => {
        let postam = await postModel
          .find({ userId: usrId })
          .populate("userId", "firstname profilePicture")
          .sort({ createdAt: -1 })
          .limit(10);
        postsss.push(postam);
      })
    );
    let posts = currentUserPosts.concat(...postsss).sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    let resPosts;
    if (posts.length < 10) {
      resPosts = posts;
    } else {
      resPosts = posts.slice(0, 10);
    }
    req.session.posts = posts;
    return { responseStatus: 200, data: resPosts };
  } catch (error) {
    return { responseStatus: 500, data: error };
  }
};
export default TimelinePostsService;
