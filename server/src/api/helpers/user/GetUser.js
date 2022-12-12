import UserModel from "../../models/UserModel.js";

const GetUser = async (req, res) => {
  try {
    await UserModel.findById(req.user.userId).then((user) =>
      res.status(200).send({ user })
    );
  } catch (error) {
    console.log(error);
  }
};
export default GetUser;
