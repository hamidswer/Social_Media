import CreateCommentRequest from "../../../Api/Comment/CreateCommentRequest.js";
const CommentsAction =
  (commentsCounter, commentContent) => async (dispatch) => {
    if (commentContent) {
      await CreateCommentRequest(commentContent);
    }
    dispatch({
      type: "ADD_COMMENT_SUCCESS",
      data: { commentsCounter: commentsCounter },
    });
  };

export default CommentsAction;
