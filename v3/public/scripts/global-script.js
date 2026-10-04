function fillIcon(el) {
  console.log({ el })
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
      n.querySelectorAll("[data-icon]").forEach(fillIcon)
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
toggleMenu()