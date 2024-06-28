Maze game controlled with arduino joystick. Doors block the path and vision. 
Doors are opened by clicking on them, which plays a sound.
There is a 30 second time limit to reach the goal, indicated by a 4 digital 7-segment display on Arduino.
Player can sprint by clicking the joystick in and holding.
If the 30 seconds pass, a game over screen is shown.
If the player reaches the goal, a victory screen is shown.

Digital input = joystick switch (whether it's clicked in)
Analog input = joystick x+y axis
Digital output = Built-in LED, controlled by joystick switch
Analog output = 4 digit 7-segment display
Audio component = mp3 played when door is opened
Analog value conveyed from Arduino to p5 = player movement controlled with joystick
