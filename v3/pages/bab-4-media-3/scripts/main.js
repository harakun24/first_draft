// FILE: pages/bab-4-media-3/scripts/main.js

(() => {
  const $ = id => document.getElementById(id);
  const KEY = "bei-bab4-media3-feature";

  const parts = {
    headline: ["Headline", "Buat judul yang spesifik, menarik, dan sesuai fakta budaya."],
    lead: ["Lead", "Buka cerita dengan detail konkret atau momen yang menarik perhatian."],
    bridge: ["Bridge", "Hubungkan pembuka dengan inti cerita dan konteks budaya."],
    body: ["Body", "Kembangkan cerita dengan data observasi dan kutipan yang telah diverifikasi."],
    punch: ["Punch", "Tutup tulisan dengan kesan yang kuat, tetap sesuai fakta."]
  };

  const stageNames = [
    "video", "kerangka", "observasi", "wawancara",
    "anatomi", "cek", "ekspor"
  ];

  const fieldIds = [
    "tutorialDone", "keywords", "leadIdea", "outline",
    "observation", "mood", "sourceRole", "quote",
    "quoteContext", "studentName", "studentClass", "studentNumber"
  ];

  let state = {
    stage: "video",
    part: "headline",
    photo: "",
    drafts: {
      headline: "",
      lead: "",
      bridge: "",
      body: "",
      punch: ""
    },
    checks: null
  };

  const count = text =>
    (String(text || "").trim().match(/\S+/g) || []).length;

  // =========================
  // PENYIMPANAN DATA
  // =========================

  function load() {
    try {
      const data = JSON.parse(localStorage.getItem(KEY) || "null");

      if (!data) return;

      state = {
        ...state,
        ...data,
        drafts: {
          ...state.drafts,
          ...(data.drafts || {})
        }
      };

      fieldIds.forEach(id => {
        const element = $(id);

        if (
          element &&
          data.fields &&
          data.fields[id] !== undefined
        ) {
          if (element.type === "checkbox") {
            element.checked = data.fields[id];
          } else {
            element.value = data.fields[id];
          }
        }
      });

      if (state.photo) {
        showPhoto(state.photo);
      }
    } catch (error) {
      console.warn("Data lokal tidak dapat dibaca.", error);
    }
  }

  function save() {
    const fields = {};

    fieldIds.forEach(id => {
      const element = $(id);

      if (!element) return;

      fields[id] = element.type === "checkbox"
        ? element.checked
        : element.value;
    });

    try {
      localStorage.setItem(
        KEY,
        JSON.stringify({
          ...state,
          fields
        })
      );
    } catch (error) {
      console.warn("Penyimpanan lokal penuh atau tidak tersedia.", error);
    }
  }

  // =========================
  // FOTO OBSERVASI
  // =========================

  function showPhoto(source) {
    $("photoPreview").innerHTML = "";

    const image = document.createElement("img");
    image.src = source;
    image.alt = "Pratinjau foto observasi";
    image.className = "feature-photo";

    $("photoPreview").appendChild(image);
  }

  $("photoInput").addEventListener("change", event => {
    const file = event.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Pilih file gambar.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      state.photo = reader.result;
      showPhoto(state.photo);
      save();
    };

    reader.readAsDataURL(file);
  });

  $("samplePhoto").addEventListener("click", () => {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg"
           width="800" height="420">
        <rect width="800" height="420" fill="#e6edf6"/>
        <circle cx="650" cy="80" r="40" fill="#f3d58c"/>
        <path d="M0 300L180 170 330 300 500 130 800 310V420H0Z"
              fill="#789a8c"/>
        <path d="M0 350Q180 300 400 355T800 340V420H0Z"
              fill="#355d55"/>
        <text x="30" y="48" font-size="24"
              font-family="Arial" fill="#173b67">
          ILUSTRASI OBSERVASI BUDAYA
        </text>
        <g transform="translate(330 140)">
          <circle cx="60" cy="25" r="24" fill="#9b6849"/>
          <path d="M35 22Q40 -10 73 0L88 23Z" fill="#263b4b"/>
          <path d="M30 58L90 58 115 170 5 170Z" fill="#b34f48"/>
          <path d="M40 170L35 230M85 170L95 230"
                stroke="#263b4b" stroke-width="16"/>
        </g>
      </svg>`;

    state.photo =
      "data:image/svg+xml;charset=utf-8," +
      encodeURIComponent(svg);

    showPhoto(state.photo);
    save();
  });

  $("removePhoto").addEventListener("click", () => {
    state.photo = "";
    $("photoInput").value = "";
    $("photoPreview").textContent = "Belum ada foto yang dipilih.";
    save();
  });

  // =========================
  // NAVIGASI TUJUH TAHAP
  // =========================

  function setStage(name) {
    state.stage = name;

    document.querySelectorAll(".area").forEach(element => {
      element.classList.toggle(
        "active",
        element.classList.contains(name)
      );
    });

    document.querySelectorAll(".segmen").forEach(element => {
      element.classList.toggle(
        "active",
        element.dataset.jump === name
      );
    });

    $("featureProgress").textContent =
      `Tahap ${stageNames.indexOf(name) + 1} dari 7`;

    save();

    if (name === "anatomi") renderPart();
    if (name === "cek" && state.checks) renderChecks();
    if (name === "ekspor") renderPreview();
  }

  window.jumpSegmen = function (event) {
    const target = event.currentTarget.dataset.jump;
    const currentIndex = stageNames.indexOf(state.stage);
    const targetIndex = stageNames.indexOf(target);

    if (targetIndex > currentIndex + 1) {
      alert("Selesaikan tahap sebelumnya terlebih dahulu.");
      return;
    }

    if (
      targetIndex === currentIndex + 1 &&
      !validateStage()
    ) {
      return;
    }

    setStage(target);
  };

  window.featureNext = function () {
    if (!validateStage()) return;

    const index = stageNames.indexOf(state.stage);

    if (index < stageNames.length - 1) {
      setStage(stageNames[index + 1]);
    } else {
      renderPreview();
    }
  };

  function validateStage() {
    const stage = state.stage;
    let message = "";

    if (
      stage === "video" &&
      !$("tutorialDone").checked
    ) {
      message = "Tandai bahwa kamu sudah memahami panduan sebelum melanjutkan.";
    }

    if (
      stage === "kerangka" &&
      ![
        $("keywords").value,
        $("leadIdea").value,
        $("outline").value
      ].every(value => value.trim())
    ) {
      message = "Lengkapi kata kunci, ide Lead, dan kerangka awal.";
    }

    if (
      stage === "observasi" &&
      ![
        $("observation").value,
        $("mood").value
      ].every(value => value.trim())
    ) {
      message = "Lengkapi catatan observasi dan refleksi suasana.";
    }

    if (
      stage === "wawancara" &&
      ![
        $("sourceRole").value,
        $("quote").value,
        $("quoteContext").value
      ].every(value => value.trim())
    ) {
      message = "Lengkapi peran narasumber, kutipan, dan konteksnya.";
    }

    if (stage === "anatomi") {
      savePart();

      const missing = Object.keys(parts).filter(
        key => !state.drafts[key].trim()
      );

      if (missing.length) {
        message = "Lengkapi semua bagian: " +
          missing.map(key => parts[key][0]).join(", ") + ".";
      }
    }

    if (stage === "cek" && !state.checks) {
      runChecks();
    }

    if (message) {
      alert(message);
      return false;
    }

    save();
    return true;
  }

  // =========================
  // AUTOSAVE FORMULIR
  // =========================

  fieldIds.forEach(id => {
    const element = $(id);

    if (!element) return;

    element.addEventListener("input", () => {
      save();
      updateCounts();
    });

    if (element.type === "checkbox") {
      element.addEventListener("change", save);
    }
  });

  // =========================
  // PROMPT EKSTERNAL
  // =========================

  $("copyPrompt").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(
        $("promptText").textContent.trim()
      );

      $("copyPrompt").textContent = "Prompt tersalin ✓";
    } catch (error) {
      alert($("promptText").textContent.trim());
    }
  });

  // =========================
  // EDITOR HEADLINE - PUNCH
  // =========================

  document.querySelectorAll("[data-part]").forEach(button => {
    button.addEventListener("click", () => {
      savePart();
      state.part = button.dataset.part;
      renderPart();
      save();
    });
  });

  function savePart() {
    if ($("partText")) {
      state.drafts[state.part] = $("partText").value;
    }
  }

  function renderPart() {
    const part = parts[state.part];

    $("partTitle").textContent = part[0];
    $("partGuide").textContent = part[1];
    $("partText").value = state.drafts[state.part] || "";

    document.querySelectorAll("[data-part]").forEach(button => {
      const key = button.dataset.part;

      button.classList.toggle("active", key === state.part);

      button.textContent =
        parts[key][0] +
        (state.drafts[key].trim() ? " ✓" : "");
    });

    updateCounts();
  }

  $("partText").addEventListener("input", () => {
    state.drafts[state.part] = $("partText").value;
    updateCounts();
    save();
  });

  $("savePart").addEventListener("click", () => {
    savePart();
    save();
    alert("Draf tersimpan di browser.");
  });

  $("nextPart").addEventListener("click", () => {
    savePart();

    const keys = Object.keys(parts);
    const index = keys.indexOf(state.part);

    if (index < keys.length - 1) {
      state.part = keys[index + 1];
      renderPart();
      save();
    } else {
      alert("Kamu sudah berada di bagian terakhir.");
    }
  });

  function updateCounts() {
    if ($("observationCount")) {
      $("observationCount").textContent =
        count($("observation").value) + " kata";
    }

    if ($("partCount")) {
      $("partCount").textContent =
        count($("partText").value) + " kata";
    }
  }

  // =========================
  // CEK FORMAT DASAR
  // =========================

  function runChecks() {
    savePart();

    const headline = state.drafts.headline.trim();
    const body = state.drafts.body.trim();
    const quote = $("quote").value.trim();

    state.checks = [
      {
        title: "Jumlah kata Headline",
        ok: count(headline) >= 3 && count(headline) <= 12,
        detail: `${count(headline)} kata. Panduan awal: 3–12 kata.`
      },
      {
        title: "Panjang Body",
        ok: count(body) >= 80,
        detail: `${count(body)} kata. Panduan awal: minimal 80 kata.`
      },
      {
        title: "Tanda petik kutipan",
        ok: quote.includes('"') ||
          (quote.includes("“") && quote.includes("”")),
        detail: "Periksa tanda petik pembuka dan penutup pada kutipan."
      }
    ];

    renderChecks();
    save();
  }

  function renderChecks() {
    $("checkResults").innerHTML = state.checks.map(result => `
      <p class="${result.ok ? "ok" : "warn"}">
        <b>${result.ok ? "✓" : "!"} ${result.title}</b><br>
        ${result.detail}
      </p>
    `).join("");
  }

  $("runCheck").addEventListener("click", runChecks);

  // =========================
  // TINJAU DAN CETAK PDF
  // =========================

  function escapeHtml(text) {
    return String(text || "").replace(/[&<>"']/g, character => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[character]);
  }

  function renderPreview() {
    const name = $("studentName").value.trim() || "Belum diisi";
    const studentClass = $("studentClass").value.trim() || "Belum diisi";
    const number = $("studentNumber").value.trim() || "-";
    const date = new Date().toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });

    const escapeHtml = text =>
      String(text || "").replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      })[char]);

    const safeText = text =>
      escapeHtml(text).replace(/\n/g, "<br>");

    const title = state.drafts.headline.trim() ||
      "Menyusun Draf Teks Feature";

    const photo = state.photo
      ? `
            <div class="pdf-photo-card">
                <img src="${state.photo}" alt="Foto observasi budaya">
                <div class="pdf-photo-caption">
                    Dokumentasi foto observasi penulis
                </div>
            </div>
        `
      : "";

    function makeSection(key, number, extraClass = "") {
      const content = state.drafts[key].trim();

      if (!content) return "";

      return `
            <section class="pdf-section ${extraClass}">
                <h3 class="pdf-section-title">
                    <span class="pdf-section-number">${number}</span>
                    ${escapeHtml(parts[key][0])}
                </h3>
                <div class="pdf-answer">${safeText(content)}</div>
            </section>
        `;
    }

    function makeSupport(title, content) {
      if (!String(content || "").trim()) return "";

      return `
            <div class="pdf-support-card">
                <h4 class="pdf-support-title">${escapeHtml(title)}</h4>
                <div class="pdf-support-content">${safeText(content)}</div>
            </div>
        `;
    }

    const mainDraft = [
      makeSection("headline", "01"),
      makeSection("lead", "02", "lead"),
      makeSection("bridge", "03"),
      makeSection("body", "04", "body"),
      makeSection("punch", "05", "punch")
    ].join("");

    const interview = [
      $("sourceRole").value.trim()
        ? "Peran narasumber: " + $("sourceRole").value.trim()
        : "",
      $("quote").value.trim(),
      $("quoteContext").value.trim()
        ? "Konteks: " + $("quoteContext").value.trim()
        : ""
    ].filter(Boolean).join("\n");

    const supportCards = [
      makeSupport("Kata kunci", $("keywords").value),
      makeSupport("Ide Lead", $("leadIdea").value),
      makeSupport("Kerangka awal", $("outline").value),
      makeSupport("Catatan observasi", $("observation").value),
      makeSupport("Refleksi suasana", $("mood").value)
    ].join("");

    const statusItems = Object.keys(parts).map(key => {
      const complete = Boolean(state.drafts[key].trim());

      return `
            <div class="pdf-status-item ${complete ? "complete" : ""}">
                ${complete ? "✓" : "○"}
                ${escapeHtml(parts[key][0])}:
                ${complete ? "Terisi" : "Belum diisi"}
            </div>
        `;
    }).join("");

    $("printDocument").innerHTML = `
        <!-- HEADER MENGIKUTI PDF REFERENSI -->
        <header class="pdf-header">
            <h1 class="pdf-header-brand">
                BEI 2026 • BAHASA INDONESIA KELAS XII
            </h1>

            <p class="pdf-header-subtitle">
                Bab IV: Media 3 • Menyusun Draf Teks Feature |
                Mengamati Budaya | Mengembangkan Cerita |
                Menyusun Feature
            </p>
        </header>

        <h2 class="pdf-document-title">
            PORTOFOLIO PENYUSUNAN DRAF TEKS FEATURE
        </h2>

        <p class="pdf-document-desc">
            Dokumentasi hasil pengamatan dan proses penulisan feature
        </p>

        <!-- IDENTITAS -->
        <div class="pdf-bar">IDENTITAS SISWA</div>

        <div class="pdf-identity-grid">
            <div class="pdf-identity-item">
                <span class="pdf-identity-label">Nama siswa</span>
                <span class="pdf-identity-value">${escapeHtml(name)}</span>
            </div>

            <div class="pdf-identity-item">
                <span class="pdf-identity-label">Kelas</span>
                <span class="pdf-identity-value">${escapeHtml(studentClass)}</span>
            </div>

            <div class="pdf-identity-item">
                <span class="pdf-identity-label">Nomor absen</span>
                <span class="pdf-identity-value">${escapeHtml(number)}</span>
            </div>

            <div class="pdf-identity-item">
                <span class="pdf-identity-label">Tanggal pengerjaan</span>
                <span class="pdf-identity-value">${escapeHtml(date)}</span>
            </div>
        </div>

        <!-- FOTO OBSERVASI -->
        <div class="pdf-bar">DOKUMENTASI OBSERVASI</div>

        ${photo || `
            <p class="pdf-muted">
                Belum ada foto observasi yang dilampirkan.
            </p>
        `}

        <!-- DRAF UTAMA -->
        <div class="pdf-bar">A. KONSTRUKSI ANATOMI TEKS FEATURE</div>

        ${mainDraft || `
            <p class="pdf-muted">Belum ada bagian draf yang diisi.</p>
        `}

        <!-- WAWANCARA -->
        <div class="pdf-bar">B. CATATAN WAWANCARA</div>

        ${interview ? `
            <div class="pdf-quote">
                <div class="pdf-quote-label">
                    Catatan narasumber
                </div>
                <div class="pdf-quote-text">${safeText(interview)}</div>
            </div>
        ` : `
            <p class="pdf-muted">Belum ada catatan wawancara.</p>
        `}

        <!-- CATATAN PENDUKUNG -->
        <div class="pdf-bar">C. HASIL OBSERVASI DAN KERANGKA AWAL</div>

        <div class="pdf-support-grid">
            ${supportCards || `
                <p class="pdf-muted">
                    Belum ada catatan pendukung.
                </p>
            `}
        </div>

        <!-- STATUS -->
        <div class="pdf-bar">D. STATUS KELENGKAPAN DRAF</div>

        <div class="pdf-status-grid">
            ${statusItems}
        </div>

        <footer class="pdf-footer">
            Dibuat dari media interaktif BEI 2026
            • ${escapeHtml(date)}
        </footer>
    `;

    // Pratinjau pada halaman website
    $("finalPreview").innerHTML = `
        <h3>${escapeHtml(title)}</h3>
        <p>
            ${escapeHtml(name)} ·
            ${escapeHtml(studentClass)} ·
            Absen ${escapeHtml(number)}
        </p>
        <p class="feature-status">
            Pratinjau dokumen. Gunakan tombol cetak untuk menghasilkan PDF.
        </p>
    `;

    save();
  }

  $("refreshPreview").addEventListener("click", renderPreview);

  ["studentName", "studentClass", "studentNumber"].forEach(id => {
    $(id).addEventListener("input", () => {
      renderPreview();
      save();
    });
  });

  $("printPdf").addEventListener("click", () => {
    renderPreview();
    window.print();
  });

  // =========================
  // INISIALISASI
  // =========================

  load();
  setStage(state.stage || "video");
  renderPart();
  updateCounts();
})();