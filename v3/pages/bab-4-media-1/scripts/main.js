const datas = document.querySelector(".group-list");

function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    videoId: "_oNJRCB5kxY",
    width: "100%",
    height: "100%",
  });
}


function jumpSegmen(e) {

  document.querySelector(".segmen.active")?.classList.remove("active");
  const view = e.currentTarget.dataset.jump;
  try {

    player.pauseVideo()
  } catch {

  }
  e.currentTarget.classList.add("active");
  document.querySelector(".area.active")?.classList.remove("active");

  if (view == "video" && !store.get("bab3-pilihan"))
    return goto("pilih");

  else if (view === 'rencana') {
    const MIN_EXPLORE_REQUIRED = 3;
    console.log("hi")
    const exploredCount = typeof exploredRegions !== 'undefined' ? exploredRegions.size : 0;

    if (exploredCount < MIN_EXPLORE_REQUIRED) {
      alert(`Misi belum selesai! Anda baru menjelajahi ${exploredCount} dari ${MIN_EXPLORE_REQUIRED} wilayah minimal. Silakan jelajahi pulau lainnya terlebih dahulu.`);

      return goto("peta-budaya");
    }
  }

  document.querySelector(".area." + view)?.classList.add("active");
  store.add("film-state", view);

}

// document.querySelector("[data-jump='vid']").click();
function goto(tag) {


  document.querySelector(`[data-jump='${tag}']`).click();
}
// here
// here
// here
// here
// here
// here
// here
// here
// here
// here
// here
goto("video");
// here
// here
// here
// here
// here
// here
// here
// here
// here
const modal = document.querySelector(".modal");

// modal.showPopover();
// store.clean();

async function savePdf() {

  // const { jsPDF } = window.jspdf;
  // const el = document.querySelector(".table");
  // try {

  //   const canvas = await html2canvas(el, {
  //     scale: 2,
  //     useCORS: true
  //   });
  //   const imgData = canvas.toDataURL('image/png');

  //   let pdfWidth = 210;
  //   let pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  //   const pdf = new jsPDF({ orientation: 'p', unit: 'mm', format: [pdfWidth, pdfHeight] });


  //   pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  //   const kelompok = store.get("bab3-persiapan").nama;
  //   const kelas = store.get("bab3-persiapan").kelas;
  //   pdf.save(`laporan kelompok ${kelompok} kelas ${kelas}.pdf`);

  // } catch (error) {
  //   console.error('Terjadi kesalahan saat mengunduh:', error);
  // }

  const nama = document.querySelector("[data-label='nama']").querySelector("input").value || "Belum Diisi";
  const kelas = document.querySelector("[data-label='kelas']").querySelector("input").value || "Belum Diisi";
  const tanggal = getDate();

  document.querySelector(".table .nama").textContent = nama;
  document.querySelector(".table .kelas").textContent = kelas;
  document.querySelector(".table .date-txt").textContent = tanggal;

  const dataLatar = store.get("bab3-latar");
  const dataAksi = store.get("bab3-aksi");

  document.querySelector(".table [data-table='naskah']").innerHTML = `
  <tr>
  <td>

   <div class="script-output">
                  <strong class="">${dataLatar.nama.toUpperCase()}</strong>
                  <p class="">
                    (${dataLatar.kramagung})
                  </p>
                </div>
<br/>
 <div class="script-output">
                  <strong class="section-tag">${dataAksi.nama.toUpperCase()}</strong>
                  <p class="">
                    (${dataAksi.aksi})
                  </p>
                  <strong>"${dataAksi.dialog}"</strong>
                </div>
  </td>
  </tr>
  `

  printPage()

}

// store.clean()


/**
 * Memuat data form ekspor dan store ("bab3-poster") ke dalam template tabel dokumen
 */
