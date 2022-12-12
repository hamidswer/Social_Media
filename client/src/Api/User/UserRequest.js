import axios from "axios";

axios.defaults.withCredentials = true;
const API = axios.create({ baseURL: "http://localhost:5000" });

const UserRequest = async (userId) => {
  const newUserObj = await API.get(`/user/${userId}/`);
  const newUser = await newUserObj.data;
  return newUser;
};

export default UserRequest;
