
function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    videoId: "xV9_gIO8Zk4",
    width: "100%",
    height: "100%",
  });
}

const datas = document.querySelector(".group-list");

function jumpSegmen(e) {
  document.querySelector(".segmen.active")?.classList.remove("active");
  const view = e.currentTarget.dataset.jump;
  if (player)
    player.pauseVideo()
  e.currentTarget.classList.add("active");
  document.querySelector(".area.active")?.classList.remove("active");
  document.querySelector(".area." + view).classList.add("active");
  store.add("film-state", view);
}


document.querySelector("[data-jump='video']").click();


function choose(num) {
  store.add("film-choice", num == 1 ? "Visual yang terdiri dari komposisi, warna dan gerak." : num == 2 ? "Cerita yang terdiri dari tokoh, konflik dan alur. " : "Musik yang terdiri dari irama, suasana dan emosi. ");
  document.querySelector(".modal2").hidePopover();
}

async function saveProgress() {
  document.querySelector(".modal2").showPopover();

  const textField = {};

  textField.title = document.querySelector("input[name='title']").value;
  textField.message = document.querySelector("input[name='message']").value;
  textField.reason = document.querySelector("input[name='reason']").value;

  const choice = store.get("film-choice");

  document.querySelector(".table .preferensi").textContent = `Yang paling menarik perhatian saat pertama menonton film pendek, adalah ${choice}`;

  document.querySelector(".table .refleksi").textContent = `Salah satu film pendek atau tayangan inspiratif yang diingat berjudul ${textField.title}. Pesan moral atau nilai kehidupannya adalah: ${textField.message} dan mengapa itu penting, karena ${textField.reason}`;

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
    const pdf = new jsPDF({ orientation: 'l', unit: 'mm', format: [pdfWidth, pdfHeight] });


    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

    pdf.save('laporan bab 2 media 1.pdf');

  } catch (error) {
    console.error('Terjadi kesalahan saat mengunduh:', error);
  }
}