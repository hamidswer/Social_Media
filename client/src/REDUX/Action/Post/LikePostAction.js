import LikePostRequest from "../../../Api/Post/LikePostRequest.js";

const LikePostAction = (postId, userId) => async (dispatch) => {
  try {
    await LikePostRequest(postId, userId);
  } catch (error) {
    console.log(error);
  }
};

export default LikePostAction;
