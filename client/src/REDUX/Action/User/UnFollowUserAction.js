import UnFollowUserRequest from "../../../Api/User/UnFollowUserRequest.js";

const UnFollowUserAction = (userId, personId) => async (dispatch) => {
  try {
    await UnFollowUserRequest(userId, personId);
    dispatch({ type: "UNFOLLOW_USER", unfollowPerson: personId });
  } catch (error) {
    console.log(error);
  }
};

export default UnFollowUserAction;
