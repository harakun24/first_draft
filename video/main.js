

let player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    width: "100%",
    height: "100%",
    // videoId: "oI50zFiXcpM"
    videoId: "kkk_y1_C-80",
    events: {
      onStateChange: onPlayerStateChange
    }
  })
}

function jumpTo(s, t) {
  const data = document.querySelector(".active");
  if (data)
    data.classList.remove("active")
  t.classList.add("active")
  player.seekTo(s, true)
  player.playVideo();
  setTimeout(() => {
    player.pauseVideo()
    Swal.fire({
      title: 'Jawab',
      text: 'Do you want to continue',
      icon: 'info',
      confirmButtonText: 'lanjut'
    }).then(() => {
      player.playVideo()
    })
  }, 10000)
}

function onPlayerStateChange(event) {
  const btn = document.querySelector(".ddf");
  if (event.data == YT.PlayerState.PLAYING) {
    btn.classList.remove("fa-play")
    btn.classList.add("fa-pause")
  }
  else {
    btn.classList.add("fa-play")
    btn.classList.remove("fa-pause")

  }
}

function togglePlay() {

  if (player.getPlayerState() == 1) {
    player.pauseVideo();

  }
  else {

    player.playVideo();
  }

}