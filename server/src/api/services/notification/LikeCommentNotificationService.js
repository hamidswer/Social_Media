import UserModel from "../../models/UserModel.js";

const LikeCommentNotificationService = async (comment, userId, type) => {
  const commentId = comment._id.toHexString();
  const commentUserId = comment.userId.toHexString();
  const commentAuthor = await UserModel.findById(commentUserId);
  const user = await UserModel.findById(userId);
  const useram = user._id;
  const commentPostId = comment.postId.toHexString();
  const name = user.firstname + " " + user.lastname;
  const profilePicture = user.profilePicture;
  if (type === "like") {
    await commentAuthor.updateOne({
      $push: {
        notification: {
          activity: "commentLike",
          commentId: commentId,
          commentPostId: commentPostId,
          userId: useram,
          name: name,
          profilePicture: profilePicture,
        },
      },
    });

    if (commentAuthor.notification.length > 10) {
      await commentAuthor.updateOne({
        $pop: {
          notification: -1,
        },
      });
    }
  } else {
    await commentAuthor.updateOne({
      $pull: {
        notification: {
          activity: "commentLike",
          commentId: commentId,
          commentPostId: commentPostId,
        },
      },
    });
  }
};

export default LikeCommentNotificationService;
