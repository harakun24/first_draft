let player;
let animId;
let isSeeking = false;
let lastTime = 0;
let currentActiveQuestion = null;

const seeker = document.querySelector("input[type='range']");
const popover = document.getElementById("modalquest");
const timerText = document.querySelector("span.timerText");

const dataList = [
  {
    time: 20, title: "Pembukaan",
    Questions: [
      {
        question: "Bagian surat lamaran pekerjaan yang berisi nama, alamat, nomor telepon, dan email pelamar disebut ...", answers: {
          a: "Identitas pelamar",
          b: "Isi surat",
          c: "Salam penutup",
          d: "Salam pembuka",
          key: "a"
        }
      },
      {
        question: "Kalimat yang tepat digunakan dalam surat lamaran pekerjaan adalah ...", answers: {
          a: "Saya mau kerja di perusahaan Bapak karena saya sedang membutuhkan uang.",
          b: "Dengan surat ini, saya bermaksud mengajukan lamaran pekerjaan untuk posisi Helper Produksi.",
          c: "Saya harap Bapak bisa menerima saya karena saya sangat ingin bekerja.",
          d: "Saya harap Bapak tidak menerima saya karena saya sangat tidak ingin bekerja.",
          key: "b"
        }
      },
      {
        question: "Berikut ini yang tidak termasuk dokumen yang biasanya dilampirkan dalam surat lamaran pekerjaan adalah ...", answers: {
          a: "Fotokopi ijazah",
          b: "Daftar riwayat hidup (CV)",
          c: "Foto makanan favorit",
          d: "Semuanya",
          key: "c"
        }
      },
      {
        question: "Tujuan utama dari surat lamaran pekerjaan adalah ...", answers: {
          a: "Menceritakan pengalaman pribadi secara lengkap",
          b: "Mengajukan permohonan untuk mendapatkan pekerjaan",
          c: "Memberikan informasi tentang perusahaan",
          d: "Semuanya salah",
          key: "b"
        }
      },
    ]
  },
  {
    time: 68, title: "Dokumen Lamaran",
    Questions: [
      {
        question: "Bagian alinea pembuka dalam surat lamaran pekerjaan berisi informasi awal yang sangat penting. Manakah di bawah ini yang merupakan isi dari bagian alinea pembuka?", answers: {
          a: "Riwayat pendidikan terakhir, pengalaman kerja, dan daftar riwayat hidup pelamar.",
          b: "Sumber informasi lowongan pekerjaan dan posisi pekerjaan yang ingin dilamar.",
          c: "Ucapan terima kasih serta harapan pelamar untuk dapat dipanggil mengikuti wawancara.",
          d: "Ucapan terima kasih serta harapan orang tua untuk dapat dipanggil mengikuti wawancara.",
          key: "b"
        }
      },
      {
        question: "Dalam surat lamaran pekerjaan, bagian argumentasi menyajikan alasan mengapa pelamar layak diterima. Konten yang tepat untuk mengisi bagian argumentasi adalah ...", answers: {
          a: "Identitas diri, kualifikasi/keahlian pelamar, serta daftar berkas pendukung yang dilampirkan.",
          b: "Tempat dan tanggal pembuatan surat, alamat kantor tujuan, serta nama pimpinan perusahaan.",
          c: "Salam pembuka, ungkapan rasa hormat, dan permohonan maaf atas waktu yang digunakan pembaca.",
          d: "Salam pembuka, ungkapan rasa hormat, dan permohonan terima kasih atas waktu yang diluangkan.",
          key: "a"
        }
      },
      {
        question: `Cermati kalimat berikut:
"Sebagai bahan pertimbangan Bapak/Ibu, bersama ini saya lampirkan fotokopi ijazah terakhir, sertifikat kompetensi komputer, dan surat pengalaman kerja."
Berdasarkan isinya, kutipan kalimat di atas termasuk ke dalam unsur konten surat lamaran pekerjaan bagian ...`, answers: {
          a: "Pembuka",
          b: "Penutup",
          c: "Argumentasi",
          d: "Tesis",
          key: "c"
        }
      },
      {
        question: "Kalimat berikut yang merupakan bagian penutup surat lamaran pekerjaan yang santun dan efektif dari segi isi adalah ...", answers: {
          a: "Saya berharap Bapak/Ibu mau menerima saya bekerja di perusahaan ini sesegera mungkin.",
          b: "Besar harapan saya untuk dapat diberi kesempatan wawancara. Atas perhatian Bapak/Ibu, saya ucapkan terima kasih.",
          c: "Atas perhatiannya Bapak/Ibu sekalian, saya mengucapkan beribu-ribu terima kasih.",
          d: "Atas pengertiannya Bapak/Ibu sekalian, saya mengucapkan beribu-ribu minta maaf.",
          key: "b"
        }
      },
    ]
  },
  {
    time: 99, title: "Detail Bahasa",
    Questions: [
      {
        question: `Cermati penulisan rincian identitas pelamar berikut!
... Adapun data diri saya adalah sebagai berikut:
nama : Ahmad Fauzi
tempat, tanggal lahir : Bandung, 14 Mei 2001
pendidikan terakhir : SMPN 1 Nusa
Alasan yang tepat mengapa huruf awal pada kata nama, tempat, dan pendidikan menggunakan huruf kecil adalah ...`, answers: {
          a: "Kata-kata tersebut berada di dalam alinea pembuka dan bukan awal kalimat baru.",
          b: "Rincian tersebut merupakan kelanjutan dari kalimat utama yang diakhiri tanda titik dua (:).",
          c: "Penulisan identitas dalam surat resmi wajib menggunakan huruf kecil pada semua kata.",
          d: "Penulisan identitas dalam surat resmi wajib menggunakan huruf kecil pada awal kata.",
          key: "b"
        }
      },
      {
        question: `Cermati penulisan alamat tujuan surat berikut!
(1) Kepada Yth. Bapak Manajer HRD
(2) PT Nusantara Jaya
(3) Jl. Merdeka No. 45 Jakarta
Perbaikan penulisan alamat surat di atas agar sesuai dengan kaidah kebahasaan yang benar adalah ...`, answers: {
          a: `Menghilangkan kata "Kepada" dan "Bapak", serta mengganti "Jl." menjadi "Jalan".`,
          b: `Menambahkan tanda titik setelah kata "PT" dan mengganti "No." menjadi "Nomor".`,
          c: `Mengganti kata "Yth." menjadi "Yang Terhormat" saja.`,
          d: `Mengganti kata "Yth." menjadi "Yang Terhormat" serta menghapus nama perusahaan.`,
          key: "a"
        }
      },
      {
        question: `Cermati kalimat penutup surat lamaran pekerjaan berikut!
"Demikian surat lamaran ini saya sampaikan. Atas perhatiannya, saya ucapkan terima kasih banyak."
Penggunaan bahasa pada kalimat penutup di atas kurang tepat karena ...`, answers: {
          a: `Penggunaan kata "sampaikan" terkesan tidak sopan untuk surat formal.`,
          b: `Kata ganti "-nya" merujuk pada orang ketiga, padahal ditujukan kepada penerima surat (orang kedua).`,
          c: `Penggunaan ucapan terima kasih berlebihan dan tidak diperbolehkan dalam surat resmi.`,
          d: "Tidak ada yang salah.",
          key: "b"
        }
      },
      {
        question: "Cermati penulisan salam pembuka dan salam penutup berikut! Manakah pasangan penulisan salam pembuka dan salam penutup yang sesuai dengan kaidah kebahasaan bahasa Indonesia?", answers: {
          a: "Dengan Hormat, / Hormat Saya,",
          b: "Dengan hormat, / Hormat saya,",
          c: "Dengan hormat. / Hormat saya.",
          d: "Dengan Hormat. / Hormat Saya,",
          key: "b"
        }
      },
    ]
  },
  {
    time: 129, title: "Kelengkapan Dokumen",
    Questions: [
      {
        question: `Apa fungsi utama dari pencantuman lampiran atau dokumen pendukung dalam surat lamaran pekerjaan?`, answers: {
          a: "Sebagai syarat formalitas saja tanpa ada kaitan dengan kualifikasi kerja yang dilamar.",
          b: "Memperkuat bagian argumentasi serta membuktikan kebenaran data dan kualifikasi pelamar.",
          c: "Menggantikan isi dari alinea pembuka dan pernyataan tesis dalam surat lamaran.",
          d: "Memperkuat isi dari alinea pembuka dan pernyataan tesis dalam surat lamaran.",
          key: "b"
        }
      },
      {
        question: `Seorang pelamar hendak mengajukan diri untuk mengisi posisi Akuntan Perusahaan. Manakah berkas pendukung berikut yang paling relevan untuk dilampirkan selain ijazah dan kartu identitas?`, answers: {
          a: `Sertifikat pelatihan akuntansi/keuangan dan sertifikat keahlian perangkat lunak akuntansi (misalnya Accurate/Excel).`,
          b: `Portofolio desain grafis, sketsa tangan, dan sertifikat pemenang lomba fotografi.`,
          c: `Surat keterangan domisili dari RT/RW setempat dan kartu anggota perpustakaan daerah.`,
          d: `Surat tanah`,
          key: "a"
        }
      },
      {
        question: `Cermati kalimat penjelas berkas pendukung berikut!
"Sebagai bahan pertimbangan Bapak/Ibu, bersama ini saya lampirkan:"
Manakah penyusunan rincian dokumen pendukung yang tepat dan sesuai dengan kaidah penulisan rincian dalam surat resmi?`, answers: {
          a: `FC ijazah terakhir; FC transkrip nilai; Pasfoto ukuran 4x6 cm.`,
          b: `fotokopi ijazah terakhir; fotokopi transkrip nilai; pasfoto ukuran 4x6 cm.`,
          c: `Fotokopi Ijazah Terakhir; Fotokopi Transkrip Nilai; Pasfoto Ukuran 4x6 Cm.`,
          d: "Fotokopi Ijazah Terakhir. Fotokopi Transkrip Nilai. Pasfoto Ukuran 4x6 Cm.",
          key: "b"
        }
      },
      {
        question: "Manakah prinsip yang paling tepat diperhatikan pelamar dalam melampirkan dokumen pendukung agar berkas lamaran terlihat profesional?", answers: {
          a: "Melampirkan seluruh dokumen dan sertifikat yang pernah didapat dari masa sekolah hingga sekarang tanpa memilah relevansinya.",
          b: "Memastikan dokumen yang dilampirkan valid, rapi, lega, serta sesuai dengan kualifikasi yang dipersyaratkan oleh perusahaan.",
          c: "Menyertakan dokumen fisik asli (seperti ijazah asli dan KTP asli) langsung ke dalam amplop lamaran kerja.",
          d: "Tanpa persiapan.",
          key: "b"
        }
      },
    ]
  },
  {
    time: 149, title: "Design CV",
    Questions: [
      {
        question: `Apa prinsip utama yang harus diperhatikan dalam memilih jenis huruf (font) dan ukuran teks pada desain CV agar tetap profesional dan mudah dibaca?`, answers: {
          a: "Menggunakan maksimal 1–2 jenis huruf yang standar/jelas (seperti Arial, Calibri, atau Helvetica) dengan ukuran yang proporsional dan konsisten.",
          b: "Menggunakan berbagai jenis huruf dekoratif dan artistik dengan warna-warni cerah agar menarik perhatian HRD sejak pandangan pertama.",
          c: "Menggunakan ukuran huruf yang sangat kecil (di bawah 8 pt) agar seluruh riwayat hidup dan pengalaman dapat dimuat dalam satu halaman tanpa dipotong.",
          d: "Jawaban B dan C benar",
          key: "a"
        }
      },
      {
        question: `Bagaimana penggunaan warna yang bijak dan efektif dalam desain CV profesional?`, answers: {
          a: `Menggunakan warna neon di seluruh latar belakang agar dokumen tampak paling mencolok dibanding berkas pelamar lain.`,
          b: `Menggunakan palet warna yang terbatas dan netral (1–3 warna profesional) sebagai aksen pada judul atau pemisah bagian agar rapi.`,
          c: `Menghindari penggunaan warna sama sekali dan menyusun seluruh teks secara rata kiri tanpa ada pemisah visual, garis, atau ruang kosong.`,
          d: `Jawaban A dan B benar`,
          key: "b"
        }
      },
      {
        question: `Fungsi utama dari penerapan visual hierarchy (hierarki visual) pada tata letak (layout) CV adalah ...`, answers: {
          a: `Menjadikan tampilan CV terlihat sangat ramai sehingga dapat menutupi kekurangan pada riwayat pengalaman kerja.`,
          b: `Membimbing mata perekrut (recruiter) untuk menemukan informasi penting (seperti nama, posisi, dan pengalaman utama) dengan cepat dan sistematis.`,
          c: `Mengubah seluruh isi dokumen menjadi bentuk grafik lingkaran (pie chart) agar menghemat ruang halaman CV.`,
          d: "Bentuk penerapan kreativitas dan seni.",
          key: "b"
        }
      },
      {
        question: "Mengapa penggunaan diagram batang (progress bar) atau skala persentase angka untuk mengukur tingkat keahlian (skill) kurang disarankan dalam desain CV?", answers: {
          a: "Karena penilaian persentase keahlian tersebut bersifat subjektif, ambigu, dan tidak memberikan tolok ukur kompetensi yang jelas bagi perusahaan.",
          b: "Karena penggunaan grafik atau gambar pada CV dapat menambah ukuran file hingga melampaui batas maksimum surel.",
          c: "Karena sistem perekrutan selalu mewajibkan seluruh daftar keahlian ditulis dalam bentuk poin-poin cerita naratif panjang.",
          d: "Semua jawaban salah.",
          key: "a"
        }
      },
    ]
  }
];

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    videoId: "9TwsvY_iGys",
    width: "100%",
    height: "100%",
    events: {
      onStateChange: onPlayerStateChange
    }
  });
}

