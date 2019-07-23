var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud,cloudImage, cloudGroup;
var ob1,ob2,ob3,ob4,ob5,ob6,score, obstaclesGroup;
var PLAY=1;
var END=0;
var gameState=PLAY;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  ob1 = loadImage("obstacle1.png");
  ob2 = loadImage("obstacle2.png");
  ob3 = loadImage("obstacle3.png");
  ob4 = loadImage("obstacle4.png");
  ob5 = loadImage("obstacle5.png");
  ob6 = loadImage("obstacle6.png");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  

  cloudGroup = new Group();
  
  score = 0;
}

function draw() {
  background(230);
  
 
  text("Score: "+score,500,50);
  
  if (gameState === PLAY){
   score = score + Math.round(getFrameRate()/60);
    if(keyDown("space")) {
    trex.velocityY = -10;
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
    
    trex.collide(invisibleGround);
  
  if(obstaclesGroup.isTouching(trex)){
    gameState=END;
  }
  
  
  if(gameState === END){
ground.velocityX = 0;
    cloud.velocityX = 0;
    ob.velocityX = 0;
  }
  
  spawnCloud();
  spawnObstacles();
  drawSprites();
}


function spawnCloud(){
 if (frameCount%60===0){
   var cloud=createSprite(600,140,10,10);
   cloud.velocityX=-4;
   cloud.y=Math.round(random(110,150));
   cloud.addImage(cloudImage);
   cloud.scale=0.5;
   cloud.lifetime=150;
   
   cloud.depth=trex.depth;
   trex.depth=trex.depth+1;
   
   cloudGroup.add(cloud);
 }
}


function spawnObstacles(){
 if (frameCount%60===0){
  var ob=createSprite(600,160,10,10);
   ob.velocityX=-4;
   var rand= Math.round(random(1,6));
   switch(rand){
   case 1: ob.addImage(ob1);
     break;
     case 2: ob.addImage(ob2);
     break;
     case 3: ob.addImage(ob3);
     break;
     case 4: ob.addImage(ob4);
     break;
     case 5: ob.addImage(ob5);
     break;
     case 6: ob.addImage(ob6);
     break;
     
     default: break;
 
   }
   ob.scale=0.5;
   ob.lifetime=300;
   
   obstaclesGroup.add(ob);
}
}
