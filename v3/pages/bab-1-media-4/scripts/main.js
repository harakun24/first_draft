
// function onYouTubeIframeAPIReady() {
//   player = new YT.Player("player", {
//     videoId: "KKJTTNkRZsI",
//     width: "100%",
//     height: "100%",
//   });
// }

// const datas = document.querySelector(".group-list");
// const randoM = Array.from(datas.querySelectorAll(".item"));
// for (let i = randoM.length - 1; i > 0; i--) {
//   const j = Math.floor(Math.random() * (i + 1));
//   [randoM[i], randoM[j]] = [randoM[j], randoM[i]];

//   randoM.forEach(e => {
//     datas.appendChild(e)
//   })
// }

// function jumpSegmen(e) {
//   document.querySelector(".segmen.active")?.classList.remove("active");
//   const view = e.currentTarget.dataset.jump;
//   if (player)
//     player.pauseVideo()
//   e.currentTarget.classList.add("active");
//   document.querySelector(".area.active")?.classList.remove("active");
//   document.querySelector(".area." + view).classList.add("active");
//   store.add("cv-state", view);
// }

// let draggedItem = null;


// function drag(e) {
//   draggedItem = e.target;
// }

// function dropToSlot(e) {
//   e.preventDefault();
//   const slot = e.currentTarget;
//   const pool = document.querySelector('[data-pool]')

//   if (slot.children.length > 0)
//     pool.appendChild(slot.children[0])
//   slot.appendChild(draggedItem)
//   const num = 9 - document.querySelectorAll(".group-list .item").length;
//   document.getElementById("counter").innerText = `${num}/9`;
//   resetValue()
//   // counting()
// }

// function dropToPool(e) {
//   e.preventDefault()
//   document.querySelector("[data-pool]").appendChild(draggedItem)
//   const num = 9 - document.querySelectorAll(".group-list .item").length;
//   document.getElementById("counter").innerText = `${num}/9`;
//   // console.log(num)
//   resetValue()
//   // counting()
// }

// function resetValue() {
//   const num = 9 - document.querySelectorAll(".group-list .item").length;
//   document.getElementById("counter").innerText = `${num}/9`;
//   document.querySelectorAll("[data-target]").forEach(e => {
//     e.classList.remove('correct')
//     e.classList.remove('wrong')
//   })
//   document.querySelectorAll(".label").forEach(e => {
//     e.classList.remove("wrong", "correct")
//     e.querySelector(".dfas").innerHTML = "";
//   })
// }
// function validate() {
//   document.querySelectorAll('[data-target]').forEach(slot => {
//     const item = slot.children[0];
//     if (item) {
//       const isCorrect = item.dataset.item == slot.dataset.target;
//       slot.classList.toggle(isCorrect ? "correct" : "wrong")
//     }
//   })
//   counting();

//   // navigate(3)
// }


// function counting() {
//   const num = document.querySelectorAll(".correct:has(.item)").length
//   document.getElementById("counter").innerText = `${num}/9`;
//   document.getElementById("con").innerText = `${num}`;

//   const answ = document.querySelectorAll(".slot");
//   answ.forEach(e => {
//     if (e.classList.contains("correct")) {
//       // console.log(e.dataset.target)
//       const t = document.querySelector(`.label:nth-child(${e.dataset.target})`)

//       t.classList.add("correct")
//       const icon = document.createElement("i")
//       icon.classList.add("fas", "fa-check")
//       t.querySelector(".dfas").appendChild(icon)
//     }
//     else if (e.classList.contains("wrong")) {
//       // console.log(e.dataset.target)
//       const t = document.querySelector(`.label:nth-child(${e.dataset.target})`)

//       t.classList.add("wrong")
//       const icon = document.createElement("i")
//       icon.classList.add("fas", "fa-close")
//       t.querySelector(".dfas").appendChild(icon)
//     }
//   })

// }

// document.querySelector("[data-jump='video']").click();


