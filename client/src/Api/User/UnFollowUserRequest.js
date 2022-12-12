import axios from "axios";

axios.defaults.withCredentials = true;
const API = axios.create({ baseURL: "http://localhost:5000" });

const UnFollowUserRequest = async (userId, personId) => {
  const data = { userId: userId, personId: personId };
  const unFollowUserObj = await API.put(`/user/unfollow`, data);
  const unFollowUser = await unFollowUserObj.data;
  return unFollowUser;
};

export default UnFollowUserRequest;
