function fillIcon(el) {
  const path = el.dataset.icon;
  fetch(path)
    .then(res => res.text())
    .then(res => el.innerHTML = res)
}

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
toggleMenu();

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
  el.addEventListener("click", () => window.location.replace("../" + route[el.dataset.link]))
}
document.querySelectorAll("[data-link]").forEach(el => navigate(el))