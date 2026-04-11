class MovableObject {
  /** @type {number} Horizontal position in pixels. */
  x = 120;

  /** @type {number} Vertical position in pixels. */
  y = 235;

  /** @type {HTMLImageElement} The current image to render. */
  img;

  /** @type {number} Height of the object in pixels. */
  height = 200;

  /** @type {number} Width of the object in pixels. */
  width = 120;

  /** @type {number} The vertical ground boundary for gravity clamping. */
  groundY = 235;

  /** @type {Object} Cache of preloaded images keyed by path. */
  imageCache = {};

  /** @type {number} Index of the current animation frame. */
  currentImage = 0;

  /** @type {number} Horizontal movement speed in pixels per frame. */
  speed = 0.15;

  /** @type {boolean} True if the object is facing left. */
  otherDirection = false;

  /** @type {number} Vertical speed for jump and gravity. */
  speedY = 0;

  /** @type {number} Gravity acceleration applied each frame. */
  acceleration = 2.7;

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
   * Loads a single image and sets it as the current image.
   * @param {string} path - The path to the image file.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Draws a debug hitbox rectangle around the object if it is a Character or Chicken.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  drawFrame(ctx) {
    if (this instanceof Character || this instanceof Chicken) {
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  /**
   * Preloads an array of images into the image cache.
   * @param {string[]} arr - Array of image paths to load.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
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
