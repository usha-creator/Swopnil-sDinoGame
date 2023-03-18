var dragon, dragonFlyingImg;
var fireball, fireballImg;
var PLAY = 1;
var END = 0;
var gamestates = PLAY;
var gameover, restart;
var Dino1, Dino2, Dino3, Dino4, Dino5, Dino6, Dino7, Dino8, Dino9, Dino10;
var DinoGroup;
var bg, bgImg;
var asteroidimg, netimg;
var fireballGrp, obstacleGrp;


function preload(){
  dragonFlyingImg = loadAnimation ("Dino/dino1.png", "Dino/dino2.png", "Dino/dino3.png", "Dino/dino4.png", "Dino/dino5.png", "Dino/dino6.png", "Dino/dino7.png", "Dino/dino8.png", "Dino/dino9.png", "Dino/dino10.png")
  fireballImg = loadAnimation("fireBall/1.png","fireBall/1.png","fireBall/1.png","fireBall/4.png","fireBall/5.png","fireBall/6.png")
  bgImg = loadImage("combined.png")
  asteroidimg = loadImage("asteroid.jpeg");
  netimg = loadImage("net2.jpeg");
}



function setup() {
  createCanvas(1200, 700);
  bg = createSprite (0, 500);
  bg.addImage(bgImg);
  bg.scale = 2.5;
  bg.velocityX = -2;

  dino = createSprite(80,220);
  dino.addAnimation("flying", dragonFlyingImg)  

  fireballGrp = new Group();
  obstacleGrp = new Group();
}

function draw() {
  background("white")

  if(gamestates == PLAY){
    if(bg.x <0){
      bg.x = 1200;
    }
  
    if(keyDown(UP_ARROW)){
      dino.y = dino.y - 2;
    }
    if(keyDown(DOWN_ARROW)){
      dino.y = dino.y+ 2;
    }
  
    spawnFire();
    spawnObstacles();

    if(fireballGrp.isTouching(obstacleGrp)){
      obstacleGrp.destroyEach();
    }
  
    if(obstacleGrp.isTouching(dino)){
      gamestates = END;      
    }
  }
  else{
     fireballGrp.destroyEach();
     obstacleGrp.setVelocityXEach(0);
     bg.velocityX = 0;
  }

  
  drawSprites();
}

function spawnFire(){
  if(keyDown("space")){
    fireball = createSprite(dino.x+400,dino.y-50);
    fireball.addAnimation("fire",fireballImg)
    fireball.velocityX = 20;
    fireballGrp.add(fireball);
    fireball.debug=true;
    fireball.setCollider("rectangle",0,0,200,100);
  }
}

function spawnObstacles(){
  if(frameCount % 200 == 0){
    obstacle = createSprite(1200,random(100,300));
    obstacle.velocityX = -2;
    obstacle.debug=true;
    obstacleGrp.add(obstacle);
    var rand = Math.round(random(1,2));
    switch(rand){
      case 1 : obstacle.addImage(asteroidimg);
      break;
      case 2 : obstacle.addImage(netimg);obstacle.scale = 0.2;               
      break;
    }
  }
}