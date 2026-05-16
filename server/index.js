const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary");
const connectDatabase = require('./config/database');
const app = express();
const server = require('http').createServer(app);
const { Server } = require("socket.io");
const notificationModal = require("./models/notification/notification");
connectDatabase();

// Middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));
app.use(fileUpload());

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY
});


const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

// Handle socket.io events here
io.on('connection', (socket) => {
  socket.on('newOrder', async (data) => {
    const notificationData = {
      userId: data.userId,
      shop: data.shop,
      message: data.message,
      stock: false,
    }
    const notification = await notificationModal.create(notificationData)
    io.emit('newOrder', data); // broadcast to all connected clients
  });

  socket.on('newStock', async (data) => {
    const notificationData = {
      // userId: data.userId,
      shop: data.shop,
      stockId: data.stockId,
      message: data.message,
      stock: true,
    }
    const notification = await notificationModal.create(notificationData)
    io.emit('newStock', data); // broadcast to all connected clients
  });

});

const indexRouter = require('./routes/index');
app.use("/", indexRouter);


// io.on("connection", (socket) => {
//   socket.emit('chat', "Hello")
//   socket.on("disconnect", (reason) => {
//   });
// });

// app.listen(process.env.PORT, () => {
// });

server.listen(process.env.PORT, function () {
  console.log(`Listening on port ${process.env.PORT}`);
});