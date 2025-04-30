const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const http = require('http').createServer(app); 
const io = require('socket.io')(http); 

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI;
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected Successfully!"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Create a Socket.IO server
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
  console.log('user disconnected');
  });
  setInterval(()=>{
  socket.emit('number', parseInt(Math.random()*10));
  }, 1000);
})

// direct traffic to routes
const route = require("./routes/route");
app.use("/", route);

// Start server
// app.listen(port, () => {
//   console.log(`🚀 App listening at http://localhost:${port}`);
// });

http.listen(port, () => {
  console.log(`🚀 App listening at http://localhost:${port}`);
});
