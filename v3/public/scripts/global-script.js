const pendingRequests = {};

function fillIcon(el) {
  const path = el.dataset.icon;
  if (!path) return;

  const cachedSvg = sessionStorage.getItem(path);
  if (cachedSvg) {
    el.innerHTML = cachedSvg;
    clean();
    return;
  }

  if (!pendingRequests[path]) {
    pendingRequests[path] = fetch(path)
      .then(res => res.text())
      .then(res => {
        // console.log({ status: "not cached", path });
        if (path == "../../public/feather/monitor.svg") {

          console.log({ res })
        }
        // const cleaned = res.replace(/\s*(width|height)="[^"]*"/gi, '');
        sessionStorage.setItem(path, res);
        delete pendingRequests[path];
        return res;
      });
  }

  pendingRequests[path].then(cleaned => {
    el.innerHTML = cleaned;
    clean();
  });
  function clean() {

    el.querySelector("svg").removeAttribute("width");
    el.querySelector("svg").removeAttribute("height");
  }
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
  <div class="menu-header">
    <h3>DAFTAR MENU</h3>
    <div class="close-btn pointer" onclick="toggleMenu()" title="Tutup Menu">
      <div data-icon="../../public/feather/x.svg"></div>
    </div>
  </div>

  <div class="link-group">
    <div class="links">
      <!-- Beranda -->
      <div class="title pointer" data-link="0" onclick="toggleLink(event)">
        <p>Beranda</p>
        <div data-icon="../../public/feather/home.svg"></div>
      </div>

      <!-- BAB I -->
      <div class="link-parent pointer" data-target="bab1" data-state="close" onclick="toggleLink(event)">
        <p>
          <strong>Bab I</strong><br />
          <span>Menulis Surat Lamaran Kerja dan Daftar Riwayat Hidup yang Mengesankan</span>
        </p>
        <div class="icon-arrow" data-icon="../../public/feather/chevron-down.svg"></div>
        <div class="icon-arrow hide" data-icon="../../public/feather/chevron-up.svg"></div>
      </div>
      <!-- Media Group Bab I -->
      <div class="link-child pointer" data-label="bab1" data-link="1">
        <p><strong>Media 1</strong><br /><span>Menulis Surat Lamaran Kerja & Daftar Riwayat Hidup</span></p>
        <div data-icon="../../public/feather/chevron-right.svg"></div>
      </div>
      <div class="link-child pointer" data-label="bab1" data-link="2">
        <p><strong>Media 4</strong><br /><span>Menulis Surat Lamaran Kerja Efektif & Mendesain CV Digital</span></p>
        <div data-icon="../../public/feather/chevron-right.svg"></div>
      </div>
      <div class="link-child pointer" data-label="bab1" data-link="3">
        <p><strong>Media 5</strong><br /><span>Simulasi Wawancara Kerja</span></p>
        <div data-icon="../../public/feather/chevron-right.svg"></div>
      </div>

      <!-- BAB II -->
      <div class="link-parent pointer" data-target="bab2" data-state="close" onclick="toggleLink(event)">
        <p>
          <strong>Bab II</strong><br />
          <span>Layar Kecil, Pikiran Besar: Literasi dari Film Pendek</span>
        </p>
        <div class="icon-arrow" data-icon="../../public/feather/chevron-down.svg"></div>
        <div class="icon-arrow hide" data-icon="../../public/feather/chevron-up.svg"></div>
      </div>
      <!-- Media Group Bab II -->
      <div class="link-child pointer" data-label="bab2" data-link="4">
        <p><strong>Media 1</strong><br /><span>Apersepsi Film Pendek</span></p>
        <div data-icon="../../public/feather/chevron-right.svg"></div>
      </div>
      <div class="link-child pointer" data-label="bab2" data-link="5">
        <p><strong>Media 2</strong><br /><span>Menyimak Kritis Film Pendek</span></p>
        <div data-icon="../../public/feather/chevron-right.svg"></div>
      </div>
      <div class="link-child pointer" data-label="bab2" data-link="6">
        <p><strong>Media 3</strong><br /><span>Ekranisasi & Simulator Storyboard Sederhana</span></p>
        <div data-icon="../../public/feather/chevron-right.svg"></div>
      </div>
      <div class="link-child pointer" data-label="bab2" data-link="7">
        <p><strong>Media 4</strong><br /><span>Manajemen dan Alur Produksi Film Pendek</span></p>
        <div data-icon="../../public/feather/chevron-right.svg"></div>
      </div>
      <div class="link-child pointer" data-label="bab2" data-link="8">
        <p><strong>Media 5</strong><br /><span>Publikasi Karya Film Pendek</span></p>
        <div data-icon="../../public/feather/chevron-right.svg"></div>
      </div>

      <!-- BAB III -->
      <div class="link-parent pointer" data-target="bab3" data-state="close" onclick="toggleLink(event)">
        <p>
          <strong>Bab III</strong><br />
          <span>Menelusuri Realitas Sosial melalui Drama Indonesia dan Dunia</span>
        </p>
        <div class="icon-arrow" data-icon="../../public/feather/chevron-down.svg"></div>
        <div class="icon-arrow hide" data-icon="../../public/feather/chevron-up.svg"></div>
      </div>
      <!-- Media Group Bab III -->
      <div class="link-child pointer" data-label="bab3" data-link="9">
        <p><strong>Media 1</strong><br /><span>Siap-Siap Belajar & Ayo Mengingat Kembali</span></p>
        <div data-icon="../../public/feather/chevron-right.svg"></div>
      </div>
      <div class="link-child pointer" data-label="bab3" data-link="10">
        <p><strong>Media 2</strong><br /><span>H5P Menyimak Kritis Video Drama</span></p>
        <div data-icon="../../public/feather/chevron-right.svg"></div>
      </div>
      <div class="link-child pointer" data-label="bab3" data-link="11">
        <p><strong>Media 3</strong><br /><span>Anatomi Bagian-Bagian Naskah Drama</span></p>
        <div data-icon="../../public/feather/chevron-right.svg"></div>
      </div>
      <div class="link-child pointer" data-label="bab3" data-link="12">
        <p><strong>Media 4</strong><br /><span>Eksplorasi Unsur Pementasan Drama</span></p>
        <div data-icon="../../public/feather/chevron-right.svg"></div>
      </div>
      <div class="link-child pointer" data-label="bab3" data-link="13">
        <p><strong>Media 5</strong><br /><span>Desain Poster dan Promosi Drama</span></p>
        <div data-icon="../../public/feather/chevron-right.svg"></div>
      </div>

      <!-- BAB IV -->
      <div class="link-parent pointer" data-target="bab4" data-state="close" onclick="toggleLink(event)">
        <p>
          <strong>Bab IV</strong><br />
          <span>Mengeksplorasi Khazanah Budaya Nusantara melalui Feature Berbasis Digital</span>
        </p>
        <div class="icon-arrow" data-icon="../../public/feather/chevron-down.svg"></div>
        <div class="icon-arrow hide" data-icon="../../public/feather/chevron-up.svg"></div>
      </div>
      <!-- Media Group Bab IV -->
      <div class="link-child pointer" data-label="bab4" data-link="14">
        <p><strong>Media 1</strong><br /><span>Apersepsi & Pemetaan Informasi Budaya</span></p>
        <div data-icon="../../public/feather/chevron-right.svg"></div>
      </div>
      <div class="link-child pointer" data-label="bab4" data-link="15">
        <p><strong>Media 2</strong><br /><span>Menyusun Draf Teks Feature</span></p>
        <div data-icon="../../public/feather/chevron-right.svg"></div>
      </div>
      <div class="link-child pointer" data-label="bab4" data-link="16">
        <p><strong>Media 3</strong><br /><span>Sunting Teks & Integrasi Media Digital</span></p>
        <div data-icon="../../public/feather/chevron-right.svg"></div>
      </div>
      <div class="link-child pointer" data-label="bab4" data-link="17">
        <p><strong>Media 4</strong><br /><span>Menyiapkan Presentasi & Publikasi</span></p>
        <div data-icon="../../public/feather/chevron-right.svg"></div>
      </div>
      <div class="link-child pointer" data-label="bab4" data-link="18">
        <p><strong>Media 5</strong><br /><span>Game Refleksi Penutup</span></p>
        <div data-icon="../../public/feather/chevron-right.svg"></div>
      </div>

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
      n.querySelectorAll("[data-icon]").forEach(el => {

        fillIcon(el);
      }
      )
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

const route = ["beranda", "bab-1-media-1", "bab-1-media-4", "bab-1-media-5", "bab-2-media-1", "bab-2-media-2", "bab-2-media-3", "bab-2-media-4", "bab-2-media-5", "bab-3-media-1", "bab-3-media-2", "bab-3-media-3", "bab-3-media-4", "bab-3-media-5", "bab-4-media-1", "bab-4-media-2", "bab-4-media-3", "bab-4-media-4", "bab-4-media-5",];

function navigate(el) {
  el.addEventListener("click", () => window.location = ("../" + route[el.dataset.link]))
}
document.querySelectorAll("[data-link]").forEach(el => navigate(el));

function getDate() {
  const date = new Date();

  const hari = date.toLocaleDateString("id-ID", { weekday: "long" });

  const tanggal = date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })

  return `${hari}, ${tanggal}`
}

function printPage() {
  document.body.classList.add("print");

  // Timeout bersarang untuk memberikan DOM reflow rendering template display: grid
  setTimeout(() => {
    window.print();
    setTimeout(() => {
      document.body.classList.remove("print");
    }, 500);
  }, 150);
}