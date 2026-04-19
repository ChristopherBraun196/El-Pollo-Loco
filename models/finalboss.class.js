class Finalboss extends MovableObject {
  /** @type {number} Height of the boss in pixels. */
  height = 250;

  /** @type {number} Width of the boss in pixels. */
  width = 150;

  /** @type {number} Vertical start position on the canvas. */
  y = 215;

  /**
   * @type {boolean} Indicates whether the boss has been activated by Pepe's proximity.
   */
  isActivated = false;

  /**
   * @type {string[]} Alert animation frames played before the boss is activated.
   */
  IMAGES_ALERT = [
    "assets/img/4_enemie_boss_chicken/2_alert/G5.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G6.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G7.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G8.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G9.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G10.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G11.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  /**
   * @type {string[]} Walking animation frames played when chasing Pepe.
   */
  IMAGES_WALKING = [
    "assets/img/4_enemie_boss_chicken/1_walk/G1.png",
    "assets/img/4_enemie_boss_chicken/1_walk/G2.png",
    "assets/img/4_enemie_boss_chicken/1_walk/G3.png",
    "assets/img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  /** @type {string[]} Hurt animation frames. */
  IMAGES_HURT = [
    "assets/img/4_enemie_boss_chicken/4_hurt/G21.png",
    "assets/img/4_enemie_boss_chicken/4_hurt/G22.png",
    "assets/img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  /** @type {string[]} Death animation frames. */
  IMAGES_DEAD = [
    "assets/img/4_enemie_boss_chicken/5_dead/G24.png",
    "assets/img/4_enemie_boss_chicken/5_dead/G25.png",
    "assets/img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  /**
   * Creates a new Finalboss instance, loads all animations and sets start position.
   */
  constructor() {
    super().loadImage(this.IMAGES_ALERT[0]);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 700 * 3.25 - 195;
    this.speed = 15;
    this.animate();
  }

  /**
   * Starts the boss animation loop. Activates chase behavior when Pepe is within range.
   */
  animate() {
   this.bossInterval = setInterval(() => this.handleBossAnimation(), 200);
  }

  /**
   * Runs the correct animation based on the boss's current state.
   */
  handleBossAnimation() {
    if (this.isDead()) {
      this.animateDead();
      return;
    }
    if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT);
      return;
    }
    if (this.world && this.world.character.isDead()) {
      this.playAnimation(this.IMAGES_ALERT);
      return;
    }
    this.checkActivation();
    this.animateMovement();
  }

  /**
   * Plays the death animation once and freezes on the last frame.
   */
  animateDead() {
    if (this.currentImage < this.IMAGES_DEAD.length) {
      this.playAnimation(this.IMAGES_DEAD);
    } else {
      this.img = this.imageCache[this.IMAGES_DEAD[this.IMAGES_DEAD.length - 1]];
    }
  }

  /**
   * Activates the boss when Pepe is within 500px.
   */
  checkActivation() {
    if (this.world && Math.abs(this.x - this.world.character.x) < 500) {
      this.isActivated = true;
    }
  }

  /**
   * Moves the boss toward Pepe and plays the walk animation.
   */
  animateMovement() {
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
  }
  
  /**
   * Reduces the boss's energy by 20. Minimum value is 0.
   */
  hit() {
    this.energy -= 20;
    if (this.energy < 0) this.energy = 0;
  }
}
