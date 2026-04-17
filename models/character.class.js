class Character extends MovableObject {
  /** @type {number} Height of the character in pixels. */
  height = 200;

  /** @type {number} Vertical start position on the canvas. */
  y = 235;

  /** @type {number} Movement speed in pixels per frame. */
  speed = 10;

  /** @type {World} Reference to the game world. */
  world;

  /** @type {number} Current frame index of the jump animation. */
  jumpImageIndex = 0;

  /** @type {boolean} Tracks if the character was moving upward during a jump. */
  wasGoingUp = false;

  /** @type {number} Timestamp of the last movement input. */
  lastMoveTime = Date.now();

  /** @type {number} Current frame index of the death animation. */
  deadImageIndex = 0;

  /** @type {{top: number, bottom: number, left: number, right: number}} Hitbox offsets. */
  offset = { top: 100, bottom: 10, left: 1, right: 1 };

  /** @type {number} Number of coins collected. */
  coins = 0;

  /** @type {number} Number of bottles collected. */
  bottles = 0;

  /** @type {string[]} Idle animation frames. */
  IMAGES_IDLE = [
    "assets/img/2_character_pepe/1_idle/idle/I-1.png",
    "assets/img/2_character_pepe/1_idle/idle/I-2.png",
    "assets/img/2_character_pepe/1_idle/idle/I-3.png",
    "assets/img/2_character_pepe/1_idle/idle/I-4.png",
    "assets/img/2_character_pepe/1_idle/idle/I-5.png",
    "assets/img/2_character_pepe/1_idle/idle/I-6.png",
    "assets/img/2_character_pepe/1_idle/idle/I-7.png",
    "assets/img/2_character_pepe/1_idle/idle/I-8.png",
    "assets/img/2_character_pepe/1_idle/idle/I-9.png",
    "assets/img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  /** @type {string[]} Long idle animation frames (after 15 seconds). */
  IMAGES_LONG_IDLE = [
    "assets/img/2_character_pepe/1_idle/long_idle/I-11.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-12.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-13.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-14.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-15.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-16.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-17.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-18.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-19.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  /** @type {string[]} Walking animation frames. */
  IMAGES_WALKING = [
    "assets/img/2_character_pepe/2_walk/W-21.png",
    "assets/img/2_character_pepe/2_walk/W-22.png",
    "assets/img/2_character_pepe/2_walk/W-23.png",
    "assets/img/2_character_pepe/2_walk/W-24.png",
    "assets/img/2_character_pepe/2_walk/W-25.png",
    "assets/img/2_character_pepe/2_walk/W-26.png",
  ];

  /** @type {string[]} Jump ascending animation frames. */
  IMAGES_JUMPING_UP = [
    "assets/img/2_character_pepe/3_jump/J-31.png",
    "assets/img/2_character_pepe/3_jump/J-32.png",
    "assets/img/2_character_pepe/3_jump/J-33.png",
    "assets/img/2_character_pepe/3_jump/J-34.png",
  ];

  /** @type {string[]} Jump descending animation frames. */
  IMAGES_JUMPING_DOWN = [
    "assets/img/2_character_pepe/3_jump/J-35.png",
    "assets/img/2_character_pepe/3_jump/J-36.png",
    "assets/img/2_character_pepe/3_jump/J-37.png",
    "assets/img/2_character_pepe/3_jump/J-38.png",
    "assets/img/2_character_pepe/3_jump/J-39.png",
  ];

  /** @type {string[]} Hurt animation frames. */
  IMAGES_HURT = [
    "assets/img/2_character_pepe/4_hurt/H-41.png",
    "assets/img/2_character_pepe/4_hurt/H-42.png",
    "assets/img/2_character_pepe/4_hurt/H-43.png",
  ];

  /** @type {string[]} Death animation frames. */
  IMAGES_DEAD = [
    "assets/img/2_character_pepe/5_dead/D-51.png",
    "assets/img/2_character_pepe/5_dead/D-52.png",
    "assets/img/2_character_pepe/5_dead/D-53.png",
    "assets/img/2_character_pepe/5_dead/D-54.png",
    "assets/img/2_character_pepe/5_dead/D-55.png",
    "assets/img/2_character_pepe/5_dead/D-56.png",
    "assets/img/2_character_pepe/5_dead/D-57.png",
  ];

  /**
   * Creates a new Character instance, loads all animation images and starts gravity.
   */
  constructor() {
    super().loadImage("assets/img/2_character_pepe/1_idle/idle/I-1.png");
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING_UP);
    this.loadImages(this.IMAGES_JUMPING_DOWN);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.applyGravity();
  }

  /**
   * Starts all animation and movement intervals for the character.
   */
  animate() {
    setInterval(() => this.handleMovement(), 1000 / 60);
    setInterval(() => this.handleAnimation(), 130);
  }

  /**
   * Processes keyboard input and updates the camera position.
   */
  handleMovement() {
    if (!gameStarted) return;
    let boss =
      this.world &&
      this.world.level.enemies.find((e) => e instanceof Finalboss);
    if (boss && boss.isDead()) return;
    this.handleKeys();
    this.updateCamera();
  }

  /**
   * Selects the appropriate animation based on the character's current state.
   */
  handleAnimation() {
    if (this.isDead()) {
      if (this.deadImageIndex < this.IMAGES_DEAD.length) {
        this.img = this.imageCache[this.IMAGES_DEAD[this.deadImageIndex]];
        this.deadImageIndex++;
      } else {
      }
    } else if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT);
    } else if (this.isAboveGround()) {
      this.handleJumpAnimation();
    } else {
      this.handleGroundAnimation();
    }
  }

  /**
   * Delegates all keyboard inputs to their respective handler methods.
   */
  handleKeys() {
    if (this.isDead()) return;
    this.handleMoveRight();
    this.handleMoveLeft();
    this.handleJump();
    this.handleAttack();
  }

  /**
   * Calculates and clamps the camera position relative to the character.
   */
  updateCamera() {
    this.world.camera_x = -this.x + 200;
    if (this.world.camera_x > 0) {
      this.world.camera_x = 0;
    }
    let minCameraX = -(
      this.world.level.level_end_x -
      this.world.canvas.width / 2
    );
    if (this.world.camera_x < minCameraX) {
      this.world.camera_x = minCameraX;
    }
  }

  /**
   * Moves the character to the right if the right key is pressed.
   */
  handleMoveRight() {
    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
      this.moveRight();
      this.lastMoveTime = Date.now();
    }
  }

  /**
   * Moves the character to the left if the left key is pressed.
   */
  handleMoveLeft() {
    if (this.world.keyboard.LEFT && this.x > 0) {
      this.moveLeft();
      this.lastMoveTime = Date.now();
    }
  }
  /**
   * Makes the character jump when space is pressed and the character is on the ground.
   */
  handleJump() {
    if (this.world.keyboard.SPACE && !this.isAboveGround()) {
      this.jump();
      this.lastMoveTime = Date.now();
      this.world.keyboard.SPACE = false;
    }
  }

  /**
   * Throws a bottle in the character's facing direction when E is pressed.
   */
  handleAttack() {
    if (this.world.keyboard.ATTACK && this.bottles > 0) {
      let bottle = new ThrowableObject(
        this.x + 20,
        this.y + 120,
        this.otherDirection,
      );
      this.world.throwableObjects.push(bottle);
      this.bottles--;
      this.world.bottleBar.setPercentage(this.bottles * 12.5);
      this.world.keyboard.ATTACK = false;
      this.lastMoveTime = Date.now();
    }
  }

  /**
   * Plays the jump animation once, split into ascending and descending phases.
   */
  handleJumpAnimation() {
    if (this.speedY > 0) {
      this.handleJumpUp();
    } else {
      this.handleJumpDown();
    }
  }

  /**
   * Advances the ascending jump animation frame by frame.
   */
  handleJumpUp() {
    if (!this.wasGoingUp) {
      this.jumpImageIndex = 0;
      this.wasGoingUp = true;
    }
    if (this.jumpImageIndex < this.IMAGES_JUMPING_UP.length) {
      this.img = this.imageCache[this.IMAGES_JUMPING_UP[this.jumpImageIndex]];
      this.jumpImageIndex++;
    }
  }

  /**
   * Advances the descending jump animation frame by frame.
   */
  handleJumpDown() {
    if (this.wasGoingUp) {
      this.jumpImageIndex = 0;
      this.wasGoingUp = false;
    }
    if (this.jumpImageIndex < this.IMAGES_JUMPING_DOWN.length) {
      this.img = this.imageCache[this.IMAGES_JUMPING_DOWN[this.jumpImageIndex]];
      this.jumpImageIndex++;
    }
  }

  /**
   * Plays walk, idle or long idle animation depending on the character's state.
   */
  handleGroundAnimation() {
    if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      this.playAnimation(this.IMAGES_WALKING);
    } else if (Date.now() - this.lastMoveTime > 15000) {
      if (!soundMuted && snoringSound.paused) snoringSound.play();
      this.playAnimation(this.IMAGES_LONG_IDLE);
    } else {
      snoringSound.pause();
      snoringSound.currentTime = 0;
      this.playAnimation(this.IMAGES_IDLE);
    }
  }
}
