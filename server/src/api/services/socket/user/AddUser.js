import { addANewUser } from "../Data/OnlineUsers.js";
import { getSocket } from "../Data/socket.js";
const AddUser = () => {
  getSocket().on("addUser", (data) => {
    addANewUser(data);
  });
};

export default AddUser;
