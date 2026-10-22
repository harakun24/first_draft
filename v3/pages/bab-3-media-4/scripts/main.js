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
goto("aksi");
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

if (!store.get("bab3-latar"))
  store.set("bab3-latar", { nama: "", kramagung: "" });
if (!store.get("bab3-aksi"))
  store.set("bab3-aksi", { nama: "", aksi: "", dialog: "" });


function fillLatar() {
  const nama = document.querySelector("[data-latar='nama']").querySelector("input").value;
  const kramagung = document.querySelector("[data-latar='kramagung']").querySelector("textarea").value;
  document.querySelector(".txtPrev.latar").innerHTML = `
  <b>[${nama}]</b> <br/>
  <span>
  (${kramagung})
  </span>
  `;
  store.set("bab3-latar", {
    nama, kramagung
  });
}
function fillAksi() {
  const nama = document.querySelector("[data-aksi='nama']").querySelector("input").value;
  const aksi = document.querySelector("[data-aksi='aksi']").querySelector("textarea").value;
  const dialog = document.querySelector("[data-aksi='dialog']").querySelector("textarea").value;
  document.querySelector(".txtPrev.aksi").innerHTML = `
  <b>[${nama}]</b> <br/>
  <span>
  (${aksi})
  </span>
  <br/>
  <br/>
  <b>"${dialog}"</b>
  `;
  store.set("bab3-aksi", {
    nama, aksi, dialog
  });
}