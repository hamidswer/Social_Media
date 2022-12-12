import PostsRequest from "../../../Api/Post/PostsRequest.js";
const ProfilePostAction = (id, skip, limit) => async (dispatch) => {
  dispatch({ type: "RETREIVING_PROFILE_POST_START" });
  try {
    const data = await PostsRequest(id, skip, limit);
    dispatch({ type: "RETREIVING_PROFILE_POST_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "RETREIVING_PROFILE_POST_FAIL" });
  }
};

export default ProfilePostAction;