// function savePengalaman() {
//   const pengalaman = document.querySelector("#pengalaman").value;
//   const start = new Date(document.querySelector("#start").value).toLocaleDateString("id-ID", {
//     month: "long",
//     year: "numeric",
//     timeZone: "UTC"
//   });
//   const end = new Date(document.querySelector("#end").value).toLocaleDateString("id-ID", {
//     month: "long",
//     year: "numeric",
//     timeZone: "UTC"
//   });
//   const strResult = `
//   <tr>
//   <td>
//   ${pengalaman}
//   </td>
//   <td>
//   ${start == "Invalid Date" ? "Belum ada tanggal" : start}
//   </td>
//   <td>
//   ${end == "Invalid Date" ? "Sekarang" : end}
//   </td>
//   <td><button onclick="delRow(event)" class="pointer"><div data-icon="../../public/feather/trash-2.svg"></div></button></td>
//   </tr>
//   `;
//   document.querySelector(".tabel-pengalaman").insertAdjacentHTML("beforeend", strResult);
//   document.querySelector("#pengalaman").value = "";
//   document.querySelector("#start").value = "";
//   document.querySelector("#end").value = "";
//   document.querySelector(".modal").hidePopover();
// }
// function savePendidikan() {
//   const pengalaman = document.querySelector("#pendidikan").value;
//   // const start = new Date(document.querySelector("#start2").value).toLocaleDateString("id-ID", {
//   //   month: "long",
//   //   year: "numeric",
//   //   timeZone: "UTC"
//   // });
//   const end = new Date(document.querySelector("#end2").value).toLocaleDateString("id-ID", {
//     month: "long",
//     year: "numeric",
//     timeZone: "UTC"
//   });
//   const strResult = `
//   <tr>
//   <td>
//   ${pengalaman}
//   </td>

//   <td>
//   ${end == "Invalid Date" ? "Sekarang" : end}
//   </td>
//   <td><button onclick="delRow(event)" class="pointer"><div data-icon="../../public/feather/trash-2.svg"></div></button></td>
//   </tr>
//   `;
//   document.querySelector(".tabel-pendidikan").insertAdjacentHTML("beforeend", strResult);
//   document.querySelector("#pendidikan").value = "";
//   document.querySelector("#end2").value = "";
//   document.querySelector(".modal3").hidePopover();
// }

// function delRow(e) {
//   e.currentTarget.parentElement.parentElement.remove();
// }

// function openModal() {
//   document.querySelector(".modal").showPopover();
// }
// function openModal2() {
//   document.querySelector(".modal2").showPopover();
// }
// function openModal3() {
//   document.querySelector(".modal3").showPopover();
// }

// function delLabel(e) {
//   e.currentTarget.parentElement.remove()
// }

// function saveKeahlian() {
//   const keahlian = document.querySelector("#keahlian").value;
//   const strResult = `
//   <div class="list">
//                   <span>${keahlian}</span>
//                   <div
//                     class="pointer"
//                     data-icon="../../public/feather/x.svg"
//                     onclick="delLabel(event)"></div>
//                 </div>
//   `;
//   document.querySelector(".pengalaman .group-list").insertAdjacentHTML("beforeend", strResult);
//   console.log(strResult)
//   document.querySelector(".modal2").hidePopover()

// }

// async function unduh() {
//   if (!store.get("cv-state"))
//     store.set("cv-state", "");
//   if (store.get("cv-state") != "cv")
//     return document.querySelector("[data-jump='cv']").click();

//   const nama = document.querySelector("#nama").value.toUpperCase();
//   const posisi = document.querySelector("#posisi").value;
//   const nomor = document.querySelector("#nomor").value;
//   const email = document.querySelector("#email").value;
//   const alamat = document.querySelector("#alamat").value;
//   const bio = document.querySelector("#bio").value;

//   function snull(v) {
//     return v == null || v == "" || v == "null" || v == undefined
//   }


//   const pengalaman = document.querySelector(".tabel-pengalaman");
//   const pendidikan = document.querySelector(".tabel-pendidikan");
//   const keahlian = document.querySelector(".pengalaman .group-list");

