import CreatePostRequest from "../../../Api/Post/CreatePostRequest.js";
import UploadImageRequest from "../../../Api/Post/UploadImageRequest.js";
import UploadVideoRequest from "../../../Api/Post/UploadVideoRequest.js";
const CreatePostAction =
  (postContent, userId, imageData, videoData, imageType, postId) =>
  async (dispatch) => {
    if (imageData)
      try {
        await UploadImageRequest(imageData, imageType, userId);
      } catch (error) {
        console.log(error);
      }
    if (videoData)
      try {
        await UploadVideoRequest(videoData, userId);
      } catch (error) {
        console.log(error);
      }
    dispatch({ type: "UPLOAD_PROFILE_START" });
    dispatch({ type: "UPLOAD_START" });
    try {
      const data = await CreatePostRequest(postContent, postId);
      dispatch({ type: "UPLOAD_PROFILE_SUCCESS", data: data });
      dispatch({ type: "UPLOAD_SUCCESS", data: data });
    } catch (error) {
      dispatch({ type: "UPLOAD_PROFILE_FAIL" });
      dispatch({ type: "UPLOAD_FAIL" });
    }
  };

export default CreatePostAction;
