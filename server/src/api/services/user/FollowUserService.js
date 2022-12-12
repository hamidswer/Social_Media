import userModel from "../../models/userModel.js";
import FollowUserNotificationService from "../notification/FollowUserNotificationService.js";

const FollowUserService = async (currentUserId, userToFollow) => {
  if (userToFollow === currentUserId) {
    return { responseStatus: 403, message: "Action forbidden!" };
  } else {
    try {
      const followerUser = await userModel.findById(userToFollow);
      const followingUser = await userModel.findById(currentUserId);

      if (!followerUser.followers.includes(currentUserId)) {
        await followerUser.updateOne({ $push: { followers: currentUserId } });
        await followingUser.updateOne({ $push: { following: userToFollow } });
        await FollowUserNotificationService(
          followerUser,
          followingUser,
          "follow"
        );
        return { responseStatus: 200, message: "The user followed!" };
      } else {
        return {
          responseStatus: 403,
          message: "User is Already followed by you!",
        };
      }
    } catch (error) {
      return { responseStatus: 500, message: error };
    }
  }
};

export default FollowUserService;