//   if (snull(posisi) || snull(nomor) || snull(email) || snull(alamat) || snull(bio) || !pengalaman.children.length || !pendidikan.children.length || !keahlian.children.length) return alert("mohon lengkapi biodata terlebih dulu");


//   const doc = document.querySelector(".cv-doc");
//   doc.querySelector("h2").textContent = nama;
//   doc.querySelector(".jabatan").textContent = posisi;
//   doc.querySelector(".no").textContent = nomor;
//   doc.querySelector(".email").textContent = email;
//   doc.querySelector(".alamat").textContent = alamat;
//   doc.querySelector(".about").textContent = bio;

//   document.querySelectorAll(".p .group-list")?.forEach(el => {
//     el.innerHTML = "";
//   });
//   document.querySelector(".p ul").innerHTML = "";

//   pengalaman.querySelectorAll("tr")?.forEach(el => {
//     const p = el.querySelectorAll("td")[0].textContent;
//     const start = el.querySelectorAll("td")[1].textContent;
//     const end = el.querySelectorAll("td")[2].textContent;
//     document.querySelector(".p.for-pengalaman .group-list").innerHTML += `
//     <div class="desc">
//             <p>${p}</p>
//             <b>${start} - ${end}</b>
//           </div>
//     `
//   })
//   pendidikan.querySelectorAll("tr")?.forEach(el => {
//     const p = el.querySelectorAll("td")[0].textContent;
//     const start = el.querySelectorAll("td")[1].textContent;
//     const end = el.querySelectorAll("td")[1].textContent;
//     document.querySelector(".p.for-pendidikan .group-list").innerHTML += `
//     <div class="desc">
//             <p>${p}</p>
//             <b> ${end}</b>
//           </div>
//     `
//   })

//   Array.from(keahlian.children).forEach(el => {
//     document.querySelector(".p ul").innerHTML += `
//   <li>${el.querySelector("span").textContent}</li>
//   `
//   });

//   // const { jsPDF } = window.jspdf;
//   // const el = document.querySelector(".cv-doc");
//   // try {

//   //   const canvas = await html2canvas(el, {
//   //     scale: 2,
//   //     useCORS: true
//   //   });
//   //   const imgData = canvas.toDataURL('image/png');

//   //   let pdfWidth = 210;
//   //   let pdfHeight = (canvas.height * pdfWidth) / canvas.width;
//   //   const pdf = new jsPDF({ orientation: 'p', unit: 'mm', format: [pdfWidth, pdfHeight] });


//   //   pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

//   //   pdf.save('cv-mandiri.pdf');

//   // } catch (error) {
//   //   console.error('Terjadi kesalahan saat mengunduh:', error);
//   // }
//   document.body.classList.add("print");

//   // Beri jeda 150ms agar browser selesai menggambar elemen yang berubah dari display: none ke grid
//   setTimeout(() => {
//     window.print();

//     // Dialog print bersifat blocking. Setelah ditutup, eksekusi penghapusan class berjalan
//     setTimeout(() => {
//       document.body.classList.remove("print");
//     }, 500);
//   }, 150);
// }

// let player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    videoId: "KKJTTNkRZsI",
    width: "100%",
    height: "100%",
  });
}

// --- INISIALISASI POOL DRAG & DROP ---
const datas = document.querySelector(".group-list");
if (datas) {
  const randoM = Array.from(datas.querySelectorAll(".item"));
  for (let i = randoM.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [randoM[i], randoM[j]] = [randoM[j], randoM[i]];
  }
  randoM.forEach(e => {
    datas.appendChild(e);
  });
}

// --- NAVIGASI TAB VIEW ---
function jumpSegmen(e) {
  document.querySelector(".segmen.active")?.classList.remove("active");
  const view = e.currentTarget.dataset.jump;
  if (player && typeof player.pauseVideo === 'function') player.pauseVideo();

  e.currentTarget.classList.add("active");
  document.querySelector(".area.active")?.classList.remove("active");
  document.querySelector(".area." + view).classList.add("active");

  if (typeof store !== 'undefined') store.add("cv-state", view);
}

