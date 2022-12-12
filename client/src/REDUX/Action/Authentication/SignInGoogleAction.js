const SignInGoogleAction = (obj) => async (dispatch) => {
  dispatch({ type: "GOOGLE_AUTH_START" });
  try {
    dispatch({ type: "GOOGLE_AUTH_SUCCESS", data: obj });
  } catch (error) {
    console.log(error);
    dispatch({ type: "GOOGLE_AUTH_FAIL" });
  }
};

export default SignInGoogleAction;
