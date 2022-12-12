import UpadateUserService from "../../services/user/UpdateUserService.js";
const UpdateUserController = async (req, res) => {
  const userId = req.params.id;
  const updateData = req.body;
  const { responseStatus, data } = await UpadateUserService(userId, updateData);
  res.status(responseStatus).json(data);
};
export default UpdateUserController;
