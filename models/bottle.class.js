class Bottle extends MovableObject {
  /** @type {number} Width of the bottle in pixels. */
  width = 60;

  /** @type {number} Height of the bottle in pixels. */
  height = 60;

  /** @type {string[]} Bottle idle animation frames (on the ground). */
  IMAGES_BOTTLE = [
    "assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];

  /**
   * Creates a new Bottle instance at the given position.
   * @param {number} x - Horizontal position in pixels.
   * @param {number} y - Vertical position in pixels.
   */
  constructor(x, y) {
    super().loadImage(this.IMAGES_BOTTLE[0]);
    this.loadImages(this.IMAGES_BOTTLE);
    this.x = x;
    this.y = 360;
    this.animate();
  }

  /**
   * Starts the bottle idle animation loop.
   */
  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_BOTTLE);
    }, 600);
  }
}
