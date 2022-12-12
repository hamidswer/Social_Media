import axios from "axios";

axios.defaults.withCredentials = true;
const API = axios.create({ baseURL: "http://localhost:5000" });

const TimelinePostsRequest = async (id) => {
  const timelinePostsObj = await API.get(`/post/${id}/timeline`);
  const timelinePosts = await timelinePostsObj.data;
  return timelinePosts;
};

export default TimelinePostsRequest;
