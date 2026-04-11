class ThrowableObject extends MovableObject {
  /** @type {number} Width of the bottle in pixels. */
  width = 60;

  /** @type {number} Height of the bottle in pixels. */
  height = 60;

  /**
   * @type {string[]} Rotation animation frames played while the bottle is in flight.
   */
  IMAGES_ROTATION = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  /**
   * Creates a new ThrowableObject and immediately throws it.
   * @param {number} x - The horizontal start position.
   * @param {number} y - The vertical start position.
   * @param {boolean} otherDirection - True if thrown to the left.
   */
  constructor(x, y, otherDirection) {
    super().loadImage("img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png");
    this.loadImages(this.IMAGES_ROTATION);
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
    setInterval(() => {
      this.x += this.otherDirection ? -50 : 50;
      this.acceleration = 4;
      this.playAnimation(this.IMAGES_ROTATION);
    }, 60);
  }
}
