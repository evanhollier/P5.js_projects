//  https://www.spriters-resource.com/psp/lunarsilverstarharmony/sheet/58509/
let score = 0;
let timer = 30;
let fr = 24;
let bugs = [];
let speed = 1;

function setup() {
  createCanvas(1000, 500);
  left = loadImage('assets/left.png');
  right = loadImage('assets/right.png');
  deadl = loadImage('assets/deadl.png');
  deadr = loadImage('assets/deadr.png');
  bg = loadImage('assets/bg.jpg');
  frameRate(fr);

  for (let i = 0; i < 5; i++) {
    bugs.push(new Bug());
  }
}

function draw() {
  background(bg);

  for (let i = 0; i < bugs.length; i++) {
    bugs[i].animate();
    bugs[i].display();
  }
  
  textSize(32);
  textAlign(CENTER);  
  fill(255);


  text(score.toString(), 30,30);

  text(timer.toString(), width-40, 30);
  if (frameCount % fr == 0 & timer > 0) {
    timer--;
  }
  if (timer <= 0) {
    for (let i = 0; i < bugs.length; i++) {
      bugs[i].stop();
    }
    background(255,255,255, 100);
    fill(0); 
    text("Bugs squished: "+score.toString(), width/2,height/2);
  }

  if (timer % 2 == 0 & frameCount % fr == 0 & timer != 0) {
    bugs.push(new Bug());
    bugs.push(new Bug());
  }

  if (timer % 3 == 0 & frameCount % fr == 0 & timer != 0 & score >= 5) {
    bugs.push(new Bug());
  }
  if (timer % 3 == 0 & frameCount % fr == 0 & timer != 0 & score >= 10) {
    bugs.push(new Bug());
  }

 
}

class Bug {
  constructor() {
    if (random() < 0.5) {
      this.img = left;
      this.xs = random(-10,-5)*speed;
      this.death = deadl;
    }
    else {
      this.img = right;
      this.xs = random(5,10)*speed;
      this.death = deadr;
    }
    this.x = random(0, width-64);
    this.y = random(0, height-64);
    this.ys = random(5,10)*speed;
    this.sx = 0;
    this.sw = 64;
    this.alive = true;
  } 
  animate() {
    if (this.alive) {

      // animate
      this.sx += this.sw;
      if (this.sx >= 128 | this.sx <= 0) {
        this.sw *= -1;
      }

      // move
      if (this.x > width-64 | this.x < 0) {
        this.xs *= -1;
        if (this.xs > 0) {
          this.img = right;
          this.death = deadr;
        }
        else {
          this.img = left;
          this.death = deadl;
        }
      }
      if (this.y > height-64 | this.y < 0) {
        this.ys *= -1;
      }

      this.x += this.xs;
      this.y += this.ys;

    }
    else {
      this.sx = 0;
    }
  }
  die() {
    if (this.alive) {
      score++;
      speed += 0.02;
      this.img = this.death;
    }
    this.alive = false;
  }
  stop() {
    this.alive = false;
  }
  display() {
    image(this.img, this.x,this.y, 64,64, this.sx,0, 64,64);
  }
  update() {
    this.xs = this.xs+speed;
    this.ys = this.ys+speed;
  }
}

function mouseClicked() {
  for (let i = 0; i < bugs.length; i++) {
    if (mouseX >= bugs[i].x & mouseX <= bugs[i].x+64) {
      if (mouseY >= bugs[i].y & mouseY <= bugs[i].y+64) {
        if (bugs[i].alive) {
          bugs[i].die();
          for (let i = 0; i < bugs.length; i++) {
            bugs[i].update();
          }
        }
      }
    }
  }
}