function savePdf() {
  // 1. Ambil input dari form identitas kelompok di .area.ekspor
  const namaKelompok = document.getElementById("nama-kelompok")?.value.trim() || "-";
  const kelas = document.getElementById("kelas-kelompok")?.value.trim() || "-";
  const judulDrama = document.getElementById("judul-drama")?.value.trim() || "-";

  // Tanggal Cetak Hari Ini (Format DD/MM/YYYY)
  const today = new Date();
  const dateFormatted = today.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });

  // 2. Isi Metadata Identitas ke Lembar Laporan
  const docNama = document.querySelector(".report-document .value.nama");
  const docKelas = document.querySelector(".report-document .value.kelas");
  const docJudul = document.querySelector(".report-document .value.judul");
  const docDate = document.querySelector(".report-document .value.date-txt");

  if (docNama) docNama.innerText = namaKelompok;
  if (docKelas) docKelas.innerText = kelas;
  if (docJudul) docJudul.innerText = judulDrama;
  if (docDate) docDate.innerText = dateFormatted;

  // 3. Ambil data pilihan dari store ("bab3-poster")
  const posterData = store.get("bab3-poster") || {};

  // Parse items jika tersimpan dalam bentuk string .join(", ") atau array
  const parseItems = (items) => {
    if (!items) return [];
    if (typeof items === "string") return items.split(", ").map(i => i.trim()).filter(Boolean);
    return Array.isArray(items) ? items : [];
  };

  const digitalItems = parseItems(posterData.digital?.items);
  const cetakItems = parseItems(posterData.cetak?.items);

  // Helper render badge item
  const renderBadges = (items) => {
    if (items.length === 0) return '<span class="empty-text">Tidak ada saluran yang dipilih</span>';
    return `<div class="badge-list">${items.map(item => `<span class="badge-tag">${item}</span>`).join("")}</div>`;
  };

  // 4. Masukkan data ke tbody[data-table="naskah"]
  const tbody = document.querySelector('.report-document [data-table="naskah"]');
  if (!tbody) return;

  tbody.innerHTML = `
    <tr>
      <td>
        <div class="media-summary-box">
          <div class="media-row">
            <strong>Saluran Digital (${posterData.digital?.count || digitalItems.length}):</strong>
            ${renderBadges(digitalItems)}
          </div>
          <div class="media-row">
            <strong>Saluran Cetak/Fisik (${posterData.cetak?.count || cetakItems.length}):</strong>
            ${renderBadges(cetakItems)}
          </div>
        </div>
      </td>
    </tr>
  `;
  printPage()
}

/**
 * Pemicu utama saat tombol ekspor/simpan diklik
 */

