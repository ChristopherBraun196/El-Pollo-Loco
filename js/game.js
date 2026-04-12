let canvas;
let world;
let keyboard = new Keyboard();
let gameStarted = false;
let gameOver = false;

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);

  // let music = new Audio("assets/music/Background/background-music-loop.mp3");
  // music.loop = true;
  // music.volume = 0.03;
  // music.play();
  // console.log("My Character is", world.character);
  // console.log("My Enemies:", world.enemies);
}

window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight" || e.key === "d") {
    keyboard.RIGHT = true;
  }
  if (e.key === "ArrowLeft" || e.key === "a") {
    keyboard.LEFT = true;
  }
  if (e.key === " " && !e.repeat) {
    keyboard.SPACE = true;
  }
  if (e.key === "e" && !e.repeat) {
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
