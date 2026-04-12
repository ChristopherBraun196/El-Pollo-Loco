class Finalboss extends MovableObject {
  height = 250;
  width = 150;
  y = 195;

  /**
   * @type {boolean} Indicates whether the boss has been activated by Pepe's proximity.
   */
  isActivated = false;

  /**
   * @type {string[]} Alert animation frames played before the boss is activated.
   */
  IMAGES_ALERT = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  /**
   * @type {string[]} Walking animation frames played when chasing Pepe.
   */
  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  /**
   * Creates a new Finalboss instance, loads all animations and sets start position.
   */
  constructor() {
    super().loadImage(this.IMAGES_ALERT[0]);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_WALKING);
    this.x = 700 * 3.25 - 195;
    this.speed = 4;
    this.animate();
  }

  /**
   * Starts the boss animation loop. Activates chase behavior when Pepe is within range.
   */
  animate() {
    setInterval(() => {
      if (this.world && this.world.character.isDead()) {
        this.playAnimation(this.IMAGES_ALERT);
        return;
      }
      if (this.world && Math.abs(this.x - this.world.character.x) < 300) {
        this.isActivated = true;
      }
      if (this.isActivated) {
        if (this.world.character.x < this.x) {
          this.x -= this.speed;
          this.otherDirection = false;
        } else {
          this.x += this.speed;
          this.otherDirection = true;
        }
        this.playAnimation(this.IMAGES_WALKING);
      } else {
        this.playAnimation(this.IMAGES_ALERT);
      }
    }, 200);
  }
}
