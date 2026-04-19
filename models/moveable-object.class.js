class MovableObject extends DrawableObject {
  /** @type {number} The vertical ground boundary for gravity clamping. */
  groundY = 235;

  /** @type {number} Horizontal movement speed in pixels per frame. */
  speed = 0.15;

  /** @type {boolean} True if the object is facing left. */
  otherDirection = false;

  /** @type {number} Vertical speed for jump and gravity. */
  speedY = 0;

  /** @type {number} Gravity acceleration applied each frame. */
  acceleration = 2.7;

  /** @type {number} Current energy level. Starts at 100, minimum is 0. */
  energy = 100;

  /**
   * Applies gravity by reducing speedY each frame and clamping to groundY.
   */
  applyGravity() {
    this.gravity = setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
      if (this.y > this.groundY) {
        this.y = this.groundY;
        this.speedY = 0;
      }
    }, 1000 / 25);
  }

  /**
   * Returns true if the object is above the ground level.
   * @returns {boolean}
   */
  isAboveGround() {
    return this.y < this.groundY;
  }

  /**
   * Returns true if this object's hitbox overlaps with another object's hitbox.
   * @param {MovableObject} mo - The other object to check against.
   * @returns {boolean}
   */
  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  /**
   * Reduces energy by 5 and records the hit timestamp.
   */
  hit() {
    this.energy -= 5;
    if (this.energy < 0) {
      this.energy = 0;
    }
    this.lastHit = Date.now();
  }

  /**
   * Returns true if the object was hit within the last second.
   * @returns {boolean}
   */
  isHurt() {
    return Date.now() - this.lastHit < 1000;
  }

  /**
   * Returns true if the object has no energy left.
   * @returns {boolean}
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * Plays the next frame of an animation by cycling through the given images.
   * @param {string[]} images - Array of image paths for the animation.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Moves the object to the right by its speed.
   */
  moveRight() {
    this.x += this.speed;
    this.otherDirection = false;
  }

  /**
   * Moves the object to the left by its speed.
   */
  moveLeft() {
    this.x -= this.speed;
    this.otherDirection = true;
  }

  /**
   * Makes the object jump by setting a positive vertical speed.
   */
  jump() {
    this.speedY = 25;
    this.currentImage = 0;
    this.jumpImageIndex = 0;
  }
}
