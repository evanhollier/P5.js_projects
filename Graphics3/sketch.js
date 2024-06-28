let SpelunkyGuy;
let Green;
let Red;
let direction = 1;
let xPos; 
let speed;
let offset1;
let offset2;

function setup() {
  createCanvas(800, 300);
  frameRate(30);
  SpelunkyGuy = new Character (loadImage('assets/SpelunkyGuy.png'));
  Green = new Character (loadImage('assets/Green.png'));
  Red = new Character (loadImage('assets/Red.png'));
  xPos = random(300,500);
  speed = 5;
  offset1 = random(-300, 300);
  offset2 = random(-300, 300);
}

function draw() {
  background(255);
  xPos = constrain(xPos, 30, width-30);

  translate(xPos-direction*40, 0);
  scale(direction,1);
  image(SpelunkyGuy.sprite, 0,0, 80,80, SpelunkyGuy.frame,0, 80,80);
 
  if (xPos+offset1 > width-30) {
    offset1 -= speed;
  }
  if (xPos+offset1 < 30) {
    offset1 += speed;
  } 
  image(Green.sprite, direction*offset1,100, 80,80, Green.frame,0, 80,80);

  if (xPos+offset2 > width-30) {
    offset2 -= speed;
  }
  if (xPos+offset2 < 30) {
    offset2 += speed;
  } 
  image(Red.sprite, direction*offset2,200, 80,80, Red.frame,0, 80,80);

  if (keyIsDown(RIGHT_ARROW)) {
    direction = 1;
    xPos += speed;
    SpelunkyGuy.walk();
    Green.walk();
    Red.walk();
  }
  else if (keyIsDown(LEFT_ARROW)) {
    direction = -1;
    xPos -= speed;
    SpelunkyGuy.walk();
    Green.walk();
    Red.walk();
  }
  else {
    SpelunkyGuy.frame = 0;
    Green.frame = 0;
    Red.frame = 0;
  }
}
  

class Character {
  
  constructor(i) {
    this.sprite = i;
    this.frame = 0;
  }
  walk() {
    this.frame += 80;
    if (this.frame > 640) {
      this.frame = 80
    }
  }

}