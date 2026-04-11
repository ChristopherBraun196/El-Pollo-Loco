const backgroundObjects = [];
for (let i = -1; i < 4; i++) {
  const variant = i % 2 === 0 ? "1" : "2";
  backgroundObjects.push(new BackgroundObject("img/5_background/layers/air.png", i * 720));
  backgroundObjects.push(new BackgroundObject(`img/5_background/layers/3_third_layer/${variant}.png`, i * 720));
  backgroundObjects.push(new BackgroundObject(`img/5_background/layers/2_second_layer/${variant}.png`, i * 720));
  backgroundObjects.push(new BackgroundObject(`img/5_background/layers/1_first_layer/${variant}.png`, i * 720));
}

const level1 = new Level(
  [
    new Chicken(300),
    new Chicken(600),
    new Chicken(900),
    new Chicken(1200),
    new Chicken(1500),
    new Chicken(1800),
    new SmallChicken(400),
    new SmallChicken(700),
    new SmallChicken(1000),
    new SmallChicken(1300),
    new SmallChicken(1600),
    new SmallChicken(1900),
    new Finalboss(),
  ],
  [new Cloud(200), new Cloud(900), new Cloud(1600), new Cloud(2300)],
  backgroundObjects
);

// alte Version 

// const level1 = new Level(
//   [new Chicken(), new Chicken(), new Chicken(), new Finalboss()],
//   [new Cloud(200), new Cloud(900), new Cloud(1600), new Cloud(2300)],
//   [
//     // back
//     new BackgroundObject("img/5_background/layers/air.png", -720),
//     new BackgroundObject("img/5_background/layers/3_third_layer/2.png", -720),
//     new BackgroundObject("img/5_background/layers/2_second_layer/2.png", -720),
//     new BackgroundObject("img/5_background/layers/1_first_layer/2.png", -720),
//
//     // Start Player
//     new BackgroundObject("img/5_background/layers/air.png", 0),
//     new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 0),
//     new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 0),
//     new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 0),
//
//     // Layer two
//     new BackgroundObject("img/5_background/layers/air.png", 720),
//     new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 720),
//     new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 720),
//     new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 720),
//
//     // Layer three
//     new BackgroundObject("img/5_background/layers/air.png", 720 * 2),
//     new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 720 * 2),
//     new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 720 * 2),
//     new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 720 * 2),
//
//     // Layer four
//     new BackgroundObject("img/5_background/layers/air.png", 720 * 3),
//     new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 720 * 3),
//     new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 720 * 3),
//     new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 720 * 3),
//   ],
// );
