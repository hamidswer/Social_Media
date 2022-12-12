import MoreTimeLinePostsService from "../../services/post/MoreTimeLinePostsService.js";
const MoreTimelinePostsController = async (req, res) => {
  const session = req.session;
  const { responseStatus, data } = await MoreTimeLinePostsService(session);

  res.status(responseStatus).json(data);
};
export default MoreTimelinePostsController;
