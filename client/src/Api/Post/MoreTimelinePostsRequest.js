import axios from "axios";

axios.defaults.withCredentials = true;
const API = axios.create({ baseURL: "http://localhost:5000" });

const MoreTimelinePostsRequest = async (id) => {
  const morePostsObj = await API.get(`/post/${id}/timeline/more`);
  const morePosts = await morePostsObj.data;
  return morePosts;
};

export default MoreTimelinePostsRequest;
