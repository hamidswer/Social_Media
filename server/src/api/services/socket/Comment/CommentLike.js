import { getOnlineUsers } from "../Data/OnlineUsers.js";
import { getSocket, getIo } from "../Data/socket.js";

const CommentLike = () => {
  getSocket().on("CommentLike", (data) => {
    let user = getOnlineUsers().find((user) => user.userId === data.personId);
    if (user) {
      getIo().to(user.socketId).emit("sendNotification", data);
    }
  });
};

export default CommentLike;
