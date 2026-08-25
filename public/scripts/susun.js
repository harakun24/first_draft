// let player;
// let animId;
// let isSeeking = false;
// let lastTime = 0;
// const triggerQuiz = new Set()
// const seeker = document.querySelector("input[type='range']");
// const popover = document.querySelector(".modal");

// const dataList = [{
//   time: 30,
//   title: "Kesan Pertama"
// }, {
//   time: 72,
//   title: "Format & Struktur"
// }, {
//   time: 108,
//   title: "Detail Bahasa"
// }, {
//   time: 144,
//   title: "Dokumen & ATS"
// }, {
//   time: 200,
//   title: "Koreksi Mandiri"
// }]

// function onYouTubeIframeAPIReady() {
//   player = new YT.Player("player", {
//     videoId: "kkk_y1_C-80",
//     width: "100%",
//     height: "100%",
//     events: {
//       onStateChange: onPlayerStateChange
//     }
//   })
// }

// function onPlayerStateChange(event) {
//   const btn = document.getElementById("ctrl");
//   const timer = document.querySelectorAll(".ctrl-timer")
//   timer.forEach(e => {
//     const currentTime = player.getCurrentTime();
//     if (currentTime > e.dataset.jumpTo) {
//       document.querySelector(".ctrl-timer.active")?.classList.remove("active")
//       e.classList.add("active")
//     }
//   })

//   if (event.data == YT.PlayerState.PLAYING) {
//     btn.innerHTML = ` <i class="fas fa-pause"></i>`
//     watchBar()
//   }
//   else if (event.data == YT.PlayerState.PAUSED || event.data == YT.PlayerState.ENDED) {
//     btn.innerHTML = ` <i class="fas fa-play"></i>`
//     cancelAnimationFrame(animId)
//   }
// }


// function watchBar() {
//   if (!isSeeking && player && player.getDuration) {
//     const currentTime = player.getCurrentTime();
//     const duration = player.getDuration()
//     if (currentTime < lastTime - 1)
//       updateQuizState(currentTime)
//     lastTime = currentTime;
//     if (duration > 0)
//       seeker.value = (currentTime / duration * 100)
//     for (const q of dataList) {
//       if (currentTime >= q.time && !triggerQuiz.has(q.time)) {
//         triggerQuiz.add(q.time)
//         player.pauseVideo()
//         showModal(q)
//         return;
//       }
//     }
//   }
//   if (player.getPlayerState() == YT.PlayerState.PLAYING)
//     animId = requestAnimationFrame(watchBar)
// }

// function updateQuizState(timer) {
//   dataList.forEach(e => {
//     if (e.time > timer)
//       triggerQuiz.delete(e.time)
//     else
//       triggerQuiz.add(e.time)
//   })
// }

// function showModal(data) {
//   popover.querySelector("#timerAt").innerText = data.title
//   popover.showPopover()
// }

// function togglePlay() {
//   if (player.getPlayerState() == 1)
//     player.pauseVideo()
//   else
//     player.playVideo()
// }

// function jumpTo(s, t) {
//   if (!player || !player.seekTo) return;

//   const currentTime = player.getCurrentTime();
//   const duration = player.getDuration()
//   updateQuizState(parseFloat(t.dataset.jumpTo))
//   if (duration > 0)
//     seeker.value = (currentTime / duration * 100)

//   player.seekTo(s, true)
//   player.playVideo()
// }

// seeker.addEventListener("pointerdown", () => isSeeking = true)

// seeker.addEventListener("pointerup", () => {
//   const duration = player.getDuration()

//   if (duration > 0) {
//     const targetTime = (seeker.value / 100) * duration;
//     updateQuizState(targetTime)
//     player.seekTo(targetTime, true)
//   }
//   isSeeking = false;

// })

// popover.addEventListener("toggle", (e) => {
//   if (e.newState == "closed")
//     if (player)
//       player.playVideo()
// })

function navigate(num) {
  document.querySelector(".active")?.classList.remove("active");
  document.querySelectorAll(".ctrl-timer")[num - 1].classList.add("active");
}

let draggedItem = null;

function drag(e) {
  draggedItem = e.target;
}

function dropToSlot(e) {
  e.preventDefault();
  const slot = e.currentTarget;
  const pool = document.querySelector('[data-pool]')

  if (slot.children.length > 0)
    pool.appendChild(slot.children[0])
  slot.appendChild(draggedItem)
  resetValue()
  // counting()
}

function dropToPool(e) {
  e.preventDefault()
  document.querySelector("[data-pool]").appendChild(draggedItem)
  resetValue()
  // counting()
}

function validate() {
  document.querySelectorAll('[data-target]').forEach(slot => {
    const item = slot.children[0]
    const isCorrect = item && item.dataset.item == slot.dataset.target;
    slot.classList.toggle('correct', isCorrect)
    slot.classList.toggle('wrong', !isCorrect)
  })
  counting()
}

function resetValue() {
  document.querySelectorAll("[data-target]").forEach(e => {
    e.classList.remove('correct', 'wrong')
  })
}

function counting() {
  const num = document.querySelectorAll(".correct:has(.item)").length
  document.getElementById("counter").innerText = `${num}/9`
}