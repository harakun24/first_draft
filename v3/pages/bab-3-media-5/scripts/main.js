const datas = document.querySelector(".group-list");

function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    videoId: "yRtz5F2s7j4",
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
    return goto("pilih")

  document.querySelector(".area." + view)?.classList.add("active");
  store.add("film-state", view);

}

// document.querySelector("[data-jump='vid']").click();
function goto(tag) {
  try {
    fillLatar()
    fillAksi()
  }
  catch {

  }
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

if (!store.get("bab3-poster")) {
  store.set("bab3-poster", {
    digital: {
      count: 0,
      items: null
    },
    cetak: {
      count: 0,
      items: null
    },
  });
} else {
  const saved = store.get("bab3-poster");

  // Restore Checkbox Digital
  if (saved.digital && saved.digital.items) {
    const digitalList = saved.digital.items.split(", ").map(i => i.trim());
    document.querySelectorAll('[data-media="digital"] input[type="checkbox"]').forEach(cb => {
      const val = cb.value || cb.nextElementSibling?.innerText.trim();
      cb.checked = digitalList.includes(val);
    });
  }

  // Restore Checkbox Cetak
  if (saved.cetak && saved.cetak.items) {
    const cetakList = saved.cetak.items.split(", ").map(i => i.trim());
    document.querySelectorAll('[data-media="cetak"] input[type="checkbox"]').forEach(cb => {
      const val = cb.value || cb.nextElementSibling?.innerText.trim();
      cb.checked = cetakList.includes(val);
    });
  }

  // Update Tampilan Angka Counter ke UI
  const digitalEl = document.querySelector('.summary-card .digital, .detail .digital');
  const cetakEl = document.querySelector('.summary-card .cetak, .detail .cetak');

  if (digitalEl) digitalEl.innerText = saved.digital?.count || 0;
  if (cetakEl) cetakEl.innerText = saved.cetak?.count || 0;
}

function choose(event) {
  // 1. Dapatkan elemen input (checkbox) yang memicu event
  const inputEl = event.currentTarget;

  // 2. Cari elemen induk terdekat yang memiliki atribut [data-media]
  const parentMediaGroup = inputEl.closest('[data-media]');
  if (!parentMediaGroup) return;

  // 3. Ambil jenis media dari atribut data-media ('digital' atau 'cetak')
  const mediaType = parentMediaGroup.dataset.media;

  // 4. Hitung jumlah checkbox yang dicentang berdasarkan grup media masing-masing
  const digitalCount = document.querySelectorAll('[data-media="digital"] input[type="checkbox"]:checked').length;
  const cetakCount = document.querySelectorAll('[data-media="cetak"] input[type="checkbox"]:checked').length;

  // 5. Update tampilan angka ke elemen .digital dan .cetak
  const digitalOutput = document.querySelector('.summary-card .digital, .detail .digital');
  const cetakOutput = document.querySelector('.summary-card .cetak, .detail .cetak');

  if (digitalOutput) digitalOutput.innerText = digitalCount;
  if (cetakOutput) cetakOutput.innerText = cetakCount;

  // 6. Kumpulkan detail daftar item yang dipilih untuk disimpan di store
  const selectedDigital = Array.from(document.querySelectorAll('[data-media="digital"] input[type="checkbox"]:checked'))
    .map(cb => cb.value || cb.nextElementSibling?.innerText.trim()).join(", ");

  const selectedCetak = Array.from(document.querySelectorAll('[data-media="cetak"] input[type="checkbox"]:checked'))
    .map(cb => cb.value || cb.nextElementSibling?.innerText.trim()).join(", ");

  // 7. Simpan objek ringkasan ke store ("bab3-poster")
  const posterData = {
    digital: {
      count: digitalCount,
      items: selectedDigital
    },
    cetak: {
      count: cetakCount,
      items: selectedCetak
    },
  };

  // Menggunakan helper store.set jika pustaka store tersedia, atau fallback ke localStorage biasa
  store.set("bab3-poster", posterData);
}

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