var edges                  ;
var rubyImage              ;
var cashImage              ;
var swordImage             ;
var necklesImage           ;
var road,roadImage         ;
var player,playerAnimation ;
var gameOver;

//this is the varible for play and end state of the game.


var    PLAY   =   1  ;
var    END    =   0  ;
var gameState = PLAY ;

//this is the function where we have to load the images and animation.
function preload(){
  rubyImage        = loadImage     (         "images/diam.png"          );
  roadImage        = loadImage     (         "images/Road.png"          );
  cashImage        = loadImage     (         "images/cash.png"          );
  swordImage       = loadImage     (         "images/sword.png"         );
  necklesImage     = loadImage     (         "images/neck1.png"         );
  gameOverImages   = loadImage     (        "images/gameOver.png"       );
  playerAnimation  = loadAnimation ("images/left.png","images/right.png");

}
//this is the function where we have to give the information of the object.
function setup(){
  
  //creating the canvas for the game.
  createCanvas(500,500);
  
  //createing the object for the game.
  road     =   createSprite(250,250,1,1);
  player   =   createSprite(350,430,1,1);
  gameOver =   createSprite(200,200,1,1);
  edges    =   createEdgeSprites();
  
  
  //creating the group for the game.
  moneyGroup1 = new Group();
  moneyGroup2 = new Group();
  moneyGroup3 = new Group();
  swordGroup  = new Group();
  
  //controlling the size of the object ;
  road.scale    =  1  ;
  player.scale  = 1.2 ;
  gameOver.scale = 0.3;
  
  //adding image and animation to the object.
  road.addImage(roadImage);
  gameOver.addImage(gameOverImages);
  player.addAnimation("walking",playerAnimation);
  
  //giving the value for the score.
  score = 0;
  
  //adjusisting the colliding radius.
  player.setCollider("circle",0,0,40);
}
//this is the function for drawing diffrent function for the object.
function draw() {
  
  //creating the game state to play.
  if(gameState === PLAY){
    
    gameOver.visible = false;
    
    //giving colour to the background.
    background(200);
    
    //establishing the  function in the game created below.
    spawnMoney ();
    spawnSword ();
    spawnMoney1();
    spawnMoney2();
    
    //displaying the sprite in the game 
    drawSprites();
    
    //controlling the player through the mouse.
    player.x = World.mouseX ;
    
    //giving velocity to road .
    road.velocityY = 4;
  
    //making the road infinte long.
    if(road.y > 900){
      road.y = road.width/8 ;
    }
    
    //colliding player with the edges so that it will not go out side the screen.
    player.collide(edges); 
    
    //creating the score panal.
    textSize(             30            );
    stroke  (          "black"          );
    fill    (          "white"          );
    text    ("treasure : "+ score ,300,40)
    
    //creating the condition if the player touches the money then he will get a point.
    if(player.isTouching(moneyGroup1)){
      
      moneyGroup1.destroyEach();
      score = score + 2 ; 
    }  
    
    //creating the condition if the player touches the money then he will get a point.
    if(player.isTouching(moneyGroup2)){
      
      moneyGroup2.destroyEach();
      score = score + 2 ; 
    }  
    
    //creating the condition if the player touches the money then he will get a point.
    if(player.isTouching(moneyGroup3)){
      
      moneyGroup3.destroyEach();
      score = score + 2 ; 
    }  
    
    //creating the condition if the player touches the sword then he will lose the game.
    if(player.isTouching(swordGroup)){
      
      gameState = END ;
    }
  }
  else if(gameState === END){
    gameOver.visible = true;
    
    
    player.destroy();
    background.velocity = 0 ;
    swordGroup .setVelocityYEach(  0  );
    moneyGroup1.setVelocityYEach(  0  );
    moneyGroup2.setVelocityYEach(  0  );
    moneyGroup3.setVelocityYEach(  0  );
  }
}

//function for spawing the money.
function spawnMoney(){
  
  if(frameCount % 100 === 0){
    
    var money  = createSprite(Math.round(random(20,480)),0,10,10);
    var rand   = Math.round((1));
    switch(rand) {
    case 1 : money.addImage(cashImage);
    break;
    default : break;
    }
    money.scale       = 0.2;
    money.lifetime    = 150;
    money.velocityY   =  4 ;
    money.setCollider("circle",0,0,1);
    moneyGroup1.add(      money     );
    
  }
}

//function for spawing the money.
function spawnMoney1(){
  
  if(frameCount % 120=== 0){
    
   var money1 = createSprite(Math.round(random(10,490)),0,10,10);
   var rand   = Math.round(1);
   switch(rand) {
   case 1 : money1.addImage(rubyImage);
   break ;
   default: break;
   }
   money1.scale       = 0.3;
   money1.lifetime    = 150;
   money1.velocityY   =  4 ;
   money1.setCollider("circle",0,0,1);
   moneyGroup2.add(      money1     );
    
  }
}

//function for spawing the money.
function spawnMoney2(){
  
  if(frameCount % 160=== 0){
    
    var money2 = createSprite(Math.round(random(10,490)),0,10,10);
    var rand   = Math.round(1);
    switch(rand) {
    case 1  : money2.addImage(necklesImage);
    break ;
    default : break;
    }
    money2.scale       = 0.15;
    money2.lifetime    =  150;
    money2.velocityY   =   4 ;
    money2.setCollider("circle",0,0,1);
    moneyGroup3.add(      money2     );
  } 
}
//function for spawing the sword.
function spawnSword(){
  
  if(frameCount % 190=== 0){
    
    var sword = createSprite(Math.round(random(10,490)),0,10,10);
    var rand  = Math.round(1);
    switch(rand) {
    case 1  : sword.addImage(swordImage);
    break ;
    default : break;
    }
    sword.scale       = 0.15;
    sword.lifetime    =  150;
    sword.velocityY   =   4 ;
    sword.setCollider("circle",0,0,1);
    swordGroup.add(      sword      );
  }  
}

