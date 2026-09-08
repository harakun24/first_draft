let history2 = [2];

function navigate(num, state = true) {
  console.log(num)

  if (state)
    history2.push(num);
  if (num == 1)
    resetValue();
  // counting()
  document.querySelector(".active")?.classList.remove("active");
  document.querySelectorAll(".ctrl-timer")[num - 1].classList.add("active");
  document.querySelectorAll(".view").forEach(e => {
    e.style.cssText = "display:none"
  })
  document.querySelector(`.view:nth-child(${num})`).style.cssText = "display:grid"
}

function savePdf() {
  const checklistEl = document.querySelector(".checklist");
  const downloadBtn = checklistEl.querySelector(".download");

  // Sembunyikan tombol download sementara agar tidak ikut masuk ke dalam PDF
  downloadBtn.style.display = "none";

  const { jsPDF } = window.jspdf

  const doc = new jsPDF({
    orientation: "p",
    unit: "mm",
    format: "a4",
  })

  doc.html(checklistEl, {
    callback: function (doc) {
      doc.save("surat lamaran.pdf")
      downloadBtn.style.display = "";
    }, autoPaging: "text", width: 210, windowWidth: 800
  })


};

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

        mediaRecorder.onstop = () => {
          const blob = new Blob(recordedChunks, { type: "video/webm" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.style.display = "none";
          a.href = url;
          a.download = "rekaman-presentasi.webm";
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);

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