
function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    videoId: "t3pjBPl0T9k",
    width: "100%",
    height: "100%",
  });
}

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
  document.querySelector(".area." + view).classList.add("active");
  store.add("film-state", view);

}


// document.querySelector("[data-jump='vid']").click();
function goto(tag) {
  document.querySelector(`[data-jump='${tag}']`).click();
}
goto("video");
const modal = document.querySelector(".modal");
// modal.showPopover();

function saveKlasifikasi() {
  const card = Array.from(document.querySelectorAll(".card")).map(el => {
    const result = {

    };
    result.key = el.dataset.card;
    result.val = el.querySelector("textarea").value
    return result;
  }).filter(e => e.val != "" && e.val != undefined);
  const data = store.get("klasifikasi");
  if (card.length) {
    card.forEach(c => {
      data[c.key] = c.val;
    })
  }
  store.set("klasifikasi", data);
  goto("ulasan")
}
function saveUlasan() {
  const card = Array.from(document.querySelectorAll("[data-film]")).map(el => {
    const result = {

    };
    result.key = el.dataset.film;
    result.val = el.querySelector("textarea")?.value || el.querySelector("input")?.value;
    return result;
  }).filter(e => e.val != "" && e.val != undefined);
  const data = store.get("ulasan");
  if (card.length) {
    card.forEach(c => {
      data[c.key] = c.val;
    })
  }
  store.set("ulasan", data);
  console.log(store.get("ulasan"))
  goto("diagram")
}
function saveDiagram() {
  const card = Array.from(document.querySelectorAll("[data-diagram]")).map(el => {
    const result = {

    };
    result.key = el.dataset.diagram;
    result.val = el.querySelector("textarea").value
    return result;
  }).filter(e => e.val != "" && e.val != undefined);
  const data = store.get("diagram");
  if (card.length) {
    card.forEach(c => {
      data[c.key] = c.val;
    })
  }
  store.set("diagram", data);
  console.log(store.get("diagram"));
  const infoKlasifikasi = document.querySelector("[data-table='klasifikasi']");
  const infoUlasan = document.querySelector("[data-table='ulasan']");
  const infoDiagram = document.querySelector("[data-table='diagram']");

  infoKlasifikasi.innerHTML = "";
  infoUlasan.innerHTML = "";
  infoDiagram.innerHTML = "";
  const dataKlasifikasi = store.get("klasifikasi");
  const dataUlasan = store.get("ulasan");
  console.log({ dataKlasifikasi, dataUlasan })

  Object.entries(dataKlasifikasi).forEach(el => {
    infoKlasifikasi.innerHTML += `
    <tr>
    <td>${el[0]}</td>
    <td>${el[1]}</td>
    </tr>
    `;
  })
  Object.entries(dataUlasan).forEach(el => {
    infoUlasan.innerHTML += `
    <tr>
    <td>${el[0]}</td>
    <td>${el[1]}</td>
    </tr>
    `;
  })
  Object.entries(data).forEach(el => {
    infoDiagram.innerHTML += `
    <tr>
    <td>${el[0]}</td>
    <td>${el[1]}</td>
    </tr>
    `;
  })
  savePdf().then(() => alert("terunduh"))
}
// store.clean();
if (!store.get("klasifikasi"))
  store.set("klasifikasi", { visual: '', cerita: '', pesan: '' });
else {
  const data = store.get("klasifikasi");
  document.querySelectorAll(".card").forEach(el => {
    const key = el.dataset.card;
    el.querySelector("textarea").value = data[key];
  })
}
if (!store.get("ulasan"))
  store.set("ulasan", { judul: '', tokoh: '', pesan: '' });
else {
  const data2 = store.get("ulasan");
  document.querySelectorAll(".form .input-group").forEach(el => {
    const key = el.dataset.film;
    try {

      el.querySelector("textarea").value = data2[key];
    } catch {
      el.querySelector("input").value = data2[key];
    }
  })
}
if (!store.get("diagram"))
  store.set("diagram", { eksposisi: '', konflik: '', klimaks: '', resolusi: '' });
else {
  const data3 = store.get("diagram");
  document.querySelectorAll("[data-diagram]").forEach(el => {
    const key = el.dataset.diagram;
    el.querySelector("textarea").value = data3[key];
  })
}

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

    pdf.save('laporan bab 2 media 2.pdf');

  } catch (error) {
    console.error('Terjadi kesalahan saat mengunduh:', error);
  }
}