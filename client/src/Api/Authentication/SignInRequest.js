import axios from "axios";

axios.defaults.withCredentials = true;
const API = axios.create({
  baseURL: "http://localhost:5000/",
});

const SignInRequest = async (formData) => {
  const signInObj = await API.post("/auth/login", formData);
  const user = await signInObj.data;
  return user;
};

export default SignInRequest;
