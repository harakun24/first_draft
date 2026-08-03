let player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    width: "100%",
    height: "100%",
    // videoId: "oI50zFiXcpM"
    videoId: "kkk_y1_C-80"
  })
}

function jumpTo(s) {
  player.seekTo(s, true)
  player.playVideo();
  setTimeout(() => {
    player.pauseVideo()
    Swal.fire({
      title: 'Jawab',
      text: 'Do you want to continue',
      icon: 'info',
      confirmButtonText: 'Cool'
    }).then(() => {
      player.playVideo()
    })
  }, 10000)
}