// Otomatis klik tab video di awal
document.querySelector("[data-jump='video']")?.click();

// --- LOGIKA DRAG & DROP SURAT ---
let draggedItem = null;
let selectedTouchItem = null; // Membantu navigasi klik di HP

// --- INICIALISASI RANDOM & EVENT LISTENER PENDUKUNG MOBILE ---
document.addEventListener("DOMContentLoaded", () => {
  const datas = document.querySelector(".group-list");
  if (datas) {
    const randoM = Array.from(datas.querySelectorAll(".item"));
    for (let i = randoM.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [randoM[i], randoM[j]] = [randoM[j], randoM[i]];
    }
    randoM.forEach(e => datas.appendChild(e));
  }

  // Tambahkan event klik interaktif untuk mendukung pengguna Mobile (Tap-to-Place)
  document.querySelectorAll(".item").forEach(item => {
    item.addEventListener("click", handleItemTouchSelect);
  });

  document.querySelectorAll(".slot").forEach(slot => {
    slot.addEventListener("click", handleSlotTouchDrop);
  });
});

// --- 1. DESKTOP DRAG AND DROP API ---
function drag(e) {
  draggedItem = e.target;
  selectedTouchItem = null; // Reset pilihan sentuh
  document.querySelectorAll(".item").forEach(el => el.classList.remove("selected-for-touch"));
}

function dropToSlot(e) {
  e.preventDefault();
  const slot = e.currentTarget;
  const pool = document.querySelector('[data-pool]');

  // Eksekusi dari Desktop Drag atau Mobile Tap
  const targetItem = draggedItem || selectedTouchItem;
  if (!targetItem) return;

  if (slot.children.length > 0) {
    pool.appendChild(slot.children[0]); // Kembalikan isi slot lama ke pool
  }

  slot.appendChild(targetItem);
  cleanupInteraction();
}

function dropToPool(e) {
  e.preventDefault();
  const pool = document.querySelector("[data-pool]");
  const targetItem = draggedItem || selectedTouchItem;

  if (targetItem && pool) {
    pool.appendChild(targetItem);
    cleanupInteraction();
  }
}

// --- 2. MOBILE TAP-TO-PLACE SYSTEM (PENGGANTI DRAG DI HP) ---
function handleItemTouchSelect(e) {
  const item = e.currentTarget;

  // Jika item sudah berada di dalam slot, klik akan mengembalikannya ke pool
  if (item.closest('.slot')) {
    const pool = document.querySelector('[data-pool]');
    if (pool) {
      pool.appendChild(item);
      cleanupInteraction();
      return;
    }
  }

  // Jika item di pool, tandai sebagai aktif untuk dipindah ke slot
  document.querySelectorAll(".item").forEach(el => el.classList.remove("selected-for-touch"));
  selectedTouchItem = item;
  item.classList.add("selected-for-touch");
  draggedItem = null;
}

function handleSlotTouchDrop(e) {
  const slot = e.currentTarget;
  const pool = document.querySelector('[data-pool]');

  if (selectedTouchItem && pool) {
    if (slot.children.length > 0) {
      pool.appendChild(slot.children[0]); // Kembalikan isi lama
    }
    slot.appendChild(selectedTouchItem);
    cleanupInteraction();
  }
}

function cleanupInteraction() {
  document.querySelectorAll(".item").forEach(el => el.classList.remove("selected-for-touch"));
  draggedItem = null;
  selectedTouchItem = null;
  updateCounter();
  resetValue();
}

// --- 3. PENGELOLAAN COUNTER & VALIDASI ---
function updateCounter() {
  const remaining = document.querySelectorAll(".group-list .item").length;
  const placedCount = 9 - remaining;
  const counterEl = document.getElementById("counter");
  if (counterEl) counterEl.innerText = `${placedCount}/9`;
}

function resetValue() {
  document.querySelectorAll("[data-target]").forEach(e => {
    e.classList.remove('correct', 'wrong');
  });
  document.querySelectorAll(".label").forEach(e => {
    e.classList.remove("wrong", "correct");
    const dfas = e.querySelector(".dfas");
    if (dfas) dfas.innerHTML = "";
  });
}

