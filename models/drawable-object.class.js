class DrawableObject {
  /** @type {HTMLImageElement} The current image to render. */
  img;

  /** @type {Object} Cache of preloaded images keyed by path. */
  imageCache = {};

  /** @type {number} Index of the current animation frame. */
  currentImage = 0;

  /** @type {number} Horizontal position in pixels. */
  x = 120;

  /** @type {number} Vertical position in pixels. */
  y = 235;

  /** @type {number} Height of the object in pixels. */
  height = 200;

  /** @type {number} Width of the object in pixels. */
  width = 120;

  /**
   * Loads a single image and sets it as the current image.
   * @param {string} path - The path to the image file.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

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
}
