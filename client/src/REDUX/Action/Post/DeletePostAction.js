import DeletePostRequest from "../../../Api/Post/DeletePostRequest.js";

const DeletePostAction = (postId, userId) => async (dispatch) => {
  try {
    await DeletePostRequest(postId, userId);
    dispatch({ type: "DELETE_SUCCESS", postId: postId });
  } catch (error) {
    console.log(error);
    dispatch({ type: "DELETE_FAIL" });
  }
};

export default DeletePostAction;
