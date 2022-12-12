const CommentReducer = (
  state = {
    commentsCounter: false,
  },
  action
) => {
  switch (action.type) {
    case "ADD_COMMENT_SUCCESS":
      return {
        ...state,
        commentsCounter: ++action.data.commentsCounter,
      };
    default:
      return state;
  }
};

export default CommentReducer;
