let canvas;
let world;
let keyboard = new Keyboard();
let gameStarted = false;
let gameOver = false;
let soundMuted = true;
let music;

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  initMusic();
}


function toggleSound() {
  soundMuted = !soundMuted;
  let img = document.getElementById("muteIcon");
  let text = document.getElementById("muteText");

  if (soundMuted) {
    music.pause();
    img.src = "./assets/img/svg/no_sound.svg";
    text.innerText = "Sound OFF";
  } else {
    music.play();
    img.src = "./assets/img/svg/sound_on.svg";
    text.innerText = "Sound ON";
  }
}

function initMusic() {
  music = new Audio("assets/music/Background/background-music-loop.mp3");
  music.loop = true;
  music.volume = 0.03;
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
