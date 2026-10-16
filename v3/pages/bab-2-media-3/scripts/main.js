
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

  if (view == "pratinjau")
    refreshList();
  else if (view == "storyboard")
    refreshList();

  document.querySelector(".area." + view)?.classList.add("active");
  store.add("film-state", view);

}

function refreshList() {
  const data = store.get("daftar-adegan");
  const parent = document.querySelector(".group-wrapper");
  parent.innerHTML = "";
  if (data.length == 0) {
    parent.innerHTML += "<p>data kosong. isi adegan di menu storyboard lebih dulu.</p>"
  }
  document.querySelector(".shots .list").innerHTML = "";
  data.forEach((item, key) => {
    addShot(false);
    parent.insertAdjacentHTML("beforeend", `
                      <div class="group-data" data-key="${key}">
                  <div class="img" style="background-image:url(${item.gambar || ""})"></div>
                  <h4>Adegan ${key + 1} (${(item.param.ukuran == "null") || (item.param.ukuran == null) ? "belum memilih ukuran" : item.param.ukuran == 1 ? "ELS" : item.param.ukuran == 2 ? "LS" : item.param.ukuran == 3 ? "MS" : item.param.ukuran == 4 ? "CU" : "?"})</h4>
                  <p>${item.param.durasi ? item.param.durasi + " detik" : "belum mengisi durasi"}</p>
                  <div class="ctrl">
                    <button class="pointer" onclick="listUp(event)">
                      <div data-icon="../../public/feather/arrow-up.svg"></div>
                    </button>
                    <button class="pointer" onclick="listDown(event)">
                      <div
                        data-icon="../../public/feather/arrow-down.svg"></div>
                    </button>
                    <button class="pointer" onclick="listRem(event)">
                      <div data-icon="../../public/feather/trash.svg"></div>
                    </button>
                  </div>
                </div>
      `);
  });
  const y = store.get("fondasi");
  document.querySelector("[data-text='judul']").textContent = y.judul;
  document.querySelector("[data-text='jumlah']").textContent = data.length;
  const totalDurasi = data.map(e => e.param.durasi).reduce((a, v) => {
    if (v == null || v == "" || v == undefined || v == "null")
      return a;
    const n = Number(v);
    return a + (isNaN(n) ? 0 : n);
  }, 0);
  document.querySelector("[data-text='durasi']").textContent = totalDurasi + " detik";

}

function listUp(e) {
  const key = e.currentTarget.parentElement.parentElement.dataset.key;
  const data = store.get("daftar-adegan");
  if (key > 0) {
    [data[key - 1], data[key]] = [data[key], data[key - 1]];
    store.set("daftar-adegan", data);
    refreshList();
  }
}
function listDown(e) {
  const key = e.currentTarget.parentElement.parentElement.dataset.key - 0;
  const data = store.get("daftar-adegan");
  if (key < data.length - 1) {
    [data[key + 1], data[key]] = [data[key], data[key + 1]];
    store.set("daftar-adegan", data);
    refreshList();
  }
}

function listRem(e) {
  const key = e.currentTarget.parentElement.parentElement.dataset.key;
  const data = store.get("daftar-adegan");
  data.splice(key, 1);
  store.set("daftar-adegan", data);
  refreshList();

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
goto("pratinjau");
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

function saveFondasi() {
  // const txtJudul = document.querySelector("[data-fondasi='judul']").children[1].value;
  // const txtTema = document.querySelector("[data-fondasi='tema']").children[1].value;
  // const txtLatar = document.querySelector("[data-fondasi='latar']").children[1].value;
  // const txtTokoh = document.querySelector("[data-fondasi='tokoh']").children[1].value;
  // const txtSinopsis = document.querySelector("[data-fondasi='sinopsis']").children[1].value;
  const data = store.get("fondasi");
  document.querySelectorAll("[data-fondasi]").forEach(el => {
    const key = el.dataset.fondasi;
    const val = el.children[1].value;

    data[key] = val;
  });
  store.set("fondasi", data);
  goto("storyboard");
  console.log({ log: store.get("fondasi") })

}
// modal.showPopover();
// store.clean();
if (!store.get("fondasi"))
  store.set("fondasi", { judul: "", tema: "", latar: "", tokoh: "", sinopsis: "" })
if (!store.get("daftar-adegan"))
  store.set("daftar-adegan", []);
else {
  const data = store.get("daftar-adegan");
  data.forEach(item => {
    addShot(false);
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

    pdf.save('laporan bab 2 media 5.pdf');

  } catch (error) {
    console.error('Terjadi kesalahan saat mengunduh:', error);
  }
}

function addShot(e = true) {
  const daftar = document.querySelectorAll(".shot") || 0;
  // const daftar = store.get("daftar-adegan");
  document.querySelector(".shots .list").insertAdjacentHTML("beforeend", `
  <div class="shot pointer" data-key="${daftar.length + 1}" onclick="setShot(event)">
                  <div data-icon="../../public/feather/camera.svg"></div>
                  <b>shot ${daftar.length + 1}</b>
                </div>
  `);
  const data = store.get("daftar-adegan");
  if (e)
    data.push({
      gambar: null,
      param: {
        kamera: null,
        ukuran: null,
        pergerakan: null,
        durasi: null,
        dialog: null,
      }
    })
  store.set("daftar-adegan", data);
}

function setShot(e) {
  document.querySelector(".shot.active")?.classList.remove("active");
  e.currentTarget.classList.add("active");
  const shot = store.get("daftar-adegan")[e.currentTarget.dataset.key - 1];
  document.querySelector("[data-img]").style.backgroundImage = `url(${shot.gambar})`;
  document.querySelector("[data-img]").setAttribute("data-img", shot.gambar);
  document.querySelectorAll(".parameter .active").forEach(el => el.classList.remove("active"));

  const fieldKamera = document.querySelector("[data-label='kamera']");
  const fieldUkuran = document.querySelector("[data-label='ukuran']");
  const fieldPergerakan = document.querySelector("[data-label='pergerakan']");
  const fieldDurasi = document.querySelector("[data-label='durasi']");
  const fieldDialog = document.querySelector("[data-label='dialog']");

  fieldKamera.setAttribute("data-state", shot.param.kamera);
  fieldUkuran.setAttribute("data-state", shot.param.ukuran);
  fieldPergerakan.setAttribute("data-state", shot.param.pergerakan);
  fieldDurasi.querySelector("input").value = shot.param.durasi;
  fieldDialog.querySelector("textarea").value = shot.param.dialog;

  fieldKamera.querySelector(".active")?.classList.remove("active");
  fieldUkuran.querySelector(".active")?.classList.remove("active");
  fieldPergerakan.querySelector(".active")?.classList.remove("active");

  fieldKamera.querySelector(`[data-value='${fieldKamera.dataset.state}']`)?.classList.add("active");
  fieldUkuran.querySelector(`[data-value='${fieldUkuran.dataset.state}']`)?.classList.add("active");
  fieldPergerakan.querySelector(`[data-value='${fieldPergerakan.dataset.state}']`)?.classList.add("active");

}

function validateNum(e) {
  e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, "");
}

function uploadImg(e) {
  e.currentTarget.parentElement.querySelector("[name='hide']").click();
}

function procImg(file) {
  return new Promise(res => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = e => {
      const b64 = e.target.result;
      res(b64)
    }
  })
}

