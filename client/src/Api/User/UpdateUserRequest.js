import axios from "axios";

axios.defaults.withCredentials = true;
const API = axios.create({ baseURL: "http://localhost:5000" });

const UpdateUserRequest = async (id, formData) => {
  const updatedUserObj = await API.put(`/user/${id}`, formData);
  const updatedUser = await updatedUserObj.data;
  return updatedUser;
};

export default UpdateUserRequest;
