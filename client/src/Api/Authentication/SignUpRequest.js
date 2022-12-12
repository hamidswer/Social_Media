import axios from "axios";

axios.defaults.withCredentials = true;
const API = axios.create({
  baseURL: "http://localhost:5000/",
});

const SignUpRequest = async (formData) => {
  const signUpObj = await API.post("/auth/register", formData);
  const user = await signUpObj.data;
  return user;
};

export default SignUpRequest;