function validate() {
  document.querySelectorAll('[data-target]').forEach(slot => {
    const item = slot.children[0];
    if (item) {
      const isCorrect = item.dataset.item == slot.dataset.target;
      slot.classList.toggle(isCorrect ? "correct" : "wrong", true);
    } else {
      slot.classList.remove("correct", "wrong");
    }
  });
  counting();
}

function counting() {
  const correctCount = document.querySelectorAll(".slot.correct:has(.item)").length;
  const counterEl = document.getElementById("counter");
  const conEl = document.getElementById("con");

  if (counterEl) {
    const remaining = document.querySelectorAll(".group-list .item").length;
    counterEl.innerText = `${9 - remaining}/9`;
  }
  if (conEl) conEl.innerText = `${correctCount}`;

  const answ = document.querySelectorAll(".slot");
  answ.forEach(e => {
    const targetLabel = document.querySelector(`.label:nth-child(${e.dataset.target})`);
    if (!targetLabel) return;

    targetLabel.classList.remove("correct", "wrong");
    const dfas = targetLabel.querySelector(".dfas");
    if (dfas) dfas.innerHTML = "";

    if (e.classList.contains("correct")) {
      targetLabel.classList.add("correct");
      const icon = document.createElement("i");
      icon.classList.add("fas", "fa-check");
      if (dfas) dfas.appendChild(icon);
    } else if (e.classList.contains("wrong")) {
      targetLabel.classList.add("wrong");
      const icon = document.createElement("i");
      icon.classList.add("fas", "fa-close");
      if (dfas) dfas.appendChild(icon);
    }
  });
}

// --- LOGIKA FORM CV & EDIT BARIS ---

// Variabel global untuk melacak mode edit
let editTargetPengalaman = null;
let editTargetPendidikan = null;

function openModal() {
  // Reset form sebelum dibuka untuk memastikan tidak nyangkut data lama
  document.querySelector("#pengalaman").value = "";
  document.querySelector("#start").value = "";
  document.querySelector("#end").value = "";
  editTargetPengalaman = null; // Setel ke mode penambahan baru
  document.querySelector(".modal").showPopover();
}

function openModal2() {
  document.querySelector("#keahlian").value = "";
  document.querySelector(".modal2").showPopover();
}

function openModal3() {
  document.querySelector("#pendidikan").value = "";
  document.querySelector("#end2").value = "";
  editTargetPendidikan = null; // Setel ke mode penambahan baru
  document.querySelector(".modal3").showPopover();
}

function delRow(e) {
  e.currentTarget.closest('.timeline-item').remove();
}

function delLabel(e) {
  e.currentTarget.closest('.list').remove();
}

// --- FUNGSI SAVE & EDIT PENGALAMAN ---
function savePengalaman() {
  const inputPengalaman = document.querySelector("#pengalaman").value.trim();
  const rawStart = document.querySelector("#start").value;
  const rawEnd = document.querySelector("#end").value;

  if (!inputPengalaman) return alert("Pengalaman tidak boleh kosong");

  const startText = rawStart ? new Date(rawStart).toLocaleDateString("id-ID", { month: "long", year: "numeric", timeZone: "UTC" }) : "Belum ada tanggal";
  const endText = rawEnd ? new Date(rawEnd).toLocaleDateString("id-ID", { month: "long", year: "numeric", timeZone: "UTC" }) : "Sekarang";

  const contentHTML = `
    <div class="info">
      <h4>${inputPengalaman}</h4>
      <span>${startText} - ${endText}</span>
    </div>
    <div style="display: flex; gap: 8px;">
      <button onclick="editPengalaman(event)" class="del-btn pointer" style="color: #3b82f6;"><div data-icon="../../public/feather/edit.svg"></div></button>
      <button onclick="delRow(event)" class="del-btn pointer"><div data-icon="../../public/feather/trash-2.svg"></div></button>
    </div>
  `;

  if (editTargetPengalaman) {
    // Mode Edit: Perbarui elemen yang sudah ada
    editTargetPengalaman.dataset.title = inputPengalaman;
    editTargetPengalaman.dataset.start = rawStart;
    editTargetPengalaman.dataset.end = rawEnd;
    editTargetPengalaman.innerHTML = contentHTML;
  } else {
    // Mode Tambah: Buat elemen baru
    const el = document.createElement('div');
    el.className = 'timeline-item';
    el.dataset.title = inputPengalaman;
    el.dataset.start = rawStart;
    el.dataset.end = rawEnd;
    el.innerHTML = contentHTML;
    document.querySelector(".tabel-pengalaman").appendChild(el);
  }

  // Reload icon feather jika fungsi tersebut tersedia di global
  if (typeof feather !== 'undefined') feather.replace();

  document.querySelector(".modal").hidePopover();
}

