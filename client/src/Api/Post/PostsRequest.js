import axios from "axios";

axios.defaults.withCredentials = true;
const API = axios.create({ baseURL: "http://localhost:5000" });

const PostsRequest = async (id, skip, limit) => {
  const postsObj = await API.get(`/post/${id}/posts/${skip}/${limit}`);
  const posts = await postsObj.data;
  return posts;
};

export default PostsRequest;
