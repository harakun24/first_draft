let currentActiveQuestion = null;
let lastTime = 0;
const answeredList = [];
let animId;
let pages = [
  ` <div class="sidemenu">
        <b class="header-text">Daftar Adegan</b>
        <div class="group-list"></div>
      </div>
      <div class="video">
        <div id="player"></div>
        <div class="fokus">
          <b>Fokus Adegan</b>
          <h2>Kesan pertama dibentuk sebelum wawancara dimulai.</h2>
          <div class="wrapper box">
            <b>Pertanyaan reflektif</b>
            <p>Apa kesan pertama yang ingin kamu tunjukkan?</p>
          </div>
        </div>
        <!-- <div class="keterangan">
          <b>keterangan</b>
          <ul class="wrapper">
            <li>satu</li>
            <li>dua</li>
            <li>tiga</li>
            <li>empat</li>
          </ul>
        </div> -->
        <button class="quiz pointer" onclick="saveDoc()">
          <span>Latihan Koreksi</span>
          <i class="fas fa-external-link-square"></i>
        </button>
      </div>`,
  `<div class="page">
        <p>
          Hal: Lamaran Pekerjaan — IT & Data Analyst Lampiran: 5 (lima) lembar
        </p>
        <p>Jakarta, 7 September 2026</p>
        <div>
          <div class="spoiler" data-q="1">
            <span class="target-pop">Kepada Yth. Manajer HRD</span>
          </div>
          <div>PT Inovasi Digital Nusantara</div>
          <div>Gedung Sentra Digital, Lantai 14</div>
          <div class="spoiler" data-q="2">
            <span class="target-pop">Di Jakarta Selatan</span>
          </div>
        </div>
        <div class="spoiler" data-q="3">
          <span class="target-pop">Dengan hormat;</span>
        </div>
        <p>
          Sehubungan dengan
          <span class="spoiler" data-q="4">
            <span class="target-pop">info </span>
          </span>
          lowongan pekerjaan yang dipublikasikan melalui portal resmi PT Inovasi
          Digital Nusantara pada tanggal 2 September 2026, saya yang bertanda
          tangan di bawah ini bermaksud untuk mengajukan diri menempati posisi
          IT & Data Analyst di perusahaan
          <span class="spoiler" data-q="5"
            ><span class="target-pop">yang mana Bapak/Ibu pimpin.</span></span
          >
        </p>
        <p>
          Adapun data diri saya adalah sebagai berikut:
          <!-- <li>fotokopi <div class="spoiler"><span>Ijasah</span><div class="pop">
      <div class="input-group">
      <input type="radio" name="choice" id="rue" value="1"><label for="rue">ijazah</label>
      </div>
      <div class="input-group">
      <input type="radio" name="choice" id="ee" value="2"><label for="ee">ijasah</label>
      </div>
      <div class="input-group">
      <input type="radio" name="choice" id="ww" value="3"><label for="ww">isajah</label>
      </div>
      </div></div></li> -->
        </p>

        <ul>
          <li>Nama Lengkap: Ahmad Fauzi, S.Kom.</li>
          <li>Tempat, Tanggal Lahir: Jakarta, 14 Mei 1999</li>
          <li>
            Pendidikan Terakhir: S-1 Sistem Informasi, Universitas Bina
            Nusantara
          </li>
          <li>Nomor Telepon / WA: 0812-3456-7890</li>
          <li>
            Alamat Domisili: Jalan Sudirman Nomor 45, Kebayoran Baru, Jakarta
            Selatan
          </li>
        </ul>
        <p>
          Saya memiliki pengalaman kerja selama dua tahun pada bidang
          <span class="spoiler" data-q="6"
            ><span class="target-pop"> analisa </span></span
          >data operasional dan pemeliharaan sistem informasi. Selama bekerja,
          saya terbiasa memanfaatkan instrumen pengolahan data terpadu guna
          <span class="spoiler" data-q="7"
            ><span class="target-pop">merubah</span></span
          >
          data kompleks menjadi wawasan strategis yang mampu mengoptimalkan
          <span class="spoiler" data-q="8"
            ><span class="target-pop">efektifitas</span></span
          >
          prosedur kerja harian.
        </p>
        <p>
          Sebagai bahan pertimbangan Bapak/Ibu, berikut turut saya lampirkan
          kelengkapan berkas pendukung:
        </p>
        <ol>
          <li>Daftar Riwayat Hidup (Curriculum Vitae) terbaru</li>
          <li>Salinan Ijazah Sarjana Terlegalisir dan Transkrip Nilai</li>
          <li>Salinan Sertifikat Keahlian dan Pasfoto 4x6</li>
        </ol>
        <p>
          Besar harapan saya untuk diberikan kesempatan menghadiri sesi
          wawancara agar dapat menguraikan lebih mendalam perihal kompetensi dan
          dedikasi saya.
          <span class="spoiler" data-q="9"
            ><span class="target-pop"
              >Atas perhatiannya, saya sampaikan terima kasih.</span
            ></span
          >
        </p>

        <p>Hormat saya</p>

        <p>
          <span class="spoiler" data-q="10"
            ><span class="target-pop">(Ahmad Fauzi, S.Kom.)</span></span
          >
        </p>
      </div>
      <div class="side">
        <div class="info">
          <b>Petunjuk</b>
          <ul>
            <li>Klik kata atau kalimat yang salah.</li>
            <li>Pilih bentuk perbaikannya.</li>
          </ul>
        </div>
        <div class="detail">
          <b>Jenis Kesalahan</b>
          <div class="group-pill">
            <div class="pill">
              <div class="ball"></div>
              Kata tidak baku
            </div>
            <div class="pill">
              <div class="ball"></div>
              Tanda baca
            </div>
            <div class="pill">
              <div class="ball"></div>
              Bahasa formal
            </div>
            <div class="pill">
              <div class="ball"></div>
              Sistematika
            </div>
          </div>
        </div>
        <button class="cek" onclick="check()">periksa jawaban</button>
        <button class="down" onclick="saveResult()">unduh hasil</button>
      </div>`

]

