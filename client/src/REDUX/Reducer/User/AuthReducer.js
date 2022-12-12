const defaultState = { authData: null, loading: false, error: false };

const AuthReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "AUTH_START":
      return { ...state, loading: true, error: false };
    case "AUTH_SUCCESS":
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action.data, loading: false, error: false };
    case "AUTH_FAIL":
      return { ...state, loading: false, error: true };
    case "GOOGLE_AUTH_START":
      return { ...state, loading: true, error: false };
    case "GOOGLE_AUTH_SUCCESS":
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action.data, loading: false, error: false };
    case "GOOGLE_AUTH_FAIL":
      return { ...state, loading: false, error: true };
    case "LOGOUT":
      localStorage.clear();
      return { defaultState, authData: null, loading: false, error: false };
    case "UPDATING_START":
      return { ...state, loading: true, error: false };
    case "UPDATING_SUCCESS":
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action.data, loading: false, error: false };
    case "UPDATING_FAIL":
      return { ...state, loading: false, error: true };
    case "FOLLOW_USER":
      return {
        ...state,
        authData: {
          ...state.authData,
          user: {
            ...state.authData.user,
            following: [...state.authData.user.following, action.followPerson],
          },
        },
      };

    case "UNFOLLOW_USER":
      return {
        ...state,
        authData: {
          ...state.authData,
          user: {
            ...state.authData.user,
            following: state.authData.user.following.filter(
              (personId) => personId !== action.unfollowPerson
            ),
          },
        },
      };

    default:
      return state;
  }
};
export default AuthReducer;
