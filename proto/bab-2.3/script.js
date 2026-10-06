function simpanForm() {
  const judul = document.getElementById("judul")?.value || (store.get("form-cerita")?.judul || "");
  const tema = document.getElementById("tema")?.value || (store.get("form-cerita")?.tema || "");
  const latar = document.getElementById("latar")?.value || (store.get("form-cerita")?.latar || "");
  const tokoh = document.getElementById("tokoh")?.value || (store.get("form-cerita")?.tokoh || "");
  const sinopsis = document.getElementById("sinopsis")?.value || (store.get("form-cerita")?.sinopsis || "");

  store.set("form-cerita", { judul, tema, tokoh, latar, sinopsis, });

  console.log(store.get("form-cerita"));
}

function navigate(key) {
  const views = [
    `<div class="view" data-module="1"><div id="player"/></div>`,
    ` <div class="view" data-module="2">
          <b>Formulir Fondasi cerita</b>
          <h2>Gunakan unsur cerpen untuk film berdurasi 5-10 menit</h2>
          <div class="form-group">
            <div class="input-group">
              <label for="judul">Judul Film Adaptasi</label>
              <i class="fas fa-info-circle pointer"></i>
              <input
                class="wrapper box"
                type="text"
                id="judul"
                placeholder="Contoh: Melawan Londo Ireng" onchange="saveInput(event)" />
            </div>
            <div class="input-group">
              <label for="tema">Tema Utama</label>
              <i class="fas fa-info-circle pointer"></i>
              <input
                class="wrapper box"
                type="text"
                id="tema"
                placeholder="Contoh: Perjuangan memajukan bangsa dan negara."  onchange="saveInput(event)" />
            </div>
            <div class="input-group">
              <label for="latar">Latar Tempat dan Waktu</label>
              <i class="fas fa-info-circle pointer"></i>
              <input
                class="wrapper box"
                type="text"
                id="latar"
                placeholder="Contoh: Sore hari di depan koperasi merah putih."  onchange="saveInput(event)" />
            </div>
            <div class="input-group">
              <label for="tokoh">Tokoh dan Pewatakan</label>
              <i class="fas fa-info-circle pointer"></i>
              <input
                class="wrapper box"
                type="text"
                id="tokoh"
                placeholder="Contoh: Arya (tokoh utama), Gilang (humoris), Adi (antagonis)"  onchange="saveInput(event)" />
            </div>
            <div class="input-group">
              <label for="sinopsis">Sinopsis 3-5 Kalimat</label>
              <i class="fas fa-info-circle pointer"></i>
              <textarea name="" id="sinopsis" class="wrapper box"  onchange="saveInput(event)"></textarea>
            </div>
            <button class="save pointer" onclick="simpanForm()">Simpan</button>
          </div>
        </div>`, ` <div class="view" data-module="3">
          <button class="add pointer" onclick="addShot()">
            tambah shot <i class="fas fa-plus"></i>
          </button>
          <div class="group-shot wrapper box">
            <div
              class="shot pointer active"
              data-shot="1"
              onclick="setShot(event)">
              <h4>Shot 1</h4>
              <p>belum lengkap</p>
            </div>
          </div>
          <div class="fill-area wrapper box">
            <h3>Gambar / Referensi Shot</h3>
            <div class="upload-field">
              <i class="fas fa-arrow-up"></i>
              <h2>Unggah Gambar</h2>
              <p>Maksimal 5 MB</p>
              <input
                type="file"
                onchange="setImg(event)"
                id="picture-pick"
                accept="image/*" />
              <button class="upload pointer" onclick="uploadImg()">
                Pilih gambar dari perangkat
              </button>
              <img src="hide" alt="preview" class="preview" />
            </div>
            <div class="side-info">
              <div class="input-field">
                <b>Deskripsi Visual</b>
                <textarea
                  name=""
                  class="wrapper box"
                  id="description"
                  placeholder="Tuliskan aksi, posisi tokoh dan latar bila tanpa gambar"></textarea>
              </div>
            </div>
          </div>
        </div>`, "", `
         <div class="view" data-module="3">
          <button class="add pointer" onclick="addShot()">
            tambah shot <i class="fas fa-plus"></i>
          </button>
          <div class="group-shot wrapper box">
            <div
              class="shot pointer active"
              data-shot="1"
              onclick="setShot(event)">
              <h4>Shot 1</h4>
            </div>
          </div>
          <div class="fill-area wrapper box">
            <h3>Referensi Shot</h3>
            <div class="upload-field">
              <i class="fas fa-arrow-up"></i>
              <h2>Unggah Gambar</h2>
              <p>Maksimal 5 MB</p>
              <input
                type="file"
                onchange="setImg(event)"
                id="picture-pick"
                accept="image/*" />
              <button class="upload pointer" onclick="uploadImg()">
                Pilih gambar dari perangkat
              </button>
              <img src="hide" alt="preview" class="preview" />
            </div>
            <div class="side-info">
              <b>Parameter Shot</b>
              <div class="group">
                <div class="box-group" data-param="sudut">
                  <b>Sudut Kamera</b>
                  <button
                    class="pointer active"
                    data-option="1"
                    onclick="changeOption(event)">
                    High
                  </button>
                  <button
                    class="pointer"
                    data-option="2"
                    onclick="changeOption(event)">
                    Eye Level
                  </button>
                  <button
                    class="pointer"
                    data-option="3"
                    onclick="changeOption(event)">
                    Low
                  </button>
                </div>
                <div class="box-group" data-param="ukuran">
                  <b>Ukuran Shot</b>
                  <button
                    class="pointer active"
                    data-option="1"
                    onclick="changeOption(event)">
                    ELS
                  </button>
                  <button
                    class="pointer"
                    data-option="2"
                    onclick="changeOption(event)">
                    LS
                  </button>
                  <button
                    class="pointer"
                    data-option="3"
                    onclick="changeOption(event)">
                    MS
                  </button>
                  <button
                    class="pointer"
                    data-option="4"
                    onclick="changeOption(event)">
                    CU
                  </button>
                </div>
                <div class="box-group" data-param="pergerakan">
                  <b>Pergerakan</b>
                  <button
                    class="pointer active"
                    data-option="1"
                    onclick="changeOption(event)">
                    Static
                  </button>
                  <button
                    class="pointer"
                    data-option="2"
                    onclick="changeOption(event)">
                    Panning
                  </button>
                  <button
                    class="pointer"
                    data-option="3"
                    onclick="changeOption(event)">
                    Tilting
                  </button>
                  <button
                    class="pointer"
                    data-option="4"
                    onclick="changeOption(event)">
                    Tracking
                  </button>
                </div>
                <div class="box-group" data-param="durasi">
                  <b>durasi</b>
                  <input
                    type="text"
                    id="durasi"
                    placeholder="Contoh: 12 detik" />
                </div>
              </div>
              <div class="group">
                <div class="input-field">
                  <b>Deskripsi Visual</b>
                  <textarea
                    name=""
                    class="wrapper box"
                    id="description"
                    placeholder="Tuliskan aksi, posisi tokoh dan latar bila tanpa gambar"></textarea>
                </div>
                <div class="input-field">
                  <b>Dialog</b>
                  <textarea
                    name=""
                    class="wrapper box"
                    id="dialog"
                    placeholder="Tuliskan percakapan yang terjadi di sini."></textarea>
                </div>
              </div>
              <button class="save pointer">Simpan</button>
            </div>
          </div>
        </div>
        `

  ];

  document.querySelector(".views").innerHTML = views[key];
  document.querySelector(".group-list .item.active")?.classList.remove("active");
  document.querySelectorAll(".group-list .item")[key].classList.add("active");

  if (key == 1) {
    if (store.get("form-cerita")) {
      document.getElementById("judul").value = (store.get("form-cerita")?.judul || "");
      document.getElementById("tema").value = (store.get("form-cerita")?.tema || "");
      document.getElementById("latar").value = (store.get("form-cerita")?.latar || "");
      document.getElementById("tokoh").value = (store.get("form-cerita")?.tokoh || "");
      document.getElementById("sinopsis").value = (store.get("form-cerita")?.sinopsis || "");
    }
  }
  else if (key == 2) {
    if (store.get("picture-shot")) {
      console.log(store.get("picture-shot"))
      for (let shot in store.get("picture-shot")) {
        shot = shot.split("-")[1];
        if (shot == 1) continue;
        addShot();
      }
      const id = document.querySelector(".shot.active").dataset.shot;
      try {
        // store.get("picture-shot")[`data-${id}`]
        document.querySelector(".preview").src = store.get("picture-shot")[`data-${id}`] || "hide";
      } catch {
        store.add("picture-shot", { [`data-${id}`]: null })
      }
    }
    else {
      store.add("picture-shot", { [`data-1`]: { img: null, txt: null } })
    }

    const gshot = document.querySelector(".group-shot");
    gshot.addEventListener("wheel", event => {
      event.preventDefault();
      gshot.scrollLeft += event.deltaY;
    })

    let isDown = false;
    let startX, scrollLeft;

    gshot.addEventListener("mousedown", event => {
      isDown = true;
      startX = event.pageX - gshot.offsetLeft;
      scrollLeft = gshot.scrollLeft;
    })

    gshot.addEventListener("mouseup", () => isDown = false);
    gshot.addEventListener("mouseleave", () => isDown = false);
    gshot.addEventListener("mousemove", event => {
      if (!isDown) return;
      event.preventDefault();
      const x = event.pageX - gshot.offsetLeft;
      const walk = (x - startX) * 2;
      gshot.scrollLeft = scrollLeft - walk;
    })
    console.log(store.get("picture-shot"));

  }

}

