// let player;
// let animId;
// let isSeeking = false;
// let lastTime = 0;
// const triggerQuiz = new Set()
// const seeker = document.querySelector("input[type='range']");
// const popover = document.querySelector(".modal");

// const dataList = [{
//   time: 30,
//   title: "Kesan Pertama"
// }, {
//   time: 72,
//   title: "Format & Struktur"
// }, {
//   time: 108,
//   title: "Detail Bahasa"
// }, {
//   time: 144,
//   title: "Dokumen & ATS"
// }, {
//   time: 200,
//   title: "Koreksi Mandiri"
// }]

// function onYouTubeIframeAPIReady() {
//   player = new YT.Player("player", {
//     videoId: "kkk_y1_C-80",
//     width: "100%",
//     height: "100%",
//     events: {
//       onStateChange: onPlayerStateChange
//     }
//   })
// }

// function onPlayerStateChange(event) {
//   const btn = document.getElementById("ctrl");
//   const timer = document.querySelectorAll(".ctrl-timer")
//   timer.forEach(e => {
//     const currentTime = player.getCurrentTime();
//     if (currentTime > e.dataset.jumpTo) {
//       document.querySelector(".ctrl-timer.active")?.classList.remove("active")
//       e.classList.add("active")
//     }
//   })

//   if (event.data == YT.PlayerState.PLAYING) {
//     btn.innerHTML = ` <i class="fas fa-pause"></i>`
//     watchBar()
//   }
//   else if (event.data == YT.PlayerState.PAUSED || event.data == YT.PlayerState.ENDED) {
//     btn.innerHTML = ` <i class="fas fa-play"></i>`
//     cancelAnimationFrame(animId)
//   }
// }


// function watchBar() {
//   if (!isSeeking && player && player.getDuration) {
//     const currentTime = player.getCurrentTime();
//     const duration = player.getDuration()
//     if (currentTime < lastTime - 1)
//       updateQuizState(currentTime)
//     lastTime = currentTime;
//     if (duration > 0)
//       seeker.value = (currentTime / duration * 100)
//     for (const q of dataList) {
//       if (currentTime >= q.time && !triggerQuiz.has(q.time)) {
//         triggerQuiz.add(q.time)
//         player.pauseVideo()
//         showModal(q)
//         return;
//       }
//     }
//   }
//   if (player.getPlayerState() == YT.PlayerState.PLAYING)
//     animId = requestAnimationFrame(watchBar)
// }

// function updateQuizState(timer) {
//   dataList.forEach(e => {
//     if (e.time > timer)
//       triggerQuiz.delete(e.time)
//     else
//       triggerQuiz.add(e.time)
//   })
// }

// function showModal(data) {
//   popover.querySelector("#timerAt").innerText = data.title
//   popover.showPopover()
// }

// function togglePlay() {
//   if (player.getPlayerState() == 1)
//     player.pauseVideo()
//   else
//     player.playVideo()
// }

// function jumpTo(s, t) {
//   if (!player || !player.seekTo) return;

//   const currentTime = player.getCurrentTime();
//   const duration = player.getDuration()
//   updateQuizState(parseFloat(t.dataset.jumpTo))
//   if (duration > 0)
//     seeker.value = (currentTime / duration * 100)

//   player.seekTo(s, true)
//   player.playVideo()
// }

// seeker.addEventListener("pointerdown", () => isSeeking = true)

// seeker.addEventListener("pointerup", () => {
//   const duration = player.getDuration()

//   if (duration > 0) {
//     const targetTime = (seeker.value / 100) * duration;
//     updateQuizState(targetTime)
//     player.seekTo(targetTime, true)
//   }
//   isSeeking = false;

// })

// popover.addEventListener("toggle", (e) => {
//   if (e.newState == "closed")
//     if (player)
//       player.playVideo()
// })

let template = 1;
let history2 = [2];

