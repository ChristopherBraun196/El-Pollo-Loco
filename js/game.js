let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);

  console.log("My Character is", world.character);
  console.log("My Enemies:", world.enemies);
}

window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight" || e.key === "d") {
    keyboard.RIGHT = true;
  }
  if (e.key === "ArrowLeft" || e.key === "a") {
    keyboard.LEFT = true;
  }
  if (e.key === " ") {
    if (e.key === " " && !e.repeat) { // stopping alltime jumping 
    keyboard.SPACE = true;
    }
  }
  if (e.key === "e") {
    keyboard.ATTACK = true;
  }
});

window.addEventListener("keyup", (e) => {
  if (e.key === "ArrowRight" || e.key === "d") {
    keyboard.RIGHT = false;
  }
  if (e.key === "ArrowLeft" || e.key === "a") {
    keyboard.LEFT = false;
  }
  if (e.key === " ") {
    keyboard.SPACE = false;
  }
  if (e.key === "e") {
    keyboard.ATTACK = false;
  }
});
