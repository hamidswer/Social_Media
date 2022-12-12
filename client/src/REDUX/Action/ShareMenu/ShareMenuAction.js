const ShareMenuAction =
  (shareMenuStatus, shareMenuPostId) => async (dispatch) => {
    dispatch({
      type: "SHARE-POST",
      data: {
        shareMenuStatus: shareMenuStatus,
        shareMenuPostId: shareMenuPostId,
      },
    });
  };
export default ShareMenuAction;
