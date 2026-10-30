
let videoTimer = null;

const VIDEO_ID = "h-eoJCIGpiQ";
const STORAGE_KEY = "bei-bab4-media2";

const steps = [
  "video",
  "adik",
  "analisis1",
  "analisis2",
  "review",
  "export"
];

const state = {
  activeView: "video",

  completed: {
    1: false,
    2: false
  },

  unlocked: {
    1: false,
    2: false
  },

  triggered: {
    1: false,
    2: false
  },

  data: {
    kategori1: "",
    alasan1: "",
    bukti1: "",
    mengapa: "",
    bagaimana: "",
    bias: "",
    bukti2: "",
    nama: "",
    kelas: "",
    absen: "",
    tanggal: ""
  }
};

const adikHelp = {
  "Apa":
    "Identifikasi topik utama, peristiwa, atau persoalan yang menjadi fokus feature.",

  "Di mana":
    "Cari lokasi kejadian dan perhatikan bagaimana lokasi membantu menjelaskan konteks.",

  "Kapan":
    "Perhatikan waktu kejadian atau urutan waktu yang disampaikan dalam tayangan.",

  "Siapa":
    "Identifikasi tokoh, narasumber, kelompok, atau pihak yang terdampak.",

  "Mengapa":
    "Cari sebab, alasan, latar belakang, atau persoalan yang membuat peristiwa penting.",

  "Bagaimana":
    "Amati proses, kondisi, cara peristiwa berlangsung, serta dampaknya."
};

const $ = id => document.getElementById(id);


/* =====================================================
   VIDEO YOUTUBE
===================================================== */

window.onYouTubeIframeAPIReady = function () {
  if (!window.YT || !YT.Player) {
    $("video-status").textContent = "Video tidak tersedia";
    return;
  }

  player = new YT.Player("player", {
    videoId: VIDEO_ID,

    width: "100%",
    height: "100%",

    playerVars: {
      playsinline: 1,
      rel: 0,
      modestbranding: 1,
      cc_load_policy: 1
    },

    events: {
      onReady: function () {
        $("video-status").textContent = "Siap diputar";

        if (videoTimer) clearInterval(videoTimer);

        videoTimer = setInterval(checkTimestamp, 400);
      },

      onStateChange: onPlayerStateChange,

      onError: function (event) {
        console.error("YouTube Player Error:", event.data);

        $("video-status").textContent =
          "Video gagal dimuat (kode " + event.data + ")";

        $("video-notice").textContent =
          "Periksa kode error di Console browser.";
      }
    }
  });
};

function onPlayerStateChange(event) {
  if (!window.YT) return;

  if (event.data === YT.PlayerState.PLAYING) {
    $("video-status").textContent = "Sedang diputar";

    $("video-notice").textContent =
      "Perhatikan isi tayangan dan bukti yang muncul.";

  } else if (event.data === YT.PlayerState.PAUSED) {
    $("video-status").textContent = "Dijeda";

  } else if (event.data === YT.PlayerState.ENDED) {
    $("video-status").textContent = "Video selesai";
  }
}




function checkTimestamp() {
  if (
    !player ||
    typeof player.getCurrentTime !== "function" ||
    !window.YT
  ) {
    return;
  }

  if (player.getPlayerState() !== YT.PlayerState.PLAYING) {
    return;
  }

  const currentTime = player.getCurrentTime();

  console.log({
    waktuVideo: currentTime,
    durasiVideo: player.getDuration(),
    statusPemutaran: player.getPlayerState(),
    analisisPertamaSelesai: state.completed[1],
    analisisKeduaSelesai: state.completed[2]
  });

  // Jeda pertama: 03:15
  if (currentTime >= 195 && !state.completed[1]) {
    if (!state.triggered[1]) {
      state.triggered[1] = true;
      state.unlocked[1] = true;

      player.pauseVideo();

      $("video-notice").textContent =
        "Jeda 03:15 tercapai. Lengkapi analisis pertama.";

      persist();
      go("analisis1");
    }

    return;
  }

  // Jeda kedua: 06:45
  if (currentTime >= 405 && state.completed[1] && !state.completed[2]) {
    console.log("Pemicu analisis kedua aktif.");

    state.triggered[2] = true;
    state.unlocked[2] = true;

    player.pauseVideo();

    $("video-notice").textContent =
      "Jeda 06:45 tercapai. Lengkapi analisis kedua.";

    persist();
    updateNavigation();
    go("analisis2");
  }
}




/* =====================================================
   PENYIMPANAN DAN PEMULIHAN DATA
===================================================== */

