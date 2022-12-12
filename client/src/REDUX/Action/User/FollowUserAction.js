import FollowUserRequest from "../../../Api/User/FollowUserRequest.js";

const FollowUserAction = (userId, personId) => async (dispatch) => {
  try {
    await FollowUserRequest(userId, personId);
    dispatch({ type: "FOLLOW_USER", followPerson: personId });
  } catch (error) {
    console.log(error);
  }
};

export default FollowUserAction;
