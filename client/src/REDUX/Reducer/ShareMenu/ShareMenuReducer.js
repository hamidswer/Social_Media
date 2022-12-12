const defaultState = {
  shareMenuStatus: false,
  shareMenuPostId: 1,
};
const ShareMenuReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "SHARE-POST":
      return {
        ...defaultState,
        shareMenuStatus: action.data.shareMenuStatus,
        shareMenuPostId: action.data.shareMenuPostId,
      };
    default:
      return state;
  }
};

export default ShareMenuReducer;
