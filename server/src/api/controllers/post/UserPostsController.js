import UserPostsService from "../../services/post/UserPostsService.js";
const UserPostsController = async (req, res) => {
  const userId = req.params.id;
  const limit = req.params.limit;
  const skip = req.params.skip;
  const { responseStatus, data } = await UserPostsService(userId, limit, skip);
  res.status(responseStatus).json(data);
};
export default UserPostsController;
