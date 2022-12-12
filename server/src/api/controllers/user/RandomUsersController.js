import RandomUsersService from "../../services/user/RandomUsersService.js";
const RandomUsersController = async (req, res) => {
  const { responseStatus, data } = await RandomUsersService();
  res.status(responseStatus).json(data);
};
export default RandomUsersController;
