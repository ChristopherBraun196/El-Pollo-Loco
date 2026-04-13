class Level {
  enemies;
  clouds;
  coins;
  bottles;
  backgroundObjects;
  level_start_x = -100;
  level_end_x = 2260;

  constructor(enemies, clouds, coins, bottles, backgroundObjects) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.coins = coins;
    this.bottles = bottles;
    this.backgroundObjects = backgroundObjects;
  }
}
