import axios from "axios";

axios.defaults.withCredentials = true;
const API = axios.create({ baseURL: "http://localhost:5000" });

const PostRequest = async (id) => {
  const postObj = await API.get(`/post/${id}`);
  const post = await postObj.data;
  return post;
};

export default PostRequest;
