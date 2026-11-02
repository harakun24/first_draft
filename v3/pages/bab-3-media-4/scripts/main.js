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