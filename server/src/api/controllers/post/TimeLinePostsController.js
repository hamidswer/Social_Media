import TimelinePostsService from "../../services/post/TimelinePostsService.js";
const TimelinePostsController = async (req, res) => {
  const { responseStatus, data } = await TimelinePostsService(req);
  res.status(responseStatus).json(data);
};
export default TimelinePostsController;
