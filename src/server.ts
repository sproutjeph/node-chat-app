import http from "http";
import app from "./app";
import { PORT } from "./config/server.config";
import { Server } from "socket.io";
const server = http.createServer(app);

export const io = new Server(server);

import { chatMessage } from "../src/chatLogic/chat";
async function startServer() {
  try {
    chatMessage();
    server.listen(PORT, () => {
      console.log(`server is runing on port ${PORT}...`);
    });
  } catch (error) {
    console.log(error);
  }
}

startServer();
