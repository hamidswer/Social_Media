import { getOnlineUsers } from "../Data/OnlineUsers.js";
import { getSocket, getIo } from "../Data/socket.js";

const GetUser = () => {
  getSocket().on("getUser", (data) => {
    console.log(data);
    const user = getOnlineUsers().find((user) => user.userId === data.userId);
    if (user) getIo().to(user.socketId).emit("sendUser", user);
  });
};

export default GetUser;
