import UnfollowUserService from "../../services/user/UnfollowUserService.js";
const UnfollowUserController = async (req, res) => {
  const userId = req.body.userId;
  const personId = req.body.personId;
  const { responseStatus, message } = await UnfollowUserService(
    userId,
    personId
  );
  res.status(responseStatus).json(message);
};

export default UnfollowUserController;
