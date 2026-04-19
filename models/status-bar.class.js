class StatusBar extends DrawableObject {
  /** @type {string[]} Image paths for the health status bar. */
  static IMAGES_HEALTH = [
    "assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
    "assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
    "assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
    "assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
    "assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
    "assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
  ];

  /** @type {string[]} Image paths for the coin status bar. */
  static IMAGES_COIN = [
    "assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png",
    "assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png",
    "assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png",
    "assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png",
    "assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png",
    "assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png",
  ];

  /** @type {string[]} Image paths for the bottle status bar. */
  static IMAGES_BOTTLE = [
    "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png",
    "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png",
    "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png",
    "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png",
    "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png",
    "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png",
  ];

  /** @type {string[]} Image paths for the final boss status bar. */
  static IMAGES_FINALBOSS = [
    "assets/img/7_statusbars/2_statusbar_endboss/green/green0.png",
    "assets/img/7_statusbars/2_statusbar_endboss/green/green20.png",
    "assets/img/7_statusbars/2_statusbar_endboss/green/green40.png",
    "assets/img/7_statusbars/2_statusbar_endboss/green/green60.png",
    "assets/img/7_statusbars/2_statusbar_endboss/green/green80.png",
    "assets/img/7_statusbars/2_statusbar_endboss/green/green100.png",
  ];

  /** @type {number} Current fill percentage of the status bar (0–100). */
  percentage = 100;

  /**
   * Creates a new StatusBar instance and sets the initial image.
   * @param {string[]} images - The image array to use for this bar.
   * @param {number} x - Horizontal position in pixels.
   * @param {number} y - Vertical position in pixels.
   */
  constructor(images, x, y) {
    super();
    this.images = images;
    this.loadImages(images);
    this.x = x;
    this.y = y;
    this.width = 200;
    this.height = 60;
    this.setPercentage(100);
  }

  /**
   * Updates the displayed image based on the given percentage.
   * @param {number} percentage - The new percentage value (0–100).
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let imagePath = this.images[this.resolveImageIndex()];
    this.img = this.imageCache[imagePath];
  }

  /**
   * Returns the image index (0–5) that matches the current percentage.
   * @returns {number} The index of the image to display.
   */
  resolveImageIndex() {
    if (this.percentage == 100) return 5;
    else if (this.percentage >= 80) return 4;
    else if (this.percentage >= 60) return 3;
    else if (this.percentage >= 40) return 2;
    else if (this.percentage >= 20) return 1;
    else return 0;
  }
}