function safeLoad() {
  try {
    const stored = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "null"
    );

    if (stored) {
      if (stored.data) {
        Object.assign(state.data, stored.data);
      }

      if (stored.completed) {
        state.completed = {
          ...state.completed,
          ...stored.completed
        };
      }

      if (stored.unlocked) {
        state.unlocked = {
          ...state.unlocked,
          ...stored.unlocked
        };
      }

      if (stored.triggered) {
        state.triggered = {
          ...state.triggered,
          ...stored.triggered
        };
      }
    }
  } catch (error) {
    console.warn("Data sebelumnya tidak dapat dibaca.", error);
  }

  Object.keys(state.data).forEach(id => {
    const element = $(id);

    if (!element) return;

    if (id === "kategori1") {
      const radio = document.querySelector(
        `input[name="kategori1"][value="${CSS.escape(state.data[id])}"]`
      );

      if (radio) radio.checked = true;
    } else {
      element.value = state.data[id] || "";
    }
  });

  updateReview();
  updatePreview();
  updateNavigation();
}

function persist() {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        data: state.data,
        completed: state.completed,
        unlocked: state.unlocked,
        triggered: state.triggered
      })
    );
  } catch (error) {
    console.warn("Penyimpanan browser tidak tersedia.", error);
  }
}

function syncInputs() {
  const selected = document.querySelector(
    'input[name="kategori1"]:checked'
  );

  state.data.kategori1 = selected ? selected.value : "";

  [
    "alasan1",
    "bukti1",
    "mengapa",
    "bagaimana",
    "bias",
    "bukti2"
  ].forEach(id => {
    if ($(id)) state.data[id] = $(id).value.trim();
  });

  [
    "nama",
    "kelas",
    "absen",
    "tanggal"
  ].forEach(id => {
    if ($(id)) state.data[id] = $(id).value;
  });
}


/* =====================================================
   NAVIGASI
===================================================== */


function go(view) {
  if (!steps.includes(view)) return;

  if (view === "analisis1" &&
    !state.unlocked[1] &&
    !state.completed[1]) {
    alert("Tonton video hingga timestamp 03:15 terlebih dahulu.");
    return;
  }

  if (view === "analisis2" &&
    !state.unlocked[2] &&
    !state.completed[2]) {
    alert("Selesaikan analisis pertama dan tonton hingga 06:45.");
    return;
  }

  if (view === "review" &&
    (!state.completed[1] || !state.completed[2])) {
    alert("Selesaikan kedua analisis sebelum membuka review.");
    return;
  }

  state.activeView = view;

  document.querySelectorAll(".content-panel").forEach(panel => {
    panel.classList.toggle("active", panel.dataset.view === view);
  });

  document.querySelectorAll(".segmen[data-step]").forEach(item => {
    item.classList.toggle("active", item.dataset.step === view);
  });

  const index = steps.indexOf(view) + 1;
  const progressLabel = $("progress-label");
  const progressBar = $("progress-bar");

  if (progressLabel) {
    progressLabel.textContent = `Langkah ${index} dari ${steps.length}`;
  }

  if (progressBar) {
    progressBar.style.width = `${(index / steps.length) * 100}%`;
  }

  updateNavigation();

  if (view === "review") updateReview();
  if (view === "export") updatePreview();

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function updateNavigation() {
  const locked = {
    analisis1: !state.unlocked[1] && !state.completed[1],
    analisis2: !state.unlocked[2] && !state.completed[2],
    review: !state.completed[1] || !state.completed[2],
    export: !state.completed[1] || !state.completed[2]
  };

  Object.entries(locked).forEach(([step, isLocked]) => {
    const button = document.querySelector(
      `.segmen[data-step="${step}"]`
    );

    if (button) {
      button.classList.toggle("m2-locked", isLocked);
      button.setAttribute("aria-disabled", String(isLocked));
    }
  });
}

window.go = go;



/* =====================================================
   SEEK TIMESTAMP
===================================================== */

function jumpTo(seconds, targetView) {
  if (!player || typeof player.seekTo !== "function") {
    alert("Video belum siap. Tunggu beberapa saat lalu coba lagi.");
    return;
  }

  if (seconds === 195) {
    state.unlocked[1] = true;
    state.triggered[1] = true;
  }

  if (seconds === 405) {
    if (!state.completed[1]) {
      alert("Selesaikan analisis pertama sebelum membuka jeda kedua.");
      return;
    }

    state.unlocked[2] = true;
    state.triggered[2] = true;
  }

  player.seekTo(seconds, true);
  player.pauseVideo();

  persist();

  if (targetView) go(targetView);
}

document.querySelectorAll("[data-seek]").forEach(button => {
  button.addEventListener("click", () => {
    const seconds = Number(button.dataset.seek);

    if (seconds === 405 && !state.completed[1]) {
      alert("Selesaikan analisis 03:15 terlebih dahulu.");
      return;
    }

    jumpTo(
      seconds,
      seconds === 195 ? "analisis1" : "analisis2"
    );
  });
});


/* =====================================================
   SIMPAN ANALISIS PERTAMA
===================================================== */

function saveFirst() {
  syncInputs();

  const selected = document.querySelector(
    'input[name="kategori1"]:checked'
  );

  const reason = $("alasan1").value.trim();

  $("error1").textContent = "";

  if (!selected || !reason) {
    $("error1").textContent =
      "Pilih kategori dan isi alasan sebelum melanjutkan.";

    return;
  }

  state.data.kategori1 = selected.value;
  state.data.alasan1 = reason;
  state.data.bukti1 = $("bukti1").value.trim();

  state.completed[1] = true;
  state.unlocked[1] = true;

  state.triggered[2] = false;
  state.unlocked[2] = false;

  persist();
  updateReview();
  updatePreview();
  updateNavigation();

  go("video");

  $("video-notice").textContent =
    "Analisis pertama tersimpan. Video dilanjutkan menuju jeda 06:45.";

  // Lanjutkan video dari timestamp 03:15.
  if (player && typeof player.seekTo === "function") {
    player.seekTo(195, true);
    player.playVideo();
  }

}

$("save1").addEventListener("click", saveFirst);


/* =====================================================
   SIMPAN ANALISIS KEDUA
===================================================== */

function saveSecond() {
  syncInputs();

  const requiredIds = [
    "mengapa",
    "bagaimana",
    "bias"
  ];

  const missing = requiredIds.some(
    id => !$(id).value.trim()
  );

  $("error2").textContent = "";

  if (missing) {
    $("error2").textContent =
      "Isi bagian Mengapa, Bagaimana, dan analisis bias sebelum melanjutkan.";

    return;
  }

  requiredIds.forEach(id => {
    state.data[id] = $(id).value.trim();
  });

  state.data.bukti2 = $("bukti2").value.trim();

  state.completed[2] = true;
  state.unlocked[2] = true;

  persist();

  updateReview();
  updatePreview();
  updateNavigation();

  if (player && typeof player.seekTo === "function") {
    player.pauseVideo();
  }

  go("review");
}

$("save2").addEventListener("click", saveSecond);


/* =====================================================
   KARTU ADIKSIMBA
===================================================== */

document.querySelectorAll("[data-adik]").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-adik]").forEach(card => {
      card.classList.toggle("selected", card === button);
    });

    const title = button.dataset.adik;

    $("adik-detail").innerHTML = `
      <strong>${escapeHtml(title)}</strong>
      <p>${escapeHtml(adikHelp[title])}</p>
    `;
  });
});


