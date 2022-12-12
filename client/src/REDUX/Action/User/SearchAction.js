const SearchAction = (status, inputField) => async (dispatch) => {
  dispatch({
    type: "STATUS",
    search: { status: status, inputField: inputField },
  });
};

export default SearchAction;
