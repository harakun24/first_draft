
function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    videoId: "KKJTTNkRZsI",
    width: "100%",
    height: "100%",
  });
}

const datas = document.querySelector(".group-list");
const randoM = Array.from(datas.querySelectorAll(".item"));
for (let i = randoM.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [randoM[i], randoM[j]] = [randoM[j], randoM[i]];

  randoM.forEach(e => {
    datas.appendChild(e)
  })
}

function jumpSegmen(e) {
  document.querySelector(".segmen.active")?.classList.remove("active");
  const view = e.currentTarget.dataset.jump;
  if (player)
    player.pauseVideo()
  e.currentTarget.classList.add("active");
  document.querySelector(".area.active")?.classList.remove("active");
  document.querySelector(".area." + view).classList.add("active");
  store.add("cv-state", view);
}

let draggedItem = null;


function drag(e) {
  draggedItem = e.target;
}

function dropToSlot(e) {
  e.preventDefault();
  const slot = e.currentTarget;
  const pool = document.querySelector('[data-pool]')

  if (slot.children.length > 0)
    pool.appendChild(slot.children[0])
  slot.appendChild(draggedItem)
  const num = 9 - document.querySelectorAll(".group-list .item").length;
  document.getElementById("counter").innerText = `${num}/9`;
  resetValue()
  // counting()
}

function dropToPool(e) {
  e.preventDefault()
  document.querySelector("[data-pool]").appendChild(draggedItem)
  const num = 9 - document.querySelectorAll(".group-list .item").length;
  document.getElementById("counter").innerText = `${num}/9`;
  // console.log(num)
  resetValue()
  // counting()
}

function resetValue() {
  const num = 9 - document.querySelectorAll(".group-list .item").length;
  document.getElementById("counter").innerText = `${num}/9`;
  document.querySelectorAll("[data-target]").forEach(e => {
    e.classList.remove('correct')
    e.classList.remove('wrong')
  })
  document.querySelectorAll(".label").forEach(e => {
    e.classList.remove("wrong", "correct")
    e.querySelector(".dfas").innerHTML = "";
  })
}
function validate() {
  document.querySelectorAll('[data-target]').forEach(slot => {
    const item = slot.children[0];
    if (item) {
      const isCorrect = item.dataset.item == slot.dataset.target;
      slot.classList.toggle(isCorrect ? "correct" : "wrong")
    }
  })
  counting();

  // navigate(3)
}


function counting() {
  const num = document.querySelectorAll(".correct:has(.item)").length
  document.getElementById("counter").innerText = `${num}/9`;
  document.getElementById("con").innerText = `${num}`;

  const answ = document.querySelectorAll(".slot");
  answ.forEach(e => {
    if (e.classList.contains("correct")) {
      // console.log(e.dataset.target)
      const t = document.querySelector(`.label:nth-child(${e.dataset.target})`)

      t.classList.add("correct")
      const icon = document.createElement("i")
      icon.classList.add("fas", "fa-check")
      t.querySelector(".dfas").appendChild(icon)
    }
    else if (e.classList.contains("wrong")) {
      // console.log(e.dataset.target)
      const t = document.querySelector(`.label:nth-child(${e.dataset.target})`)

      t.classList.add("wrong")
      const icon = document.createElement("i")
      icon.classList.add("fas", "fa-close")
      t.querySelector(".dfas").appendChild(icon)
    }
  })

}

document.querySelector("[data-jump='video']").click();


function savePengalaman() {
  const pengalaman = document.querySelector("#pengalaman").value;
  const start = new Date(document.querySelector("#start").value).toLocaleDateString("id-ID", {
    month: "long",
    year: "numeric",
    timeZone: "UTC"
  });
  const end = new Date(document.querySelector("#end").value).toLocaleDateString("id-ID", {
    month: "long",
    year: "numeric",
    timeZone: "UTC"
  });
  const strResult = `
  <tr>
  <td>
  ${pengalaman}
  </td>
  <td>
  ${start == "Invalid Date" ? "Belum ada tanggal" : start}
  </td>
  <td>
  ${end == "Invalid Date" ? "Sekarang" : end}
  </td>
  <td><button onclick="delRow(event)" class="pointer"><div data-icon="../../public/feather/trash-2.svg"></div></button></td>
  </tr>
  `;
  document.querySelector(".tabel-pengalaman").insertAdjacentHTML("beforeend", strResult);
  document.querySelector("#pengalaman").value = "";
  document.querySelector("#start").value = "";
  document.querySelector("#end").value = "";
  document.querySelector(".modal").hidePopover();
}
function savePendidikan() {
  const pengalaman = document.querySelector("#pendidikan").value;
  const start = new Date(document.querySelector("#start2").value).toLocaleDateString("id-ID", {
    month: "long",
    year: "numeric",
    timeZone: "UTC"
  });
  const end = new Date(document.querySelector("#end2").value).toLocaleDateString("id-ID", {
    month: "long",
    year: "numeric",
    timeZone: "UTC"
  });
  const strResult = `
  <tr>
  <td>
  ${pengalaman}
  </td>
  <td>
  ${start == "Invalid Date" ? "Belum ada tanggal" : start}
  </td>
  <td>
  ${end == "Invalid Date" ? "Sekarang" : end}
  </td>
  <td><button onclick="delRow(event)" class="pointer"><div data-icon="../../public/feather/trash-2.svg"></div></button></td>
  </tr>
  `;
  document.querySelector(".tabel-pendidikan").insertAdjacentHTML("beforeend", strResult);
  document.querySelector("#pendidikan").value = "";
  document.querySelector("#start2").value = "";
  document.querySelector("#end2").value = "";
  document.querySelector(".modal3").hidePopover();
}

