import UserRequest from "../../../Api/User/UserRequest.js";

const UserAction = (userId) => async (dispatch) => {
  try {
    const data = await UserRequest(userId);
    dispatch({ type: "GET_USER_SUCCESS", data: data });
  } catch (error) {
    console.log("sh", error);
  }
};

export default UserAction;