const modal = document.querySelector(".modal")


function switchPage(index) {
  document.querySelector(".main").innerHTML = pages[index];

  document.querySelectorAll(".spoiler").forEach(e => {
    const data = dataList2[e.dataset.q - 1];

    e.innerHTML += `
   <div class="pop" popover="auto">
   <div class="fs-close">
   <i class="fas fa-close"></i>
   </div>
            <div class="input-group">
              <input type="radio" name="choice" value="1" /><label
                >${data.options[0]}</label
              >
            </div>
            <div class="input-group">
              <input type="radio" name="choice" value="2" /><label
                >${data.options[1]}</label
              >
            </div>
            <div class="input-group">
              <input type="radio" name="choice" value="3" /><label
                >${data.options[2]}</label
              >
            </div>
            <button class="btn-save">simpan</button>
          </div>
  `;


    const pop = e.querySelector(".pop");
    const closeBtn = e.querySelector(".fs-close");
    pop.addEventListener("toggle", (event) => {
      if (event.newState == "closed") {
        e.querySelector("span").classList.add("filled")
        e.querySelector("span").classList.remove("active")
      }

    })
    closeBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      pop.hidePopover()
    })
    e.addEventListener("click", () => {
      e.querySelector("span").classList.remove("filled")
      e.querySelector("span").classList.remove("wrong")
      e.querySelector("span").classList.add("active")
      pop.showPopover()
    })
    e.querySelectorAll(".input-group").forEach(ee => {
      ee.addEventListener("click", (event) => {
        event.stopPropagation()
        ee.querySelector("input").click()
      })
    })
    e.querySelector(".btn-save").addEventListener("click", (event) => {
      event.stopPropagation()
      const val = e.querySelector('input[name="choice"]:checked')?.value || 1;
      e.querySelector(".target-pop").textContent = data.options[val - 1];
      dataAnswer["q" + e.dataset.q] = {
        answer: val,
        data
      }
      // console.log({ dataAnswer })
      pop.hidePopover()
    })
  })

}
switchPage(0);