async function saveImg(e) {
  const file = e.currentTarget.files[0];
  if (!file) return;
  const data = await procImg(file);

  const el = document.querySelector("[data-img]");
  el.setAttribute("data-img", data);
  el.style.backgroundImage = `url(${data})`;

}

function removeImg(e) {
  e.currentTarget.parentElement.style.backgroundImage = "";
  e.currentTarget.parentElement.setAttribute("data-img", "");

}

function chooseItem(e) {
  const data = e.currentTarget.dataset.value;
  if (!data) return;

  e.currentTarget.parentElement.setAttribute("data-state", data);
  e.currentTarget.parentElement.querySelector(".pointer.active")?.classList.remove("active");
  e.currentTarget.classList.add("active");

}

function saveShot() {
  const key = document.querySelector(".shot.active")?.dataset.key;
  if (!key) return;
  const dataImg = document.querySelector("[data-img]").dataset.img;
  const dataParam = {
    kamera: document.querySelector("[data-label='kamera']").dataset.state,
    ukuran: document.querySelector("[data-label='ukuran']").dataset.state,
    pergerakan: document.querySelector("[data-label='pergerakan']").dataset.state,
    durasi: document.querySelector("[data-label='durasi']").querySelector("input").value,
    dialog: document.querySelector("[data-label='dialog']").querySelector("textarea").value,
  }
  const data = store.get("daftar-adegan");
  data[key - 1] = {
    gambar: dataImg,
    param: dataParam
  };
  store.set("daftar-adegan", data);
  console.log(store.get("daftar-adegan"));
}

function save() {
  const fondasi = document.querySelector("[data-table='fondasi']");
  const storyboard = document.querySelector("[data-table='storyboard']");
  fondasi.innerHTML = "";
  storyboard.innerHTML = "";
  const dataCerita = store.get("fondasi");
  const dataAdegan = store.get("daftar-adegan");
  Object.entries(dataCerita).forEach((el) => {
    fondasi.insertAdjacentHTML("beforeend", `
    <tr>
    <th>${el[0] == "judul" ? "Judul Cerita" : el[0] == "tema" ? "Tema Utama" : el[0] == "latar" ? "Latar Tempat dan Waktu" : el[0] == "tokoh" ? "Tokoh Utama" : el[0] == "sinopsis" ? "Sinopsis Cerita" : ""}</th>
    <td>${el[1]}</td>
    </tr>
    `);
  });
  dataAdegan.forEach((el, key) => {
    console.log({ el })
    let kamera = el.param.kamera;
    let ukuran = el.param.ukuran;
    let pergerakan = el.param.pergerakan;
    kamera = kamera == 1 ? "High" : kamera == 2 ? "Eye Level" : kamera == 3 ? "Low" : "Belum ditentukan";
    ukuran = ukuran == 1 ? "ELS" : ukuran == 2 ? "LS" : ukuran == 3 ? "MS" : ukuran == 4 ? "CU" : "Belum ditentukan";
    pergerakan = pergerakan == 1 ? "Static" : pergerakan == 2 ? "Panning" : pergerakan == 3 ? "Tilting" : pergerakan == 4 ? "Tracking" : "Belum ditentukan";
    storyboard.insertAdjacentHTML("beforeend", `
    <tr>
    <td>Adegan ${key + 1}</td>
    <td><div class="img" style="background-image:url(${el.gambar})"></div></td>
    <td>${kamera + " (" + ukuran + ") - " + pergerakan}</td>
    <td>${(el.param.durasi) && (el.param.durasi != "null") && (el.param.durasi != "") ? el.param.durasi + " detik" : "Belum ditentukan"}</td>
    <td>${(el.param.dialog) && (el.param.dialog != "null") && (el.param.dialog != "") ? el.param.dialog : "Belum ditentukan"}</td>
    </tr>
    `);

  });

  (async () => {

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

      pdf.save('laporan bab 2 media 3.pdf');

    } catch (error) {
      console.error('Terjadi kesalahan saat mengunduh:', error);
    }
  })()
}