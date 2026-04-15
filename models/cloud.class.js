class Cloud extends MovableObject {
  /** @type {number} Shared counter to alternate between cloud images. */
  static cloudIndex = 0;

  /**
   * Creates a new Cloud instance with alternating image and random speed.
   * @param {number} x - The horizontal start position of the cloud.
   */
  constructor(x) {
    const images = [
      "assets/img/5_background/layers/4_clouds/1.png",
      "assets/img/5_background/layers/4_clouds/2.png",
    ];
    super().loadImage(images[Cloud.cloudIndex % images.length]);
    Cloud.cloudIndex++;
    this.x = x;
    this.y = 0;

    // this.x = 200 + Math.random() * 2400;
    this.speed = 0.12 + Math.random() * 0.15;
    this.width = 480;
    this.height = 300;

    this.animate();
  }

  /**
   * Moves the cloud to the left and resets it to the right when off screen.
   */
  animate() {
    setInterval(() => {
      this.moveLeft();
      if (this.x + this.width < 0) {
        this.x = 2500;
      }
    }, 1000 / 60);
  }
}
