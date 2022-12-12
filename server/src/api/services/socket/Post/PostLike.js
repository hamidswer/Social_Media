import { getOnlineUsers } from "../Data/OnlineUsers.js";
import { getSocket, getIo } from "../Data/socket.js";

const PostLike = () => {
  getSocket().on("postLike", (data) => {
    let user = getOnlineUsers().find((user) => user.userId === data.personId);
    if (user) {
      getIo().to(user.socketId).emit("sendNotification", data);
    }
  });
};

export default PostLike;