store.clean()
navigate(0);

function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    videoId: "t3pjBPl0T9k",
    width: "100%",
    height: "100%",
    // events: {
    //   onStateChange: onPlayerStateChange
    // }
  });
}

function saveInput(e) {
  store.add("form-cerita", { [e.currentTarget.id]: e.currentTarget.value })
  console.log(store.get("form-cerita"));
}


function addShot() {
  const wrapper = document.querySelector(".group-shot");
  try {
    store.get("picture-shot")[`data-${wrapper.children.length}`];
  } catch {
    store.add("picture-shot", { [`data-${wrapper.children.length}`]: { img: null, txt: null } })
  }
  wrapper.children[wrapper.children.length - 1].insertAdjacentHTML(`afterend`, `  <div class="shot pointer" data-shot="${wrapper.children.length + 1}" onclick="setShot(event)">
              <h4>Shot ${wrapper.children.length + 1}</h4>
            </div>`)
  console.log(store.get("picture-shot"));

}

function uploadImg() {
  document.querySelector("#picture-pick").click();
}

async function setImg(event) {
  const img = event.currentTarget.files[0];
  if (img) {
    if (img.size > 4 * 1024 * 1024)
      return alert("file terlalu besar");
    const base64 = await (() => {
      return new Promise(res => {
        const read = new FileReader();
        read.onload = function (e) {
          const b24 = e.target.result;
          res(b24);
        }
        read.readAsDataURL(img);
      })
    })();
    const shot = document.querySelector(".shot.active").dataset.shot;
    try {
      store.add("picture-shot", { [`data-${shot}`]: { img: base64, txt: store.get("picture-shot")[`data-${shot}`].txt } })

    } catch {
      store.add("picture-shot", { [`data-${shot}`]: { img: base64, txt: null } })

    }
    document.querySelector(".preview").src = base64;
    console.log(store.get("picture-shot"));
  }
}

function setShot(event) {
  document.querySelectorAll(".shot").forEach(el => el.classList.remove("active"));
  event.currentTarget.classList.add("active");
  let prev;
  try {

    prev = store.get("picture-shot")[`data-${event.currentTarget.dataset.shot}`].img;
    console.log({ prev })
  }
  catch {
    store.set("picture-shot", { [`data-${event.currentTarget.dataset.shot}`]: { img: null, txt: null } })
  }
  document.querySelector(".preview").src = prev || "hide";
}

function changeOption(el) {
  const group = el.currentTarget.parentElement;
  group.querySelector(".active")?.classList.remove("active");
  el.currentTarget.classList.add("active")
}