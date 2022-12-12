import DeleteUserService from "../../services/user/DeleteUserService.js";

const DeleteUserController = async (req, res) => {
  const validUserId = req.body.validUserId;
  const { responseStatus, message } = await DeleteUserService(validUserId);
  res.status(responseStatus).json(message);
};

export default DeleteUserController;
