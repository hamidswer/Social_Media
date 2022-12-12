import axios from "axios";

axios.defaults.withCredentials = true;
const API = axios.create({ baseURL: "http://localhost:5000" });

const FollowUserRequest = async (userId, personId) => {
  const data = { userId: userId, personId: personId };
  const followUserObj = await API.put(`/user/follow`, data);
  const followUser = await followUserObj.data;
  return followUser;
};

export default FollowUserRequest;
