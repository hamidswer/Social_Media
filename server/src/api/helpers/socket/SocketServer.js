import { Server } from "socket.io";
import dotenv from "dotenv";
dotenv.config();
export let io;
export const SocketServer = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: process.env.CLIENT_DOMAIN,
      credentials: true,
    },
  });
  return io;
};
