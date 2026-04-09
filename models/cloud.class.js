class Cloud extends MovableObject {
    
constructor(){
    super().loadImage('../img/5_background/layers/4_clouds/1.png'),

    this.x = 150 + Math.random() * 600;
    this.y = 80;
    this.width = 180;
    this.height =180;
}
}
