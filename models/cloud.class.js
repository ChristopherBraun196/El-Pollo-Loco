class Cloud extends MovableObject {
  constructor() {
    (super().loadImage("../img/5_background/layers/4_clouds/1.png"),
      (this.x = 150 + Math.random() * 100));
    this.y = 60;
    this.width = 380;
    this.height = 200;

    this.animate();
  }

  animate() {
    this.moveLeft();
  }
}
