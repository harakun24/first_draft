
function onYouTubeIframeAPIReady() {
  const pilihan = store.get("bab3-pilihan");
  player = new YT.Player("player", {
    width: "100%",
    height: "100%",
    videoId: pilihan ? videoList[pilihan] : "",
    events: {
      onStateChange: event => {
        console.log("state", event.data);
      }
    }
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

const videoList = {
  ["Drama Mager"]: "t3pjBPl0T9k",
  ["Drama Antigone"]: "n2evZyaYAe4"
};

function pilihVideo(val) {
  if (!val) return;

  store.set("bab3-pilihan", val);
  player.cueVideoById(videoList[store.get("bab3-pilihan")]);
  // if (player && player.loadVideoById) {
  // }
  // else {
  //   player = new YT.Player("player", {
  //     width: "100%",
  //     height: "100%",
  //     videoId: videoList[store.get("bab3-pilihan")]
  //   });
  // }
  console.log(videoList[store.get("bab3-pilihan")])
  goto("persiapan")
}
// store.clean()
if (!store.get("bab3-pilihan"))
  store.set("bab3-pilihan", null);
else {
  if (player && player.loadVideoById) {
    player.loadVideoById(videoList[store.get("bab3-pilihan")]);
  }
  else {

    // player = new YT.Player("player", {
    //   width: "100%",
    //   height: "100%",
    //   videoId: videoList[store.get("bab3-pilihan")]
    // });
  }
}
if (!store.get("bab3-persiapan"))
  store.set("bab3-persiapan", {
    nama: null,
    kelas: null,
    anggota: [null, null, null, null, null]
  });
else {
  const data = store.get("bab3-persiapan");
  document.querySelectorAll("[data-fill] input").forEach(el => {
    const fill = el.parentElement.dataset.fill;
    const key = el.parentElement.dataset.key;

    if (fill == "anggota")
      el.value = data.anggota[key - 1]
    else
      el.value = data[fill]

  });

}
if (!store.get("bab3-analisis"))
  store.set("bab3-analisis", {
    q1: null,
    q2: null,
    q3: null,
  });
else {
  const data = store.get("bab3-analisis");
  console.log(data)
  document.querySelector("[data-q='q1']").querySelector("textarea").value = data.q1;
  document.querySelector("[data-q='q2']").querySelector("textarea").value = data.q2;
  document.querySelector("[data-q='q3']").querySelector("textarea").value = data.q3;
}

function setAnggota(e) {
  const key = e.currentTarget.parentElement.dataset.key;
  const fill = e.currentTarget.parentElement.dataset.fill;
  const val = e.currentTarget.value;
  const data = store.get("bab3-persiapan");

  if (fill == "anggota")

    data.anggota[key - 1] = val;
  else
    data[fill] = val;

  store.set("bab3-persiapan", data)
  console.log(store.get("bab3-persiapan"))
}
function setAnalisis(e) {
  const key = e.currentTarget.parentElement.dataset.q;
  const val = e.currentTarget.value;
  const data = store.get("bab3-analisis");


  data[key] = val;

  store.set("bab3-analisis", data)
  console.log(store.get("bab3-analisis"))
}
document.querySelectorAll("[data-fill] input").forEach(el => el.addEventListener("input", setAnggota))
document.querySelectorAll("[data-q] textarea").forEach(el => el.addEventListener("input", setAnalisis))

function savePersiapan() {
  goto("video")
}

function saveAnalisis() {
  const persiapan = store.get("bab3-persiapan");
  const analisis = store.get("bab3-analisis");
  const pilihan = store.get("bab3-pilihan");
  if (!persiapan.nama || !persiapan.kelas || !analisis.q1 || !analisis.q2 || !analisis.q3 || !pilihan) return alert("data belum lengkap");


  document.querySelector(".kelompok").innerHTML = persiapan.nama;
  document.querySelector(".kelas").innerHTML = persiapan.kelas;
  document.querySelector(".pililan-title").innerHTML = pilihan;

  const tablePersiapan = document.querySelector("[data-table='persiapan']");
  const tableAnalisis = document.querySelector("[data-table='analisis']");

  tablePersiapan.innerHTML = "";
  tableAnalisis.innerHTML = `
  <tr>
  <td>Siapakah tokoh paling menonjol? Jelaskan karakteristik tokoh
                tersebut</td>
  <td>${analisis.q1}</td>
  </tr>
  <tr>
  <td>Identifikasi konflik utama cerita! Jelaskan bagaimana konflik
                disampaikan</td>
  <td>${analisis.q2}</td>
  </tr>
  <tr>
  <td>Sebutkan adegan-adegan penting yang membawa pesan moral dalam
                cerita. Jelaskan pesan dan cara penyampaiannya!</td>
  <td>${analisis.q3}</td>
  </tr>
  `;

  persiapan.anggota.forEach((item, k) => {
    tablePersiapan.insertAdjacentHTML("beforeend", `
    <tr>
    <td>${k + 1}</td>
    <td>${item}</td>
    </tr>
    `);
  });
  savePdf();
}