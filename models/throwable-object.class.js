class ThrowableObject extends MovableObject {
  /** @type {number} Width of the bottle in pixels. */
  width = 60;

  /** @type {number} Height of the bottle in pixels. */
  height = 60;

  /**
   * @type {string[]} Rotation animation frames played while the bottle is in flight.
   */

  splashing = false;

  IMAGES_ROTATION = [
    "assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  IMAGES_SPLASH = [
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  /**
   * Creates a new ThrowableObject and immediately throws it.
   * @param {number} x - The horizontal start position.
   * @param {number} y - The vertical start position.
   * @param {boolean} otherDirection - True if thrown to the left.
   */
  constructor(x, y, otherDirection) {
    super().loadImage(
      "assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    );
    this.loadImages(this.IMAGES_ROTATION);
    this.loadImages(this.IMAGES_SPLASH);
    this.x = x;
    this.y = y;
    this.groundY = 380;
    this.otherDirection = otherDirection;
    this.throw();
  }

  /**
   * Launches the bottle with an arc and plays the rotation animation.
   */
  throw() {
    this.speedY = 30;
    this.applyGravity();
   
    let interval = setInterval(() => {
      if (this.y >= this.groundY || this.splashing) {
        this.splashing = true;
        this.playAnimation(this.IMAGES_SPLASH);
        if (this.currentImage >= this.IMAGES_SPLASH.length) {
          clearInterval(interval);
          this.toDelete = true;
        }
      } else {
        this.x += this.otherDirection ? -50 : 50;
        this.acceleration = 4;
        this.playAnimation(this.IMAGES_ROTATION);
      }
    }, 60);
  }
}
