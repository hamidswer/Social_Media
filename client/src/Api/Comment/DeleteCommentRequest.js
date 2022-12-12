import axios from "axios";
axios.defaults.withCredentials = true;
const API = axios.create({ baseURL: "http://localhost:5000" });

const DeleteCommentRequest = async (commentId, userId) => {
  const headers = {
    Deleted: "Delete Request.",
  };
  const data = {
    userId: userId,
  };
  await API.delete(`comment/${commentId}`, { headers, data });
};
export default DeleteCommentRequest;
