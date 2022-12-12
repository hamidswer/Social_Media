import MoreTimelinePostsRequest from "../../../Api/Post/MoreTimelinePostsRequest.js";

const MoreTimelinePostsAction = (id) => async (dispatch) => {
  dispatch({ type: "RETREIVING_MORE_POST_START" });
  try {
    const data = await MoreTimelinePostsRequest(id);
    dispatch({ type: "RETREIVING_MORE_POST_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "RETREIVING_MORE_POST_FAIL" });
  }
};

export default MoreTimelinePostsAction;
