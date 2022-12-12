import axios from "axios";

axios.defaults.withCredentials = true;
const API = axios.create({ baseURL: "http://localhost:5000" });

const RandomUsersRequest = async () => {
  const randomUserObj = await API.get("/user/");
  const randomUser = await randomUserObj.data;
  return randomUser;
};

export default RandomUsersRequest;
