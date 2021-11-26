var tower, towerImg;
var door, doorImg, doorsGroup;
var climber, climberImg, climberGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "PLAY"
var spookySound;

function preload(){
  //cargar Imagen de torre
  towerImg = loadImage("tower.png");
  //cargar imagen de puertas
  doorImg = loadImage("door.png");
  //cargar imagen de bandarillas
  climberImg = loadImage("climber.png");
  //cargar imagen de fantasma
  ghostImg = loadImage("ghost-standing.png");
  //cargar sonido
  spookySound = loadSound("spooky.wav");
  
  //crear grupo
  doorsGroup = new Group();
  //crear grupo
  climberGroup = new Group();
  //crear grupo de bloques invisibles
  invisibleBlockGroup = new Group();
}

function setup(){
  //crear lienzo
  createCanvas(600,600);
  //sonido
  spookySound.loop();
  
  //crear torre, agregar imagen y velocidad de movimiento
  tower = createSprite(300,300);
  tower.addImage("tower", towerImg);
  tower.velocityY = -1;
  
  //crear fantasma
  ghost = createSprite(200,200,50,50);
  ghost.addImage("ghost", ghostImg);
  ghost.scale = 0.3;
  
  
}

function draw(){
  background(0);

  if(tower.y < 0){
    tower.y = 300;
  }
  
  if (gameState === "PLAY") {
  //mover fantasma a la izquierda
  if(keyDown("left_arrow")){
    ghost.x = ghost.x -3;
  }
  
  //mover fantasma a la derecha
  if(keyDown("right_arrow")){
    ghost.x = ghost.x +3;
  }
  
  //brincar al presionar espacio
  if(keyDown("space")){
    ghost.velocityY = -15;
  }
  
  ghost.velocityY = ghost.velocityY + 0.8;
  
  //el fabtasma descanse en la barandilla
  if(climberGroup.isTouching(ghost)){
    ghost.velocityY = 0;
  }
  
  if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
    ghost.destroy();
    gameState = "END";
  }
  
  //llamar la función para crear puertas
  spawnDoors();
  drawSprites();
}
  if (gameState === "END"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  }
  
}
  

//Función para cargar puertas
function spawnDoors(){
  if(frameCount % 240 === 0){
    //puertas
    var door = createSprite(200, -50);
    door.addImage(doorImg);
    
    //barandillas
    var climber = createSprite(200,10);
    climber.addImage(climberImg);
    
    var invisibleBlock = createSprite(200,10);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    
    //puerta
    door.x = Math.round(random(120,400));
    door.velocityY = 1;
    
    //barandilla
    climber.x = door.x;
    climber.velocityY = 1;
    
    //bloques
    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = 1;
    
    //agregamos profundidad
    ghost.depth = door.depth;
    ghost.depth += 1;
    
    
    //asiganmos ciclo de vida a la variable
    door.lifetime = 800;
    climber.lifetime = 800;
    
    //agregar cada puerta al grupo
    doorsGroup.add(door);
    climberGroup.add(climber);
    
    invisibleBlock.debug = true;
    invisibleBlockGroup.add(invisibleBlock);
  }
}