const path = require('path');
const http = require('http');
const publicPath = path.join(__dirname, '../public');
const socketIO = require('socket.io');

const express = require("express");
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => { //socket here represents each connection to the client
  console.log('New user connected');

  socket.emit("newMessage", {
    from: "Yana",
    text: "Hey, what is going on",
    createAt: 123
  });

  socket.on("createMessage", (newMessage) => {
    console.log("createMessage", newMessage);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(3000, () => {
  console.log('Started Chat App Server');
})
