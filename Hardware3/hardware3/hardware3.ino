// https://streamable.com/l581fa
#include <Arduino.h>

int sensorPin = A0;  // select the input pin for the potentiometer
int ledPin = 13;     // select the pin for the LED
int sensorValue = 0; // variable to store the value coming from the sensor

void setup()
{
  // declare the ledPin as an OUTPUT:
  pinMode(ledPin, OUTPUT);

  //and if we want to see what the values are we need Serial
  Serial.begin(9600);
}

void loop()
{
  // read the value from the sensor:
  //mapping values from 0 - 5 ground to 5v
  //to 0 - 1023
  sensorValue = analogRead(sensorPin);

  //print values
  delay(100);
  Serial.write(sensorValue);

  if(Serial.available() > 0){
    if(Serial.read() == 'H'){
      digitalWrite(LED_BUILTIN, HIGH);
    }
    else{
      digitalWrite(LED_BUILTIN, LOW);
    }
  }
}
