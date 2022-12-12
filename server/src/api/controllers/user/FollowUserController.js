import FollowUserService from "../../services/user/FollowUserService.js";
const FollowUserController = async (req, res) => {
  const userId = req.body.userId;
  const personId = req.body.personId;
  const { responseStatus, message } = await FollowUserService(userId, personId);
  res.status(responseStatus).json(message);
};

export default FollowUserController;
