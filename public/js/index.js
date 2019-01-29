let socket = io();

socket.on('connect', function() {
  console.log('Connected to server');
});

socket.emit("createMessage", {
  from: "Yana",
  text: "Hey"
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on("newMessage", function(message) {
  console.log("New message", message);
})