function editPengalaman(e) {
  editTargetPengalaman = e.currentTarget.closest('.timeline-item');
  document.querySelector("#pengalaman").value = editTargetPengalaman.dataset.title;
  document.querySelector("#start").value = editTargetPengalaman.dataset.start;
  document.querySelector("#end").value = editTargetPengalaman.dataset.end;
  document.querySelector(".modal").showPopover();
}

// --- FUNGSI SAVE & EDIT PENDIDIKAN ---
function savePendidikan() {
  const inputPendidikan = document.querySelector("#pendidikan").value.trim();
  const rawEnd = document.querySelector("#end2").value;

  if (!inputPendidikan) return alert("Pendidikan tidak boleh kosong");

  const endText = rawEnd ? new Date(rawEnd).toLocaleDateString("id-ID", { month: "long", year: "numeric", timeZone: "UTC" }) : "Sekarang";

  const contentHTML = `
    <div class="info">
      <h4>${inputPendidikan}</h4>
      <span>Tahun: ${endText}</span>
    </div>
    <div style="display: flex; gap: 8px;">
      <button onclick="editPendidikan(event)" class="del-btn pointer" style="color: #3b82f6;"><div data-icon="../../public/feather/edit.svg"></div></button>
      <button onclick="delRow(event)" class="del-btn pointer"><div data-icon="../../public/feather/trash-2.svg"></div></button>
    </div>
  `;

  if (editTargetPendidikan) {
    editTargetPendidikan.dataset.title = inputPendidikan;
    editTargetPendidikan.dataset.end = rawEnd;
    editTargetPendidikan.innerHTML = contentHTML;
  } else {
    const el = document.createElement('div');
    el.className = 'timeline-item';
    el.dataset.title = inputPendidikan;
    el.dataset.end = rawEnd;
    el.innerHTML = contentHTML;
    document.querySelector(".tabel-pendidikan").appendChild(el);
  }

  if (typeof feather !== 'undefined') feather.replace();
  document.querySelector(".modal3").hidePopover();
}

function editPendidikan(e) {
  editTargetPendidikan = e.currentTarget.closest('.timeline-item');
  document.querySelector("#pendidikan").value = editTargetPendidikan.dataset.title;
  document.querySelector("#end2").value = editTargetPendidikan.dataset.end;
  document.querySelector(".modal3").showPopover();
}

// --- FUNGSI SAVE KEAHLIAN ---
function saveKeahlian() {
  const keahlian = document.querySelector("#keahlian").value.trim();
  if (!keahlian) return;

  const strResult = `
    <div class="list">
      <span>${keahlian}</span>
      <div class="pointer" data-icon="../../public/feather/x.svg" onclick="delLabel(event)"></div>
    </div>
  `;
  document.querySelector(".keahlian-section .group-list").insertAdjacentHTML("beforeend", strResult);

  if (typeof feather !== 'undefined') feather.replace();
  document.querySelector(".modal2").hidePopover();
}

