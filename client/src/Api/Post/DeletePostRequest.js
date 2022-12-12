import axios from "axios";
axios.defaults.withCredentials = true;
const API = axios.create({ baseURL: "http://localhost:5000" });

const DeletePostRequest = async (postId, userId) => {
  const headers = {
    Deleted: "Delete Request.",
  };
  const data = {
    userId: userId,
  };
  await API.delete(`post/${postId}`, { headers, data });
};
export default DeletePostRequest;
