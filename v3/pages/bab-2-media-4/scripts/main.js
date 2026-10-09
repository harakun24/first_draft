
function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    videoId: "e29chVI5HLI",
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
  if (view == "ekspor") {
    if (!store.get("checklist"))
      store.set("checklist", checklistProduksi);
    if (!store.get("pembagian-tim"))
      store.set("pembagian-tim", {
        produser: null, sutradara: null, dop: null, suara: null
      });
    const dataTim = store.get("pembagian-tim");
    const dataChecklist = store.get("checklist");
    const jadwal = dataChecklist.jadwal;

    // const timer
    const countT = Object.values(dataTim).filter(e => e !== null && e !== undefined && String(e).trim() !== "").length;

    const infoTim = document.querySelector("[data-info='tim']");
    infoTim.querySelector("p").textContent = `${countT * 2} posisi telah ditentukan`;
    infoTim.querySelector("button").classList.remove("warning", "ok");
    infoTim.querySelector("button").classList.add(countT < 4 ? "warning" : "ok");
    infoTim.querySelector("button").textContent = countT < 4 ? "periksa" : "sudah lengkap";

    const infoRencana = document.querySelector("[data-info='perencanaan']");
    const infoPraproduksi = document.querySelector("[data-info='praproduksi']");
    const infoProduksi = document.querySelector("[data-info='produksi']");
    const infoPascaproduksi = document.querySelector("[data-info='pascaproduksi']");

    document.querySelector(".table [data-table='linimasa']").innerHTML = "";
    document.querySelector(".table [data-table='detail']").innerHTML = "";
    function computeTemp(j, arr, fase, hasil) {
      j.querySelector("p").textContent = arr[0] && arr[1] ? "tanggal mulai dan selesai telah terjadwal" : arr[0] && !arr[1] ? "tanggal selesai belum terjadwal" : (!arr[0]) && arr[1] ? "tanggal mulai belum terjadwal" : "tanggal mulai dan selesai belum terjadwal";

      j.querySelector("button").classList.remove("warning", "ok");
      j.querySelector("button").classList.add(arr[0] && arr[1] ? "ok" : "warning");
      j.querySelector("button").textContent = arr[0] && arr[1] ? "sudah lengkap" : "periksa";
      const durasi = arr[0] && arr[1] ? ((new Date(arr[1]).getTime() - new Date(arr[0]).getTime()) / (1000 * 60 * 60 * 24)) + " hari" : "-";
      document.querySelector("[data-table='linimasa']").innerHTML += `
      <tr>
      <td>${fase}</td>
      <td>${arr[0] || "-"}</td>
      <td>${arr[1] || "-"}</td>
      <td>${durasi}</td>
      <td>${hasil}</td>
      </tr>
      `;
      const temp = dataChecklist[fase].filter(e => e.selesai);
      temp.forEach((i, key) => {
        document.querySelector(".table [data-table='detail']").innerHTML += `
        <tr>
        ${key == 0 ? `<td rowspan="${temp.length}">${fase}</td>` : ""}
        <td>${i.tugas}</td>
        </tr>
        `;
      })
    }
    computeTemp(infoRencana, jadwal.perencanaan, "perencanaan", "Pembentukan tim inti dan skenario");
    computeTemp(infoPraproduksi, jadwal.praproduksi, "praproduksi", "Finalisasi Storyboard");
    computeTemp(infoProduksi, jadwal.produksi, "produksi", "Perekaman gambar dan suara");
    computeTemp(infoPascaproduksi, jadwal.pascaproduksi, "pascaproduksi", "Finalisasi Film");

    document.querySelector(".table [data-table='tim']").innerHTML = "";
    Object.entries(dataTim).forEach(item => {
      item[0] = item[0] == "produser" ? "Produser dan Bendahara" : item[0] == "sutradara" ? "Sutradara dan Penulis" : item[0] == "dop" ? "DOP dan Pencahayaan" : "Suara dan Artistik"
      if (item[1]) {
        document.querySelector(".table [data-table='tim']").innerHTML += `
        <tr>
        <td>${item[0]}</td>
        <td>${item[1]}</td>
        </tr>
        `;

      }
    })

    console.log({ dataChecklist })

  }
}


document.querySelector("[data-jump='video']").click();
function goto(tag) {
  document.querySelector(`[data-jump='${tag}']`).click();
}

