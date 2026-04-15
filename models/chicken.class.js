class Chicken extends MovableObject {
  width = 60;
  height = 60;
  offset = { top: 1, bottom: 1, left: 2, right: 2 };

  /** @type {string[]} Walking animation frames. */
  IMAGES_WALKING = [
    "assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  IMAGES_DEAD = ["assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  /**
   * Creates a new Chicken instance at a randomized position within the given base range.
   * @param {number} baseX - The base horizontal position for the chicken.
   */
  constructor(baseX) {
    super().loadImage(
      "assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    );
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
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
      if (!gameStarted || !this.world || this.world.character.isDead()) return;
      if (this.isDead()) return;
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
      if (this.isDead()) {
        this.img = this.imageCache[this.IMAGES_DEAD[0]];
        return;
      }
      this.playAnimation(this.IMAGES_WALKING);
    }, 200);
  }
}
