const express = require("express");
const app = express();
const server = require("http").Server(app);
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
  socket.on("join-room", () => {
    console.log("Joined the room");
  });
});

server.listen(8080);