// Database Konten Peta Budaya
const budayaData = {
  sumatra: {
    region: "SUMATRA · ACEH",
    title: "Meugang",
    fakta: "Tradisi memasak daging dan menikmatinya bersama keluarga, kerabat, dan yatim piatu menjelang Ramadan, Idulfitri, dan Iduladha di Aceh.",
    pemantikBold: "Nilai kebersamaan dan sedekah dalam tradisi Meugang bisa dikemas menjadi feature human interest.",
    pemantikDesc: "Siapa tokoh yang bisa diwawancarai untuk menonjolkan empati sosial ini?"
  },
  jawa: {
    region: "JAWA · SURAKARTA",
    title: "Grebeg Sudiro",
    fakta: "Perpaduan harmonis antara tradisi Imlek dan budaya Jawa di Kota Surakarta yang menjadi simbol nyata spirit keharmonisan dalam kebinekaan.",
    pemantikBold: "Fakta unik ini dapat menjadi modal untuk menentukan sudut cerita feature.",
    pemantikDesc: "Bagian mana yang paling menarik untuk digali?"
  },
  kalimantan: {
    region: "KALIMANTAN · DAYAK",
    title: "Tari Hornbill",
    fakta: "Tarian sakral yang melambangkan burung Enggang, simbol dunia atas dan kepemimpinan dalam mitologi suku Dayak.",
    pemantikBold: "Visualisasi kostum dan makna filosofis gerakannya sangat kaya.",
    pemantikDesc: "Bagaimana cara mendeskripsikan aura magis tarian ini ke dalam teks?"
  },
  sulawesi: {
    region: "SULAWESI · TORAJA",
    title: "Rambu Solo'",
    fakta: "Upacara pemakaman adat Toraja yang megah untuk mengantarkan roh leluhur kembali ke keabadian (Puya).",
    pemantikBold: "Skala upacara dan nilai pengorbanan material memiliki dimensi sosiologis yang kuat.",
    pemantikDesc: "Fokus pada persiapan bertahun-tahun atau nilai gotong royongnya?"
  },
  bali: {
    region: "BALI & NUSA TENGGARA",
    title: "Perang Topat",
    fakta: "Tradisi saling lempar ketupat antara umat Islam dan Hindu di Lombok sebagai wujud rasa syukur atas hasil panen.",
    pemantikBold: "Toleransi antar-agama yang dirayakan lewat 'perang' adalah oksimoron yang menarik.",
    pemantikDesc: "Lead (pembuka) feature seperti apa yang bisa memancing rasa penasaran pembaca?"
  },
  papua: {
    region: "MALUKU & PAPUA",
    title: "Bakar Batu",
    fakta: "Tradisi memasak bersama menggunakan batu panas sebagai bentuk rasa syukur, perdamaian, atau menyambut tamu penting.",
    pemantikBold: "Prosesi kolektif pembagian tugas mencerminkan kesetaraan gender prasejarah.",
    pemantikDesc: "Apakah peran laki-laki penyiap batu dan perempuan penata daun bisa jadi fokus cerita?"
  }
};

// State Manager
let exploredRegions = new Set();
let currentRegion = null;
const MIN_EXPLORE_REQUIRED = 3;

// Fungsi Membuka Modal
function openBudaya(regionId) {
  const data = budayaData[regionId];
  if (!data) return;

  currentRegion = regionId;

  // Isi data ke dalam modal
  document.getElementById('modal-region').innerText = data.region;
  document.getElementById('modal-title').innerText = data.title;
  document.getElementById('modal-fakta').innerText = data.fakta;
  document.getElementById('modal-pemantik-bold').innerText = data.pemantikBold;
  document.getElementById('modal-pemantik-desc').innerText = data.pemantikDesc;

  // Tampilkan Modal
  document.getElementById('modal-budaya').showPopover();
}

// Fungsi Menutup Modal
function closeBudaya() {
  document.getElementById('modal-budaya').hidePopover();
  currentRegion = null;
}

// Fungsi Saat User Menekan "Tandai Sudah Dipelajari"
function markAsLearned() {
  if (currentRegion) {
    exploredRegions.add(currentRegion);
    updateProgressUI();
  }
  closeBudaya();
}

// Fungsi Mengupdate Tampilan Bar Progres di Sidebar
function updateProgressUI() {
  const count = exploredRegions.size;
  const progressText = document.getElementById('progress-count');
  const btnLanjut = document.getElementById('btn-lanjut-peta');

  // Update Teks (Capping display limit at 3 for the requirement UI, or show total)
  const displayCount = count > MIN_EXPLORE_REQUIRED ? MIN_EXPLORE_REQUIRED : count;
  progressText.innerText = `${displayCount}/${MIN_EXPLORE_REQUIRED}`;

  // Update Visual Bars
  for (let i = 1; i <= MIN_EXPLORE_REQUIRED; i++) {
    const bar = document.getElementById(`bar-${i}`);
    if (i <= count) {
      bar.classList.add('done');
    }
  }

  // Buka Kunci Tombol Lanjut jika terpenuhi
  if (count >= MIN_EXPLORE_REQUIRED) {
    btnLanjut.disabled = false;
    btnLanjut.classList.remove('disabled');
  }
}