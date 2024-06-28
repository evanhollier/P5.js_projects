// https://streamable.com/9y1oan

var serial;
var portName = 'COM3';
var arduinoMouseX;
var arduinoMouseY;
var gameover;
var inMessage;
var inJoySwitch;
var inJoyX;
var inJoyY;
var inButton;
var index;
var await = false;
var fps = 30;
var movespeed = 5;
var gettingInput = true;

var doorA3 = true;
var doorB6B7 = true;
var doorB10 = true;
var doorD12 = true;
var doorF8 = true;

function preload() {
  openPlayer = new Tone.Player({
    "url" : "assets/open.mp3",
  }).toMaster();
}

function setup() {
  createCanvas(1200, 600);

  frameRate(fps);
  pleft = loadImage('assets/player_left.png');
  pdown = loadImage('assets/player_down.png');
  pup = loadImage('assets/player_up.png');
  pright = loadImage('assets/player_right.png');
  player = new Player();


  arduinoMouseX = width/2;
  arduinoMouseY = height/2;


  serial = new p5.SerialPort();
  serial.list();
  serial.open(portName);
  serial.on('list', gotList);
  serial.on('data', gotData);
  index=0;
}

function gotList(thelist) {
  console.log("List of Serial Ports:");
  for (var i = 0; i < thelist.length; i++) {
    console.log(i + " " + thelist[i]);
  }

  serial.write(0); // dummy message to restart timer
}

function gotData() {
  inMessage = serial.read();
  switch(index) {
    case 0:
      inJoySwitch = inMessage;
      index++;
      break;
    case 1:
      inJoyX = inMessage;
      index++;
      break;
    case 2:
      inJoyY = inMessage;
      index++;
      break;
    case 3:
      gameover = inMessage;
      index=0;
      break;
  }
  // console.log("inJoySwitch: "+inJoySwitch);
  // console.log("inJoyX: "+inJoyX);
  // console.log("inJoyY: "+inJoyY);
  // console.log("gameover: "+gameover);
  // console.log("arduinoMouseX: "+arduinoMouseX);
  // console.log("arduinoMouseY: "+arduinoMouseY);
}


