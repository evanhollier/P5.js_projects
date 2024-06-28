var serial;

var portName = 'COM3';

var outMessage = 'H';
var inMessage = 255;

function setup() {
  createCanvas(windowWidth, windowHeight);

  serial = new p5.SerialPort();
  serial.list();
  serial.open(portName);
  serial.on('list', gotList);
  serial.on('data', gotData);
}


function gotList(thelist) {
  console.log("List of Serial Ports:");
  for (var i = 0; i < thelist.length; i++) {
    console.log(i + " " + thelist[i]);
  }
}

function gotData() {
  inMessage = serial.read();
  console.log(inMessage);
}

function draw() {
  background(inMessage,0,0);
  fill(0,0,0);
  text("click to change the LED", 10, 10);
}

function mouseReleased() {
  serial.write(outMessage);
  if (outMessage === 'H') {
    outMessage = 'L';
  } else {
    outMessage = 'H';
  }
}

function keyPressed() {
  serial.write(keyCode);
  console.log(keyCode)
}
