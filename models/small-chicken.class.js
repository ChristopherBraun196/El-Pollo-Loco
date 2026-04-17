class SmallChicken extends MovableObject {
  /** @type {number} Width of the small chicken in pixels. */
  width = 30;

  /** @type {number} Height of the small chicken in pixels. */
  height = 30;

  /** @type {string[]} Walking animation frames. */
  IMAGES_WALKING = [
    "assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  /** @type {string[]} Death animation frames. */
  IMAGES_DEAD = ["assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png"];

  /**
   * Creates a new SmallChicken instance at a randomized position within the given base range.
   * @param {number} baseX - The base horizontal position for the small chicken.
   */
  constructor(baseX) {
    super().loadImage(
      "assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    );
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
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
        if (!soundMuted && !this.deathSoundPlayed) {
          chickenDeadSound.currentTime = 0;
          chickenDeadSound.play();
          this.deathSoundPlayed = true;
        }
        this.img = this.imageCache[this.IMAGES_DEAD[0]];
        return;
      }
      this.playAnimation(this.IMAGES_WALKING);
    }, 200);
  }
}
