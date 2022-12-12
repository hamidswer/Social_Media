import notificationService from "../../services/notification/notificationService.js";
const notificationController = async (req, res) => {
  const { responseStatus, data } = await notificationService(req.params.id);
  res.status(responseStatus).json(data);
};

export default notificationController;
