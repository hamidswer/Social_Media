import UserService from "../../services/user/UserService.js";

const User = async (req, res) => {
  const userId = req.params.id;
  const { responseStatus, data } = await UserService(userId);
  res.status(responseStatus).json(data);
};
export default User;