/* =====================================================
   REVIEW TIMESTAMP
===================================================== */

function updateReview() {
  const completedCount =
    Number(state.completed[1]) +
    Number(state.completed[2]);

  $("review-status").textContent =
    `${completedCount} dari 2 selesai`;

  $("review1").textContent = state.completed[1]
    ? `${state.data.kategori1}: ${state.data.alasan1}`
    : "Belum ada jawaban tersimpan.";

  $("review2").textContent = state.completed[2]
    ? [
      `Mengapa: ${state.data.mengapa}`,
      `Bagaimana: ${state.data.bagaimana}`,
      `Analisis bias: ${state.data.bias}`
    ].join("\n\n")
    : "Belum ada jawaban tersimpan.";
}

document.querySelectorAll("[data-review]").forEach(button => {
  button.addEventListener("click", () => {
    if (button.dataset.review === "1") {
      jumpTo(195, "analisis1");
    } else {
      jumpTo(405, "analisis2");
    }
  });
});


/* =====================================================
   PRATINJAU PDF
===================================================== */

function updatePreview() {
  syncInputs();

  $("preview-kategori").textContent =
    state.data.kategori1 || "Belum diisi";

  $("preview-alasan1").textContent =
    state.data.alasan1 || "Jawaban analisis pertama akan tampil di sini.";

  $("preview-alasan2").textContent = [
    state.data.mengapa
      ? "Mengapa: " + state.data.mengapa
      : "",
    state.data.bagaimana
      ? "Bagaimana: " + state.data.bagaimana
      : "",
    state.data.bias
      ? "Analisis bias: " + state.data.bias
      : "",
    state.data.bukti2
      ? "Bukti: " + state.data.bukti2
      : ""
  ].filter(Boolean).join("\n\n") ||
    "Jawaban analisis kedua akan tampil di sini.";

  const done = state.completed[1] && state.completed[2];

  $("completion").textContent = done
    ? "Status kelengkapan: dua analisis telah diisi."
    : "Status kelengkapan: lengkapi dua analisis dan identitas siswa.";
}


/* =====================================================
   DOKUMEN PDF
===================================================== */

