var monkey, monkey_running, banana, bc = 0, die, bananaImage, ground, obstacle, obstacleImage, backgA, c = 0, c2 = 400, fG, oG, st = 0, gs = 0, a = 1;

function preload() {
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");
  die=loadImage("sprite_8.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  backgA = loadImage("forest.jpg");
}

function setup() {
  monkey = createSprite(50, 350);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  ground = createSprite(200, 382, 800, 5);
  ground.velocityY = 0;
  ground.velocityX = -4;
  ground.visible = false;
  fG = new Group();
  oG = new Group();
}

function bananas() {
  if (frameCount % 80 == 0) {
    banana = createSprite(400, Math.round(random(75, 250)));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -5;
    banana.lifetime = 100;
    fG.add(banana);
  }
}

function obstacles() {
  if (frameCount % 300 == 0) {
    obstacle = createSprite(400, 360);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -4;
    obstacle.lifetime = 120;
    oG.add(obstacle);
  }
}

function callback(s1, s2) {
  s1.remove();
}

function draw() {
  background(220);
  image(backgA, c, 0, width, height);
  image(backgA, c2, 0, width, height);
  c -= a;
  c2 -= a;;
  if (c <= -width) {
    c = width;
  }
  if (c2 <= -width) {
    c2 = width;
  }
  monkey.collide(ground);
  if (gs == 0) {
    if (ground.x < 0) {
      ground.x = 200;
    }
    if (fG.collide(monkey, callback)) {
      bc++;
    }
    if (oG.collide(monkey, callback)) {
      gs = 1;
    }
    if (keyDown("space") && monkey.y > 340) {
      monkey.velocityY = -25;
    }
    if (frameCount % 5 == 0) {
      st += 1;
    }
    monkey.velocityY += 1;
    bananas();
    obstacles();
  } 
  if (gs == 1) {
    fG.setVelocityXEach(0);
    oG.setVelocityXEach(0);
    fG.setLifetimeEach(-1);
    oG.setLifetimeEach(-1);
    monkey.addImage(die);
    a=0;
    fill("black");
    text("Game Over",145,20);
    text("Press R to restart",130,40);
  }
  if(keyDown("r")&&gs==1)  {
    fG.destroyEach();
    oG.destroyEach();
    st=0;
    gs=0;
    a=1;
    bc=0;
  }
  fill("black");
  text("Bananas:" + bc, 15, 20);
  text("Survival Time:" + st, 270, 20);
  drawSprites();
}