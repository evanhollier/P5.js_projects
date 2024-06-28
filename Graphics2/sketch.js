let c; // variable for paint color

function setup() {
  createCanvas(600, 400);
  background(240);

  c = 'black';
}

function draw() {
  noStroke();
  fill(255)
  rect(0,0, 22,211) // palette area

  fill('red')
  square(1,1, 20)
  fill('orange')
  square(1,22, 20)
  fill('yellow')
  square(1,43, 20)
  fill(0,255,0) // green
  square(1,64, 20)
  fill('cyan')
  square(1,85, 20)
  fill('blue')
  square(1,106, 20)
  fill('magenta')
  square(1,127, 20)
  fill(127,63,0) // brown
  square(1,148, 20)
  fill(240) // white/eraser
  square(1,169, 20)
  fill('black')
  square(1,190, 20)
}

function mouseDragged() {
  stroke(c)
  strokeWeight(10);
  if(mouseX > 40 | mouseY > 230) { // buffer for color palette
    line(mouseX,mouseY, pmouseX,pmouseY)
  }
}

function mousePressed() {
  if(mouseX < 22 & mouseY < 211) { // click inside palette
    if(mouseY < 22) {
      c = 'red';
    }
    else if(mouseY < 43) {
      c = 'orange';
    }
    else if(mouseY < 64) {
      c = 'yellow';
    }
    else if(mouseY < 85) {
      c = color(0,255,0);
    }
    else if(mouseY < 106) {
      c = 'cyan';
    }
    else if(mouseY < 127) {
      c = 'blue';
    }
    else if(mouseY < 148) {
      c = 'magenta';
    }
    else if(mouseY < 169) {
      c = color(127,63,0);
    }
    else if(mouseY < 190) {
      c = color(240);
    }
    else {
      c = 'black';
    }    
  }
}