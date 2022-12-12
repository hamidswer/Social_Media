import axios from "axios";

axios.defaults.withCredentials = true;
const API = axios.create({ baseURL: "http://localhost:5000/" });

const UploadVideoRequest = async (data, userId) => {
  const videoObject = await API.post(`/upload/video/${userId}`, data);
  const video = await videoObject.data;
  return video;
};

export default UploadVideoRequest;
