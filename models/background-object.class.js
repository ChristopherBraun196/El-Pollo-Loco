class BackgroundObject extends MovableObject {
  /** @type {number} Width of the background tile in pixels. */
  width = 720;

  /** @type {number} Height of the background tile in pixels. */
  height = 480;

  /**
   * Creates a new BackgroundObject at the given position.
   * @param {string} imagePath - Path to the background image.
   * @param {number} x - Horizontal position in pixels.
   */
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = 480 - this.height;
  }
}
