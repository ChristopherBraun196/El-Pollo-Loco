class Chicken extends MovableObject {
  width = 60;
  height = 60;

  /** @type {string[]} Walking animation frames. */
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  /**
   * Creates a new Chicken instance at a randomized position within the given base range.
   * @param {number} baseX - The base horizontal position for the chicken.
   */
  constructor(baseX) {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.x = baseX + Math.random() * 200;
    this.y = 155 + (280 - 60);
    this.speed = 0.15 + Math.random() * 0.25;
    this.animate();
  }

  /**
   * Starts movement and animation intervals. Chicken follows Pepe's direction.
   */
  animate() {
    setInterval(() => {
      if (gameStarted && this.world) {
        if (this.world.character.x < this.x) {
          this.x -= this.speed;
          this.otherDirection = false;
        } else {
          this.x += this.speed;
          this.otherDirection = true;
        }
      }
    }, 1000 / 60);

    setInterval(() => {
      if (gameStarted) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 200);
  }
}
