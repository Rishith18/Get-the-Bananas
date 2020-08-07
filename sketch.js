//Global Variables
var backgroundd_animation, backgroundd;
var monkey,monkey_animation, monkey_dead;
var groundI, banana_image, rock_image, rock, banana, rand;
var BananaGroup;
var RockGroup;
var gameState, END = 0, PLAY = 1
var gameOver, restart, gameOver_image, restart_image

var hunger = 0;

function rocks() {
  if (frameCount % 200 === 0) {
     rock = createSprite(600,225);
     rock.addImage("Stone",rock_image);
     rock.scale = 0.15;
     rock.velocityX = -8;
     rock.lifetime = 400/6;
     RockGroup.add(rock);
  }
}
  
function bananas() {
   if (frameCount % 80 === 0) {
     rand = Math.round(random(100,150));
     banana = createSprite(600,200);
     banana.y = rand;
     banana.addImage("Banana",banana_image);
     banana.scale = 0.06;
     banana.velocityX = -8;
     banana.lifetime = 400/6;
     BananaGroup.add(banana);
   }
}


function preload() {
  backgroundd_animation = loadAnimation("jungle2.jpg");
  
  monkey_animation = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  monkey_dead = loadAnimation("Monkey_01.png");
  
  banana_image = loadImage("Banana.png");
  rock_image = loadImage("stone.png");
  
  
}


function setup() {
  createCanvas(600,300);
  backgroundd = createSprite(300,40);
  backgroundd.addAnimation("background",backgroundd_animation);
  backgroundd.scale = 1.2;
  
  monkey = createSprite(70,230);
  monkey.addAnimation("monkey",monkey_animation);
  monkey.scale = 0.12;
  
  groundI = createSprite(300,266,600,2);
  groundI.visible = false;
  
  
  
  
  BananaGroup = new Group();
  RockGroup = new Group();
}


function draw(){
  background(255);
  
  backgroundd.velocityX = -4;
  if (backgroundd.x < 0) {
    backgroundd.x = backgroundd.width/2;
  }
  
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(groundI);
  if (keyDown("space") && monkey.y > 200) {
    monkey.velocityY = -12;
  }
  
  if (monkey.isTouching(BananaGroup)) {
    hunger = hunger + 1;
    BananaGroup.destroyEach();
  }
  
  switch(hunger) {
    case 5: monkey.scale = 0.13;
        break;
    case 10: monkey.scale = 0.14;
        break;
    case 15: monkey.scale = 0.15;
        break;
    case 20: monkey.scale = 0.16;
        break;
    case 25: monkey.scale = 0.17;
        break;
    case 30: monkey.scale = 0.18;
        break;
    case 35: monkey.scale = 0.19;
        break;
    case 40: monkey.scale = 0.2;
        break;
        default: break;
  }
  
  if (RockGroup.isTouching(monkey)) {
    monkey.scale = 0.12
    hunger = hunger - 4;
    RockGroup.destroyEach();
  }
  
  bananas();
  rocks();
  
  drawSprites();
  
  if (hunger < 0) {
    textSize(50);
    fill("white");
    stroke("white");
    text("YOU LOSE",160,150);
    RockGroup.velocityX = 0;
    BananaGroup.velocityX = 0;
    RockGroup.destroyEach();
    BananaGroup.destroyEach();
    monkey.changeAnimation("monkey",monkey_dead);
    backgroundd.velocityX = 0;
    gameState = END;
  }
  
  stroke("white");
  fill("white");
  textSize(20);
  text("SCORE: "+hunger,470,50);
}







