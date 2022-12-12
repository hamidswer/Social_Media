import TimelinePostsRequest from "../../../Api/Post/TimelinePostsRequest.js";

const TimelinePostsAction = (id) => async (dispatch) => {
  dispatch({ type: "RETREIVING_START" });
  try {
    const data = await TimelinePostsRequest(id);
    dispatch({ type: "RETREIVING_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "RETREIVING_FAIL" });
  }
};

export default TimelinePostsAction;