function delRow(e) {
  e.currentTarget.parentElement.parentElement.remove();
}

function openModal() {
  document.querySelector(".modal").showPopover();
}
function openModal2() {
  document.querySelector(".modal2").showPopover();
}
function openModal3() {
  document.querySelector(".modal3").showPopover();
}

function delLabel(e) {
  e.currentTarget.parentElement.remove()
}

function saveKeahlian() {
  const keahlian = document.querySelector("#keahlian").value;
  const strResult = `
  <div class="list">
                  <span>${keahlian}</span>
                  <div
                    class="pointer"
                    data-icon="../../public/feather/x.svg"
                    onclick="delLabel(event)"></div>
                </div>
  `;
  document.querySelector(".pengalaman .group-list").insertAdjacentHTML("beforeend", strResult);
  console.log(strResult)
  document.querySelector(".modal2").hidePopover()

}

async function unduh() {
  if (!store.get("cv-state"))
    store.set("cv-state", "");
  if (store.get("cv-state") != "cv")
    return document.querySelector("[data-jump='cv']").click();

  const nama = document.querySelector("#nama").value || "[Kosong]";
  const posisi = document.querySelector("#posisi").value || "[Kosong]";
  const nomor = document.querySelector("#nomor").value || "[Kosong]";
  const email = document.querySelector("#email").value || "[Kosong]";
  const alamat = document.querySelector("#alamat").value || "[Kosong]";
  const bio = document.querySelector("#bio").value || "[Kosong]";

  const pengalaman = document.querySelector(".tabel-pengalaman");
  const pendidikan = document.querySelector(".tabel-pendidikan");
  const keahlian = document.querySelector(".pengalaman .group-list");

  const doc = document.querySelector(".cv-doc");
  doc.querySelector("h2").textContent = nama;
  doc.querySelector(".jabatan").textContent = posisi;
  doc.querySelector(".no").textContent = nomor;
  doc.querySelector(".email").textContent = email;
  doc.querySelector(".alamat").textContent = alamat;
  doc.querySelector(".about").textContent = bio;

  document.querySelectorAll(".p .group-list")?.forEach(el => {
    el.innerHTML = "";
  });
  document.querySelector(".p ul").innerHTML = "";

  pengalaman.querySelectorAll("tr")?.forEach(el => {
    const p = el.querySelectorAll("td")[0].textContent;
    const start = el.querySelectorAll("td")[1].textContent;
    const end = el.querySelectorAll("td")[2].textContent;
    document.querySelector(".p.for-pengalaman .group-list").innerHTML += `
    <div class="desc">
            <b>${start} - ${end}</b>
            <p>${p}</p>
          </div>
    `
  })
  pendidikan.querySelectorAll("tr")?.forEach(el => {
    const p = el.querySelectorAll("td")[0].textContent;
    const start = el.querySelectorAll("td")[1].textContent;
    const end = el.querySelectorAll("td")[2].textContent;
    document.querySelector(".p.for-pendidikan .group-list").innerHTML += `
    <div class="desc">
            <b>${start} - ${end}</b>
            <p>${p}</p>
          </div>
    `
  })

  Array.from(keahlian.children).forEach(el => {
    document.querySelector(".p ul").innerHTML += `
  <li>${el.querySelector("span").textContent}</li>
  `
  });

  const { jsPDF } = window.jspdf;
  const el = document.querySelector(".cv-doc");
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

    pdf.save('cv-mandiri.pdf');

  } catch (error) {
    console.error('Terjadi kesalahan saat mengunduh:', error);
  }
}