function setup() {
  createCanvas(200, 200);
}

function draw() {
  background(255)  
  noStroke()

  fill(255,0,0,100)
  ellipse(100, 70, 100, 100);
    
  fill(0,0,255,100)
  ellipse(70, 120, 100, 100);

  fill(0,255,0,100)
  ellipse(130, 120, 100, 100);
}