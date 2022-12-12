import { removeAUser } from "../Data/OnlineUsers.js";

const RemoveUser = (socket) => {
  removeAUser(socket.id);
};

export default RemoveUser;
