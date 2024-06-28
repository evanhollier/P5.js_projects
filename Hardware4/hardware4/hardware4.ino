// https://streamable.com/xxopmx

const int SW_pin = 2; // digital pin connected to switch output
const int X_pin = 0; // analog pin connected to x output
const int Y_pin = 1; // analog pin connected to y output
const int button = 12;

int switchValue = 0;
int xValue = 0;
int yValue = 0;
int buttonValue = 0;

void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
  pinMode(button, INPUT_PULLUP);
  
  pinMode(SW_pin, INPUT);
  digitalWrite(SW_pin, HIGH);
  Serial.begin(9600);
//  Serial.begin(115200);
}

void loop () {
  delay(100);
  
  switchValue = digitalRead(SW_pin);
  Serial.write(switchValue);
  xValue = analogRead(X_pin);
  Serial.write(xValue);
  yValue = analogRead(Y_pin);
  Serial.write(yValue);
  buttonValue = digitalRead(button);
  Serial.write(buttonValue);
  

  if(Serial.available() > 0){
    if(Serial.read() == 'H'){
      digitalWrite(LED_BUILTIN, HIGH);
    }
    else{
      digitalWrite(LED_BUILTIN, LOW);
    }
  }
}
