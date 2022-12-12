import UserModel from "../../models/UserModel.js";
const hasUser = async (data) => {
  if (data.userId.length === 0) {
    return false;
  }
  try {
    await UserModel.findById(data.userId);
    return true;
  } catch (error) {
    return false;
  }
};
export default hasUser;
