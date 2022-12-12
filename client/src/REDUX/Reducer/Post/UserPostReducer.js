const defaultState = {
  posts: null,
  loading: false,
  error: false,
  uploading: false,
  postId: null,
};
const UserPostReducer = (state = defaultState, action) => {
  switch (action.type) {
    // belongs to Posts.jsx
    case "RETREIVING_POSTS_START":
      return { ...state, loading: true, error: false };
    case "RETREIVING_POSTS_SUCCESS":
      return { ...state, posts: action.data, loading: false, error: false };
    case "RETREIVING_POSTS_FAIL":
      return { ...state, loading: false, error: true };
    case "RETREIVING_MORE_POST_START":
      return { ...state, loading: true, error: false };
    case "RETREIVING_MORE_POST_SUCCESS":
      if (action.data.length > 0) {
        return {
          ...state,
          posts: [...state.posts, ...action.data],
          loading: false,
          error: false,
        };
      } else {
        return { ...state, loading: false, error: false };
      }
    case "RETREIVING_MORE_POST_FAIL":
      return { ...state, loading: false, error: true };
    case "DELETE_SUCCESS":
      return {
        ...state,
        posts: [...state.posts.filter((post) => post._id !== action.postId)],
        uploading: false,
        error: false,
      };
    case "DELETE_FAIL":
      return { ...state, uploading: false, error: true };
    default:
      return state;
  }
};

export default UserPostReducer;
