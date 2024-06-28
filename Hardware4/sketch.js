let brushc; // variable for paint color

var serial;
var portName = 'COM3';
var await = false;
var arduinoMouseX;
var arduinoMouseY;
var inMessage;
var inJoySwitch;
var inJoyX;
var inJoyY;
var inButton;
var index;
var outMessage = 'H';

function setup() {
  createCanvas(600, 400);
  background(240);

  brushc = 'black';

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

  serial.write(outMessage); // send initial value
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
      inButton = inMessage;
      index=0;
      break;
  }
  console.log("inJoySwitch: "+inJoySwitch);
  console.log("inJoyX: "+inJoyX);
  console.log("inJoyY: "+inJoyY);
  console.log("inButton: "+inButton);
  console.log("arduinoMouseX: "+arduinoMouseX);
  console.log("arduinoMouseY: "+arduinoMouseY);
  console.log("outMessage: "+outMessage);
}


function draw() {
  noStroke();
  fill(255)
  rect(0,0, 22,211) // palette area

  fill('red')
  rect(1,1, 20,20)
  fill('orange')
  rect(1,22, 20,20)
  fill('yellow')
  rect(1,43, 20,20)
  fill(0,255,0) // green
  rect(1,64, 20,20)
  fill('cyan')
  rect(1,85, 20,20)
  fill('blue')
  rect(1,106, 20,20)
  fill('magenta')
  rect(1,127, 20,20)
  fill(127,63,0) // brown
  rect(1,148, 20,20)
  fill(240) // white/eraser
  rect(1,169, 20,20)
  fill('black')
  rect(1,190, 20,20)

  if(inButton == 0) {
    // button pressed down
    await = true;
  }
  if(await & inButton == 1) {
    // button released
    await = false;
    cycleBrushColor();
  }

  if(inJoySwitch == 0) {
    // joystick pressed down
    arduinoDraw();
  }

  if(inJoyX == 0) {
    // joystick left
    arduinoMouseX--;
  }
  if(inJoyX == 255) {
    // joystick right
    arduinoMouseX++;
  }
  if(inJoyY == 0) {
    // joystick up
    arduinoMouseY--;
  }
  if(inJoyY == 255) {
    // joystick down
    arduinoMouseY++;
  }
  arduinoMouseX = constrain(arduinoMouseX, 0,width);
  arduinoMouseY = constrain(arduinoMouseY, 0,height);



}

function cycleBrushColor() {
  switch (brushc) {
    case 'black':
      brushc = 'red';
      break;
    case 'red':
      brushc = 'orange';
      break;
    case 'orange':
      brushc = 'yellow';
      break;
    case 'yellow':
      brushc = 'green';
      break;
    case 'green':
      brushc = 'cyan';
      break;
    case 'cyan':
      brushc = 'blue';
      break;
    case 'blue':
      brushc = 'magenta';
      break;
    case 'magenta':
      brushc = 'brown';
      break;
    case 'brown':
      brushc = 'white';
      break;
    case 'white':
      brushc = 'black';
      break;
    default:
      brushc = 'black';
  }
}

function arduinoDraw() {
  // correct pre-defined color names
  var brushc2 = brushc;
  switch (brushc) {
    case 'green':
      brushc2 = color(0,255,0);
      break;
    case 'brown':
      brushc2 = color(127,63,0);
      break;
    case 'white':
      brushc2 = color(240);
  }

  fill(brushc2);
  ellipse(arduinoMouseX,arduinoMouseY, 10);
}

function mousePressed() { // toggle LED on mouse click
  if (outMessage === 'H') {
    outMessage = 'L';
  } else {
    outMessage = 'H';
  }
  serial.write(outMessage);
}