let player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    width: "100%",
    height: "100%",
    videoId: "oI50zFiXcpM"
  })
}

function jumpTo(s) {
  player.seekTo(s, true)
  player.playVideo();
}