console.log("Radhe Radhe");
const socket = io("/");

const constraints = {
  audio: true,
  video: true,
};

const videogrid = document.getElementById("video-grid");
const zoomVideo = document.createElement("video");

navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
  settingVideo(zoomVideo, stream);
});

socket.emit("join-room", ROOM_ID);

socket.on("user-connected", () => {
  connetingToNewUser();
});

const connetingToNewUser = () => {
  console.log("New User Connected");
};

function settingVideo(video, stream) {
  video.srcObject = stream;
  video.onloadedmetadata = function (e) {
    video.play();
  };
  videogrid.append(zoomVideo);
}
