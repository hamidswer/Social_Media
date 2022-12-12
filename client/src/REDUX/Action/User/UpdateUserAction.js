import UpdateUserRequest from "../../../Api/User/UpdateUserRequest.js";

const UpdateUserAction = (id, formData) => async (dispatch) => {
  dispatch({ type: "UPDATING_START" });
  try {
    const data = await UpdateUserRequest(id, formData);
    dispatch({ type: "UPDATING_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "UPDATING_FAIL" });
  }
};

export default UpdateUserAction;
