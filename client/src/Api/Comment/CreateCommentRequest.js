import axios from "axios";

axios.defaults.withCredentials = true;
const API = axios.create({ baseURL: "http://localhost:5000/" });

const CreateCommentRequest = async (data) => {
  const commentObject = await API.post("/comment/", data);
  const comment = await commentObject.data;
  return comment;
};

export default CreateCommentRequest;
