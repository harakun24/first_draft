
function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    videoId: "e29chVI5HLI",
    width: "100%",
    height: "100%",
  });
}

const datas = document.querySelector(".group-list");

function jumpSegmen(e) {
  document.querySelector(".segmen.active")?.classList.remove("active");
  const view = e.currentTarget.dataset.jump;
  if (player)
    player.pauseVideo()
  e.currentTarget.classList.add("active");
  document.querySelector(".area.active")?.classList.remove("active");
  document.querySelector(".area." + view).classList.add("active");
  store.add("film-state", view);
}


document.querySelector("[data-jump='linimasa']").click();


function choose(num) {
  store.add("film-choice", num == 1 ? "Visual yang terdiri dari komposisi, warna dan gerak." : num == 2 ? "Cerita yang terdiri dari tokoh, konflik dan alur. " : "Musik yang terdiri dari irama, suasana dan emosi. ");
  document.querySelector(".modal2").hidePopover();
}

function simpanTim() {
  const produser = document.querySelector("#produser").value;
  const sutradara = document.querySelector("#sutradara").value;
  const dop = document.querySelector("#dop").value;
  const suara = document.querySelector("#suara").value;
  store.set("pembagian-tim", {
    produser, sutradara, dop, suara
  });
  console.log(store.get("pembagian-tim"));
}
function autofillTim() {

  if (store.get("pembagian-tim")) {
    const tim = store.get("pembagian-tim");

    document.querySelector("#produser").value = tim.produser;
    document.querySelector("#sutradara").value = tim.sutradara;
    document.querySelector("#dop").value = tim.dop;
    document.querySelector("#suara").value = tim.suara;
  }
}

autofillTim();