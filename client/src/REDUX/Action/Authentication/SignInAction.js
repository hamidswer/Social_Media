import SignInRequest from "../../../Api/Authentication/SignInRequest.js";

const SignInAction = (formData) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const data = await SignInRequest(formData);
    dispatch({ type: "AUTH_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "AUTH_FAIL" });
  }
};

export default SignInAction;
