const express = require("express");
const app = express();
const server = require("http").Server(app);

app.get("/", (req, res) => {
  res.status(200).send(" Radhe Radhe ,I am Aradhya Patro");
});

server.listen(8080);
