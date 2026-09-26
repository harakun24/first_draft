let draggedItem = null;

function drag(e) {
  draggedItem = e.target;
}

function dropToSlot(e) {
  e.preventDefault();
  const slot = e.currentTarget;
  const pool = document.querySelector(".options .last");
  const key = slot.parentElement.dataset.label;
  if (slot.children.length > 0)
    pool.insertAdjacentElement("beforebegin", slot.children[0])
  slot.appendChild(draggedItem);
  store.add("cardGame", {
    [key]: Array.from(slot.parentElement.querySelectorAll(".slot:has(.item)")).map(item => item.querySelector("b").textContent)
  })
}

function dropToSort(e) {
  e.preventDefault();
  e.currentTarget.insertAdjacentElement("afterend", draggedItem);
}


function dropToPool(e) {
  e.preventDefault();
  const key = draggedItem.parentElement.parentElement.dataset.label;
  document.querySelector(".options .last").insertAdjacentElement("beforebegin", draggedItem)
  store.add("cardGame", {
    [key]: Array.from(draggedItem.parentElement.parentElement.querySelectorAll(".slot:has(.item)")).map(item => item.querySelector("b").textContent)
  })
}

function resetItem(e) {
  if (e.currentTarget.children.length > 0) {

    document.querySelector(".last").insertAdjacentElement("beforebegin", e.currentTarget.children[0])
    const key = e.currentTarget.parentElement.dataset.label;
    store.add("cardGame", {
      [key]: Array.from(e.currentTarget.parentElement.querySelectorAll(".slot:has(.item)")).map(item => item.querySelector("b").textContent)
    })
  }
}


function simpanKlasifikasi() {
  console.log(store.get("cardGame"))

}

function simpanForm() {
  const judul = document.getElementById("judul")?.value || "";
  const tokoh = document.getElementById("tokoh")?.value || "";
  const sinopsis = document.getElementById("sinopsis")?.value || "";
  const pesan = document.getElementById("pesan")?.value || "";
  const opini = document.getElementById("opini")?.value || "";

  store.set("formOpini", { judul, tokoh, sinopsis, pesan, opini });

  console.log(store.get("formOpini"));
}

function simpanDiagram() {
  document.querySelectorAll(".drag-group .item").forEach(el => {
    store.add("diagram", {
      [`diagram-[${el.dataset.diagram}]`]: el.querySelector("input").value || ""
    })
  })
  console.log(store.get("diagram"))
}

