import { getSocket } from "../Data/socket.js";
import { getOnlineUsers } from "../Data/OnlineUsers.js";
const GetUsers = () => {
  getSocket().on("getUsers", () => {
    getSocket().emit("sendUsers", getOnlineUsers());
  });
};

export default GetUsers;
