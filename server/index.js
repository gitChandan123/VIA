import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import {Server} from "socket.io";
import { addUser, removeUser, getUser, getUsersInRoom } from "./utils/users.js";
import userRoutes from "./routes/user.js";

const app = express();
dotenv.config();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello to VIA API");
});

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    const server = app.listen(PORT, () =>
      console.log(`Server running on port: ${PORT}`)
    );
    const io = new Server(server, {
      cookie: false,
      cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true,
      },
    });

    io.on("connection", (socket) => {
      console.log("user connected with " + socket.id);
      socket.on("join", ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room });
        console.log(getUsersInRoom(room));

        if (error) return callback(error);

        socket.join(user.room);

        socket.emit("message", {
          user: "admin",
          text: `${user.name}, welcome to room ${user.room}.`,
        });
        socket.broadcast
          .to(user.room)
          .emit("message", { user: "admin", text: `${user.name} has joined!` });

        io.to(user.room).emit("roomData", {
          room: user.room,
          users: getUsersInRoom(user.room),
        });

        callback();
      }); 

      socket.on("sendMessage", (message, callback) => {
        const user = getUser(socket.id);

        io.to(user.room).emit("message", { user: user.name, text: message });

        callback();
      });

      socket.on("disconnect", () => {
        console.log("user disconnected with " + socket.id);
        const user = removeUser(socket.id);

        if (user) {
          io.to(user.room).emit("message", {
            user: "Admin",
            text: `${user.name} has left.`,
          });
          io.to(user.room).emit("roomData", {
            room: user.room,
            users: getUsersInRoom(user.room),
          });
        }
      });
    });
    
  })
  .catch((error) => console.log(error.message));
