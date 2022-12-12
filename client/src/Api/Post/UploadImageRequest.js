import axios from "axios";

axios.defaults.withCredentials = true;
const API = axios.create({ baseURL: "http://localhost:5000/" });

const UploadImageRequest = async (data, type, userId) => {
  const imageObject = await API.post(`/upload/image/${type}/${userId}`, data);
  const image = await imageObject.data;
  return image;
};

export default UploadImageRequest;