function navigate(num, state = true) {


  if (state)
    history2.push(num);
  if (num == 2)
    resetValue();
  // counting()
  document.querySelector(".active")?.classList.remove("active");
  document.querySelectorAll(".ctrl-timer")[num - 1].classList.add("active");
  document.querySelectorAll(".view").forEach(e => {
    e.style.cssText = "display:none"
  })
  document.querySelector(`.view:nth-child(${num - 1})`).style.cssText = "display:grid"
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

function validate() {
  document.querySelectorAll('[data-target]').forEach(slot => {
    const item = slot.children[0];
    if (item) {
      const isCorrect = item.dataset.item == slot.dataset.target;
      slot.classList.toggle(isCorrect ? "correct" : "wrong")
    }
  })
  counting()
  navigate(3)
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

function navigateOn(num) {
  template = num;
  document.querySelector(".left").setAttribute("data-template", num)
  document.getElementById("tmp").innerText = num == 1 ? "Minimalis" : num == 2 ? "Kreatif" : "ATS-friendly"
  navigate(5)
}

function backGo() {
  // console.log(history2)
  if (history2.length > 1)
    history2.pop()
  const delNum = history2[history2.length - 1];
  // console.log({ history2 })
  navigate(delNum, false)
}

const nameInput = document.getElementById('name');
let previewName = "";

nameInput.addEventListener('input', function () {
  previewName = this.value || 'Nama Anda';
});

// async function saveCV() {
//   const { jsPDF } = window.jspdf;
//   const cvElement = document.createElement("div");
//   cvElement.setAttribute("id", "cv-content");
//   cvElement.innerHTML = `
//   <div class="cv-header">
//             <h1 id="preview-name">John Doe</h1>
//             <p>Web Developer | Fresh Graduate</p>
//         </div>
//         <div class="cv-section">
//             <h3>Tentang Saya</h3>
//             <p>Seorang pengembang web yang antusias dengan pemahaman mendalam mengenai pengembangan antarmuka pengguna dan struktur data web modern.</p>
//         </div>
//         <div class="cv-section">
//             <h3>Pendidikan</h3>
//             <p>Universitas Contoh Indonesia — S1 Teknik Informatika (2020 - 2024)</p>
//         </div>
//   `
//   cvElement.querySelector('#preview-name').textContent = previewName;

//   try {
//     // Render elemen HTML menjadi Canvas
//     document.body.appendChild(cvElement)
//     const canvas = await html2canvas(cvElement, {
//       scale: 2, // Skala ditingkatkan agar hasil cetak tidak pecah (tajam)
//       useCORS: true
//     });

//     const imgData = canvas.toDataURL('image/png');
//     const pdf = new jsPDF('p', 'mm', 'a4');

//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

//     // Masukkan gambar canvas ke dalam dokumen PDF
//     pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
//     pdf.save('cv-user.pdf');
//   } catch (error) {
//     console.error('Terjadi kesalahan saat mengunduh CV:', error);
//   }
//   cvElement.remove()
// }

async function saveCV() {
  const { jsPDF } = window.jspdf;
  const nameValue = document.getElementById('name').value || 'Nama Anda';

  const cvElement = document.createElement("div");
  cvElement.setAttribute("id", "cv-content");

  // Berikan gaya inline agar elemen tersembunyi dari pandangan pengguna 
  // namun tetap bisa dirender oleh html2canvas (tidak menggunakan display: none)
  cvElement.style.position = "fixed";
  cvElement.style.left = "-9999px";
  cvElement.style.top = "0";
  cvElement.style.width = "210mm";
  cvElement.style.minHeight = "297mm";
  cvElement.style.background = "white";
  cvElement.style.padding = "20mm";
  cvElement.style.boxSizing = "border-box";
  cvElement.style.zIndex = "-1000";

  cvElement.innerHTML = `
        <div class="cv-header" style="border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 20px;">
            <h1 id="preview-name" style="margin: 0; font-size: 28px; color: #333;">${nameValue}</h1>
            <p style="margin: 5px 0 0; color: #666;">Web Developer | Fresh Graduate</p>
        </div>
        <div class="cv-section" style="margin-bottom: 20px;">
            <h3 style="margin-bottom: 8px; color: #007bff; border-bottom: 1px solid #ddd; padding-bottom: 4px;">Tentang Saya</h3>
            <p style="margin: 0; color: #444; line-height: 1.5;">Seorang pengembang web yang antusias dengan pemahaman mendalam mengenai pengembangan antarmuka pengguna dan struktur data web modern.</p>
        </div>
        <div class="cv-section" style="margin-bottom: 20px;">
            <h3 style="margin-bottom: 8px; color: #007bff; border-bottom: 1px solid #ddd; padding-bottom: 4px;">Pendidikan</h3>
            <p style="margin: 0; color: #444; line-height: 1.5;">Universitas Contoh Indonesia — S1 Teknik Informatika (2020 - 2024)</p>
        </div>
    `;

  document.body.appendChild(cvElement);

  try {
    const canvas = await html2canvas(cvElement, {
      scale: 2,
      useCORS: true
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('cv-user.pdf');
  } catch (error) {
    console.error('Terjadi kesalahan saat mengunduh CV:', error);
  } finally {
    cvElement.remove();
  }
}