function choose(num) {
  store.add("film-choice", num == 1 ? "Visual yang terdiri dari komposisi, warna dan gerak." : num == 2 ? "Cerita yang terdiri dari tokoh, konflik dan alur. " : "Musik yang terdiri dari irama, suasana dan emosi. ");
  document.querySelector(".modal2").hidePopover();
}

function simpanTim() {
  const produser = document.querySelector("#produser").value;
  const sutradara = document.querySelector("#sutradara").value;
  const dop = document.querySelector("#dop").value;
  const suara = document.querySelector("#suara").value;
  store.set("pembagian-tim", {
    produser, sutradara, dop, suara
  });
  // if (!produser && sutradara && dop && suara)
  //   return alert("mohon isi ")
  document.querySelector("[data-jump='linimasa']").click();
}
function autofillTim() {

  if (store.get("pembagian-tim")) {
    const tim = store.get("pembagian-tim");

    document.querySelector("#produser").value = tim.produser;
    document.querySelector("#sutradara").value = tim.sutradara;
    document.querySelector("#dop").value = tim.dop;
    document.querySelector("#suara").value = tim.suara;
  }
}

autofillTim();

const modal = document.querySelector(".modal");
// modal.showPopover();

const checklistProduksi = {
  jadwal: {
    perencanaan: [null, null],
    praproduksi: [null, null],
    produksi: [null, null],
    pascaproduksi: [null, null],

  },
  perencanaan:
    [
      { tugas: "Penyusunan estimasi awal anggaran biaya", selesai: false },
      { tugas: "Perencanaan timeline eksekusi proyek secara umum", selesai: false },
      { tugas: "Brainstorming ide dan pengkonsepan cerita", selesai: false },
      { tugas: "Penulisan dan finalisasi naskah/skenario", selesai: false },
      { tugas: "Penyusunan director's vision dan konsep visual", selesai: false },
      { tugas: "Diskusi awal konsep visual, *moodboard*, dan referensi gambar", selesai: false },
      { tugas: "Diskusi kebutuhan dasar soundscape, properti utama, dan *set*", selesai: false },
    ]
  ,
  praproduksi:
    [
      { tugas: "Finalisasi anggaran biaya (budgeting) dan alokasi dana", selesai: false },
      { tugas: "Pengurusan izin lokasi dan surat-menyurat resmi", selesai: false },
      { tugas: "Penyusunan jadwal/timeline syuting (*call sheet* & *master schedule*)", selesai: false },

      { tugas: "Pelaksanaan *casting* dan pemilihian pemain", selesai: false },
      { tugas: "Latihan dan pemantapan akting pemain (*rehearsal*)", selesai: false },
      { tugas: "Pembuatan dan persetujuan *storyboard* serta *shot list*", selesai: false },
      { tugas: "Survei lokasi syuting (*recce*) untuk skema pencahayaan dan posisi kamera", selesai: false },
      { tugas: "Pengecekan dan penyiapan ketersediaan kamera, lensa, serta *lighting*", selesai: false },
      { tugas: "Pengujian teknis visual dan *test shoot* sebelum syuting", selesai: false },
      { tugas: "Penyiapan dan pengujian peralatan perekam audio (mikrofon, *boom*, *recorder*)", selesai: false },
      { tugas: "Pengadaan, pembuatan, dan inventarisasi properti adegan", selesai: false },
      { tugas: "Perancangan tata letak dan desain *set* lokasi", selesai: false },
      { tugas: "Pengelolaan arus kas operasional harian di lapangan", selesai: false },
      { tugas: "Pemantauan kesesuaian eksekusi dengan jadwal syuting", selesai: false },
      { tugas: "Pengarahan akting pemain di set lokasi", selesai: false },
      { tugas: "Pengambilan keputusan teknis dan artistik adegan di lapangan", selesai: false },
    ],

  produksi: [
    { tugas: "Eksekusi *framing*, komposisi, dan pergerakan kamera sesuai *shot list*", selesai: false },
    { tugas: "Penataan pencahayaan (*lighting setup*) di setiap adegan", selesai: false },
    { tugas: "Pengelolaan data mentah rekaman (*data wrangling* / *backup footage*)", selesai: false },
    { tugas: "Perekaman audio bersih di lapangan dan pemantauan kualitas suara (*sound check*)", selesai: false },
    { tugas: "Penataan properti (*property tracking*) dan pemastian kesiapan *set dressing*", selesai: false }

  ],

  pascaproduksi: [
    { tugas: "Penyelesaian laporan keuangan dan pembukuan akhir", selesai: false },
    { tugas: "Pengurusan distribusi, promosi, atau publikasi hasil karya", selesai: false },
    { tugas: "Dampingan proses penyuntingan gambar (*offline & online editing*)", selesai: false },
    { tugas: "Persetujuan akhir versi potong film (*director's cut* / *final cut*)", selesai: false },
    { tugas: "Pengawasan dan penyesuaian pewarnaan gambar (*color grading*)", selesai: false },
    { tugas: "Proses penyuntingan audio, pembersihan *noise*, dan *sound design*", selesai: false },
    { tugas: "Proses penyeimbangan level audio (*audio mixing & mastering*)", selesai: false },
    { tugas: "Pengembalian serta penataan ulang ketersediaan alat dan properti", selesai: false }

  ]
};
// store.clean()
if (!store.get("checklist")) {
  store.set("checklist", checklistProduksi)
}
else {
  const data = store.get("checklist").jadwal;
  const card = document.querySelectorAll(".card");
  data.perencanaan[0] ? card[0].querySelectorAll("input")[0].value = data.perencanaan[0] : "";
  data.perencanaan[1] ? card[0].querySelectorAll("input")[1].value = data.perencanaan[1] : "";
  data.praproduksi[0] ? card[1].querySelectorAll("input")[0].value = data.praproduksi[0] : "";
  data.praproduksi[1] ? card[1].querySelectorAll("input")[1].value = data.praproduksi[1] : "";
  data.produksi[0] ? card[2].querySelectorAll("input")[0].value = data.produksi[0] : "";
  data.produksi[1] ? card[2].querySelectorAll("input")[1].value = data.produksi[1] : "";
  data.pascaproduksi[0] ? card[3].querySelectorAll("input")[0].value = data.pascaproduksi[0] : "";
  data.pascaproduksi[1] ? card[3].querySelectorAll("input")[1].value = data.pascaproduksi[1] : "";
}

