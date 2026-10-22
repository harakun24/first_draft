let progres = new Set();
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

  if (view == "video" && !store.get("bab3-pilihan"))
    return goto("pilih")

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
goto("pilih");
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
    const kelompok = store.get("bab3-persiapan").nama;
    const kelas = store.get("bab3-persiapan").kelas;
    pdf.save(`laporan kelompok ${kelompok} kelas ${kelas}.pdf`);

  } catch (error) {
    console.error('Terjadi kesalahan saat mengunduh:', error);
  }
}

store.clean()

if (!store.get("bab3-naskah"))
  store.set("bab3-naskah", 1);

const arrNaskah = [
  "Meunasah", "Mati Sunyi"
];

function setNaskah(val) {
  store.set("bab3-naskah", val);
  console.log(arrNaskah[store.get("bab3-naskah") - 1]);
  goto("eksplor")
}

function openModal(val) {
  document.querySelector(`.modal.${val}`).showPopover();
  progres.add(val)
  document.querySelector(".progres .child").style.width = `${progres.size * 25}%`;
  document.querySelector(".num").textContent = progres.size
}