function onPlayerStateChange(event) {
  const btn = document.getElementById("ctrl");

  if (event.data === YT.PlayerState.PLAYING) {
    if (btn) btn.innerHTML = `<i class="fas fa-pause"></i>`;
    cancelAnimationFrame(animId);
    lastTime = player.getCurrentTime();
    watchProgress();
  } else if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
    if (btn) btn.innerHTML = `<i class="fas fa-play"></i>`;
    cancelAnimationFrame(animId);
  }
}

function watchProgress() {
  if (player && player.getDuration) {
    const currentTime = player.getCurrentTime();
    const duration = player.getDuration();

    if (duration > 0 && seeker && !isSeeking) {
      seeker.value = (currentTime / duration) * 100;
    }

    if (timerText && duration > 0) {
      timerText.innerText = `${formatTime(currentTime)} / ${formatTime(duration)}`;
    }

    const timerList = Array.from(document.querySelectorAll(".ctrl-timer:not(.all)"));
    timerList.forEach((el, index) => {
      const currentJump = parseFloat(el.dataset.jumpTo || 0);
      const nextTimer = timerList[index + 1];
      const nextJump = nextTimer ? parseFloat(nextTimer.dataset.jumpTo) : Infinity;

      if (currentTime >= currentJump && currentTime < nextJump) {
        el.classList.add("active");
      } else {
        el.classList.remove("active");
      }
    });

    const timeDelta = currentTime - lastTime;

    if (timeDelta > 0 && timeDelta < 1.5) {
      for (const q of dataList) {
        if (lastTime < q.time && currentTime >= q.time) {
          player.pauseVideo();
          showModal(q);
          lastTime = currentTime;
          return;
        }
      }
    }

    lastTime = currentTime;
  }

  if (player && player.getPlayerState() === YT.PlayerState.PLAYING) {
    animId = requestAnimationFrame(watchProgress);
  }
}

