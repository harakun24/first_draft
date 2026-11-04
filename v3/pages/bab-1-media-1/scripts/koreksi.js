const dataList = [
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
document.querySelectorAll(".spoiler").forEach((e, i) => {
  const data = dataList[e.dataset.q - 1];

  e.insertAdjacentHTML("beforeend", `
  <div class="pop" popover>

  <!-- Header -->
  <div class="pop-header">
    <b>Pilih Jawaban</b>
    <p>Pilih salah satu jawaban yang menurutmu paling tepat.</p>
  </div>

  <!-- Pilihan (Bagian ini dirapatkan dan diberi trim() untuk membunuh spasi gaib) -->
  <div class="pop-options">
  <label class="input-group" for="choice-1-${i}">
  <input type="radio" name="choice" id="choice-1-${i}" value="1" />
  <span class="option-text">${data.options[0].trim()}</span>
  </label>
  <label class="input-group" for="choice-2-${i}">
  <input type="radio" name="choice" id="choice-2-${i}" value="2" />
  <span class="option-text">${data.options[1].trim()}</span>
  </label>
  <label class="input-group" for="choice-3-${i}">
  <input type="radio" name="choice" id="choice-3-${i}" value="3" />
  <span class="option-text">${data.options[2].trim()}</span>
  </label>
  </div>

  <!-- Tombol Simpan -->
  <div class="pop-footer">
    <button type="button" class="btn-save">
      Simpan
      <div data-icon="../../public/feather/save.svg"></div>
    </button>
  </div>

</div>
  `)

  const pop = e.querySelector(".pop");

  pop.addEventListener("toggle", (event) => {
    if (event.newState == "closed") {
      e.querySelector("span").classList.add("filled")
      e.querySelector("span").classList.remove("active")
    }

  })
  e.addEventListener("click", () => {
    e.querySelector("span").classList.remove("filled")
    e.querySelector("span").classList.remove("wrong")
    e.querySelector("span").classList.add("active")
    pop.showPopover()
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

function check() {
  const table = document.querySelector(".bottom tbody");
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

if (store.get("video-quiz")) {
  const strTable = store.get("video-quiz").map((a, index) => `
      <tr>
  <td>${index + 1}</td>
  <td>${a.title}</td>
  <td>${a.question}</td>
  <td>${a.answer}</td>
  <td>${a.correct}</td>
  <td>${a.status == "true" ? "Benar" : "Salah"}</td>
  </tr>
      `).join("");
  document.querySelector(".top tbody").innerHTML = strTable;
}

async function saveResult() {
  check();
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

  //   pdf.save('laporan bab 1 media 1.pdf');

  // } catch (error) {
  //   console.error('Terjadi kesalahan saat mengunduh:', error);
  // }

  const nama = document.querySelector("#input-nama").value || "Belum Diisi";
  const kelas = document.querySelector("#input-kelas").value || "Belum Diisi";
  document.querySelector(".value.nama").textContent = nama
  document.querySelector(".value.kelas").textContent = kelas
  document.querySelector(".date-txt").textContent = getDate();

  printPage();
}