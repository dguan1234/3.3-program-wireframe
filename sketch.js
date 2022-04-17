var ground;
var sky;
var movingBackground
var bussin
var bozo
var potholeImage
var potholes
var GROUND_Y = 200

var GRAVITY = 1;
var JUMP = 20;

var x1 = 0;
var x2;
var scrollSpeed = 9;

let gameState = 'start'

function preload() {
  potholeImage = loadImage("assets/pothole0001.png")
  movingBackground = loadImage("assets/ground.png")
  bussin = loadAnimation("assets/bus0001.png", "assets/bus0002.png")
  startMenu = loadImage("assets/gamestart.png")
  endMenu = loadImage("assets/gameend.png")
}

function setup() {
  createCanvas(1000, 500);
  x2 = width



  potholes = new Group();
  bozo = createSprite(100, 400);
  bozo.addAnimation('running', 'assets/running0001.png', 'assets/running0002.png');
  bozo.addAnimation('jumping', 'assets/jumping0001.png');
  bozo.setCollider('rectangle', 0, 0, 100, 150);

  ground = createSprite(100, 450);
  ground.addAnimation('normal', 'assets/small_platform0001.png', 'assets/small_platform0003.png');

  sky = createSprite(100, 35)
  sky.addAnimation('normal', 'assets/skybox0001.png', 'assets/skybox0002.png');
  sky.setCollider('rectangle', 0, 0, 200, 30);




}

function draw() {
  switch (gameState) {
    case 'start':
      gameStart()
      break;
    case 'play':
      gamePlay()
      break;
    case 'end':
      gameEnd()
      break;
  }

console.log(bozo.position)

}

function keyPressed() {
  if (gameState === 'start' || gameState === 'end') {
    if (key === 'G' || key === 'g' ) {
      gameState = 'play';
      bozo.position.x=100
      bozo.position.y=400
    }
  }
}


function backgroundMoving() {
  image(movingBackground, x1, 0, width + 9, height);
  image(movingBackground, x2, 0, width + 9, height);

  x1 -= scrollSpeed;
  x2 -= scrollSpeed;

  if (x1 < -width) {
    x1 = width;
  }
  if (x2 < -width) {
    x2 = width;
  }

}


function gameStart() {
  image(startMenu,0,0)
}

function gamePlay() {


  backgroundMoving()

  animation(bussin, 850, 175)
  fill(200);


  bozo.collide(sky)


  bozo.velocity.y += GRAVITY;



  if (bozo.collide(ground)) {
    bozo.velocity.y = 0;
    bozo.changeAnimation('running');
  }
  if (mouseWentDown(LEFT)) {
    bozo.changeAnimation('jumping');
    bozo.animation.rewind();
    bozo.velocity.y = -JUMP;
  }

  // if (frameCount % 60 == 0) {
  //   var pipeH = random(50, 300);
  //   var pothole = createSprite(bozo.position.x + width, GROUND_Y - pipeH / 2 + 1 + 100, 80, pipeH);
  //   pothole.addImage(potholeImage);
  //   potholes.add(pothole);
  //
  //   for (var i = 0; i < potholes.length; i++)
  //     if (potholes[i].position.x < bozo.position.x - width / 2)
  //       potholes[i].remove()
  // }

  // if (camera.position.x > bozo.position.x - bozo.width + width / 2)
  //   bozo.position.x += bozo.width;

  bozo.debug = mouseIsPressed;
  ground.debug = mouseIsPressed;
  sky.debug = mouseIsPressed;

  drawSprites();

if(bozo.overlap(sky))
gameEnd()
}

function gameEnd() {
gameState = 'end'
image(endMenu,0,0)
}
