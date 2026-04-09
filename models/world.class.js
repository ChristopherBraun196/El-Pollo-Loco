class World {
  character = new Character();

  enemies = [new Chicken(), new Chicken(), new Chicken()];

  cloud = [new Cloud(), new Cloud(), new Cloud()];

  canvas;

  ctx;

  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.draw();
  }

  draw() {
    // 1. Canvas leeren (altes Bild wegwischen)
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // 2. Character zeichnen
    this.ctx.drawImage(
      this.character.img,
      this.character.x,
      this.character.y,
      this.character.width,
      this.character.height,
    );

    // 3. Jeden Gegner zeichnen
    this.enemies.forEach((enemy) => {
      this.ctx.drawImage(
        enemy.img,
        enemy.x,
        enemy.y,
        enemy.width,
        enemy.height,
      );
    });

    this.cloud.forEach((cloud) => {
      this.ctx.drawImage(
        cloud.img,
        cloud.x,
        cloud.y,
        cloud.width,
        cloud.height,
      );
    });

    // for schleife = das gleiche wie bei foreach (vorherige schleife)

    // for (let i = 0; i < this.enemies.length; i++) {
    //   this.ctx.drawImage(
    //     this.enemies[i].img,
    //     this.enemies[i].x,
    //     this.enemies[i].y,
    //     this.enemies[i].width,
    //     this.enemies[i].height,
    //   );
    // }

    // Draw() wird immer wieder aufgerufen
    self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }
}
