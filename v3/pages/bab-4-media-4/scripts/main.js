
(() => {
  const $ = id => document.getElementById(id);
  const KEY = "bei-bab4-media4-presentasi";

  const stages = [
    "tutorial",
    "layout",
    "cards",
    "transitions",
    "preview",
    "practice"
  ];

  const cardNames = [
    "Pembuka",
    "Detail",
    "Kutipan / Punch"
  ];

  const cardPrompts = [
    ["KARTU 1 · PEMBUKA", "Mulai dari topik utama"],
    ["KARTU 2 · DETAIL", "Tampilkan fakta utama"],
    ["KARTU 3 · KUTIPAN / PUNCH", "Tutup dengan kesan kuat"]
  ];

  const state = {
    active: "tutorial",
    layoutChoice: "",

    cards: [
      { title: "", fact: "", image: "" },
      { title: "", fact: "", image: "" },
      { title: "", fact: "", image: "" }
    ],

    saved: [false, false, false],
    activeCard: 0,
    transitions: ["zoom", "fade"],
    previewIndex: 0,

    checks: {
      tempo: false,
      intonasi: false,
      kontak: false,
      media: false
    },

    remaining: 30,
    timerRunning: false,
    finished: false
  };

  let timerInterval = null;
  let currentPhoto = "";

  /* =========================================
     CONTOH GAMBAR BAWAAN
  ========================================= */

  function sampleImage(index) {
    const colors = [
      ["#d9e8df", "#4b806e", "#254f48"],
      ["#e4ebf5", "#7d9ebd", "#315b8b"],
      ["#f8e8c7", "#d2a34c", "#8b6422"]
    ][index];

    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg"
           viewBox="0 0 640 480">
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
            <stop stop-color="${colors[0]}"/>
            <stop offset="1" stop-color="${colors[1]}"/>
          </linearGradient>
        </defs>

        <rect width="640" height="480" fill="url(#g)"/>
        <path d="M0 370 L180 180 L300 300 L430 130 L640 350 V480 H0Z"
              fill="${colors[2]}" opacity=".82"/>
        <path d="M130 245 L320 80 L510 245Z"
              fill="#fff" opacity=".8"/>
        <rect x="190" y="245" width="260" height="150"
              rx="5" fill="${colors[2]}"/>
        <path d="M170 245 L320 180 L470 245Z"
              fill="#fff" opacity=".85"/>
        <text x="320" y="445" font-size="22"
              text-anchor="middle" fill="#fff"
              font-family="Arial" font-weight="bold">
          ILUSTRASI BUDAYA
        </text>
      </svg>
    `;

    return "data:image/svg+xml;charset=utf-8," +
      encodeURIComponent(svg);
  }

  /* =========================================
     PENYIMPANAN DATA
  ========================================= */

  function saveState() {
    try {
      const stored = {
        ...state,
        timerRunning: false,

        // Gambar tidak dimasukkan ke localStorage.
        cards: state.cards.map(card => ({
          ...card,
          image: ""
        }))
      };

      localStorage.setItem(KEY, JSON.stringify(stored));
    } catch (error) {
      console.warn("Data tidak dapat disimpan di browser.", error);
    }
  }

  function loadState() {
    try {
      const saved = JSON.parse(
        localStorage.getItem(KEY) || "null"
      );

      if (!saved) return;

      state.active = "tutorial";
      state.layoutChoice = saved.layoutChoice || "";

      state.cards = state.cards.map((card, index) => ({
        ...card,
        ...(saved.cards?.[index] || {}),
        image: ""
      }));

      state.saved = Array.isArray(saved.saved)
        ? saved.saved
        : [false, false, false];

      state.activeCard = Number.isInteger(saved.activeCard)
        ? Math.min(2, Math.max(0, saved.activeCard))
        : 0;

      state.transitions = Array.isArray(saved.transitions)
        ? saved.transitions
        : ["zoom", "fade"];

      state.previewIndex = Number.isInteger(saved.previewIndex)
        ? Math.min(2, Math.max(0, saved.previewIndex))
        : 0;

      state.checks = {
        ...state.checks,
        ...(saved.checks || {})
      };

      state.remaining = Number.isFinite(saved.remaining)
        ? Math.min(30, Math.max(0, saved.remaining))
        : 30;

      state.finished = !!saved.finished;
    } catch (error) {
      console.warn("Data sebelumnya tidak dapat dibaca.", error);
    }
  }

  /* =========================================
     NAVIGASI TAHAP
  ========================================= */

  function go(stage) {
    if (!stages.includes(stage)) return;

    if (
      stage === "transitions" &&
      !state.saved.every(Boolean)
    ) {
      alert("Lengkapi dan simpan ketiga kartu terlebih dahulu.");
      return;
    }

    if (
      stage === "preview" &&
      !state.saved.every(Boolean)
    ) {
      alert("Selesaikan tiga kartu sebelum membuka pratinjau.");
      return;
    }

    if (stage === "practice" && !state.saved.every(Boolean)) {
      alert("Selesaikan tiga kartu sebelum memulai latihan.");
      return;
    }

    state.active = stage;

    document.querySelectorAll(".content-panel").forEach(panel => {
      panel.classList.toggle(
        "active",
        panel.dataset.view === stage
      );
    });

    document.querySelectorAll(".segmen[data-step]").forEach(button => {
      button.classList.toggle(
        "active",
        button.dataset.step === stage
      );
    });

    const index = stages.indexOf(stage);

    $("progress-label").textContent =
      `Langkah ${index + 1} dari ${stages.length}`;

    $("progress-bar").style.width =
      `${((index + 1) / stages.length) * 100}%`;

    if (stage === "preview") renderPreview();
    if (stage === "cards") renderCardForm();
    if (stage === "practice") updateChecklist();

    saveState();

    window.scrollTo({
      top: 0,
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth"
    });
  }

  document.querySelectorAll("[data-step]").forEach(button => {
    button.addEventListener("click", () => {
      go(button.dataset.step);
    });
  });

  document.querySelectorAll("[data-next]").forEach(button => {
    button.addEventListener("click", () => {
      if (button.id === "layout-next" && !state.layoutChoice) return;

      if (
        button.id === "cards-next" &&
        !state.saved.every(Boolean)
      ) {
        return;
      }

      go(button.dataset.next);
    });
  });

  document.querySelectorAll("[data-prev]").forEach(button => {
    button.addEventListener("click", () => {
      go(button.dataset.prev);
    });
  });

  /* =========================================
     CHAPTER VIDEO TUTORIAL
  ========================================= */

  const chapterNotes = [
    "Pembuka: ubah mindset dari presentasi biasa menjadi pemandu budaya digital.",
    "Tradisi: gunakan visual untuk mengajak audiens menjelajahi konteks budaya.",
    "Layout: utamakan struktur jelas, kontras warna, dan ruang kosong.",
    "Rubrik lisan: perhatikan tempo, intonasi, kontak mata, dan penggunaan media."
  ];

  document.querySelectorAll("[data-chapter]").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-chapter]").forEach(item => {
        item.classList.toggle("active", item === button);
      });

      $("video-status").textContent = "Chapter dipilih";

      const info = document.querySelector(".info-banner p");
      const index = Array.from(
        document.querySelectorAll("[data-chapter]")
      ).indexOf(button);

      if (info) info.textContent = chapterNotes[index];
    });
  });

  /* =========================================
     KUIS PILIH LAYOUT
  ========================================= */

  document.querySelectorAll("[data-layout-choice]").forEach(button => {
    button.addEventListener("click", () => {
      state.layoutChoice = button.dataset.layoutChoice;

      document.querySelectorAll("[data-layout-choice]").forEach(item => {
        item.classList.toggle("selected", item === button);
      });

      const feedback = $("layout-feedback");

      if (state.layoutChoice === "clear") {
        feedback.className = "feedback-panel correct";
        feedback.innerHTML = `
          <strong>Benar! Layout B lebih mudah dibaca.</strong>
          <p>
            Judul, visual utama, dan fakta memiliki hierarki yang jelas.
            Kontras serta ruang kosong membantu audiens fokus.
          </p>
        `;
      } else {
        feedback.className = "feedback-panel incorrect";
        feedback.innerHTML = `
          <strong>Coba perhatikan lagi.</strong>
          <p>
            Layout A memiliki banyak elemen yang saling bersaing.
            Pilih layout dengan struktur, kontras, dan ruang kosong
            yang lebih jelas.
          </p>
        `;
      }

      $("layout-next").disabled = false;
      saveState();
    });
  });

  /* =========================================
     FORM TIGA KARTU
  ========================================= */

  function renderCardForm() {
    const index = state.activeCard;
    const card = state.cards[index];

    document.querySelectorAll("[data-card]").forEach(button => {
      const cardIndex = Number(button.dataset.card);

      button.classList.toggle("active", cardIndex === index);
      button.classList.toggle("saved", state.saved[cardIndex]);
    });

    $("card-eyebrow").textContent = cardPrompts[index][0];
    $("card-form-title").textContent = cardPrompts[index][1];

    $("card-title").value = card.title;
    $("card-fact").value = card.fact;
    $("fact-count").textContent = card.fact.length;

    $("card-message").textContent = state.saved[index]
      ? "Kartu ini sudah tersimpan. Kamu dapat mengedit dan menyimpannya kembali."
      : "";

    $("cards-status").textContent =
      `${state.saved.filter(Boolean).length} dari 3 kartu siap`;

    $("cards-next").disabled = !state.saved.every(Boolean);
  }

  document.querySelectorAll("[data-card]").forEach(button => {
    button.addEventListener("click", () => {
      state.activeCard = Number(button.dataset.card);
      currentPhoto = state.cards[state.activeCard].image || "";

      $("photo-input").value = "";
      renderCardForm();
    });
  });

  $("card-fact").addEventListener("input", () => {
    $("fact-count").textContent = $("card-fact").value.length;
  });

  $("photo-input").addEventListener("change", event => {
    const file = event.target.files && event.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      $("card-message").textContent = "Pilih file gambar yang valid.";
      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      currentPhoto = String(reader.result || "");

      $("card-message").textContent =
        "Gambar siap dipratinjau. Tekan Simpan Kartu untuk menyimpan perubahan.";
    };

    reader.onerror = () => {
      $("card-message").textContent = "Gambar tidak dapat dibaca.";
    };

    reader.readAsDataURL(file);
  });

  $("use-sample").addEventListener("click", () => {
    currentPhoto = sampleImage(state.activeCard);
    $("photo-input").value = "";

    $("card-message").textContent =
      "Contoh gambar sudah dipilih. Tekan Simpan Kartu untuk menerapkan.";
  });

  $("clear-photo").addEventListener("click", () => {
    currentPhoto = "";
    $("photo-input").value = "";

    $("card-message").textContent =
      "Gambar dihapus. Simpan kartu untuk menerapkan perubahan.";
  });

  $("card-form").addEventListener("submit", event => {
    event.preventDefault();

    const title = $("card-title").value.trim();
    const fact = $("card-fact").value.trim();

    if (!title || !fact) {
      $("card-message").textContent =
        "Judul dan fakta singkat wajib diisi.";
      return;
    }

    const index = state.activeCard;

    state.cards[index] = {
      title,
      fact,
      image: currentPhoto
    };

    state.saved[index] = true;

    $("card-message").textContent =
      `Kartu ${index + 1} berhasil disimpan.`;

    saveState();
    renderCardForm();
  });

  /* =========================================
     PILIHAN TRANSISI
  ========================================= */

  document.querySelectorAll('input[name="transition-1"]').forEach(input => {
    input.addEventListener("change", () => {
      state.transitions[0] = input.value;
      saveState();
    });
  });

  $("transition-second").addEventListener("change", () => {
    state.transitions[1] = $("transition-second").value;
    saveState();
  });

  /* =========================================
     PRATINJAU PRESENTASI
  ========================================= */

  function renderPreview() {
    const index = state.previewIndex;
    const card = state.cards[index];

    $("preview-count").textContent =
      `Kartu ${index + 1} dari 3`;

    $("presentation-kicker").textContent =
      cardNames[index].toUpperCase();

    $("presentation-title").textContent =
      card.title || "Judul presentasi kamu";

    $("presentation-fact").textContent =
      card.fact ||
      "Isi fakta singkat pada tahap Isi Tiga Kartu agar tampil di sini.";

    $("presentation-number").textContent =
      `0${index + 1} / 03`;

    const photo = $("presentation-photo");
    photo.innerHTML = "";

    if (card.image) {
      const img = document.createElement("img");

      img.src = card.image;
      img.alt = `Gambar pendukung ${cardNames[index]}`;

      photo.appendChild(img);
    } else {
      photo.textContent = "TAMBAHKAN GAMBAR PENDUKUNG";
    }

    $("preview-dots").textContent = [0, 1, 2]
      .map(i => i === index ? "●" : "○")
      .join(" ");

    $("preview-list").innerHTML = "";

    state.cards.forEach((item, i) => {
      const button = document.createElement("button");

      button.type = "button";
      button.className = i === index ? "active" : "";
      button.textContent =
        `0${i + 1} · ${item.title || cardNames[i]}`;

      button.addEventListener("click", () => showPreview(i));

      $("preview-list").appendChild(button);
    });

    $("preview-prev").disabled = index === 0;

    $("preview-next").textContent =
      index === 2 ? "Kembali ke awal ↺" : "Berikutnya →";
  }

  function showPreview(index) {
    const previous = state.previewIndex;

    state.previewIndex = (index + 3) % 3;

    const reduceMotion =
      matchMedia("(prefers-reduced-motion: reduce)").matches;

    const effect = reduceMotion
      ? "fade"
      : (state.transitions[Math.min(previous, 1)] || "fade");

    const card = $("presentation-card");

    card.classList.remove(
      "effect-zoom",
      "effect-rotate",
      "effect-fade"
    );

    renderPreview();

    // Memulai ulang animasi pada setiap perpindahan kartu.
    void card.offsetWidth;

    card.classList.add(`effect-${effect}`);

    saveState();
  }

  $("preview-prev").addEventListener("click", () => {
    showPreview(
      state.previewIndex === 0 ? 2 : state.previewIndex - 1
    );
  });

  $("preview-next").addEventListener("click", () => {
    showPreview(
      state.previewIndex === 2 ? 0 : state.previewIndex + 1
    );
  });

  $("fullscreen-btn").addEventListener("click", async () => {
    const stage = $("presentation-stage");

    try {
      if (!document.fullscreenElement) {
        await stage.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      alert("Mode layar penuh tidak didukung browser ini.");
    }
  });

  document.addEventListener("keydown", event => {
    const isTyping = ["INPUT", "TEXTAREA", "SELECT"].includes(
      document.activeElement?.tagName
    );

    if (state.active !== "preview" || isTyping) return;

    if (event.key === "ArrowRight") {
      event.preventDefault();
      showPreview((state.previewIndex + 1) % 3);
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showPreview((state.previewIndex + 2) % 3);
    }
  });

  /* =========================================
     TIMER LATIHAN
  ========================================= */

  function renderTimer() {
    const minutes = Math.floor(state.remaining / 60)
      .toString()
      .padStart(2, "0");

    const seconds = (state.remaining % 60)
      .toString()
      .padStart(2, "0");

    $("timer-display").textContent =
      `${minutes}:${seconds}`;
  }

  function stopTimer() {
    state.timerRunning = false;

    if (timerInterval) {
      clearInterval(timerInterval);
    }

    timerInterval = null;
    $("timer-start").disabled = false;
    $("timer-pause").disabled = true;
  }

  $("timer-start").addEventListener("click", () => {
    if (state.timerRunning) return;

    if (state.remaining <= 0) {
      state.remaining = 30;
    }

    state.timerRunning = true;
    $("timer-start").disabled = true;
    $("timer-pause").disabled = false;

    $("timer-message").textContent =
      "Latihan sedang berlangsung. Atur tempo dan kontak mata.";

    timerInterval = setInterval(() => {
      state.remaining = Math.max(0, state.remaining - 1);

      renderTimer();

      if (state.remaining === 0) {
        stopTimer();

        $("timer-message").textContent =
          "Waktu latihan selesai. Kamu bisa mengulangi atau menyelesaikan latihan.";

        $("practice-status").textContent = "Waktu selesai";
      }

      saveState();
    }, 1000);
  });

  $("timer-pause").addEventListener("click", () => {
    stopTimer();

    $("timer-message").textContent =
      "Latihan dijeda. Tekan Mulai untuk melanjutkan.";

    saveState();
  });

  function resetTimer() {
    stopTimer();

    state.remaining = 30;

    $("practice-status").textContent = "Siap berlatih";
    $("timer-message").textContent = "Siapkan pembukaanmu.";

    renderTimer();
    saveState();
  }

  $("timer-reset").addEventListener("click", resetTimer);

  $("practice-repeat").addEventListener("click", () => {
    state.finished = false;

    $("finish-message").hidden = true;

    resetTimer();
    go("preview");
  });

  /* =========================================
     CHECKLIST PENAMPILAN LISAN
  ========================================= */

  function updateChecklist() {
    const checks = Object.values(state.checks)
      .filter(Boolean).length;

    $("check-count").textContent =
      `${checks} dari 4 indikator`;

    $("check-percent").textContent =
      `${Math.round(checks / 4 * 100)}%`;

    $("check-bar").style.width =
      `${checks / 4 * 100}%`;

    document.querySelectorAll("[data-check]").forEach(input => {
      input.checked = !!state.checks[input.dataset.check];
    });
  }

  document.querySelectorAll("[data-check]").forEach(input => {
    input.addEventListener("change", () => {
      state.checks[input.dataset.check] = input.checked;

      updateChecklist();
      saveState();
    });
  });

  function finishPractice() {
    stopTimer();

    state.finished = true;

    $("finish-message").hidden = false;
    $("practice-status").textContent = "Latihan selesai";

    $("timer-message").textContent =
      "Bagus! Lanjutkan aktivitas pada buku teks halaman 203–206.";

    saveState();
  }

  $("practice-finish").addEventListener("click", finishPractice);
  $("finish-final").addEventListener("click", finishPractice);

  /* =========================================
     INISIALISASI
  ========================================= */

  loadState();

  document.querySelectorAll('input[name="transition-1"]').forEach(input => {
    input.checked = input.value === state.transitions[0];
  });

  $("transition-second").value =
    state.transitions[1] || "fade";

  renderCardForm();
  renderPreview();
  renderTimer();
  updateChecklist();

  if (state.layoutChoice) {
    const selected = document.querySelector(
      `[data-layout-choice="${state.layoutChoice}"]`
    );

    if (selected) selected.classList.add("selected");

    $("layout-next").disabled = false;

    $("layout-feedback").className =
      state.layoutChoice === "clear"
        ? "feedback-panel correct"
        : "feedback-panel incorrect";

    $("layout-feedback").innerHTML =
      state.layoutChoice === "clear"
        ? "<strong>Benar! Layout B lebih mudah dibaca.</strong><p>Struktur, kontras, dan ruang kosong membantu audiens fokus.</p>"
        : "<strong>Coba perhatikan lagi.</strong><p>Layout padat membuat elemen saling bersaing.</p>";
  }

  $("cards-next").disabled =
    !state.saved.every(Boolean);

  if (state.finished) {
    $("finish-message").hidden = false;
    $("practice-status").textContent = "Latihan selesai";
  }

  document.querySelectorAll("[data-icon]").forEach(element => {
    if (typeof fillIcon === "function") {
      fillIcon(element);
    }
  });
})();