function draw() {
  noStroke();
  background(128, 160, 128);

  // draw player
  player.animate();
  player.display();

  
  // goal
  fill(255,0,0);
  rect(20,500, 80,80);
  
  fill(0);
  textSize(15);
  textAlign(CENTER, CENTER);
  text("Goal", 60,540);

  

  // draw doors and obscure path behind closed doors
  if(doorA3) {
    fill(0);
    rect(0,0, 300,200);

    fill(150,75,0);
    rect(200,20, 100,80);
  }
  if(doorD12) {
    fill(0);
    rect(1100,20, 100,300);
    
    fill(150,75,0);
    rect(1100,300, 80,100);
  }
  if(doorF8) {
    fill(0);
    rect(300,400, 400,200);
    rect(0,300, 400,200);
    
    fill(150,75,0);
    rect(700,500, 100,80);
  }
  if(doorB10) {
    fill(0);
    rect(700,200, 500,400);

    fill(150,75,0);
    rect(900,100, 100,100);
  }
  if(doorB6B7) {
    fill(0);
    rect(200,20, 200,300);
    rect(300,20, 700,180);

    fill(150,75,0);
    rect(500,100, 200,100);

    // instructions
    fill(0);
    textAlign(CENTER, CENTER);
    text("Click doors to open them.", width/2,150);
  }
  

  // maze walls
  fill(0);

  // outer walls
  rect(0,0, 1200,20);
  rect(0,580, 1200,20);
  rect(0,0, 20,600);
  rect(1180,0, 20,600);

  // draw inner walls
  rect(1000,20, 100,380); // A11,B11,C11,D11
  rect(100,100, 200,200); // B2,B3,C2,C3
  rect(400,100, 100,400); // B5,C5,D5,E5
  rect(700,100, 100,400); // B8,C8,D8,E8
  rect(800,100, 100,100); // B9
  rect(20,200, 80,100); // C1
  rect(300,300, 100,100); // D4
  rect(900,300, 100,100); // D10
  rect(100,400, 100,200); // E2,F2
  rect(500,400, 200,100); // E6,E7
  rect(200,500, 100,80); // F3
  rect(900,500, 200,80); // F10,F11


  // inner walls collision
  
  // check right collision
  if(arduinoMouseX == 175) {
    // colliding with right wall of 2
    if(arduinoMouseY > 305) {
      // E
      player.left = false
    }
    else {
      // D,A
      player.left = true;
    }
  }
  else if(arduinoMouseX == 275) {
    // colliding with right wall of 3
    if(arduinoMouseY <= 5 && doorA3) {
      // A (door)
      player.left = false;
    }
    else if(arduinoMouseY > 5 && arduinoMouseY <= 205) {
      // B,C
      player.left = false;
    }
    else if(arduinoMouseY > 405) {
      // F
      player.left = false;
    }
    else {
      // E
      player.left = true;
    }
  }
  else if(arduinoMouseX == 475) {
    // colliding with right wall of 5
    if(arduinoMouseY > 5 && arduinoMouseY <= 305) {
      // B,C,D
      player.left = false;
    }
    else {
      //A,F
      player.left = true;
    }
  }
  else if(arduinoMouseX == 775) {
    // colliding with right wall of 8
    if(arduinoMouseY > 5 && arduinoMouseY < 460) {
      // C,D,E
      player.left = false;
    }
    else if(arduinoMouseY >= 460 && doorF8) {
      // F (door)
      player.left = false;
    }
    else {
      //A
      player.left = true;
    }
  }
  else if(arduinoMouseX == 875) {
    // colliding with right wall of 9
    if(arduinoMouseY > 5 && arduinoMouseY < 160) {
      // B
      player.left = false;
    }
    else {
      // A,C,E
      player.left = true;
    }
  }
  else if(arduinoMouseX == 1075) {
    // colliding with right wall of 11
    if(arduinoMouseY < 360 // A,B,C,D
    || arduinoMouseY > 405) { // F
      player.left = false;
    }
    else {
      // E
      player.left = true;
    }
  }
  // check left collision
  else if(arduinoMouseX == 30) {
    // colliding with left wall of 2
    if(arduinoMouseY > 5 && arduinoMouseY <= 105) {
      // B
      player.right = false;
    }
    else if(arduinoMouseY > 305) {
      // E,F
      player.right = false;
    }
    else {
      // A,D
      player.right = true;
    }
  }
  // left of doorA3 is unreachable, collision not needed.
  else if(arduinoMouseX == 230) {
    // colliding with left wall of 4
    if(arduinoMouseY >= 260 && arduinoMouseY < 360) {
      // D
      player.right = false;
    }
    else {
      // A,E
      player.right = true;
    }
  }
  else if(arduinoMouseX == 330) {
    // colliding with left wall of 5
    if(arduinoMouseY > 5 && arduinoMouseY < 460) {
      // B,C,E
      player.right = false;
    }
    else {
      // A,F
      player.right = true;
    }
  }
  else if(arduinoMouseX == 630) {
    // colliding with left wall of 8
    if(arduinoMouseY > 5 && arduinoMouseY <= 305) {
      // B,C,D
      player.right = false;
    }
    // left of doorF8 is unreachable, collision not needed.
    else {
      // A
      player.right = true;
    }
  }
  else if(arduinoMouseX == 830) {
    // colliding with left wall of 10
    if((arduinoMouseY > 205 && arduinoMouseY <  360) // D
    || (arduinoMouseY > 405)) { // F
      player.right = false;
    }
    else {
      // A,C,E
      player.right = true;
    }
  }
  else if(arduinoMouseX == 930) {
    // colliding with left wall of 11
    if(arduinoMouseY <= 205) {
      // A,B,C
      player.right = false;
    }
    else {
      // E
      player.right = true;
    }
  }
  else {
    // not colliding with left or right of a wall
    player.left = true;
    player.right = true;
  }

  // check top collision
  if(arduinoMouseY == 5) {
    // colliding with top wall of B
    if((arduinoMouseX > 30  && arduinoMouseX < 275) // 2,3
    || (arduinoMouseX > 330 && arduinoMouseX < 475) // 5
    || (arduinoMouseX > 630 && arduinoMouseX < 875)) { // 8,9
      player.down = false;
    }
    // top of doorB6B7 is unreachable, collision not needed.
    else if((arduinoMouseX >= 875 && arduinoMouseX <= 930) && doorB10) {
      // 10 (door)
      player.down = false;
    }
    else {
      // 1,4,12
      player.down = true;
    }
  }
  else if(arduinoMouseY == 105) {
    // colliding with top wall of C
    if(arduinoMouseX <= 30) {
      // 1
      player.down = false;
    }
    else {
      // 4,6,7,10,12
      player.down = true;
    }
  }
  else if(arduinoMouseY == 205) {
    // colliding with top wall of D
    if((arduinoMouseX >= 275 && arduinoMouseX <= 330) // 4
    || (arduinoMouseX >= 830 && arduinoMouseX <= 930)) { // 10
      player.down = false;
    }
    // top of doorD12 is unreachable, collision not needed.
    else {
      // 6,7,9,12
      player.down = true;
    }
  }
  else if(arduinoMouseY == 305) {
    // colliding with top wall of E
    if((arduinoMouseX > 30 && arduinoMouseX < 175) // 2
    || (arduinoMouseX >= 475 && arduinoMouseX <= 630)) { // 6,7
      player.down = false;      
    }
    else {
      // 1,3,9,12
      player.down = true;
    }
  }
  else if(arduinoMouseY == 405) {
    // colliding with top wall of F
    if((arduinoMouseX >= 175 && arduinoMouseX < 275) // 3
    || (arduinoMouseX > 830 && arduinoMouseX < 1075)) { // 10,11
      player.down = false;
    }
    else {
      player.down = true;
    }
  }
  // check bottom collision
  else if(arduinoMouseY == 160) {
    // colliding with bottom wall of B
    if(arduinoMouseX >= 775 && arduinoMouseX < 875) {
      // 9
      player.up = false;
    }
    // bottom of doorB10 is unreachable, collision not needed.
    else if((arduinoMouseX >= 475 && arduinoMouseX <= 630) && doorB6B7) {
      // 6,7 (door)
      player.up = false;
    }
    else {
      player.up = true;
    }
  }
  else if(arduinoMouseY == 260) {
    // colliding with bottom wall of C
    if(arduinoMouseX <= 230) {
      // 1,2,3
      player.up = false;
    }
    else {
      player.up = true;
    }
  }
  else if(arduinoMouseY == 360) {
    // colliding with bottom wall of D
    if((arduinoMouseX > 230 && arduinoMouseX <= 330) // 4
    || (arduinoMouseX > 830 && arduinoMouseX < 1075)) { // 10,11
      player.up = false;
    }
    else if (arduinoMouseX >= 1075 && doorD12) {
      // 12 (door)
      player.up = false;
    }
    else {
      player.up = true;
    }
  }
  else if(arduinoMouseY == 460) {
    // colliding with bottom wall of E
    if(arduinoMouseX > 330 && arduinoMouseX < 775) {
      // 5,6,7,8
      player.up = false;
    }
    else {
      player.up = true;
    }
  }
  else {
    // not colliding with top or bottom of a wall
    player.up = true;
    player.down = true;
  }

  // game over screen
  if(gameover == 1) {
    background(0);

    fill(255,0,0)
    textSize(100);
    textAlign(CENTER, CENTER);
    text("Time's up!", width/2,height/2);
    gettingInput = false;
  }
  
  // goal  
  if(arduinoMouseX <= 30 && arduinoMouseY >= 450) {
    // reached goal

    // win screen
    background(0);

    fill(255,0,0)
    textSize(100);
    textAlign(CENTER, CENTER);
    text("You win!", width/2,height/2);
    gettingInput = false;
  }

  

  // input
  if(gettingInput){
    if(inJoySwitch == 0) {
      // joystick pressed down
      fps = 60;
    }
    else if(inJoySwitch == 1) {
      // joystick released
      fps = 30
    }
    frameRate(fps);


    if(inJoyX == 0 && (inJoyY != 0 && inJoyY != 255)) {
      // joystick left, ignoring case when up or down is also held
      player.setSprite(pleft);
      if(player.left) {
        arduinoMouseX -= movespeed;
      }
    }
    if(inJoyX == 255 && (inJoyY != 0 && inJoyY != 255)) {
      // joystick right, ignoring case when up or down is also held
      player.setSprite(pright);
      if(player.right) {
        arduinoMouseX += movespeed;
      }
    }
    if(inJoyY == 0) {
      // joystick up
      player.setSprite(pup);
      if(player.up) {
        arduinoMouseY -= movespeed;
      }
    }
    if(inJoyY == 255) {
      // joystick down
      player.setSprite(pdown);
      if(player.down) {
        arduinoMouseY += movespeed;
      }
    }
    arduinoMouseX = constrain(arduinoMouseX, 0,1105);
    arduinoMouseY = constrain(arduinoMouseY, -10,495);
  }
}

