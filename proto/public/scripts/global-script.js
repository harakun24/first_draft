const route = [
  "",
  "bab-1.1-etika-kerja-dan-strategi-dokumen-lamaran-mengesankan",
  "bab-1.4-Menulis-Surat-Lamaran-Kerja-Efektif-dan-Mendesain-CV-Digital",
  "bab-2.2"

];

let player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    videoId: "9TwsvY_iGys",
    width: "100%",
    height: "100%",
    events: {
      onStateChange: onPlayerStateChange
    }
  });
}


const main = document.querySelector(".main");
if (document.body.dataset.refer != 0)
  main.insertAdjacentHTML("beforebegin", ` <div class="navbar hide">
      <span
        ><b>DAFTAR MENU</b
        ><i class="pointer" onclick="menuToggle()"
          ><i class="fas fa-close"></i></i
      ></span>
      <!-- start -->
      <div class="item wrapper pointer">
        <h4 data-dropdown="1" data-state="0">
          <span
            >Bab 1: Menulis Surat Lamaran Kerja dan Riwayat Hidup yang
            Mengesankan</span
          >
          <div class="icon"><i class="fas fa-angle-down"></i></div>
        </h4>
      </div>
      <div class="item-detail hide" data-detail="1">
        <div class="detail wrapper pointer hide" data-link="1">
          <b><i class="fas fa-angle-right"> </i> Media 1 </b>
          <p>Etika Kerja dan Strategi Dokumen Lamaran Mengesankan</p>
        </div>
        <div class="detail wrapper pointer hide" data-link="1">
          <b><i class="fas fa-angle-right"> </i> Media 1 </b>
          <p>Etika Kerja dan Strategi Dokumen Lamaran Mengesankan</p>
        </div>
      </div>
      <!-- start end -->
      <h4 class="header pointer" data-link="0">
        Beranda &nbsp;&nbsp;&nbsp;&nbsp; <i class="fas fa-home"></i>
      </h4>
    </div>
    <div class="header wrapper">
      <h1 class="pointer" onclick="menuToggle()">
        <i class="fas fa-bullhorn"></i>Wacana<span>Lab</span>
      </h1>

      <p>
        <span>Etika Kerja dan Strategi Dokumen Lamaran Mengesankan</span>
        <br /><br />
        <i>Bab 1 Media 1</i>
      </p>
    </div>`)
main.insertAdjacentHTML("afterend", ` <div class="footer">
      <b><i class="fas fa-copyright"></i>WacanaLab 2026</b>
    </div>`)

document.querySelectorAll("[data-link]").forEach(e => {
  if (e.dataset.link != document.body.dataset.refer)
    e.addEventListener("click", () => window.location = `../${route[e.dataset.link]}`);
})


document.querySelectorAll("[data-dropdown]").forEach(dd => {
  console.log({ dd })
  dd.addEventListener("click", event => {
    const title = dd.parentElement;
    const icon = title.dataset.state - 0 > 0 ? "down" : "up";
    title.setAttribute("data-state", icon == "down" ? 0 : 1);

    title.querySelector(".icon").innerHTML = `<i class="fas fa-angle-${icon}"></i>`

    const target = document.querySelector(`[data-detail="${dd.dataset.dropdown - 0}"]`);
    target.classList.toggle("hide")

  })
})

function menuToggle() {
  document.querySelector(".navbar").classList.toggle("hide");
}