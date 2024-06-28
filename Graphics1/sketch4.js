function setup() {
  createCanvas(200, 200);
}

function draw() {
  background(0,0,127)
  stroke(255)
  strokeWeight(3)
  
  fill(0,127,0)
  ellipse(100,100, 100,100)

  fill(255,0,0)
  beginShape()
  vertex(70,140)
  vertex(80,105)
  vertex(52,84)
  vertex(88,84)
  vertex(100,50)
  vertex(110,84)
  vertex(148,84)
  vertex(119,105)
  vertex(129,140)
  vertex(100,120)
  endShape(CLOSE)
}