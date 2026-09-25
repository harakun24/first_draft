let draggedItem = null;

function drag(e) {
  draggedItem = e.target;
}

function dropToSlot(e) {
  e.preventDefault();
  const slot = e.currentTarget;
  const pool = document.querySelector(".options");
  if (slot.children.length > 0)
    pool.appendChild(slot.children[0])
  slot.appendChild(draggedItem);
}

function dropToPool(e) {
  e.preventDefault();
  document.querySelector(".options").appendChild(draggedItem);
}