function escapeHtml(text) {
  return String(text || "").replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

function makePrintSection(number, title, content) {
  return `
    <section class="m2-print-section">
      <h3>
        <span>${number}</span>
        ${escapeHtml(title)}
      </h3>
      <div class="m2-print-answer">
        ${escapeHtml(content || "Belum diisi").replace(/\n/g, "<br>")}
      </div>
    </section>
  `;
}

function downloadPDF() {
  syncInputs();

  const form = $("identity-form");

  if (!form.reportValidity()) return;

  if (!state.completed[1] || !state.completed[2]) {
    $("error-export").textContent =
      "Selesaikan dan simpan kedua analisis sebelum mengekspor portofolio.";
    return;
  }

  $("error-export").textContent = "";

  const date = state.data.tanggal
    ? new Date(state.data.tanggal + "T00:00:00").toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric"
    })
    : new Date().toLocaleDateString("id-ID");

  $("portfolio-print").innerHTML = `
    <header class="m2-print-header">
      <div class="m2-print-brand">BEI 2026 · BAHASA INDONESIA KELAS XII</div>
      <div class="m2-print-subtitle">
        Bab IV · Media 2 · Menyimak Kritis Teks Feature
      </div>
      <h1>PORTOFOLIO MENYIMAK KRITIS</h1>
      <p>Analisis video, sudut pandang, dan pilihan diksi</p>
    </header>

    <div class="m2-print-bar">IDENTITAS SISWA</div>

    <div class="m2-print-identity">
      <div><small>Nama</small><strong>${escapeHtml(state.data.nama)}</strong></div>
      <div><small>Kelas</small><strong>${escapeHtml(state.data.kelas)}</strong></div>
      <div><small>Nomor absen</small><strong>${escapeHtml(state.data.absen)}</strong></div>
      <div><small>Tanggal pengerjaan</small><strong>${escapeHtml(date)}</strong></div>
    </div>

    <div class="m2-print-bar">ANALISIS 1 · TIMESTAMP 03:15</div>

    ${makePrintSection("01", "Kategori", state.data.kategori1)}
    ${makePrintSection("02", "Alasan analisis", state.data.alasan1)}
    ${makePrintSection("03", "Bukti dari tayangan", state.data.bukti1)}

    <div class="m2-print-bar">ANALISIS 2 · TIMESTAMP 06:45</div>

    ${makePrintSection("04", "Mengapa", state.data.mengapa)}
    ${makePrintSection("05", "Bagaimana", state.data.bagaimana)}
    ${makePrintSection("06", "Analisis efek diksi dan bias", state.data.bias)}
    ${makePrintSection("07", "Bukti dari tayangan", state.data.bukti2)}

    <div class="m2-print-bar">STATUS KELENGKAPAN</div>

    <div class="m2-print-status">
      <div>✓ Analisis 03:15 telah disimpan</div>
      <div>✓ Analisis 06:45 telah disimpan</div>
      <div>✓ Identitas siswa telah dilengkapi</div>
    </div>

    <footer class="m2-print-footer">
      BEI 2026 · Media Pembelajaran Interaktif · Menyimak Kritis Teks Feature
    </footer>
  `;

  persist();

  document.body.classList.add("printing-portfolio");

  window.print();

  setTimeout(() => {
    document.body.classList.remove("printing-portfolio");
  }, 800);
}

$("download-pdf").addEventListener("click", downloadPDF);


/* =====================================================
   AUTOSAVE
===================================================== */

document.querySelectorAll(
  "#analisis1 input, #analisis1 textarea, " +
  "#analisis2 input, #analisis2 textarea"
).forEach(element => {
  element.addEventListener("input", () => {
    syncInputs();
    persist();
    updatePreview();
  });

  element.addEventListener("change", () => {
    syncInputs();
    persist();
  });
});

$("identity-form").addEventListener("input", () => {
  syncInputs();
  persist();
  updatePreview();
});

document.querySelectorAll("[data-go]").forEach(button => {
  button.addEventListener("click", () => {
    go(button.dataset.go);
  });
});


/* =====================================================
   INISIALISASI
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  safeLoad();

  const dateInput = $("tanggal");

  if (dateInput && !dateInput.value) {
    dateInput.value = new Date().toISOString().slice(0, 10);
    syncInputs();
    persist();
  }
});

safeLoad();

// FIX tombol Pelajari ADIKSIMBA
document.addEventListener("DOMContentLoaded", function () {
  const button = document.querySelector('[data-go="adik"]');

  if (!button) {
    console.error("Tombol Pelajari ADIKSIMBA tidak ditemukan.");
    return;
  }

  button.addEventListener("click", function (event) {
    event.preventDefault();

    if (typeof window.go === "function") {
      window.go("adik");
    } else {
      console.error("Fungsi navigasi go() tidak tersedia.");
    }
  });
});