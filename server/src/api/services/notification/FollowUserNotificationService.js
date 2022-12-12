const FollowUserNotificationService = async (follower, user, type) => {
  const userId = user._id.toHexString();
  const activity = "followUser";
  const name = user.firstname + " " + user.lastname;
  const profilePicture = user.profilePicture;
  if (type === "follow") {
    await follower.updateOne({
      $push: {
        notification: {
          activity: activity,
          userId: userId,
          name: name,
          profilePicture: profilePicture,
        },
      },
    });

    if (user.notification.length > 10) {
      await user.updateOne({
        $pop: {
          notification: -1,
        },
      });
    }
  } else {
    await follower.updateOne({
      $pull: {
        notification: {
          activity: activity,
          userId: userId,
        },
      },
    });
  }
};

export default FollowUserNotificationService;
