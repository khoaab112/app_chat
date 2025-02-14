const { Server } = require("socket.io");
let count = 0;
let io;

const initializeSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", (socket) => {
        count++;
        console.log("User connected:", socket.id);
        console.log("total:", count);

        socket.on("message", (data) => {
            io.emit("message", data);
        });


        socket.on("group_message", (roomId, sender, message) => {});
        socket.on("join_group", (roomId, sender, message) => {});
        socket.on("out_group", (roomId, sender, message) => {});


        socket.on("personal_message", (roomId, sender, message) => {
            console.log("roomId:", roomId);
            console.log("sender:", sender);
            console.log("message:", message);
            io.emit("message", message);
            io.emit("receive_message", { roomId, sender, message });
            io.to(roomId).emit("receive_message", { roomId, sender, message });
        })


        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
            count--;
        });
    });

    return io;
};

module.exports = { initializeSocket, getIO: () => io };