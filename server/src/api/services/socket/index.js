import { io } from "../../helpers/socket/SocketServer.js";
import RemoveUser from "./user/RemoveUser.js";
import AddUser from "./user/AddUser.js";
import { setSocket, setIo } from "./Data/socket.js";
import GetUsers from "./user/GetUsers.js";
import GetUser from "./user/GetUser.js";
import PostLike from "./Post/PostLike.js";
import CommentLike from "./Comment/CommentLike.js";

const socketIndex = () => {
  io.on("connection", (socket) => {
    setIo(io);
    setSocket(socket);
    AddUser();
    GetUsers();
    GetUser();
    PostLike();
    CommentLike();
    socket.on("disconnect", () => {
      RemoveUser(socket);
    });
  });
};

export default socketIndex;
