import PostsRequest from "../../../Api/Post/PostsRequest.js";
const MoreProfilePostAction = (id, skip, limit) => async (dispatch) => {
  dispatch({ type: "RETREIVING_MORE_PROFILE_POST_START" });
  try {
    const data = await PostsRequest(id, skip, limit);
    dispatch({ type: "RETREIVING_MORE_PROFILE_POST_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "RETREIVING_MORE_PROFILE_POST_FAIL" });
  }
};

export default MoreProfilePostAction;
