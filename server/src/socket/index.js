import { Server } from "socket.io";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("🔌 New client connected:", socket.id);

    // to Join project room
    socket.on("joinProject", (projectId) => {
      socket.join(projectId);
      console.log(` User ${socket.id} joined project ${projectId}`);
    });

    // to Leave project room
    socket.on("leaveProject", (projectId) => {
      socket.leave(projectId);
      console.log(` User ${socket.id} left project ${projectId}`);
    });

    // to Broadcast task updates
    socket.on("taskUpdated", ({ projectId, task }) => {
      io.to(projectId).emit("taskUpdated", task);
    });

    // to Broadcast new task
    socket.on("taskCreated", ({ projectId, task }) => {
      io.to(projectId).emit("taskCreated", task);
    });

    // to Broadcast project updates
    socket.on("projectUpdated", ({ projectId, project }) => {
      io.to(projectId).emit("projectUpdated", project);
    });

    // for Notifications (for invites, due dates, etc.)
    socket.on("notify", ({ userId, message }) => {
      io.to(userId).emit("notification", message);
    });

    socket.on("disconnect", () => {
      console.log(" Client disconnected:", socket.id);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};