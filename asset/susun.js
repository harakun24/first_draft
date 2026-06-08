let dragged = null;
let source = null;


document.querySelectorAll(".item").forEach(item => {

  item.addEventListener("dragstart", () => {
    dragged = item;
    source = item.parentElement;
    // dataTransfer.effectAllowed = "move"
    // dataTransfer.setData("text", item.innerHTML)
    reset()
  })
})

document.querySelectorAll(".slot").forEach(slot => {

  slot.addEventListener("dragover", e => {
    e.preventDefault()
  })

  slot.addEventListener("drop", (e) => {
    if (!dragged) return;
    const exist = slot.querySelector(".item");

    if (exist == dragged) return;
    if (exist) source.appendChild(exist)
    slot.appendChild(dragged)
    dragged = null
  })
})

document.querySelector(".pilihan").addEventListener("dragover", e => {
  e.preventDefault()
});

document.querySelector(".pilihan").addEventListener("drop", () => {

  if (dragged) {
    document.querySelector(".pilihan").appendChild(dragged)
  }
})

document.getElementById("check").addEventListener("click", () => {
  console.log("21")
  const list = document.querySelectorAll(".slot")
  list.forEach(slot => {
    slot.classList.remove("correct", "wrong")
    const item = slot.querySelector(".item")
    if (!item) return;
    console.log(item.dataset.id == slot.dataset.answer)
    slot.classList.add(item.dataset.id == slot.dataset.answer ? "correct" : "wrong")
  })
})

function randomize() {
  const pilihan = document.querySelector(".pilihan")

  const items = [...document.querySelectorAll(".item")].sort(() => Math.random() - 0.5)

  items.forEach(item => {
    pilihan.appendChild(item)
  })

  reset()
}

randomize()

function reset() {
  document.querySelectorAll(".slot").forEach(slot => {
    slot.classList.remove("correct", "wrong")
  })
}