import LogOutRequest from "../../../Api/Authentication/LogOutRequest.js";

const LogOutAction = () => async (dispatch) => {
  await LogOutRequest();
  dispatch({ type: "LOGOUT_POST" });
  dispatch({ type: "LOGOUT_PROFILE_POST" });
  dispatch({ type: "LOGOUT" });
};

export default LogOutAction;
