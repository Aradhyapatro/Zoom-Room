const express = require("express");
const app = express();
const server = require("http").Server(app);
const s1 = require("http");
const { v4: uuidv4 } = require("uuid");
const io = require("socket.io")(server);

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.redirect(`/${uuidv4()}`);
});

app.get("/:room", (req, res) => {
  res.status(200).render("room", { roomID: req.params.room });
});

io.on("connection", (socket) => {
  console.log("Connection made");
  socket.on("join-room", (roomid) => {
    socket.join(roomid);
    socket.to(roomid).emit("user-connected");
  });
});

const ss1 = s1.createServer(function (req, res) {
  res.end("<h2>Hare Krishna</h2>");
});

server.listen(8080);
ss1.listen(5000);
