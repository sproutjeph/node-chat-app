import { io } from "../server";
import Filter from "bad-words";
import { generateLocationMessage, generateMessage } from "../utils/messages";
import { addUser, getUser, getUsersInRoom, removeUser } from "../utils/user";
export function chatMessage() {
  io.on("connection", (socket) => {
    console.log("New WebSoket connection");

    socket.on("join", ({ userName, room }, cb) => {
      const { error, user } = addUser({ id: socket.id, room, userName });
      if (error) {
        return cb(error);
      }
      socket.join(user!?.room);

      socket.emit("message", generateMessage(user?.userName, "welcome!"));
      socket.broadcast
        .to(user!?.room)
        .emit("message", generateMessage(`${user!.userName} has joined`));
      io.to(user!?.room).emit("roomData", {
        room: user?.room,
        users: getUsersInRoom(user!?.room),
      });
      cb();
    });

    socket.on("sendMessage", (messageData, cb) => {
      const user = getUser(socket.id);

      const filter = new Filter();

      if (filter.isProfane(messageData)) {
        return cb("Profanity is not allowed");
      }

      io.to(user!?.room).emit(
        "message",
        generateMessage(messageData, user?.userName)
      );
      cb();
    });
    socket.on("sendLocation", (coords, cb) => {
      const user = getUser(socket.id);
      io.to(user!?.room).emit(
        "locationMessage",
        generateLocationMessage(
          `https://google.com/maps?q=${coords.latitude},${coords.longitude}`,
          user!?.userName
        )
      );
      cb();
    });

    socket.on("disconnect", () => {
      const user = removeUser(socket.id);

      if (user) {
        io.to(user.room).emit(
          "message",
          generateMessage(` ${user.userName} has Left`)
        );
        io.to(user.room).emit("roomData", {
          room: user.room,
          users: getUsersInRoom(user.room),
        });
      }
    });
  });
}
