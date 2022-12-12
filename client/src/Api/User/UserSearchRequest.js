import axios from "axios";

axios.defaults.withCredentials = true;
const API = axios.create({ baseURL: "http://localhost:5000" });

const UserSearchRequest = async (searchName) => {
  const newUserObj = await API.post(`/user/search`, searchName);
  const newUser = await newUserObj.data;
  return newUser;
};

export default UserSearchRequest;