function showModal(data) {
  if (!popover) return;

  const timerAt = popover.querySelector("#timerAt");
  if (timerAt) timerAt.innerText = data.title;

  if (data.Questions && data.Questions.length > 0) {
    const randomIndex = Math.floor(Math.random() * data.Questions.length);
    currentActiveQuestion = data.Questions[randomIndex];

    const questionEl = popover.querySelector("h2");
    if (questionEl) {
      questionEl.innerText = currentActiveQuestion.question;
    }

    const groupAnswer = popover.querySelector(".group-answer");
    if (groupAnswer) {
      groupAnswer.innerHTML = "";

      const optionsKey = ["a", "b", "c", "d"];
      optionsKey.forEach(opt => {
        if (currentActiveQuestion.answers[opt]) {
          const btn = document.createElement("button");
          btn.className = "btn";
          btn.dataset.answer = (opt === currentActiveQuestion.answers.key).toString();
          btn.setAttribute("onclick", "answer(this)");
          btn.innerText = `${opt.toUpperCase()}. ${currentActiveQuestion.answers[opt]}`;
          groupAnswer.appendChild(btn);
        }
      });
    }
  }

  if (typeof popover.showPopover === "function") {
    popover.showPopover();
  }
}

function togglePlay() {
  if (!player || typeof player.getPlayerState !== "function") return;

  const btn = document.getElementById("ctrl");
  const state = player.getPlayerState();

  if (state === YT.PlayerState.PLAYING) {
    player.pauseVideo();
    if (btn) btn.innerHTML = `<i class="fas fa-play"></i>`;
  } else {
    player.playVideo();
    if (btn) btn.innerHTML = `<i class="fas fa-pause"></i>`;
  }
}

