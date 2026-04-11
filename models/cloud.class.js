class Cloud extends MovableObject {
  constructor(x) {
    super().loadImage("../img/5_background/layers/4_clouds/1.png");
    this.x = x;
    this.y = 0;

    // this.x = 200 + Math.random() * 2400;
    this.speed = 0.02 + Math.random() * 0.15;
    this.width = 480;
    this.height = 300;

    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }
}
