import SearchUserService from "../../services/user/SearchUserService.js";
const SearchUserController = async (req, res) => {
  const searchName = req.body.searchName;
  const { responseStatus, data } = await SearchUserService(searchName);
  res.status(responseStatus).json(data);
};

export default SearchUserController;
