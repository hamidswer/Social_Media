import CreatePostService from "../../services/post/CreatePostService.js";

const CreatePostController = async (req, res) => {
  const { responseStatus, data } = await CreatePostService(req.body);
  res.status(responseStatus).json(data);
};

export default CreatePostController;
