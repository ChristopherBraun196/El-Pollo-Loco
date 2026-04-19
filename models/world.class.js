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

  /**
   * Starts the main game loop that checks collisions and cleans up dead enemies.
   */
  run() {
    this.runInterval = setInterval(() => {
      if (!gameStarted) return;
      this.checkCollisions();
      this.checkGameEnd();
      this.level.enemies = this.level.enemies.filter((e) => !e.toDelete);
    }, 25);
  }

  /**
   * Checks whether the game has ended by player death or boss death.
   */
  checkGameEnd() {
    if (this.gameEnded) return;
    if (this.character.isDead()) this.handlePlayerDead();
    let boss = this.level.enemies.find((e) => e instanceof Finalboss);
    if (boss && boss.isDead()) this.handleBossDead();
  }

  /**
   * Triggers the game-over screen after the player dies.
   */
  handlePlayerDead() {
    this.gameEnded = true;
    setTimeout(() => this.showEndScreen("screen-game-over", loseSound), 150);
  }

  /**
   * Triggers the win screen after the boss dies.
   */
  handleBossDead() {
    this.gameEnded = true;
    setTimeout(() => this.showEndScreen("screen-you-win", winSound), 150);
  }

  /**
   * Stops the game loop and displays the end screen.
   * @param {string} screenId - The DOM id of the screen to show.
   * @param {HTMLAudioElement} sound - The sound to play.
   */
  showEndScreen(screenId, sound) {
    clearInterval(this.runInterval);
    document.getElementById(screenId).style.display = "block";
    document.getElementById("restartButton").style.display = "flex";
    document.getElementById("homeButton").style.display = "flex";
    if (!soundMuted) sound.play();
  }

  /**
   * Checks all collision types and removes deleted throwable objects.
   */
  checkCollisions() {
    this.checkCollisionEnemies();
    this.checkCollisionBoss();
    this.checkCollisionCoins();
    this.checkCollisionBottlesPickup();
    this.checkCollisionBottlesThrown();
    this.throwableObjects = this.throwableObjects.filter((b) => !b.toDelete);
  }

  /**
   * Checks collisions between the character and normal enemies.
   */
  checkCollisionEnemies() {
    this.level.enemies.forEach((enemy) => {
      if (
        this.character.isColliding(enemy) &&
        !this.character.isDead() &&
        !(enemy instanceof Finalboss)
      ) {
        this.handleEnemyHit(enemy);
      }
    });
  }

  /**
   * Handles a collision: kills enemy if jumped on, otherwise damages the character.
   * @param {MovableObject} enemy - The enemy that was hit.
   */
  handleEnemyHit(enemy) {
    const characterFeet =
      this.character.y + this.character.height - this.character.offset.bottom;
    const enemyCenter = enemy.y + enemy.height / 2;
    if (characterFeet < enemyCenter) {
      this.killEnemy(enemy);
    } else if (!this.character.isHurt() && !enemy.isDead()) {
      this.damageCharacter();
    }
  }

  /**
   * Kills an enemy immediately and schedules its removal.
   * @param {MovableObject} enemy - The enemy to kill.
   */
  killEnemy(enemy) {
    enemy.energy = 0;
    setTimeout(() => {
      enemy.toDelete = true;
    }, 500);
  }

  /**
   * Damages the character and updates the health bar.
   */
  damageCharacter() {
    this.character.hit();
    this.healthBar.setPercentage(this.character.energy);
    if (!soundMuted) hurtSound.play();
    this.level.enemies = this.level.enemies.filter((enemy) => !enemy.isDead());
  }

  /**
   * Checks collision between the character and the final boss.
   */
  checkCollisionBoss() {
    let boss = this.level.enemies.find((e) => e instanceof Finalboss);
    if (boss && this.character.isColliding(boss) && !this.character.isHurt()) {
      this.character.hit();
      this.healthBar.setPercentage(this.character.energy);
      if (!soundMuted) hurtSound.play();
    }
  }

  /**
   * Checks if the character collects any coins.
   */
  checkCollisionCoins() {
    this.level.coins = this.level.coins.filter((coin) => {
      if (this.character.isColliding(coin)) {
        this.character.coins++;
        this.coinBar.setPercentage(this.character.coins * 20);
        if (!soundMuted) coinSound.play();
        return false;
      }
      return true;
    });
  }

  /**
   * Checks if the character picks up any bottles from the ground.
   */
  checkCollisionBottlesPickup() {
    this.level.bottles = this.level.bottles.filter((bottle) => {
      if (this.character.isColliding(bottle)) {
        this.character.bottles++;
        this.bottleBar.setPercentage(this.character.bottles * 12.5);
        if (!soundMuted) coinSound.play();
        return false;
      }
      return true;
    });
  }

  /**
   * Checks if any thrown bottle hits the final boss.
   */
  checkCollisionBottlesThrown() {
    let boss = this.level.enemies.find((e) => e instanceof Finalboss);
    this.throwableObjects.forEach((bottle) => {
      if (boss && bottle.isColliding(boss) && !bottle.splashing) {
        boss.hit();
        if (!soundMuted) bossFightSound.play();
        this.bossBar.setPercentage(boss.energy);
        bottle.splashing = true;
      }
    });
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
    const self = this;

    this.animationFrameId = requestAnimationFrame(function () {
      self.draw();
    });
  }

  stop() {
    clearInterval(this.runInterval);
    cancelAnimationFrame(this.animationFrameId);
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
    // mo.drawFrame(this.ctx);
  }
}
