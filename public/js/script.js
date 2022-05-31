console.log("Radhe Radhe");
const socket = io("/");

const constraints = {
  audio: true,
  video: true,
};

const videogrid = document.getElementById("video-grid");
const zoomVideo = document.createElement("video");
zoomVideo.muted = true;

var myPeer = new Peer(undefined, {
  host: "/",
  port: "3001",
});

navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
  settingVideo(zoomVideo, stream);

  myPeer.on("call", (call) => {
    call.answer(stream);
    const video = document.createElement("video");
    call.on("stream", (userVideoStream) => {
      settingVideo(video, userVideoStream);
    });
  });

  socket.on("user-connected", (userId) => {
    connectToNewUser(userId, stream);
  });
});

myPeer.on("open", (id) => {
  socket.emit("join-room", ROOM_ID, id);
});

const connetingToNewUser = (userId, stream) => {
  const call = myPeer.call(userId, stream);
  const video = document.createElement("video");
  call.on("stream", (userVideoStream) => {
    settingVideo(video, userVideoStream);
  });
};

function settingVideo(video, stream) {
  video.srcObject = stream;
  video.onloadedmetadata = function (e) {
    video.play();
  };
  videogrid.append(zoomVideo);
}
