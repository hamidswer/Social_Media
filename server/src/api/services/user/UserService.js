import userModel from "../../models/userModel.js";

const UserService = async (userId) => {
  try {
    const user = await userModel.findById(userId);
    if (user) {
      const { password, ...other } = user._doc;
      return { responseStatus: 200, data: other };
    } else {
      return { responseStatus: 404, data: "No such user exist!" };
    }
  } catch (error) {
    return { responseStatus: 500, data: error };
  }
};

export default UserService;
