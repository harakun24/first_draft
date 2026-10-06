
function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    videoId: "q5ymFDgT6Lk",
    width: "100%",
    height: "100%",
  });
}

function jumpSegmen(e) {
  document.querySelector(".segmen.active")?.classList.remove("active");
  const view = e.currentTarget.dataset.jump;
  if (player)
    player.pauseVideo()
  e.currentTarget.classList.add("active");
  document.querySelector(".area.active")?.classList.remove("active");
  document.querySelector(".area." + view).classList.add("active");
  store.add("rekam-diri", view);
}


document.querySelector("[data-jump='video']").click();


let mediaRecorder;
let recordedChunks = [];
let recTimerInterval = null;
let recSeconds = 0;

const toggleRecBtn = document.getElementById("toggleRec");
const recTimerText = document.querySelector(".record .timerText");

function formatRecTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

const modal = document.querySelector(".modal");
const previewVideo = document.getElementById("previewVideo");
const downloadBtn = document.getElementById("downloadBtn");
const deleteBtn = document.getElementById("deleteBtn");

// modal.showPopover()

let currentVideoUrl = null;


if (toggleRecBtn) {
  toggleRecBtn.addEventListener("click", async () => {
    if (!mediaRecorder || mediaRecorder.state === "inactive") {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        mediaRecorder = new MediaRecorder(stream);
        recordedChunks = [];

        mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) {
            recordedChunks.push(e.data);
          }
        };

        // Modifikasi bagian ini
        mediaRecorder.onstop = () => {
          const blob = new Blob(recordedChunks, { type: "video/webm" });
          currentVideoUrl = URL.createObjectURL(blob);

          // Muat URL ke dalam player video
          previewVideo.src = currentVideoUrl;

          // Tampilkan modal popover
          modal.showPopover();

          // Matikan akses webcam/mikrofon
          stream.getTracks().forEach(track => track.stop());
        };

        mediaRecorder.start();

        toggleRecBtn.innerHTML = `stop rekam <i class="fas fa-stop"></i>`;
        recSeconds = 0;
        if (recTimerText) recTimerText.textContent = "00:00";

        recTimerInterval = setInterval(() => {
          recSeconds++;
          if (recTimerText) {
            recTimerText.textContent = formatRecTime(recSeconds);
          }
        }, 1000);

      } catch (err) {
        alert("Gagal mengakses webcam atau mikrofon.");
      }
    } else if (mediaRecorder.state === "recording") {
      mediaRecorder.stop();
      clearInterval(recTimerInterval);
      toggleRecBtn.innerHTML = `mulai rekam <i class="fas fa-camera"></i>`;
    }
  });
}

// Aksi tombol Unduh
downloadBtn.addEventListener("click", () => {
  if (currentVideoUrl) {
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = currentVideoUrl;
    a.download = "rekaman-presentasi.webm";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a); // Bersihkan elemen a dari DOM
  }
});

// Aksi tombol Hapus
deleteBtn.addEventListener("click", () => {
  // Hentikan dan kosongkan pemutar video
  previewVideo.pause();
  previewVideo.removeAttribute("src");
  previewVideo.load();

  // Hapus referensi memori dari blob URL
  if (currentVideoUrl) {
    window.URL.revokeObjectURL(currentVideoUrl);
    currentVideoUrl = null;
  }

  // Tutup popover
  modal.hidePopover();
});