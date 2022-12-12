import express from "express";
import dotenv from "dotenv";
import SetSettings from "../config/SetSettings.js";
import { createServer } from "http";
import { SocketServer } from "./helpers/socket/SocketServer.js";
import socketIndex from "./services/socket/index.js";
dotenv.config();

const app = express();
const httpServer = createServer(app);

SocketServer(httpServer);
socketIndex();

const server = httpServer.listen(process.env.PORT || 5000, () => {
  console.log(`App running on port ${process.env.PORT || 5000}...`);
});
SetSettings(app, server);
