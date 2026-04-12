class SmallChicken extends MovableObject {
  width = 30;
  height = 30;

  /** @type {string[]} Walking animation frames. */
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  /**
   * Creates a new SmallChicken instance at a randomized position within the given base range.
   * @param {number} baseX - The base horizontal position for the small chicken.
   */
  constructor(baseX) {
    super().loadImage("img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.x = baseX + Math.random() * 200;
    this.y = 155 + (280 - 30);
    this.speed = 0.3 + Math.random() * 0.4;
    this.animate();
  }

  /**
   * Starts movement and animation intervals. Small chicken follows Pepe's direction.
   */
  animate() {
    setInterval(() => {
      if (!gameStarted || !this.world || this.world.character.isDead()) return;
      if (this.world.character.x < this.x) {
        this.x -= this.speed;
        this.otherDirection = false;
      } else {
        this.x += this.speed;
        this.otherDirection = true;
      }
    }, 1000 / 60);

    setInterval(() => {
      if (!gameStarted || !this.world || this.world.character.isDead()) return;
      this.playAnimation(this.IMAGES_WALKING);
    }, 200);
  }
}
