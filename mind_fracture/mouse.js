var posx = 0;
var posy = 0;

var gridX = 40;
var gridY = 40;
var resizeMode = false;
const right_click_menu = document.getElementById("mouse-menu");
document.addEventListener("mousemove", (event) => {
  posx = event.clientX;
  posy = event.clientY;
});

// if (document.addEventListener) {
//   document.addEventListener(
//     "contextmenu",
//     function (e) {
//       right_click_menu.style.display = "block";
//       right_click_menu.style.left = posx + "px";
//       right_click_menu.style.top = posy + "px";

//       e.preventDefault();
//     },
//     false
//   );
// } else {
//   document.attachEvent("oncontextmenu", function () {
//     window.event.returnValue = false;
//   });
// }
document.addEventListener("keydown", function (event) {
  if (event.key === "b") {
    right_click_menu.style.display = "block";
    right_click_menu.style.left = posx + "px";
    right_click_menu.style.top = posy + "px";
    event.preventDefault();
  }
  if (
    document.activeElement.tagName !== "INPUT" &&
    document.activeElement.tagName !== "TEXTAREA"
  ) {
    if (event.key === "r") {
      resizeMode = !resizeMode;

      const notes = document.querySelectorAll(".note");
      notes.forEach((note) => {
        note.style.resize = resizeMode ? "both" : "none";
        note.toggleAttribute("frozen");
      });
    }
  }
});
const notes = document.querySelectorAll(".note");

notes.forEach((note) => {
  let offsetX,
    offsetY,
    isDragging = false;

  note.addEventListener("mousedown", (e) => {
    if (resizeMode) return;
    isDragging = true;
    offsetX = e.clientX - note.offsetLeft;
    offsetY = e.clientY - note.offsetTop;
    note.style.cursor = "grabbing";
    note.style.zIndex = 1000;
  });

  document.addEventListener("mousemove", (e) => {
    if (resizeMode) return;
    if (!isDragging) return;
    note.style.left = `${e.clientX - offsetX}px`;
    note.style.top = `${e.clientY - offsetY}px`;
  });

  document.addEventListener("mouseup", () => {
    if (resizeMode) return;
    if (!isDragging) return;
    isDragging = false;
    note.style.cursor = "move";
    note.style.zIndex = 1;
  });
});
