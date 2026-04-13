class Coins extends MovableObject {
  width = 80;
  height = 80;

  IMAGES_COINS = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];

  constructor(x, y) {
    super().loadImage(this.IMAGES_COINS[0]);
    this.loadImages(this.IMAGES_COINS);
    this.x = x;
    this.y = y;
    this.animate();
}

animate() {
  setInterval(() => {
    this.playAnimation(this.IMAGES_COINS);
  }, 200);
}
}
