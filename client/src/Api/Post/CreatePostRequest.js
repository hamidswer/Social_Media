import axios from "axios";

axios.defaults.withCredentials = true;
const API = axios.create({ baseURL: "http://localhost:5000/" });

const CreatePostRequest = async (postContent, postId) => {
  if (postId) {
    const postObject = await API.put(`/post/${postId}`, postContent);
    const post = await postObject.data;
    return post;
  } else {
    const postObject = await API.post("/post/", postContent);
    const post = await postObject.data;
    return post;
  }
};

export default CreatePostRequest;
