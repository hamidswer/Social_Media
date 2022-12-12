import axios from "axios";

axios.defaults.withCredentials = true;
const API = axios.create({ baseURL: "http://localhost:5000" });

const LikePostRequest = (id, userId) =>
  API.put(`post/${id}/like`, { userId: userId });

export default LikePostRequest;
