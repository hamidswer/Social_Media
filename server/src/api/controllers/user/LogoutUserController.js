import LogoutUserService from "../../services/user/LogoutUserService.js";
const LogoutUserController = async (req, res) => {
  const token = await LogoutUserService();

  /** assign our jwt to the cookie */
  res.cookie("jwt", token, { httpOnly: true, secure: true });
  res.status(200).send({ message: "User Logged out!" });
};
export default LogoutUserController;
