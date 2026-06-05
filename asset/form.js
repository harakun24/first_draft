const capture = {
  bio: [],
  para: {
    pembuka: "",
    penutup: ""
  }

}

injectText("tanggal", "date")
injectText("alamat", "address")
injectText("perihal", "prevPerihal")
injectText("lampiran", "prevLampiran")
injectText("pembuka", "prevPembuka")
injectText("penutup", "prevPenutup")
injectText("nama", "prevNama")

capture.show = document.getElementById("showBody")

function anchorInput(label) {
  capture[label] = document.getElementById(label)
}

function injectText(input, prevText) {
  anchorInput(input)
  capture[input].onkeyup = (e) => {
    document.getElementById(prevText).innerText = capture[input].value
  }

}

capture.show.onclick = () => {
  const rows = capture.biodata ? capture.biodata.map((data, key) => {
    return `
    <tr class="bio-row">
    <td>
              <input
                type="text"
                class="bio-label"
                placeholder="label data seperti: nama, alamat, usia, dll" value="${data[0]}" />
            </td>
            <td>:</td>
            <td>
              <input
                type="text"
                class="bio-value"
                placeholder="isi data dari label" value="${data[1]}" onkeyup="if(event.key==='Enter'){
                addField()}" />
            </td>
            <td><button ${key == 0 ? "disabled" : ""} onclick="delField(this)">hapus</button></td>
    </tr>
    `
  }).join("") : ""
  Swal.fire({
    title: "<strong>Isi Surat</strong>",
    html: `
   <table>
  <tr>
    <td>Paragraf Pembuka</td>
    <td>:</td>
    <td>
      <textarea id="addPembuka">${capture.para.pembuka}</textarea>
    </td>
  </tr>
  <tr>
    <td colspan="3">
      <fieldset>
        <legend>data diri</legend>
        
        <table id="bio-table">
        ${capture.biodata ? rows : `<tr class="bio-row">
         <td>
              <input
                type="text"
                class="bio-label"
                placeholder="label data seperti: nama, alamat, usia, dll" />
            </td>
            <td>:</td>
            <td>
              <input
                type="text"
                class="bio-value"
                placeholder="isi data dari label" onkeydown="if(event.key=='Enter')addField()" />
            </td>
            <td><button disabled>hapus</button></td>
        </tr>`}
        
        </table>
        <button id="addData" onclick="addField()">tambah data</button>
      </fieldset>
    </td>
  </tr>
   <tr>
    <td>Paragraf Penutup</td>
    <td>:</td>
    <td>
      <textarea id="addPenutup">${capture.para.penutup}</textarea>
    </td>
  </tr>
</table>

  `,
    showCloseButton: true,
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonText: `
    Simpan
  `,
    confirmButtonAriaLabel: "Thumbs up, great!",
    cancelButtonText: `
    Batal
  `,
    cancelButtonAriaLabel: "Thumbs down",
    preConfirm: () => {
      const biodata = [];
      document.querySelectorAll(".bio-row").forEach(row => {
        const label = row.querySelector(".bio-label").value;
        if (label) {
          const value = row.querySelector(".bio-value").value;
          biodata.push([label, value])
        }
      })
      return {
        pembuka: document.getElementById("addPembuka").value,
        biodata,
        penutup: document.getElementById("addPenutup").value,
      }
    }
  }).then((result) => {
    if (!result.isConfirmed) return;
    capture.biodata = result.value.biodata;
    capture.para.pembuka = result.value.pembuka
    capture.para.penutup = result.value.penutup

    refreshIsi()

  });
}

function addField() {
  const row = document.createElement("tr");
  row.classList.add("bio-row")
  row.innerHTML = `
  <td>
              <input
                type="text"
                class="bio-label"
                placeholder="label data seperti: nama, alamat, usia, dll" />
            </td>
            <td>:</td>
            <td>
              <input
                type="text"
                class="bio-value"
                placeholder="isi data dari label" />
            </td>
            <td><button onclick="delField(this)">hapus</button></td>
  `
  document.getElementById("bio-table").appendChild(row)

}

function delField(t) {
  t.parentElement.parentElement.remove();
}

function refreshIsi() {
  const bio = document.getElementById("prevBio");
  document.getElementById("paraPembuka").innerText = capture.para.pembuka;
  document.getElementById("paraPenutup").innerText = capture.para.penutup;
  bio.innerHTML = capture.biodata.map(data => {

    return `
    <tr>
              <td class="text-break">${data[0]}</td>
              <td>:</td>
              <td class="text-break">${data[1]}</td>
            </tr>
    `
  }).join("")
}

async function pdfSave() {
  // document.querySelector(".container-prev").classList.add("printing");
  const y = document.querySelector(".preview").innerHTML;
  var element = document.createElement("div");
  element.innerHTML = y
  var opt = {
    margin: 0.4,
    filename: 'surat lamaran.pdf',
    image: { type: 'jpeg', quality: 1 },
    html2canvas: { scale: 4 },
    jsPDF: { unit: 'in', format: "a4", orientation: 'portrait' },

  };

  // New Promise-based usage:
  await html2pdf().set(opt).from(element).save();
  // document.querySelector(".preview").classList.remove("printing");
  // document.querySelector(".container-prev").classList.remove("printing");

}
function imgSave() {
  const y = document.querySelector(".preview").innerHTML;
  var element = document.createElement("div");
  element.innerHTML = y
  element.style.cssText = "font-size:1.5em;width:794px; position:absolute;left:-999999px;top:0;z-index:-1"
  document.body.appendChild(element)
  // document.querySelector(".container-prev").classList.add("printing");
  html2canvas(element, { scale: 4 }).then(canvas => {
    const link = document.createElement("a");
    link.download = "surat lamaran.jpg"
    link.href = canvas.toDataURL("images/jpeg", 1)
    link.click()
  }).then(() => {
    element.remove()
    // document.querySelector(".container-prev").classList.remove("printing");
  })

}

function togglePrev() {
  document.querySelector(".preview").classList.toggle("hidden")
  document.querySelector(".cover").classList.toggle("hidden")
}