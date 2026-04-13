class World {
  /**
   * @type {Character} The player character instance.
   */
  character = new Character();

  /**
   * @type {Level} The current level instance.
   */
  level = level1;

  /**
   * @type {HTMLCanvasElement} The canvas element used for rendering.
   */
  canvas;

  /**
   * @type {CanvasRenderingContext2D} The 2D rendering context of the canvas.
   */
  ctx;

  /**
   * @type {Keyboard} The keyboard instance for input handling.
   */
  keyboard;

  /**
   * @type {number} The horizontal camera offset in pixels.
   */
  camera_x = 0;

  /**
   * @type {ThrowableObject[]} Array of currently active throwable objects.
   */
  throwableObjects = [];

  healthBar = new StatusBar(StatusBar.IMAGES_HEALTH, 10, 10);
  bottleBar = new StatusBar(StatusBar.IMAGES_BOTTLE, 10, 60);
  coinBar = new StatusBar(StatusBar.IMAGES_COIN, 10, 110);
  bossBar = new StatusBar(StatusBar.IMAGES_FINALBOSS, 450, 10);

  /**
   * Creates a new World instance, sets up the canvas context and starts the game loop.
   * @param {HTMLCanvasElement} canvas - The canvas element to render on.
   * @param {Keyboard} keyboard - The keyboard instance for input handling.
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.bossBar.width = 250;
    this.coinBar.setPercentage(0);
    this.bottleBar.setPercentage(0);

    this.setWorld();
    this.draw();
    this.run();
  }

  /**
   * Links the world reference to the character and all enemies.
   */
  setWorld() {
    this.character.world = this;
    this.character.animate();
    this.level.enemies.forEach((enemy) => {
      enemy.world = this;
    });
  }

  run() {
    setInterval(() => {
      this.checkCollisions();
    }, 25);
  }

  // checkCollisions() {
  //   this.level.enemies.forEach((enemy) => {
  //     if (this.character.isColliding(enemy) && !this.character.isDead()) {
  //       this.character.hit();
  //       this.healthBar.setPercentage(this.character.energy);
  //       console.log("Collusion with Character", this.character.energy);
  //     }
  //   });
  checkCollisions() {
    // 1. Enemies - von vorne (bereits drin)
    this.level.enemies.forEach((enemy) => {
      if (
        this.character.isColliding(enemy) &&
        !this.character.isDead() &&
        !(enemy instanceof Finalboss)
      ) {
        const characterFeet =
          this.character.y +
          this.character.height -
          this.character.offset.bottom;
        const enemyHead = enemy.y + enemy.offset.top;
        console.log(
          "Feet:",
          characterFeet,
          "Head:",
          enemyHead,
          "speedY:",
          this.character.speedY,
        );
        const enemyCenter = enemy.y + enemy.height / 2;
        if (characterFeet < enemyCenter) {
          console.log("Von oben! speedY:", this.character.speedY);
          enemy.energy = 0;
          this.level.enemies = this.level.enemies.filter((e) => !e.isDead());
        } else if (!this.character.isHurt()) {
          // 1. Von vorne → Charakter nimmt Schaden
          this.character.hit();
          this.healthBar.setPercentage(this.character.energy);
          this.level.enemies = this.level.enemies.filter(
            (enemy) => !enemy.isDead(),
          );
        }
        this.level.bottles = this.level.bottles.filter((bottle) => {
          if (this.character.isColliding(bottle)) {
            this.character.bottles++;
            this.bottleBar.setPercentage(this.character.bottles * 12.5);
            return false;
          }
          return true;
        });
      }
    });
    // Finalboss trifft Character
    let boss = this.level.enemies.find((e) => e instanceof Finalboss);
    if (boss && this.character.isColliding(boss) && !this.character.isHurt()) {
      this.character.hit();
      this.healthBar.setPercentage(this.character.energy);
    }

    // 3. Coins einsammeln
    this.level.coins = this.level.coins.filter((coin) => {
      if (this.character.isColliding(coin)) {
        this.character.coins++;
        this.coinBar.setPercentage(this.character.coins * 20);
        return false;
      }
      return true;
    });

    // 4. Flaschen einsammeln
    this.level.bottles = this.level.bottles.filter((bottle) => {
      if (this.character.isColliding(bottle)) {
        this.character.bottles++;
        this.bottleBar.setPercentage(this.character.bottles * 12.5);
        return false;
      }
      return true;
    });
    // Bottle trifft Finalboss
    this.throwableObjects.forEach((bottle) => {
      let boss = this.level.enemies.find((e) => e instanceof Finalboss);
      if (boss && bottle.isColliding(boss) && !bottle.splashing) {
        boss.hit();
        this.bossBar.setPercentage(boss.energy);
        bottle.splashing = true;
      }
    });
    this.throwableObjects = this.throwableObjects.filter((b) => !b.toDelete);
  }

  /**
   * Clears and redraws all game objects on the canvas each frame.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);

    this.ctx.translate(-this.camera_x, 0);
    // -------------- Space for fixed objects -------------
    this.statusBars();
    // -------------- Space for fixed objects -------------
    this.ctx.translate(this.camera_x, 0);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);
    this.ctx.translate(-this.camera_x, 0);
    self = this;

    requestAnimationFrame(function () {
      self.draw();
    });
  }

  statusBars() {
    this.addToMap(this.healthBar);
    this.addToMap(this.bottleBar);
    this.addToMap(this.coinBar);
    let boss = this.level.enemies.find((e) => e instanceof Finalboss);
    if (boss && boss.isActivated) {
      this.addToMap(this.bossBar);
    }
  }

  /**
   * Draws an array of objects onto the canvas.
   * @param {MovableObject[]} objects - The array of objects to draw.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Draws a single object onto the canvas, flipping it if facing the other direction.
   * @param {MovableObject} mo - The object to draw.
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.ctx.save();
      this.ctx.translate(mo.x + mo.width, 0);
      this.ctx.scale(-1, 1);
      this.ctx.drawImage(mo.img, 0, mo.y, mo.width, mo.height);
      this.ctx.restore();
    } else {
      this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    }
    mo.drawFrame(this.ctx);
  }
}
