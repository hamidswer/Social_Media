import bcrypt from "bcrypt";
import userModel from "../../models/userModel.js";
import DeleteImageService from "./DeleteImageService.js";

const UpadateUserService = async (userId, updateData) => {
  const { _id, currentUserAdminStatus, password } = updateData;

  if (userId === _id || currentUserAdminStatus) {
    try {
      if (password) {
        const salt = await bcrypt.genSalt(10);
        updateData.password = await bcrypt.hash(password, salt);
      }
      const useram = await userModel.findById(userId);
      if (updateData.profilePicture !== useram.profilePicture) {
        DeleteImageService(useram, "profile");
      }
      if (updateData.coverPicture !== useram.coverPicture) {
        DeleteImageService(useram, "cover");
      }
      const user = await userModel.findByIdAndUpdate(userId, updateData, {
        new: true,
      });
      return { responseStatus: 200, data: { user } };
    } catch (error) {
      return { responseStatus: 500, data: error };
    }
  } else {
    return {
      responseStatus: 403,
      data: "Access denied! You can't upadte someone else account!",
    };
  }
};

export default UpadateUserService;