function jumpTo(seconds, element) {
  if (!player || !player.seekTo) return;

  const targetTime = parseFloat(seconds);
  player.seekTo(targetTime, true);
  lastTime = targetTime;

  if (player.getPlayerState() !== YT.PlayerState.PLAYING) {
    player.playVideo();
  }
}

if (seeker) {
  seeker.addEventListener("pointerdown", () => {
    isSeeking = true;
  });

  seeker.addEventListener("pointerup", () => {
    if (player && player.getDuration) {
      const duration = player.getDuration();
      if (duration > 0) {
        const targetTime = (parseFloat(seeker.value) / 100) * duration;
        player.seekTo(targetTime, true);
        lastTime = targetTime;
      }
    }
    isSeeking = false;
  });
}

if (popover) {
  popover.addEventListener("toggle", (e) => {
    const ytIframe = player ? player.getIframe() : null;

    if (e.newState === "open") {
      if (ytIframe) ytIframe.style.pointerEvents = "none";
    } else if (e.newState === "closed") {
      if (ytIframe) ytIframe.style.pointerEvents = "auto";

      if (player) {
        lastTime = player.getCurrentTime();
        if (player.getPlayerState() !== YT.PlayerState.PLAYING) {
          player.playVideo();
        }
      }
    }
  });

  popover.addEventListener("click", (e) => {
    const rect = popover.getBoundingClientRect();
    const isInDialog =
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom;

    if (!isInDialog && typeof popover.hidePopover === "function") {
      popover.hidePopover();
    }
  });
}

document.addEventListener("keydown", (e) => {
  if (!player || typeof player.getCurrentTime !== "function") return;

  const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : "";
  if (activeTag === "input" || activeTag === "textarea") return;

  if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
    e.preventDefault();

    const currentTime = player.getCurrentTime();
    const duration = player.getDuration();
    let targetTime;

    if (e.key === "ArrowLeft") {
      targetTime = Math.max(currentTime - 5, 0);
    } else if (e.key === "ArrowRight") {
      targetTime = Math.min(currentTime + 5, duration);
    }

    player.seekTo(targetTime, true);
    lastTime = targetTime;
  } else if (e.key === " ") {
    e.preventDefault();
    togglePlay();
  }
});

function answer(element) {
  const isCorrect = element.dataset.answer === "true";

  document.querySelectorAll(".group-answer .btn").forEach(e => {
    e.classList.remove("benar", "salah");
    e.disabled = true;
  });

  if (isCorrect) {
    element.classList.add("benar");
  } else {
    element.classList.add("salah");
    const correctBtn = popover.querySelector(".group-answer .btn[data-answer='true']");
    if (correctBtn) correctBtn.classList.add("benar");
  }
}