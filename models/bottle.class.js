class Bottle extends MovableObject {
  width = 60;
  height = 60;

  
  IMAGES_BOTTLE = [
    "assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];

  constructor(x, y) {
    super().loadImage(this.IMAGES_BOTTLE[0]);
    this.loadImages(this.IMAGES_BOTTLE);
    this.x = x;
    this.y = 340;
    this.animate();
  }

  animate() {           // <-- neu
    setInterval(() => {
        this.playAnimation(this.IMAGES_BOTTLE);
    }, 600);
}
}
