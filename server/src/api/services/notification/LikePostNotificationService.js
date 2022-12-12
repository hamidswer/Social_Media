import UserModel from "../../models/UserModel.js";

const LikePostNotificationService = async (post, userId, type) => {
  const postId = post._id.toHexString();
  const postUserId = post.userId.toHexString();
  const postAuthor = await UserModel.findById(postUserId);
  const user = await UserModel.findById(userId);
  const useram = user._id;
  const name = user.firstname + " " + user.lastname;
  const profilePicture = user.profilePicture;

  if (type === "like") {
    // notification
    await postAuthor.updateOne({
      $push: {
        notification: {
          activity: "postLike",
          userId: useram,
          postId: postId,
          name: name,
          profilePicture: profilePicture,
        },
      },
    });
    if (postAuthor.notification.length > 10) {
      await postAuthor.updateOne({
        $pop: {
          notification: -1,
        },
      });
    }
  } else {
    await postAuthor.updateOne({
      $pull: {
        notification: {
          activity: "postLike",
          userId: useram,
          postId: postId,
        },
      },
    });
  }
};

export default LikePostNotificationService;
