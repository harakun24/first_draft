
// function onYouTubeIframeAPIReady() {
//   player = new YT.Player("player", {
//     videoId: "t3pjBPl0T9k",
//     width: "100%",
//     height: "100%",
//   });
// }

const datas = document.querySelector(".group-list");

function jumpSegmen(e) {

  document.querySelector(".segmen.active")?.classList.remove("active");
  const view = e.currentTarget.dataset.jump;
  try {

    player.pauseVideo()
  } catch {

  }
  e.currentTarget.classList.add("active");
  document.querySelector(".area.active")?.classList.remove("active");

  if (view == "pratinjau")
    refreshList();
  else if (view == "storyboard")
    refreshList();

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
goto("amati");
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

async function savePdf() {

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

    pdf.save('laporan bab 3 media 1.pdf');

  } catch (error) {
    console.error('Terjadi kesalahan saat mengunduh:', error);
  }
}

const wrapper = document.querySelector(".box-wrapper");
const btnSlide = wrapper.querySelector(".pointer");
let isDrag = false;

function updateSplit(x) {
  const rec = wrapper.getBoundingClientRect();
  const offside = x - rec.left;
  const p = Math.max(0, Math.min(100, (offside / rec.width) * 100));
  wrapper.style.setProperty("--split", `${p}%`);
}

btnSlide.addEventListener("pointerdown", e => {
  isDrag = true;
  btnSlide.setPointerCapture(e.pointerId);
})

btnSlide.addEventListener("pointerup", e => {
  isDrag = false;
  btnSlide.releasePointerCapture(e.pointerId);
})

btnSlide.addEventListener("pointermove", e => {
  if (!isDrag) return;
  updateSplit(e.clientX);
})

if (!store.get("bab3-refleksi"))
  store.set("bab3-refleksi", { naskah: "", pentas: "" });
else {
  const dataR = store.get("bab3-refleksi");

  const naskah = document.querySelector("[data-refleksi='naskah']");
  const pentas = document.querySelector("[data-refleksi='pentas']");
  naskah.querySelector("textarea").value = dataR.naskah;
  pentas.querySelector("textarea").value = dataR.pentas;

}
if (!store.get("bab3-ingat"))
  store.set("bab3-ingat", { pentas: "", baca: "", analisis: "", karakteristik: "" });
else {
  const dataR = store.get("bab3-ingat");

  const pentas = document.querySelector("[data-ingat='pentas']");
  const baca = document.querySelector("[data-ingat='baca']");
  const analisis = document.querySelector("[data-ingat='analisis']");
  const karakteristik = document.querySelector("[data-ingat='karakteristik']");
  pentas.querySelector("textarea").value = dataR.pentas;
  baca.querySelector("textarea").value = dataR.baca;
  analisis.querySelector("textarea").value = dataR.analisis;
  karakteristik.querySelector("textarea").value = dataR.karakteristik;

}

function saveRefleksi() {
  const dataNaskah = document.querySelector("[data-refleksi='naskah']").querySelector("textarea").value;
  const dataPentas = document.querySelector("[data-refleksi='pentas']").querySelector("textarea").value;
  store.set("bab3-refleksi", { naskah: dataNaskah, pentas: dataPentas });
  goto("ingat")
}
function saveIngat() {
  const dataPentas = document.querySelector("[data-ingat='pentas']").querySelector("textarea").value;
  const dataBaca = document.querySelector("[data-ingat='baca']").querySelector("textarea").value;
  const dataAnalisis = document.querySelector("[data-ingat='analisis']").querySelector("textarea").value;
  const dataKarakteristik = document.querySelector("[data-ingat='karakteristik']").querySelector("textarea").value;
  store.set("bab3-ingat", { pentas: dataPentas, baca: dataBaca, analisis: dataAnalisis, karakteristik: dataKarakteristik });

  const refleksi = store.get("bab3-refleksi");

  const tableRefleksi = document.querySelector("[data-table='refleksi']");
  const tableIngat = document.querySelector("[data-table='ingat']");
  tableRefleksi.innerHTML = "";
  tableIngat.innerHTML = "";

  Object.entries(refleksi).forEach(el => {
    const title = el[0] == "naskah" ? "Membaca Naskah" : "Menonton Pentas";
    tableRefleksi.insertAdjacentHTML("beforeend", `
    <tr>
    <td>${title}</td>
    <td>${el[1]}</td>
    </tr>
    `);
  })
  Object.entries(store.get("bab3-ingat")).forEach(el => {
    const title = el[0] == "pentas" ? "Menyimak Pentas" : el[0] == "baca" ? "Membaca Naskah" : el[0] == "analisis" ? "Analisis Adaptasi" : "Karakteristik Tokoh";

    tableIngat.insertAdjacentHTML("beforeend", `
    <tr>
    <td>${title}</td>
    <td>${el[1]}</td>
    </tr>
    `);

  })

  savePdf();
}