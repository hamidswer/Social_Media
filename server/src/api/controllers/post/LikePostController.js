import LikePostService from "../../services/post/LikePostService.js";
const LikePostController = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;
  const { responseStatus, message } = await LikePostService(postId, userId);
  res.status(responseStatus).json(message);
};
export default LikePostController;
