import userModel from "../../models/userModel.js";
import FollowUserNotificationService from "../notification/FollowUserNotificationService.js";

const UnfollowUserService = async (currentUserId, userToFollow) => {
  if (userToFollow === currentUserId) {
    return { responseStatus: 403, message: "Action forbidden!" };
  } else {
    try {
      const followerUser = await userModel.findById(userToFollow);
      const followingUser = await userModel.findById(currentUserId);

      if (followerUser.followers.includes(currentUserId)) {
        await followerUser.updateOne({ $pull: { followers: currentUserId } });
        await followingUser.updateOne({ $pull: { following: userToFollow } });
        await FollowUserNotificationService(
          followerUser,
          followingUser,
          "unfollow"
        );
        return { responseStatus: 200, message: "The user unfollowed!" };
      } else {
        return {
          responseStatus: 403,
          message: "The user is not followed by you!",
        };
      }
    } catch (error) {
      return { responseStatus: 500, message: error };
    }
  }
};

export default UnfollowUserService;
