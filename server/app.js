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

  socket.emit("newMessage", { // send event to individual socket
    from: "Admin",
    text: "Welcome to the chat app",
    createdAt: new Date().getTime()
  });

  socket.broadcast.emit("newMessage", { // send the event to everybody but this socket
    from: "Admin",
    text: "New user joined",
    createdAt: new Date().getTime()
  })

  socket.on("createMessage", (message) => {
    console.log("createMessage", message);
    io.emit("newMessage", { //send the event to everybody
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
    // socket.broadcast.emit("newMessage", {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // })
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(3000, () => {
  console.log('Started Chat App Server');
})
