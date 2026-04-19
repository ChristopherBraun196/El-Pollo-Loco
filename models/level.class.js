class Level {
  /** @type {MovableObject[]} Array of all enemies in the level. */
  enemies;

  /** @type {Cloud[]} Array of all clouds in the level. */
  clouds;

  /** @type {Coins[]} Array of all coins in the level. */
  coins;

  /** @type {Bottle[]} Array of all collectible bottles in the level. */
  bottles;

  /** @type {BackgroundObject[]} Array of all background tiles. */
  backgroundObjects;

  /** @type {number} Horizontal start position of the level. */
  level_start_x = -100;

  /** @type {number} Horizontal end position of the level. */
  level_end_x = 2260;

  /**
   * Creates a new Level instance with all game objects.
   * @param {MovableObject[]} enemies - The enemies in the level.
   * @param {Cloud[]} clouds - The clouds in the level.
   * @param {Coins[]} coins - The coins in the level.
   * @param {Bottle[]} bottles - The collectible bottles in the level.
   * @param {BackgroundObject[]} backgroundObjects - The background tiles.
   */
  constructor(enemies, clouds, coins, bottles, backgroundObjects) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.coins = coins;
    this.bottles = bottles;
    this.backgroundObjects = backgroundObjects;
  }
}
