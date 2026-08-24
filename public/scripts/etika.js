let player;

let animId;
let isSeeking = false;
const seeker = document.querySelector("input[type='range']");

function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    videoId: "kkk_y1_C-80",
    width: "100%",
    height: "100%",
    events: {
      onStateChange: onPlayerStateChange
    }
  })
}

function onPlayerStateChange(event) {
  const btn = document.getElementById("ctrl");
  const timer = document.querySelectorAll(".ctrl-timer")
  timer.forEach(e => {
    const currentTime = player.getCurrentTime();
    if (currentTime > e.dataset.jumpTo) { 
      document.querySelector(".ctrl-timer.active")?.classList.remove("active")
      e.classList.add("active")
    }
  })

  if (event.data == YT.PlayerState.PLAYING) {
    // btn.classList.remove("fa-play")
    // btn.classList.add("fa-pause")
    btn.innerHTML = ` <i class="fas fa-pause"></i>`
    watchBar()
  }
  else if (event.data == YT.PlayerState.PAUSED || event.data == YT.PlayerState.ENDED) {
    // btn.classList.add("fa-play")
    // btn.classList.remove("fa-pause")
    btn.innerHTML = ` <i class="fas fa-play"></i>`
    cancelAnimationFrame(animId)
  }
}


function watchBar() {
  if (!isSeeking && player && player.getDuration) {
    const currentTime = player.getCurrentTime();
    const duration = player.getDuration()
    if (duration > 0)
      seeker.value = (currentTime / duration * 100)
  }
  if (player.getPlayerState() == YT.PlayerState.PLAYING)
    animId = requestAnimationFrame(watchBar)
}

function togglePlay() {
  if (player.getPlayerState() == 1)
    player.pauseVideo()
  else
    player.playVideo()
} ``

function jumpTo(s, t) {
  if (!player || !player.seekTo) return;

  // const data = document.querySelector(".active")
  // if (data)
  //   data.classList.remove("active")

  const currentTime = player.getCurrentTime();
  const duration = player.getDuration()
  if (duration > 0)
    seeker.value = (currentTime / duration * 100)

  // t.classList.add("active")
  player.seekTo(s, true)
  player.playVideo()
}

seeker.addEventListener("pointerdown", () => isSeeking = true)

seeker.addEventListener("pointerup", () => {
  const duration = player.getDuration()

  if (duration > 0) {
    const targetTime = (seeker.value / 100) * duration;
    // console.log(targetTime)
    player.seekTo(targetTime, true)
  }
  isSeeking = false;

})

// seeker.addEventListener("pointerup", () => {
//   const duration = player.getDuration()

//   if (duration > 0) {
//     const try {
      
//     } catch (error) {
      
//     }
//   }
  
// })