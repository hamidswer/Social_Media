import UserModel from "../../models/UserModel.js";
const notificationService = async (userId) => {
  try {
    const user = await UserModel.findById(userId);
    const notification = user.notification.reverse();
    return { responseStatus: 200, data: notification };
  } catch (error) {
    return {
      responseStatus: 500,
      data: { message: "Something with notification request is wrong!" },
    };
  }
};

export default notificationService;
