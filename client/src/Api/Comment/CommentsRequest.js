import axios from "axios";

axios.defaults.withCredentials = true;
const API = axios.create({ baseURL: "http://localhost:5000" });

const CommentsRequest = async (postId, skip, limit) => {
  const commentsObj = await API.get(
    `/comment/${postId}/comments/${skip}/${limit}`
  );
  const comments = await commentsObj.data;
  return comments;
};

export default CommentsRequest;
