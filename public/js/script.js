console.log("Radhe Radhe");

const constraints = {
  audio: true,
  video: {
    innerWidth: 300,
    innerHeight: 450,
  },
};

const videogrid = document.getElementById("video-grid");
const zoomVideo = document.createElement("video");

navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
  settingVideo(zoomVideo, stream);
});

function settingVideo(video, stream) {
  video.srcObject = stream;
  video.onloadedmetadata = function (e) {
    video.play();
  };
  videogrid.append(zoomVideo);
}
