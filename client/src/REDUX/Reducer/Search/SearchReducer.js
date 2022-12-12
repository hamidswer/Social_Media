const defaultState = { search: { status: false, inputField: true } };
const SearchReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "STATUS": {
      return {
        ...state,
        search: {
          status: action.search.status,
          inputField: action.search.inputField,
        },
      };
    }
    default:
      return state;
  }
};
export default SearchReducer;
