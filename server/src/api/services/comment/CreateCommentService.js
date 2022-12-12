import CommentModel from "../../models/CommentModel.js";
import { io } from "../../helpers/socket/SocketServer.js";

/**
 * Create a new Comment by user.
 * @param {JSON} CommentContent The content that the user wants to Comment.
 * @returns A new Comment.
 */
const CreateCommentService = async (commentContent) => {
  try {
    const data = await new CommentModel(commentContent).save();
    const currentPostComments = await CommentModel.findById(data._id).populate(
      "userId",
      "firstname profilePicture"
    );
    currentPostComments._id = currentPostComments._id.toHexString();
    return { responseStatus: 200, data: currentPostComments };
  } catch (error) {
    return { responseStatus: 500, data: error };
  }
};
export default CreateCommentService;