function navigate(key) {
  const views = [` <div class="view" data-module="1">
          <h3>Analisis Visual dan Latar</h3>
          <div id="player"></div>
        </div>`,
    ` <div class="view" data-module="2">
          <b>Klasifikasi cacatan hasil menyimak</b>
          <h2>Pindahkan setiap pilihan ke aspek yang sesuai!</h2>
          <div class="play-area">
            <div
              class="options"
              ondragover="event.preventDefault()"
              ondrop="dropToPool(event)">
              <div
                class="item pointer"
                draggable="true"
                ondragstart="drag(event)">
                <b>Close-up buku tua</b>
              </div>
              <div
                class="item pointer"
                draggable="true"
                ondragstart="drag(event)">
                <b>Konflik buku basah</b>
              </div>
              <div
                class="item pointer"
                draggable="true"
                ondragstart="drag(event)">
                <b>Rasa syukur</b>
              </div>
              <div
                class="item pointer"
                draggable="true"
                ondragstart="drag(event)">
                <b>Dialog klimaks</b>
              </div>
              <div
                class="item pointer"
                draggable="true"
                ondragstart="drag(event)">
                <b>Latar tepi rel</b>
              </div>
              <div
                class="item pointer"
                draggable="true"
                ondragstart="drag(event)">
                <b>Empati sosial</b>
              </div>
              <div class="item last">ini teks tersembunyi</div>
            </div>
            <div class="card wrapper box" data-label="visual">
              <i class="fas fa-eye"></i>
              <h2>Visual</h2>
              <p>Close-up, cahaya, latar</p>
              <div
                class="slot wrapper box"
                ondragover="event.preventDefault()"
                ondrop="dropToSlot(event)"></div>
              <div
                class="slot wrapper box"
                ondragover="event.preventDefault()"
                ondrop="dropToSlot(event)"></div>
            </div>
            <div class="card wrapper box" data-label="cerita">
              <i class="fas fa-bars"></i>
              <h2>Cerita</h2>
              <p>Close-up, cahaya, latar</p>
              <div
                class="slot wrapper box"
                ondragover="event.preventDefault()"
                ondrop="dropToSlot(event)"></div>
              <div
                class="slot wrapper box"
                ondragover="event.preventDefault()"
                ondrop="dropToSlot(event)"></div>
            </div>
            <div class="card wrapper box" data-label="pesan">
              <i class="fas fa-heart"></i>
              <h2>Pesan dan nilai</h2>
              <p>Close-up, cahaya, latar</p>
              <div
                class="slot wrapper box"
                ondragover="event.preventDefault()"
                ondrop="dropToSlot(event)"></div>
              <div
                class="slot wrapper box"
                ondragover="event.preventDefault()"
                ondrop="dropToSlot(event)"></div>
            </div>
            <button class="savebtn pointer" onclick="simpanKlasifikasi()">
              Simpan
            </button>
          </div>
        </div>`,
    ` <div class="view" data-module="3">
          <b>Hasil ulasan film pendek</b>
          <h2>Isi data berikut berdasarkan tontonan yang anda simak</h2>
          <div class="form-group">
            <div class="input-group">
              <label for="judul">Judul Film</label>
              <input
                type="text"
                id="judul"
                placeholder="Isi judul film pendek yang anda simak" />
            </div>
            <div class="input-group">
              <label for="judul">Tokoh Utama</label>
              <input
                type="text"
                id="tokoh"
                placeholder="Isi tokoh utama film pendek yang anda simak" />
            </div>
            <div class="input-group">
              <label for="sinopsis">Sinopsis</label>
              <!-- <input
                type="text"
                id="sinopsis"
                placeholder="Isi sinopsis film pendek yang anda simak" /> -->
              <textarea
                name=""
                id="sinopsis"
                placeholder="Isi sinopsis film pendek yang anda simak"></textarea>
            </div>
            <div class="input-group">
              <label for="pesan">Pesan Moral</label>
              <input
                type="text"
                id="pesan"
                placeholder="Isi pesan moral film pendek yang anda simak" />
            </div>
            <div class="input-group">
              <label for="opini">Pendapat Pribadi</label>
              <input
                type="text"
                id="opini"
                placeholder="Isi pendapat anda tentang film pendek yang anda simak" />
            </div>
            <button class="save pointer" onclick="simpanForm()">Simpan</button>
          </div>
        </div>`, ` <div class="view" data-module="4">
          <b>Diagram Alur Cerita</b>
          <h2>
            Urutkan pilihan secara kronologis dan isi pesan berdasarkan film
            yang anda simak
          </h2>
          <div class="drag-group">
            <div
              class="item wrapper box pointer"
              data-diagram="1"
              draggable="true"
              ondragstart="drag(event)"
              ondrop="dropToSort(event)"
              ondragover="event.preventDefault()">
              <h1>1</h1>
              <h3>Eksposisi</h3>
              <input
                class="wrapper box"
                type="text"
                placeholder="isi seusai yang anda simak" />
            </div>
            <div
              class="item wrapper box pointer"
              data-diagram="2"
              draggable="true"
              ondragstart="drag(event)"
              ondrop="dropToSort(event)"
              ondragover="event.preventDefault()">
              <h1>2</h1>
              <h3>Konflik</h3>
              <input
                class="wrapper box"
                type="text"
                placeholder="isi seusai yang anda simak" />
            </div>
            <div
              class="item wrapper box pointer"
              data-diagram="3"
              draggable="true"
              ondragstart="drag(event)"
              ondrop="dropToSort(event)"
              ondragover="event.preventDefault()">
              <h1>3</h1>
              <h3>Klimaks</h3>
              <input
                class="wrapper box"
                type="text"
                placeholder="isi seusai yang anda simak" />
            </div>
            <div
              class="item wrapper box pointer"
              data-diagram="4"
              draggable="true"
              ondragstart="drag(event)"
              ondrop="dropToSort(event)"
              ondragover="event.preventDefault()">
              <h1>4</h1>
              <h3>Resolusi</h3>
              <input
                class="wrapper box"
                type="text"
                placeholder="isi seusai yang anda simak" />
            </div>
          </div>
          <button class="save pointer" onclick="simpanDiagram()">Simpan</button>
        </div>`
  ];

  document.querySelector(".views").innerHTML = views[key];
  document.querySelector(".group-list .item.active")?.classList.remove("active");
  document.querySelectorAll(".group-list .item")[key].classList.add("active");

  if (key == 1) {

    for (const el of document.querySelectorAll(".slot")) {
      el.addEventListener("click", resetItem);
    }
    if (store.get("cardGame")) {
      for (const card in store.get("cardGame")) {
        const arrLabel = store.get("cardGame")[card];

        const arrOptions = Array.from(document.querySelectorAll(".options .item"));

        const cardtxt = document.querySelector(`.card[data-label="${card}"]`);
        arrLabel.forEach(label => {
          const result = arrOptions.find(el => {
            const b = el.querySelector("b");
            return b && b.textContent.includes(label)
          })
          cardtxt.querySelector(".slot:not(:has(.item))").appendChild(result);
          console.log(result, cardtxt);
        })
      }
    }
  }
  else if (key == 0) {
    player = new YT.Player("player", {
      videoId: "9TwsvY_iGys",
      width: "100%",
      height: "100%",
      // events: {
      //   onStateChange: onPlayerStateChange
      // }
    });
  }
  else if (key == 2) {
    if (store.get("formOpini")) {
      const { judul, tokoh, sinopsis, pesan, opini } = store.get("formOpini");
      document.getElementById("judul").value = judul || "";
      document.getElementById("tokoh").value = tokoh || "";
      document.getElementById("sinopsis").value = sinopsis || "";
      document.getElementById("pesan").value = pesan || "";
      document.getElementById("opini").value = opini || "";

    }
    document.querySelectorAll("input, textarea").forEach(el => {
      el.addEventListener("change", e => {
        store.add("formOpini", { [e.currentTarget.id]: e.currentTarget.value });
      })
    })
  }
  else if (key == 3) {
    if (store.get("diagram")) {
      for (const d in store.get("diagram")) {
        const id = d.split("-[")[1].split("]")[0];
        document.querySelector(`.drag-group .item[data-diagram="${id}"]`).querySelector("input").value = store.get("diagram")[d] || "";
      }
    }
  }
}

store.clean()
navigate(0);

function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    videoId: "9TwsvY_iGys",
    width: "100%",
    height: "100%",
    // events: {
    //   onStateChange: onPlayerStateChange
    // }
  });
}
