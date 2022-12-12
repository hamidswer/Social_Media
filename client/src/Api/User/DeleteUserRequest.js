import axios from "axios";
axios.defaults.withCredentials = true;
const API = axios.create({ baseURL: "http://localhost:5000" });

const UserRequest = async (userId) => {
  const headers = {
    Deleted: "Delete Request.",
  };
  const data = {
    userId: userId,
  };
  await API.delete(`/user/${userId}/`, { headers, data });
};

export default UserRequest;
