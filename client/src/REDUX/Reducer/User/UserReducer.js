const defaultState = { userData: null, error: false };

const UserReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "GET_USER_SUCCESS":
      return {
        ...state,
        userData: action.data,
        error: false,
      };
    default:
      return state;
  }
};

export default UserReducer;
