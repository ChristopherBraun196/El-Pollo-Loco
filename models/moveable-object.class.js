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

  energy = 100;
  /**
   * Applies gravity by reducing speedY each frame and clamping to groundY.
   */
  applyGravity() {
    setInterval(() => {
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
   * Draws a debug hitbox rectangle around the object if it is a Character or Chicken.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */

  // character.isColliding (chicken);
  // isColliding(mo) {
  //   return (
  //     this.x + this.width > mo.x &&
  //     this.y + this.height > mo.y &&
  //     this.x < mo.x + mo.width &&
  //     this.y < mo.y + mo.height
  //   );
  // }
  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  hit() {
    this.energy -= 5;
    if (this.energy < 0) {
      this.energy = 0;
    }
    this.lastHit = Date.now(); //fand ich interessanter als newDate().getTime() ist deutlich kürzer..
  }

  isHurt() {
    return Date.now() - this.lastHit < 1000;
  }

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