function detailShow(tag) {
  const data = store.get("checklist") || checklistProduksi;
  const modalform = document.querySelector(".modal .form");
  modalform.innerHTML = ""
  data[tag].forEach((item, key) => {
    modalform.innerHTML += `
    <div class="input-group pointer" onclick="check(event)">
          <input type="checkbox" data-tag="${tag}" data-key="${key}" id="in-${key}" ${item.selesai ? "checked" : ""} onchange="checkChanges(event)"/>
          <label for="in-${key}">${item.tugas}</label>
        </div>
    `;
  });
  modal.showPopover();
}

function setDate(key, label, e) {
  console.log({ key, label })
  const data = store.get("checklist") || checklistProduksi;
  if (label == "end") {
    if (data.jadwal[key][0]) {
      const selisih = (new Date(data.jadwal[key][0]).getTime() - new Date(e.currentTarget.value).getTime()) / (1000 * 60 * 60 * 24);
      console.log({ selisih, val: e.currentTarget.value, sati: data[key][0] })
      if (selisih > 0) {
        e.currentTarget.value = "";
        return alert("tanggal selesai tidak valid!");
      }
    }
  }
  else if (label == "start") {
    if (data.jadwal[key][1]) {
      const selisih = (new Date(data.jadwal[key][1]).getTime() - new Date(e.currentTarget.value).getTime()) / (1000 * 60 * 60 * 24);
      console.log({ selisih, val: e.currentTarget.value, sati: data[key][0] })
      if (selisih < 0) {
        e.currentTarget.value = "";
        return alert("tanggal selesai tidak valid!");
      }
    }

  }
  data.jadwal[key][label == "start" ? 0 : 1] = e.currentTarget.value;
  store.set("checklist", data);
}

// document.querySelector(".modal").showPopover();

function check(e) {
  e.currentTarget.querySelector("label").click();
}

function checkChanges(e) {
  const data = store.get("checklist") || checklistProduksi;
  data[e.currentTarget.dataset.tag][e.currentTarget.dataset.key] = {
    tugas: data[e.currentTarget.dataset.tag][e.currentTarget.dataset.key].tugas,
    selesai: e.currentTarget.checked
  }
  store.set("checklist", data);
}

function saveCheck() {
  modal.hidePopover()
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