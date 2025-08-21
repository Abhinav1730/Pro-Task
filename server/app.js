import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import connectDB from "./src/config/database.js";
import authRoutes from "./src/routes/authRoutes.js";
import projectRoutes from "./src/routes/projectRoutes.js";
import taskRoutes from "./src/routes/taskRoutes.js";
import collabRoutes from "./src/routes/collabRoutes.js";
import { initSocket } from "./src/socket/index.js";
import { startDueNotifier } from "./src/utils/dueNotifier.js";
import { errorHandler } from "./src/utils/error.js";

dotenv.config();
await connectDB();

const app = express();

app.use(cors({ origin: process.env.CLIENT_ORIGIN, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// routes
app.get("/", (_, res) => res.send("✅ Pro-Task API running"));
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/collab", collabRoutes);

app.use(errorHandler);

// creating HTTP server for socket.io
const server = http.createServer(app);

// initialising socket.io
const io = new SocketIOServer(server, {
  cors: {
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
  },
});

initSocket(io);
startDueNotifier(io);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(` API + Socket running on port ${PORT}`));