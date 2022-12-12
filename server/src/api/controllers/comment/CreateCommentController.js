import CreateCommentService from "../../services/comment/CreateCommentService.js";

const CreateCommentController = async (req, res) => {
  const { responseStatus, data } = await CreateCommentService(req.body);
  res.status(responseStatus).json(data);
};

export default CreateCommentController;
