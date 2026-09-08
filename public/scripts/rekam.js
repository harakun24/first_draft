let history2 = [2];

function navigate(num, state = true) {
  console.log(num)

  if (state)
    history2.push(num);
  if (num == 1)
    resetValue();
  // counting()
  document.querySelector(".active")?.classList.remove("active");
  document.querySelectorAll(".ctrl-timer")[num - 1].classList.add("active");
  document.querySelectorAll(".view").forEach(e => {
    e.style.cssText = "display:none"
  })
  document.querySelector(`.view:nth-child(${num})`).style.cssText = "display:grid"
}

function savePdf() {
  const checklistEl = document.querySelector(".checklist");
  const downloadBtn = checklistEl.querySelector(".download");

  // Sembunyikan tombol download sementara agar tidak ikut masuk ke dalam PDF
  downloadBtn.style.display = "none";

  const { jsPDF } = window.jspdf

  const doc = new jsPDF({
    orientation: "p",
    unit: "mm",
    format: "a4",
  })

  doc.html(checklistEl, {
    callback: function (doc) {
      doc.save("surat lamaran.pdf")
      downloadBtn.style.display = "";
    }, autoPaging: "text", width: 210, windowWidth: 800
  })


};