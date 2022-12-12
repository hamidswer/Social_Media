import UploadImageRequest from "../../../Api/Post/UploadImageRequest.js";

const UploadImageAction =
  (data, type, userId, edit = false) =>
  async (dispatch) => {
    try {
      await UploadImageRequest(data, type, userId, edit);
    } catch (error) {
      console.log(error);
    }
  };

export default UploadImageAction;