const sections = [
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



const groupList = document.querySelector(".group-list") || document.createElement("div");
sections.forEach((e, index) => {
  groupList.innerHTML += ` <div class="item wrapper pointer" data-jump="${sections[index - 1]?.time || 0}">
            <b>${e.title} </b
            ><span class="icon"> <i class="fas fa-play"></i></span>
          </div>`
})

groupList.querySelectorAll(".item").forEach(e => {
  e.addEventListener("click", () => {
    groupList.querySelector(".active")?.classList.remove("active");
    jumpTo(e.dataset.jump);
    e.classList.add("active");
  })
})

function onPlayerStateChange(event) {

  cancelAnimationFrame(animId)
  if (event.data === YT.PlayerState.PLAYING) {
    lastTime = player.getCurrentTime();
    watchProgress()
  }

}

function watchProgress() {
  if (player && player.getDuration()) {
    const currentTime = player.getCurrentTime();
    const duration = player.getDuration();

    const timerList = Array.from(groupList.querySelectorAll(".item"));

    timerList.forEach((el, index) => {
      const currentJump = parseFloat(timerList[index]?.dataset.jump || 0)
      const nextTimer = timerList[index + 1];
      const nextJump = nextTimer ? parseFloat(nextTimer.dataset.jump) : Infinity;
      if (currentTime >= currentJump && currentTime < nextJump) {
        el.classList.add("active");
      } else {
        el.classList.remove("active");
      }
    });

    const timeDelta = currentTime - lastTime;

    if (timeDelta > 0 && timeDelta < 1.5) {

      sections.forEach((section, key) => {
        console.log({ section, key })
        if (lastTime < section.time && currentTime >= section.time) {
          player.pauseVideo();
          toggleModal(section, key);
          lastTime = currentTime;
          return;
        }
      })
    }

    lastTime = currentTime;
  }
  if (player && player.getPlayerState() == YT.PlayerState.PLAYING)
    animId = requestAnimationFrame(watchProgress);
}

function jumpTo(time) {
  if (!player) return;

  const targetTime = parseFloat(time);
  player.seekTo(targetTime, true);
  lastTime = targetTime;

  if (player.getPlayerState() !== YT.PlayerState.PLAYING)
    player.playVideo()
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
    // console.log(currentActiveQuestion)

    optionsKey.forEach(opt => {
      if (currentActiveQuestion.answers[opt]) {
        const btn = document.createElement("button");
        console.log({ key, answeredList })
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
  const isCorrect = data.dataset?.answer == "true";
  console.log(currentActiveQuestion)

  for (const a of answeredList) {
    console.log(a)
    if (a.key == data.dataset.key) {
      a.question = currentActiveQuestion.question;
      a.status = data.dataset.answer;
      a.answer = currentActiveQuestion.answers[data.dataset.value];
      a.correct = currentActiveQuestion.answers[currentActiveQuestion.answers.key];
    }
  }
  modal.hidePopover();
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
}

async function saveDoc() {
  const target = document.querySelector(".table");
  const { jsPDF } = window.jspdf;
  const el = document.querySelector(".table");
  try {

    const canvas = await html2canvas(target, {
      scale: 2,
      useCORS: true
    });
    const imgData = canvas.toDataURL('image/png');

    let pdfWidth = 210;
    let pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    const pdf = new jsPDF({ orientation: 'l', unit: 'mm', format: [pdfWidth, pdfHeight] });


    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

    pdf.save('hasil-koreksi.pdf');

  } catch (error) {
    console.error('Terjadi kesalahan saat mengunduh CV:', error);
  }

}

const dataList2 = [
  {
    kriteria: "Sistematika",
    options: [
      "Yth. Manajer HRD",
      "Kepada Manajer HRD",
      "Kepada Yth. HRD"
    ],
    key: 1,
    question: `Kepada Yth. Manajer HRD`,
    detail: `Pemborosan kata (pleonasme). Kata Kepada dan Yth. memiliki fungsi peruntukan yang sama; cukup gunakan Yth..`
  },
  {
    kriteria: "Sistematika",
    options: [
      "Di kota Jakarta Selatan",
      "Jakarta Selatan",
      "Di Wilayah Jakarta Selatan"
    ],
    key: 2,
    question: `Di Jakarta Selatan`,
    detail: `Kata depan di tidak digunakan di depan nama kota pada alamat surat dinas/pekerjaan karena surat diantar langsung.`
  },
  {
    kriteria: "tanda baca",
    options: [
      "Dengan hormat.",
      "Dengan hormat:",
      "Dengan hormat,"
    ],
    key: 3,
    question: `Dengan hormat;`,
    detail: `Menurut kaidah EYD, salam pembuka surat resmi diakhiri tanda koma (,), bukan titik koma (;).`
  },
  {
    kriteria: "bahasa formal",
    options: [
      "kabar",
      "informasi",
      "warta"
    ],
    key: 2,
    question: `...info lowongan...`,
    detail: `Kata info merupakan ragam lisan/cakapan informal (abreviasi). Surat resmi wajib menggunakan leksikon lengkap: informasi.`
  },
  {
    kriteria: "bahasa formal",
    options: [
      "perusahaan di mana Bapak/Ibu pimpin.",
      "perusahaan yang mana di situ Bapak/Ibu pimpin.",
      "perusahaan yang Bapak/Ibu pimpin."
    ],
    key: 3,
    question: `...yang mana Bapak/Ibu pimpin.`,
    detail: `Frasa yang mana merupakan interferensi struktur bahasa asing (which/where) dan rancu sebagai penghubung klausa relatif.`
  },
  {
    kriteria: "kata tidak baku",
    options: [
      "analisis",
      "analisir",
      "menganalisa"
    ],
    key: 1,
    question: `...bidang analisa data...`,
    detail: `Kata serapan berakhiran -ysis diserap ke dalam bahasa Indonesia baku menjadi -isis (analisis).`
  },
  {
    kriteria: "kata tidak baku",
    options: [
      "merobah",
      "mengubah",
      "mengubahkan"
    ],
    key: 2,
    question: `...guna merubah data...`,
    detail: `Kata dasarnya adalah ubah. Pengimbuhan awalan me- luluh menjadi meng-, membentuk mengubah (bukan dari kata rubah).`
  },
  {
    kriteria: "kata tidak baku",
    options: [
      "efektifitas",
      "efektipitas",
      "efektivitas"
    ],
    key: 3,
    question: `...efektifitas prosedur...`,
    detail: `Kata serapan berakhiran -ity diserap dengan akhiran -itas dan mempertahankan huruf v (efektivitas).`
  },
  {
    kriteria: "bahasa formal",
    options: [
      "Atas perhatian Bapak/Ibu, saya mengucapkan terima kasih.",
      "Atas perhatiannya, saya sampaikan beribu terima kasih.",
      "Atas perhatian daripada Bapak/Ibu, dihaturkan terima kasih."
    ],
    key: 1,
    question: `Atas perhatiannya, saya sampaikan...`,
    detail: `Akhiran -nya mengacu pada orang ketiga. Surat resmi harus menyapa langsung (Bapak/Ibu) dan menggunakan verba formal (mengucapkan).`
  },
  {
    kriteria: "tanda baca",
    options: [
      "(Ahmad Fauzi, S.Kom.)",
      "Ahmad Fauzi, S.Kom.",
      "( Ahmad Fauzi, S.Kom )"
    ],
    key: 2,
    question: `(Ahmad Fauzi, S.Kom.)`,
    detail: `Nama terang penandatangan pada surat dinas/pekerjaan tidak perlu diapit tanda kurung.`
  },
]
const dataAnswer = {
};

function check() {
  const table = document.querySelector("tbody");
  table.innerHTML = "";
  dataList.forEach((e, k) => {
    const el = document.querySelector(`[data-q="${k + 1}"]`);
    el.querySelector(".target-pop").classList.remove("wrong")
    el.querySelector(".target-pop").classList.remove("correct")
    el.querySelector(".target-pop").classList.remove("filled")
    let status;
    if (dataAnswer["q" + (k + 1)])
      status = dataAnswer["q" + (k + 1)].answer == e.key;
    else
      status = false
    if (!status)
      el.querySelector(".target-pop").classList.add("wrong")
    else {
      el.querySelector(".target-pop").classList.add("correct")
    }
    table.innerHTML += `
    <tr>
    <td>${k + 1}</td>
    <td>(${e.kriteria}) <br> ${e.question}</td>
    <td>${(e.options[dataAnswer["q" + (k + 1)]?.answer - 1]) || "(kosong)"}</td>
    <td>${e.options[e.key - 1]} ${status ? " <br> (jawaban benar)" : "<br> (Jawaban salah)"}</td>
    <td>${e.detail}</td>
    </tr>
    `
  })
}