// --- FUNGSI EKSPOR CETAK & VALIDASI ---
async function unduh() {
  if (typeof store !== 'undefined') {
    if (!store.get("cv-state")) store.set("cv-state", "");
    if (store.get("cv-state") != "cv") return document.querySelector("[data-jump='cv']")?.click();
  }

  // 1. Tangkap semua elemen Input Form
  const inputNama = document.querySelector("#nama");
  const inputPosisi = document.querySelector("#posisi");
  const inputNomor = document.querySelector("#nomor");
  const inputEmail = document.querySelector("#email");
  const inputAlamat = document.querySelector("#alamat");
  const inputBio = document.querySelector("#bio");

  // Tangkap container data List
  const wadahPengalaman = document.querySelector(".tabel-pengalaman");
  const wadahPendidikan = document.querySelector(".tabel-pendidikan");
  const wadahKeahlian = document.querySelector(".keahlian-section .group-list");

  let isValid = true;

  // 2. Fungsi Eksekutor Error
  function setError(inputEl, message) {
    if (!inputEl) return;
    const group = inputEl.closest(".input-group"); // Gunakan closest untuk kepastian hirarki
    if (group) {
      group.classList.add("invalid");
      const msgEl = group.querySelector(".error-msg");
      if (msgEl) {
        msgEl.textContent = message;
      }
      isValid = false;
    }
  }

  function clearError(inputEl) {
    if (!inputEl) return;
    const group = inputEl.closest(".input-group");
    if (group) {
      group.classList.remove("invalid");
      const msgEl = group.querySelector(".error-msg");
      if (msgEl) msgEl.textContent = "";
    }
  }

  // 3. Bersihkan sisa error lama sebelum validasi baru jalan
  [inputNama, inputPosisi, inputNomor, inputEmail, inputAlamat, inputBio].forEach(clearError);

  // 4. Proses Validasi Ketat

  // Nama
  const valNama = inputNama ? inputNama.value.trim() : "";
  const nameRegex = /^[a-zA-Z\s.,'-]+$/;
  if (!valNama) {
    setError(inputNama, "Nama wajib diisi.");
  } else if (!nameRegex.test(valNama)) {
    setError(inputNama, "Nama hanya boleh berisi huruf dan tanda baca dasar.");
  } else if (valNama.length < 3) {
    setError(inputNama, "Nama terlalu pendek.");
  }

  // Posisi
  const valPosisi = inputPosisi ? inputPosisi.value.trim() : "";
  if (!valPosisi) {
    setError(inputPosisi, "Target posisi wajib diisi.");
  } else if (valPosisi.length < 3) {
    setError(inputPosisi, "Sebutkan target posisi yang lebih spesifik.");
  }

  // Nomor Telepon (Standar Indonesia)
  const valNomor = inputNomor ? inputNomor.value.replace(/[\s-]/g, '') : "";
  const phoneRegex = /^(08|62|\+62)[0-9]{7,12}$/;
  if (!valNomor) {
    setError(inputNomor, "Nomor telepon wajib diisi.");
  } else if (!phoneRegex.test(valNomor)) {
    setError(inputNomor, "Gunakan awalan 08/62/+62 dengan total 9-15 digit.");
  }

  // Email (Standar dengan TLD)
  const valEmail = inputEmail ? inputEmail.value.trim() : "";
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!valEmail) {
    setError(inputEmail, "Email wajib diisi.");
  } else if (!emailRegex.test(valEmail)) {
    setError(inputEmail, "Format email tidak valid (contoh: nama@domain.com).");
  }

  // Alamat Lengkap
  const valAlamat = inputAlamat ? inputAlamat.value.trim() : "";
  if (!valAlamat) {
    setError(inputAlamat, "Alamat domisili wajib diisi.");
  } else if (valAlamat.length < 15) {
    setError(inputAlamat, "Tuliskan alamat domisili yang lebih lengkap (min. 15 karakter).");
  }

  // Bio / Profil Singkat
  const valBio = inputBio ? inputBio.value.trim() : "";
  if (!valBio) {
    setError(inputBio, "Ringkasan profil wajib diisi.");
  } else if (valBio.length < 40) {
    setError(inputBio, "Ringkasan profil terlalu singkat (minimal 40 karakter).");
  }

  // Pengecekan List Data Diri (Pengalaman, Pendidikan, Keahlian)
  const isPengalamanValid = wadahPengalaman && wadahPengalaman.children.length > 0;
  const isPendidikanValid = wadahPendidikan && wadahPendidikan.children.length > 0;
  const isKeahlianValid = wadahKeahlian && wadahKeahlian.children.length > 0;

  if (!isPengalamanValid || !isPendidikanValid || !isKeahlianValid) {
    alert("CV tidak lengkap! Anda harus mengisi minimal:\n- 1 Pengalaman\n- 1 Riwayat Pendidikan\n- 1 Keahlian");
    isValid = false;
  }

  // Jika tidak lolos validasi, hentikan fungsi di sini
  if (!isValid) return;

  // 5. Transfer Data Lolos Validasi ke Render Template (.cv-doc)
  const doc = document.querySelector(".cv-doc");
  if (doc) {
    const elNama = doc.querySelector("h2");
    if (elNama) elNama.textContent = valNama.toUpperCase();

    const elJabatan = doc.querySelector(".jabatan");
    if (elJabatan) elJabatan.textContent = valPosisi;

    const elNo = doc.querySelector(".no");
    if (elNo) elNo.textContent = valNomor;

    const elEmailDoc = doc.querySelector(".email");
    if (elEmailDoc) elEmailDoc.textContent = valEmail;

    const elAlamatDoc = doc.querySelector(".alamat");
    if (elAlamatDoc) elAlamatDoc.textContent = valAlamat;

    const elAbout = doc.querySelector(".about");
    if (elAbout) elAbout.textContent = valBio;

    // Bersihkan isi container render lama sebelum inject baru
    const renderPengalaman = document.querySelector(".p.for-pengalaman .group-list");
    const renderPendidikan = document.querySelector(".p.for-pendidikan .group-list");
    const renderKeahlian = document.querySelector(".p.for-keahlian ul");

    if (renderPengalaman) renderPengalaman.innerHTML = "";
    if (renderPendidikan) renderPendidikan.innerHTML = "";
    if (renderKeahlian) renderKeahlian.innerHTML = "";

    // Looping DOM Pengalaman (Memasukkan data dari timeline ke layout cetak)
    if (wadahPengalaman && renderPengalaman) {
      wadahPengalaman.querySelectorAll(".timeline-item").forEach(el => {
        const titleEl = el.querySelector("h4");
        const dateEl = el.querySelector("span");
        if (titleEl && dateEl) {
          renderPengalaman.innerHTML += `
            <div class="desc">
              <p>${titleEl.textContent}</p>
              <b>${dateEl.textContent}</b>
            </div>
          `;
        }
      });
    }

    // Looping DOM Pendidikan
    if (wadahPendidikan && renderPendidikan) {
      wadahPendidikan.querySelectorAll(".timeline-item").forEach(el => {
        const titleEl = el.querySelector("h4");
        const dateEl = el.querySelector("span");
        if (titleEl && dateEl) {
          renderPendidikan.innerHTML += `
            <div class="desc">
              <p>${titleEl.textContent}</p>
              <b>${dateEl.textContent}</b>
            </div>
          `;
        }
      });
    }

    // Looping DOM Keahlian
    if (wadahKeahlian && renderKeahlian) {
      Array.from(wadahKeahlian.children).forEach(el => {
        const spanText = el.querySelector("span");
        if (spanText) {
          renderKeahlian.innerHTML += `<li>${spanText.textContent}</li>`;
        }
      });
    }
  }

  // 6. Jalankan Proses Print
  document.body.classList.add("print");

  // Timeout bersarang untuk memberikan DOM reflow rendering template display: grid
  setTimeout(() => {
    window.print();
    setTimeout(() => {
      document.body.classList.remove("print");
    }, 500);
  }, 150);
}

// Hapus invalid state saat pengetikan ulang
document.querySelectorAll(".input-group input, .input-group textarea").forEach(input => {
  input.addEventListener("input", (e) => {
    e.target.parentElement.classList.remove("invalid");
  });
});