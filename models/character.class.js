class Character extends MovableObject {
  height = 200;
  y = 235;
  speed = 10;

  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  // IMAGES_JUMPING = [
  //   "img/2_character_pepe/3_jump/J-31.png",
  //   "img/2_character_pepe/3_jump/J-32.png",
  //   "img/2_character_pepe/3_jump/J-33.png",
  //   "img/2_character_pepe/3_jump/J-34.png",
  //   "img/2_character_pepe/3_jump/J-35.png",
  //   "img/2_character_pepe/3_jump/J-36.png",
  //   "img/2_character_pepe/3_jump/J-37.png",
  //   "img/2_character_pepe/3_jump/J-38.png",
  //   "img/2_character_pepe/3_jump/J-39.png",
  // ];

  IMAGES_JUMPING_UP = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
  ];

  IMAGES_JUMPING_DOWN = [
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

  world;

  constructor() {
    super().loadImage("../img/2_character_pepe/1_idle/idle/I-1.png");
    this.loadImages(this.IMAGES_WALKING);
    // this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_JUMPING_UP);
    this.loadImages(this.IMAGES_JUMPING_DOWN);
    this.applyGravity();
  }

  animate() {
    setInterval(() => {
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.moveRight();
      }
    }, 1000 / 60);

    setInterval(() => {
      if (this.world.keyboard.LEFT && this.x > 0) {
        this.moveLeft();
        // this.walking_sound.play();
      }
      if (this.world.keyboard.SPACE && !this.isAboveGround()) {
        this.jump();
        this.world.keyboard.SPACE = false; // stopping jumping whit game.js 21
      }

      this.world.camera_x = -this.x + 50;
      if (this.world.camera_x > 0) { // end left (start)
        this.world.camera_x = 0;
      }
      let minCameraX = -(this.world.level.level_end_x - 600);
      if (this.world.camera_x < minCameraX) { // end right (end)
        this.world.camera_x = minCameraX;
      }
    }, 1000 / 60);

    setInterval(() => {
      //   Interval for jumping frames
      if (this.isAboveGround()) {
        if (this.speedY > 0) {
          this.playAnimation(this.IMAGES_JUMPING_UP);
        } else {
          this.playAnimation(this.IMAGES_JUMPING_DOWN);
        }
      } else {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
          this.playAnimation(this.IMAGES_WALKING);
        } else {
          this.img = this.imageCache["img/2_character_pepe/3_jump/J-31.png"];
        }
      }
    }, 50);
  }
}
