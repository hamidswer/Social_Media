import UpdatePostService from "../../services/post/UpdatePostService.js";

const UpdatePostController = async (req, res) => {
  const postId = req.params.id;
  const data = req.body;
  const { responseStatus, message } = await UpdatePostService(postId, data);
  res.status(responseStatus).json(message);
};
export default UpdatePostController;
