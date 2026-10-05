function fillIcon(el) {
  const path = el.dataset.icon;
  fetch(path)
    .then(res => res.text())
    .then(res => el.innerHTML = res)
}

let player;
const store = {
  set: (key, val) => {
    localStorage.setItem(key, JSON.stringify(val))
  },
  get: (key) => {
    return JSON.parse(localStorage.getItem(key)) || null
  },
  add: (key, val) => {
    const old = store.get(key);

    if (!old) return store.set(key, val);

    if (typeof old === 'object') {
      store.set(key, Array.isArray(old) ? [...old, ...val] : { ...old, ...val })
    }
    else
      store.set(key, val)
  },
  delete: (key) => {
    localStorage.removeItem(key);
  },
  clean: () => localStorage.clear()


}

document.querySelector(".header").insertAdjacentHTML("beforebegin", `
 <div class="daftar-menu" popover>
      <h4>
        <span>DAFTAR MENU</span>
        <div
          class="pointer"
          data-icon="../../public/feather/x.svg"
          onclick="toggleMenu()"></div>
      </h4>
      <div class="link-group">
        <div class="links">
          <div class="title pointer" data-link="0">
            <p>Beranda</p>
            <div data-icon="../../public/feather/home.svg"></div>
          </div>
          <div
            class="link pointer"
            data-target="bab1"
            data-state="close"
            onclick="toggleLink(event)">
            <p>
              Bab I <br />
              <span>
                Menulis Surat Lamaran Kerja dan Daftar Riwayat Hidup yang
                Mengesankan
              </span>
            </p>
            <div data-icon="../../public/feather/chevron-down.svg"></div>
            <div
              class="hide"
              data-icon="../../public/feather/chevron-up.svg"></div>
          </div>
          <!-- media group start -->
          <div class="link pointer" data-label="bab1" data-link="1">
            <p>
              Media 1 <br />
              <span>
                Menulis Surat Lamaran Kerja dan Daftar Riwayat Hidup yang
                Mengesankan
              </span>
            </p>
            <div data-icon="../../public/feather/chevron-right.svg"></div>
          </div>
          <div class="link pointer" data-label="bab1">
            <p>
              Media 4 <br />
              <span>
                Menulis Surat Lamaran Kerja Efektif dan Mendesain CV Digital
              </span>
            </p>
            <div data-icon="../../public/feather/chevron-right.svg"></div>
          </div>
          <div class="link pointer" data-label="bab1">
            <p>
              Media 5 <br />
              <span> Simulasi Wawancara Kerja </span>
            </p>
            <div data-icon="../../public/feather/chevron-right.svg"></div>
          </div>
          <!-- media group end -->
          <div
            class="link pointer"
            data-target="bab2"
            data-state="close"
            onclick="toggleLink(event)">
            <p>
              Bab II <br />
              <span>
                Layar Kecil, Pikiran Besar: Literasi dari Film Pendek
              </span>
            </p>
            <div data-icon="../../public/feather/chevron-down.svg"></div>
            <div
              class="hide"
              data-icon="../../public/feather/chevron-up.svg"></div>
          </div>
          <!-- media group start -->
          <div class="link pointer" data-label="bab2" data-link="1">
            <p>
              Media 1 <br />
              <span> Apersepsi Film Pendek </span>
            </p>
            <div data-icon="../../public/feather/chevron-right.svg"></div>
          </div>
          <div class="link pointer" data-label="bab2">
            <p>
              Media 2 <br />
              <span> Menyimak Kritis Film Pendek </span>
            </p>
            <div data-icon="../../public/feather/chevron-right.svg"></div>
          </div>
          <div class="link pointer" data-label="bab2">
            <p>
              Media 3 <br />
              <span> Ekranisasi & Simulator Storyboard Sederhana </span>
            </p>
            <div data-icon="../../public/feather/chevron-right.svg"></div>
          </div>
          <div class="link pointer" data-label="bab2">
            <p>
              Media 4 <br />
              <span> Manajemen dan Alur Produksi Film Pendek </span>
            </p>
            <div data-icon="../../public/feather/chevron-right.svg"></div>
          </div>
          <div class="link pointer" data-label="bab2">
            <p>
              Media 5 <br />
              <span> Publikasi Karya Film Pendek </span>
            </p>
            <div data-icon="../../public/feather/chevron-right.svg"></div>
          </div>
          <!-- media group end -->
        </div>
      </div>
    </div>
`)

document.querySelectorAll("[data-icon]").forEach(el => {
  fillIcon(el);
});

const observer = new MutationObserver(m => {
  for (const mm of m) {
    for (const n of mm.addedNodes) {
      if (n.nodeType !== Node.ELEMENT_NODE) continue;
      if (n.matches("[data-icon]")) {
        fillIcon(n);
      }
      if (n.matches("[data-link]")) {
        navigate(n);
      }
      n.querySelectorAll("[data-icon]").forEach(fillIcon)
      n.querySelectorAll("[data-link]").forEach(navigate)
    }
  }
})

observer.observe(document.body, { childList: true, subtree: true });

const placeholder = document.querySelector(".title-page");
placeholder.querySelector("h4").textContent = document.title.split(" | ")[0];
placeholder.querySelector("p ").textContent = document.title.split(" | ")[1];

// menu.showPopover();
const menu = document.querySelector(".daftar-menu");

function toggleMenu() {
  menu.togglePopover();
}
// toggleMenu();

function toggleLink(e) {
  const target = e.currentTarget.dataset.target;
  const state = e.currentTarget.dataset.state;
  console.log({ state })
  if (state == "close") {
    const prevLink = document.querySelector(".links .link.active");
    if (prevLink) {

      prevLink.classList.remove("active");
      prevLink.setAttribute("data-state", "close");
      prevLink.querySelectorAll("[data-icon]").forEach(el => {
        el.classList.toggle("hide");
      })
    }
    e.currentTarget.classList.add("active");
    document.querySelectorAll(`.links [data-label]`)?.forEach(el => {
      el.classList.remove("open");
    })
    document.querySelectorAll(`.links [data-label="${target}"]`).forEach(el => {
      el.classList.add("open");
    })
    e.currentTarget.setAttribute("data-state", "open");
  }
  else if (state == "open") {
    e.currentTarget.classList.remove("active");
    document.querySelectorAll(`.links [data-label="${target}"]`).forEach(el => {
      el.classList.remove("open");
      e.currentTarget.setAttribute("data-state", "close");
    })
  }
  e.currentTarget.querySelectorAll("[data-icon]").forEach(el => {
    el.classList.toggle("hide");
  })
}

const route = ["beranda", "bab-1-media-1"];

function navigate(el) {
  el.addEventListener("click", () => window.location = ("../" + route[el.dataset.link]))
}
document.querySelectorAll("[data-link]").forEach(el => navigate(el));
