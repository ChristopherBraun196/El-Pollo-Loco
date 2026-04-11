class Level {
  enemies;
  clouds;
  backgroundObjects;
  level_start_x = -100;
  level_end_x = 2260;


  constructor(enemies, clouds, backgroundObjects) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
  }
}
