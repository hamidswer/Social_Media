import axios from "axios";

axios.defaults.withCredentials = true;
const API = axios.create({ baseURL: "http://localhost:5000" });

const LikeCommentRequest = async (commentId, userId) => {
  const commentObject = await API.put(`comment/${commentId}/like`, {
    userId: userId,
  });
  const comment = await commentObject.data;
  return comment;
};

export default LikeCommentRequest;
