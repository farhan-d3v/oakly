import { Server } from "socket.io";

export const setupSocketIO = (io: Server) => {
  console.log("🔌 Socket.IO handlers setup complete");

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);
  });
};
