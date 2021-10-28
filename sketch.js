var trex, trex_running, edges;
var groundImage;
var nube;
var imagendenube;
var cactus;
var cactusimagen;
var cactusimagen2;
var cactusimagen3;
var cactusimagen4;
var cactusimagen5;
var cactusimagen6;
var puntos=0;
var Grupodecactus;
var Grupodenubes;
var PLAY=1;
var END=0;
var estadosdejuego=PLAY;
var rexchocando;
var gameover;
var gameoverimagen;
var restart;
var restartimage;
var mueresonido;
var sonido100;
var saltosonido;

function preload(){
  trex_running =     loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png");
  imagendenube = loadImage("cloud.png");
  cactusimagen = loadImage("obstacle1.png");
  cactusimagen2 = loadImage("obstacle2.png");
  cactusimagen3 = loadImage("obstacle3.png");
  cactusimagen4 = loadImage("obstacle4.png");
  cactusimagen5 = loadImage("obstacle5.png");
  cactusimagen6 = loadImage("obstacle6.png");
  rexchocando = loadAnimation("trexCollided.png");
  gameoverimagen = loadImage("gameOver.png");
  restartimage = loadImage("restart.png");
  mueresonido = loadSound("die.mp3");
  sonido100 = loadSound("checkPoint.mp3");
  saltosonido = loadSound("jump.mp3");
}

function setup(){
  createCanvas(600,200);
  
  //crea el Trex
  
  suelo = createSprite(200,180,400,20);
  trex = createSprite(50,160,20,50);
  suelo.addImage("suelo",  groundImage)
  suelo.x = suelo.width/2
  sueloinvisible = createSprite(200,190,400,10);
  sueloinvisible.visible = false;
  trex.addAnimation("running", trex_running);
  trex.addAnimation("perdio", rexchocando);
  edges = createEdgeSprites();
  Grupodecactus= new Group();
  Grupodenubes=new Group();
  gameover = createSprite(300,100);
  gameover.addImage( gameoverimagen);
  restart = createSprite(300,140);
  restart.addImage(restartimage);
  restart.visible=false;
  gameover.visible=false;
  
  //añade escala y posición al Trex
  trex.scale = 0.5;
  trex.x = 50
  
  restart.scale=.4;
  gameover.scale=.4;
  
  trex.setCollider("circle",0,0,40);
  trex.debug=true;
  
  puntos=0;
}


function draw(){
  console.time();
  //establece un color de fondo 
  background("#f6804d");
  
  if(estadosdejuego === PLAY) {
    if(puntos>0 && puntos%100 === 0 ){
       sonido100.play();
       } 
    suelo.velocityX=-2;
     puntos=puntos+Math.round(frameCount/60);
    if(suelo.x < 0) {
     suelo.x = suelo.width/2;
     }
    if(keyDown("space") && trex.y>= 161){
    trex.velocityY = -10;
    saltosonido.play();  
    }
    trex.velocityY = trex.velocityY + 0.10;
    nubealeatoria();
    trampa();
    if(trex.isTouching(Grupodecactus) ) {
      estadosdejuego=END;
     
      mueresonido.play();
     }
    restart.visible=false;
    gameover.visible=false;
    
     }
  else if (estadosdejuego === END) {
           restart.visible=true;
           gameover.visible=true; 
           suelo.velocityX=0;
           if(mousePressedOver(restart)) {
              Reaparece(); 
              }
           Grupodecactus.setVelocityXEach(0); 
           Grupodenubes.setVelocityXEach(0);
           trex.changeAnimation("perdio", rexchocando);
           Grupodecactus.setLifetimeEach(-1);
           Grupodenubes.setLifetimeEach(-1);
           
           }
  
  fill("#7aca00")
  text("puntos: "+puntos, 500,50);
   
  
  
  //evita que el Trex caiga
  trex.collide(sueloinvisible);
 
  drawSprites();

}

function nubealeatoria() {
  if(frameCount%60===0){
    nube = createSprite (600,100,40,10);
    nube.velocityX = -3;
    nube.y=Math.round(random(10,60));
    nube.addImage("nube", imagendenube);
    nube.scale=0.4;
    
    nube.depth=trex.depth;
    trex.depth=trex.depth+1;
    
    nube.lifetime=210;
    Grupodenubes.add(nube);
  }
}
function trampa() {
  if(frameCount%120===0){
    cactus=createSprite (600,165,10,40);
    cactus.velocityX = -3;
    
    var numeroaleatorio = Math.round(random(1,6));
    
    switch(numeroaleatorio) {
           case 1: cactus.addImage("trampa", cactusimagen);
        break;
        
        case 2: cactus.addImage("trampa2", cactusimagen2);
        break;
        
        case 3: cactus.addImage("trampa3", cactusimagen3);
        break;
        
        case 4: cactus.addImage("trampa4", cactusimagen4);
        break;
        
        case 5: cactus.addImage("trampa5", cactusimagen5);
        break;
        
        case 6: cactus.addImage("trampa6", cactusimagen6);
        break;
        
        default:break;
             
            
    }
    cactus.scale=0.6
    
    cactus.lifetime=210;
    Grupodecactus.add(cactus);
  }
}
 function Reaparece() {
      estadodejuego = PLAY;
      restart.visible=false;
      gameover.visible=false;
      Grupodecactus.destroyEach();
      Grupodenubes.destroyEach();
      trex.changeAnimation("running", trex_running);
 } 
  

