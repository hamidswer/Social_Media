import userModel from "../../models/userModel.js";

const RandomUsersService = async () => {
  try {
    let users = await userModel.aggregate([
      {
        $project: {
          _id: 1,
          firstname: 1,
          lastname: 1,
          profilePicture: 1,
        },
      },
      { $sample: { size: 15 } },
    ]);
    return { responseStatus: 200, data: users };
  } catch (error) {
    return { responseStatus: 500, data: error };
  }
};
export default RandomUsersService;
