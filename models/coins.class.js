class Coins extends MovableObject {
  /** @type {number} Width of the coin in pixels. */
  width = 80;

  /** @type {number} Height of the coin in pixels. */
  height = 80;

  /** @type {string[]} Coin animation frames. */
  IMAGES_COINS = ["assets/img/8_coin/coin_1.png", "assets/img/8_coin/coin_2.png"];

  /**
   * Creates a new Coins instance at the given position.
   * @param {number} x - Horizontal position in pixels.
   * @param {number} y - Vertical position in pixels.
   */
  constructor(x, y) {
    super().loadImage(this.IMAGES_COINS[0]);
    this.loadImages(this.IMAGES_COINS);
    this.x = x;
    this.y = y;
    this.animate();
  }

  /**
   * Starts the coin flip animation loop.
   */
  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_COINS);
    }, 200);
  }
}
