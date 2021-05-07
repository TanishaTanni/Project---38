// Creating Pikachu and other stuff..

var backGround,backGroundImg;
var pikachu,pikachuImg1;
var pokeball,pokeballImg,pokeballsGroup;
var shell,shellImg;
var rock,rockImg;
var wood,woodImg;
var pokeballG,rockG,woodG;
var gameOver,gameOverImg;
var restart,restartImg;
var score = 0;


//Gamestates
var PLAY=1;
var END=0;
var gameState=1;


function preload(){

// Loading Images...  
  
backGroundImg = loadImage("Background.jpg");
pikachuImg1   = loadImage("pikachu.png");  
pokeballImg   = loadImage("Pokeballs.png");  
shellImg      = loadImage("squirtleShell.png");
rockImg       = loadImage("Rock.png"); 
woodImg       = loadImage("Wood-1.png");
gameOverImg   = loadImage("gameOver-1.png");
restartImg    = loadImage("restart.png");
  
}

function setup() {
  
// Creating canvas
  createCanvas(windowWidth,windowHeight);
 
  backGround = createSprite(width/2,400);
  backGround.addImage(backGroundImg);
  
  backGround2 = createSprite(width/2,400);
  backGround2.addImage(backGroundImg);
  backGround2.scale=1;
  
  pikachu = createSprite(width/2,height-175,20,20);
  pikachu.addImage(pikachuImg1);
  pikachu.scale=0.2;
  
  shell  = createSprite(width/2,height-100,20,20);
  shell.addImage(shellImg);
  shell.scale=0.1;
  
  gameOver = createSprite(750,200,20,50);
  gameOver.addImage(gameOverImg);
  gameOver.scale=0.50;
  
  restart = createSprite(750,300,20,50);
  restart.addImage(restartImg);
  restart.scale=0.50;     
  
// Creating groups  
  pokeballG  = new Group ();
  woodG      = new Group ();
  rockG      = new Group ();
  
  
}

function draw() {
 
// Creating endless ground for pikachu  
backGround2.velocityY = (2+2*score/100); 
 if(backGround2.y > 250) {
   backGround2.y = 200; 
 }

  if(gameState === PLAY){
  restart.visible=false;
  gameOver.visible=false;
    
//Giving colour to the background    
  background("yellow");
  
 //Controling pikachu by arrow keys
  if(keyDown("left")){
    pikachu.x = pikachu.x-10;
    shell.x   = shell.x-10; 
  }
  if(keyDown("right")){
    pikachu.x=pikachu.x+10;
    shell.x  = shell.x+10;
  }
// Making pikachu to collide with Squirtle shell    
  edges = createEdgeSprites();
  pikachu.collide(edges);
  shell.collide(edges);

  if(pikachu.isTouching(pokeballG)){
    pokeballG.destroyEach();
    score = score+1;
  }
  if(pikachu.isTouching(rockG)){
    score = 0;
    gameState = END;
  }
  if(pikachu.isTouching(woodG)){
    score=0;
    gameState = END;
  }
//Function to create pokeball,rock and wood    
 createPokeball();
 createRock();
 createWood();
  } 
  
drawSprites();

//Creating score  
 textSize(20);
  fill("black");
  text("POKE",5,50)
  text("BALLS",75,50);
  text(" :"+score,5,100);
  text("Help Pikachu and Squirtle to find their master.",5,200);
  if(gameState===END){
  restart.visible=true;
  gameOver.visible=true;  
  woodG.setVelocityEach(0);
  rockG.setVelocityEach(0);
  pokeballG.setVelocityEach(0);  
  }
  
  if(mousePressedOver(restart)){
    reset();
     }
   
}
function createPokeball(){
  if(World.frameCount % 100 == 0 ){
    var pokeball = createSprite(Math.round(random(500,700 )),400,10,200) ;
    pokeball.addImage(pokeballImg);
    pokeball.scale=0.1;
    pokeball.velocityY = 3;
    pokeball.lifetime = 150;
    pokeballG.add(pokeball);
  }
}
function createRock(){
  if(World.frameCount % 200 ===0) {
    var rock = createSprite(Math.round(random(500,700)),400,10,100);
    rock.addImage(rockImg);
    rock.scale=0.40;
    rock.velocityY = (2+3*score/100);
    rock.lifetime = 150;
    rockG.add(rock);
  }
}
function createWood(){
  if(World.frameCount % 300 ===0) {
    var wood = createSprite(Math.round(random(500,700)),400,10,40);
    wood.addImage(woodImg);
    wood.scale=0.30;
    wood.velocityY = (2+3*score/100);
    wood.lifetime = 150;
    woodG.add(wood);
}

}
function reset(){
  gameState = PLAY;

}




