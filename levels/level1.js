const backgroundObjects = [];
for (let i = -1; i < 4; i++) {
  const variant = i % 2 === 0 ? "1" : "2";
  backgroundObjects.push(
    new BackgroundObject("assets/img/5_background/layers/air.png", i * 720),
  );
  backgroundObjects.push(
    new BackgroundObject(
      `assets/img/5_background/layers/3_third_layer/${variant}.png`,
      i * 720,
    ),
  );
  backgroundObjects.push(
    new BackgroundObject(
      `assets/img/5_background/layers/2_second_layer/${variant}.png`,
      i * 720,
    ),
  );
  backgroundObjects.push(
    new BackgroundObject(
      `assets/img/5_background/layers/1_first_layer/${variant}.png`,
      i * 720,
    ),
  );
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
  [
    new Coins(300, 300),
    new Coins(500, 250),
    new Coins(800, 300),
    new Coins(1100, 250),
    new Coins(1400, 300),
  ],
  [
    new Bottle(500),
    new Bottle(400),
    new Bottle(600),
    new Bottle(800),
    new Bottle(1000),
    new Bottle(1200),
    new Bottle(1400),
    new Bottle(1600),
  ],
  backgroundObjects,
);
