import axios from "axios";

axios.defaults.withCredentials = true;
const API = axios.create({ baseURL: "http://localhost:5000" });

const GetNotificationRequest = async (userId) => {
  const notificationObj = await API.get(`/notification/${userId}`);
  const notification = await notificationObj.data;
  return notification;
};

export default GetNotificationRequest;
