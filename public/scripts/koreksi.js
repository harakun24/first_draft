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
document.querySelectorAll(".spoiler").forEach(e => {
  const data = dataList[e.dataset.q - 1];

  e.innerHTML += `
   <div class="pop" popover="auto">
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
  e.querySelectorAll(".input-group").forEach(ee => {
    ee.addEventListener("click", (event) => {
      event.stopPropagation()
      ee.querySelector("input").click()
    })
  })
  e.querySelector(".btn-save").addEventListener("click", (event) => {
    event.stopPropagation()
    const val = e.querySelector('input[name="choice"]:checked')?.value || 0;
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
    <td>(${e.kriteria}) ${e.question}</td>
    <td>${(e.options[dataAnswer["q" + (k + 1)]?.answer - 1]) || "(kosong)"}</td>
    <td>${e.options[e.key - 1]} ${status ? " (jawaban benar)" : " (Jawaban salah)"}</td>
    <td>${e.detail}</td>
    </tr>
    `
  })
}

async function saveResult() {
  const { jsPDF } = window.jspdf;
  const el = document.querySelector(".table");
  try {

    const canvas = await html2canvas(el, {
      scale: 2,
      useCORS: true
    });
    const imgData = canvas.toDataURL('image/png');

    let pdfWidth = 210;
    let pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    const pdf = new jsPDF({ orientation: 'p', unit: 'mm', format: [pdfWidth, pdfHeight] });


    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

    pdf.save('hasil-koreksi.pdf');

  } catch (error) {
    console.error('Terjadi kesalahan saat mengunduh CV:', error);
  }
}