let canvas;
let world;
let keyboard = new Keyboard();
let gameStarted = false;
let gameOver = false;
let soundMuted = true;
let music;
let hurtSound;
let chickenDeadSound;
let coinSound;
let bossFightSound;
let winSound;
let loseSound;
let snoringSound;

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
  initBackgroundSound();
  inithurtSound();
  initChickenDeadSound();
  initCoinSound();
  initBossFightSound();
  initWinSound();
  initLoseSound();
  initSnoringSound() 
}

function inithurtSound() {
  hurtSound = new Audio(
    "assets/music/sounds/553285__deleted_user_12367688__hurt4.ogg",
  );
  hurtSound.volume = 0.3;
}

function initBackgroundSound() {
  music = new Audio("assets/music/Background/background-music-loop.mp3");
  music.loop = true;
  music.volume = 0.03;
}

function initChickenDeadSound() {
  chickenDeadSound = new Audio(
    "assets/music/sounds/170809__esperar__chicken-imitation-reverb.wav",
  );
  chickenDeadSound.volume = 0.3;
}

function initCoinSound() {
  coinSound = new Audio(
    "assets/music/sounds/443258__lilmati__retro-coin-05.wav",
  );
  coinSound.volume = 0.3;
}

function initBossFightSound() {
  bossFightSound = new Audio(
    "assets/music/sounds/190843__deathbygeko__boss-fight.wav",
  );
  bossFightSound.volume = 0.3;
}

function initWinSound() {
  winSound = new Audio(
    "assets/music/sounds/607407__colorscrimsontears__fanfare-3-rpg.wav",
  );
  winSound.volume = 0.3;
}

function initLoseSound() {
  loseSound = new Audio(
    "assets/music/sounds/434465__dersuperanton__game-over-deep-epic.wav",
  );
  loseSound.volume = 0.3;
}

function initSnoringSound() {
  snoringSound = new Audio("assets/music/sounds/366866__tianve8__snoring.wav");
  snoringSound.loop = true;
  snoringSound.volume = 0.3;
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
