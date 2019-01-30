const path = require('path');
const http = require('http');
const publicPath = path.join(__dirname, '../public');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message.js')
const express = require("express");
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => { //socket here represents each connection to the client
  console.log('New user connected');

  socket.emit("newMessage", generateMessage('Admin', "welcome to the chat app")) // send event to individual socket

  socket.broadcast.emit("newMessage", generateMessage('Admin', 'New user joined')) // send the event to everybody but this socket

  socket.on("createMessage", (message) => {
    console.log("createMessage", message);
    io.emit("newMessage", generateMessage(message.from, message.text)) //send the event to everybody

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
