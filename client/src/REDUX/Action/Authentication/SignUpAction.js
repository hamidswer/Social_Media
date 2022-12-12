import SignUpRequest from "../../../Api/Authentication/SignUpRequest.js";

const SignUpAction = (formData) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const data = await SignUpRequest(formData);
    dispatch({ type: "AUTH_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "AUTH_FAIL" });
  }
};

export default SignUpAction;
