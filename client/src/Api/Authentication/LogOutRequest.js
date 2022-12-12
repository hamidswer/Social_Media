import axios from "axios";

axios.defaults.withCredentials = true;
const API = axios.create({
  baseURL: "http://localhost:5000/",
});

const LogOutRequest = async () => {
  await API.post("/auth/logout");
};

export default LogOutRequest;
