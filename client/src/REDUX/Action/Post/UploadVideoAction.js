import UploadVideoRequest from "../../../Api/Post/UploadVideoRequest.js";

const UploadVideoAction =
  (data, userId, edit = false) =>
  async (dispatch) => {
    try {
      await UploadVideoRequest(data, userId, edit);
    } catch (error) {
      console.log(error);
    }
  };

export default UploadVideoAction;
