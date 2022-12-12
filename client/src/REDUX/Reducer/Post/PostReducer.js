const defaultState = {
  posts: [],
  loading: false,
  error: false,
  uploading: false,
  postId: null,
};
const PostReducer = (state = defaultState, action) => {
  switch (action.type) {
    // belongs to PostShare.jsx
    case "UPLOAD_START":
      return { ...state, error: false, uploading: true };
    case "UPLOAD_SUCCESS":
      return {
        ...state,
        posts: [action.data, ...state.posts],
        uploading: false,
        error: false,
      };
    case "UPLOAD_FAIL":
      return { ...state, uploading: false, error: true };
    // belongs to Posts.jsx
    case "RETREIVING_START":
      return { ...state, loading: true, error: false };
    case "RETREIVING_SUCCESS":
      return { ...state, posts: action.data, loading: false, error: false };
    case "RETREIVING_FAIL":
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
    case "LOGOUT_POST":
      localStorage.clear();
      return { defaultState, uploading: false, error: false };
    default:
      return state;
  }
};

export default PostReducer;
