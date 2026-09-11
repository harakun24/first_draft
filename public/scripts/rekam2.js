let history2 = [2];
document.querySelector(".modal2").showPopover()

function navigate(num, state = true) {
  console.log(num)

  if (state)
    history2.push(num);
  if (num == 1)
    resetValue();
  if (num == 4)
    document.querySelector(".modal2").showPopover()

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
let choice = 0;
const textField = {
  title: "",
  message: "",
  reason: ""
}
function choose(num) {
  choice = num;
  document.querySelector(".modal2").hidePopover()
}
async function saveProgress() {
  textField.title = document.querySelector("input[name='title']").value
  textField.message = document.querySelector("input[name='message']").value
  textField.reason = document.querySelector("input[name='reason']").value

  let respon = `<div style="padding:2rem">
  <h3>Rekapan interaksi</h3>
  <p>Yang paling menarik perhatian saat pertama menonton film pendek, adalah ${choice == 1 ? "Visual yang terdiri dari komposisi, warna dan gerak" : choice == 2 ? "Cerita yang terdiri dari tokoh, konflik dan alur" : choice == 3 ? "Musik yang terdiri dari irama, suasana dan emosi" : "belum memilih"}</p>
  <br>
  <h3>Rekapan refleksi awal</h3>
 <p>Salah satu film pendek atau tayangan inspiratif yang diinga berjudul "${textField.title}". Pesan moral atau nilai kehidupannya adalah: ${textField.message} dan mengapa itu penting karena ${textField.reason}</p>
  </div>
  `

  const { jsPDF } = window.jspdf;

  const el = document.createElement("div");
  el.style.cssText = "position:fixed;left:-9999px;padding:2rem;";
  el.innerHTML = respon;
  document.body.appendChild(el)

  const canvas = await html2canvas(el, {
    scale: 2,
    useCORS: true
  });

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  pdf.save('refleksi.pdf');
  el.remove()

  navigate(5)
}