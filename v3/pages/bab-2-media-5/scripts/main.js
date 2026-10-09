let currentActiveQuestion = null;
let lastTime = 0;
let answeredList = [];
let animId;

function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    videoId: "85zNqBu5M3A",
    width: "100%",
    height: "100%",
    events: {
      onStateChange: onPlayerStateChange
    }
  });
}

const modal = document.querySelector(".modal");

function jumpSegmen(e) {
  if (!player) return;

  const targetTime = parseFloat(e.currentTarget.dataset.time);
  player.seekTo(targetTime, true);
  lastTime = targetTime;

  if (player.getPlayerState() !== YT.PlayerState.PLAYING)
    player.playVideo();

  document.querySelector(".segmen.active")?.classList.remove("active");
  e.currentTarget.classList.add("active");
}


const sections = [
  {
    time: 32, title: "Pembukaan",
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
    time: 74, title: "Dokumen Lamaran",
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
    time: 89, title: "Detail Bahasa",
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
];

sections.forEach((e, k) => {
  answeredList.push({
    key: sections[k - 1]?.time || 0,
    title: e.title,
    question: "-",
    status: "false",
    answer: "belum menjawab",
    correct: "-"
  })
})


function onPlayerStateChange(event) {
  cancelAnimationFrame(animId);
  if (event.data === YT.PlayerState.PLAYING) {
    lastTime = player.getCurrentTime();
    watchProgress()
  }
}

function watchProgress() {
  if (player && player.getDuration()) {
    const currentTime = player.getCurrentTime();
    const duration = player.getDuration();

    const timerList = Array.from(document.querySelectorAll(".segmen"));

    timerList.forEach((el, index) => {
      const currentJump = parseFloat(timerList[index]?.dataset.time || 0);
      const nextTimer = timerList[index + 1];
      const nextJump = nextTimer ? parseFloat(nextTimer.dataset.time) : Infinity;

      if (currentTime >= currentJump && currentTime < nextJump) {
        el.classList.add("active");
      }
      else {
        el.classList.remove("active");
      }
    });

    const timeDelta = currentTime - lastTime;

    if (timeDelta > 0 && timeDelta < 1.5) {
      sections.forEach((section, key) => {
        if (lastTime < section.time && currentTime >= section.time) {
          player.pauseVideo();
          // toggleModal(section, key);
          alert("segmen selesai");
          lastTime = currentTime;
          return;
        }
      })
    }
    lastTime = currentTime;
  }
  if (player && player.getPlayerState() == YT.PlayerState.PLAYING)
    animId = requestAnimationFrame(watchProgress)
}

function toggleModal(data = null, key = null) {
  if (!data)
    modal.togglePopover();
  if (!modal) return;

  if (data.Questions && data.Questions.length > 0) {
    const randomIndex = Math.floor(Math.random() * data.Questions.length);
    currentActiveQuestion = data.Questions[randomIndex];

    modal.querySelector(".question").textContent = currentActiveQuestion.question;

    const groupAnswer = modal.querySelector(".opsi");
    const optionsKey = ["a", "b", "c"];
    groupAnswer.innerHTML = "";

    optionsKey.forEach(opt => {
      if (currentActiveQuestion.answers[opt]) {
        const btn = document.createElement("button");
        btn.className = "pointer";
        btn.dataset.value = opt;
        btn.dataset.key = answeredList[key].key;
        btn.dataset.answer = (opt === currentActiveQuestion.answers.key).toString();
        btn.setAttribute("onclick", "answer(this)");
        btn.textContent = `${opt.toUpperCase()}. ${currentActiveQuestion.answers[opt]}`;
        btn.addEventListener("click", () => answer(btn));
        groupAnswer.appendChild(btn);
      }
    })
  }
  modal.showPopover();
}

function answer(data) {


  for (const a of answeredList) {
    if (a.key == data.dataset.key) {
      a.question = currentActiveQuestion.question;
      a.status = data.dataset.answer;
      a.answer = currentActiveQuestion.answers[data.dataset.value];
      a.correct = currentActiveQuestion.answers[currentActiveQuestion.answers.key];
    }
  }
  store.set("video-quiz", answeredList);

  const strTable = answeredList.map((a, index) => `
  <tr>
  <td>${index + 1}</td>
  <td>${a.title}</td>
  <td>${a.question}</td>
  <td>${a.answer}</td>
  <td>${a.correct}</td>
  <td>${a.status}</td>
  </tr>
  `).join("");
  document.querySelector(".top tbody").innerHTML = strTable;

  modal.hidePopover();
}

// store.clean();

if (!store.get("video-quiz"))
  store.set("video-quiz", answeredList);
else
  answeredList = store.get("video-quiz");


console.log(store.get("video-quiz"));

function nextView() {
  let state = false;
  if (store.get("video-quiz"))
    state = !store.get("video-quiz").some(el => el.question == "-");

  // console.log({ state, data: store.get("video-quiz") })
  if (!state) {
    alert("Pastikan anda menyimak video hingga selesai.")
  }
  else {
    document.querySelector("[data-view='1']").classList.remove("active");
    document.querySelector("[data-view='2']").classList.add("active");
    player.pauseVideo();
  }
}
function prevView() {
  document.querySelector("[data-view='1']").classList.add("active");
  document.querySelector("[data-view='2']").classList.remove("active");
}