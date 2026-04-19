let canvas;
let world;
let keyboard = new Keyboard();
let gameStarted = false;
let soundMuted = true;
let music;
let hurtSound;
let chickenDeadSound;
let coinSound;
let bossFightSound;
let winSound;
let loseSound;
let snoringSound;

/**
 * Initializes the canvas, world, music and touch controls.
 */
function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  initMusic();
  initTouchControls();
}

/**
 * Toggles sound on/off and updates the mute button icon and label.
 */
function toggleSound() {
  soundMuted = !soundMuted;
  if (soundMuted) {
    music.pause();
    snoringSound.pause();
  } else {
    music.play();
  }
  localStorage.setItem("soundMuted", soundMuted);
  updateMuteButton();
}

function updateMuteButton() {
  let img = document.getElementById("muteIcon");
  let text = document.getElementById("muteText");
  if (soundMuted) {
    img.src = "./assets/img/svg/no_sound.svg";
    text.innerText = "Sound OFF";
  } else {
    img.src = "./assets/img/svg/sound_on.svg";
    text.innerText = "Sound ON";
  }
}

/**
 * Initializes all game sounds.
 */
function initMusic() {
  soundMuted = localStorage.getItem("soundMuted") === "true";
  initBackgroundSound();
  inithurtSound();
  initChickenDeadSound();
  initCoinSound();
  initBossFightSound();
  initWinSound();
  initLoseSound();
  initSnoringSound();
  updateMuteButton();
}

/**
 * Initializes the hurt sound effect.
 */
function inithurtSound() {
  hurtSound = new Audio(
    "assets/music/sounds/553285__deleted_user_12367688__hurt4.ogg",
  );
  hurtSound.volume = 0.3;
}

/**
 * Initializes the background music loop.
 */
function initBackgroundSound() {
  music = new Audio("assets/music/Background/background-music-loop.mp3");
  music.loop = true;
  music.volume = 0.03;
}

/**
 * Initializes the chicken death sound.
 */
function initChickenDeadSound() {
  chickenDeadSound = new Audio(
    "assets/music/sounds/170809__esperar__chicken-imitation-reverb.wav",
  );
  chickenDeadSound.volume = 0.3;
}

/**
 * Initializes the coin collect sound.
 */
function initCoinSound() {
  coinSound = new Audio(
    "assets/music/sounds/443258__lilmati__retro-coin-05.wav",
  );
  coinSound.volume = 0.3;
}

/**
 * Initializes the boss fight hit sound.
 */
function initBossFightSound() {
  bossFightSound = new Audio(
    "assets/music/sounds/190843__deathbygeko__boss-fight.wav",
  );
  bossFightSound.volume = 0.3;
}

/**
 * Initializes the win jingle.
 */
function initWinSound() {
  winSound = new Audio(
    "assets/music/sounds/607407__colorscrimsontears__fanfare-3-rpg.wav",
  );
  winSound.volume = 0.3;
}

/**
 * Initializes the game-over sound.
 */
function initLoseSound() {
  loseSound = new Audio(
    "assets/music/sounds/434465__dersuperanton__game-over-deep-epic.wav",
  );
  loseSound.volume = 0.3;
}

/**
 * Initializes the snoring idle sound.
 */
function initSnoringSound() {
  snoringSound = new Audio("assets/music/sounds/366866__tianve8__snoring.wav");
  snoringSound.loop = true;
  snoringSound.volume = 0.4;
}

/**
 * Registers touch event listeners for all four touch control buttons.
 */
function initTouchControls() {
  initTouchLeft();
  initTouchRight();
  initTouchJump();
  initTouchAttack();
}

/**
 * Binds touch events for the left movement button.
 */
function initTouchLeft() {
  let btn = document.querySelector("#touch-controls-left button:nth-child(1)");
  btn.addEventListener("contextmenu", (e) => e.preventDefault());

  btn.addEventListener("touchstart", () => {
    gameStarted = true;
    keyboard.LEFT = true;
  });
}

/**
 * Binds touch events for the right movement button.
 */
function initTouchRight() {
  let btn = document.querySelector("#touch-controls-left button:nth-child(2)");
  btn.addEventListener("contextmenu", (e) => e.preventDefault());

  btn.addEventListener("touchstart", () => {
    gameStarted = true;
    keyboard.RIGHT = true;
  });
}

/**
 * Binds touch events for the jump button.
 */
function initTouchJump() {
  let btn = document.querySelector("#touch-controls-right button:nth-child(1)");
  btn.addEventListener("contextmenu", (e) => e.preventDefault());

  btn.addEventListener("touchstart", () => {
    gameStarted = true;
    keyboard.SPACE = true;
  });
}

/**
 * Binds touch events for the attack button.
 */
function initTouchAttack() {
  let btn = document.querySelector("#touch-controls-right button:nth-child(2)");
  btn.addEventListener("contextmenu", (e) => e.preventDefault());

  btn.addEventListener("touchstart", () => {
    gameStarted = true;
    keyboard.ATTACK = true;
  });

  btn.addEventListener("touchend", () => (keyboard.ATTACK = false));
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