class Player {
  constructor() {
    this.img = pdown;
    this.sy = 0;
    this.playframe = true; // used to animate at half framerate

    // allowed directions
    this.up = true;
    this.down = true;
    this.left = true;
    this.right = true;
  }
  animate() {
    if(this.playframe) {
      this.playframe = false; 
      this.sy += 99;
      if(this.sy == 396) {
        this.sy = 0
      }
    }
    else {
      this.playframe = true;
    }
  }
  setSprite(i) {
    this.img = i;
  }
  display() {
    image(this.img, arduinoMouseX,arduinoMouseY, 96,96, 0,this.sy, 96,96);
  }
}

function mouseReleased() {
  // open door inside mouse, unless it's behind another closed door
  // console.log(mouseX, mouseY);
  if(isMouseInside(500,700, 100,200)) {
    doorB6B7 = false;
  }
  if(isMouseInside(200,300, 20,100) && !doorB6B7) {
    doorA3 = false;
  }
  if(isMouseInside(900,1000, 100,200) && !doorB6B7) {
    doorB10 = false;
  }
  if(isMouseInside(1100,1180, 300,400) && !doorB10) {
    doorD12 = false;
  }
  if(isMouseInside(700,800, 500,580) && !doorB10) {
    doorF8 = false;
  }
}
function isMouseInside(x1,x2, y1,y2){
  if((mouseX >= x1 && mouseX <= x2) && (mouseY >= y1 && mouseY <= y2)) {
    openPlayer.start(); // play sound
    return true;
  }
  return false;
 }