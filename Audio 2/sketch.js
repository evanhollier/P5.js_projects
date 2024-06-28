var ampEnv;
var osc;
var lfo;

function setup() {
    createCanvas(600, 400);
    
    osc = new Tone.Oscillator(440, "sine").start();
    lfo = new Tone.LFO();

    ampEnv = new Tone.AmplitudeEnvelope({
      "attack": 0.1,
      "decay": 0.2,
      "sustain": 1.0,
      "release": 0.8
    }).toMaster();
    
    osc.connect(ampEnv);	
}

function keyPressed() {
  if (keyCode == 49){ // 1
		osc.frequency.value = 'C4';
		ampEnv.triggerAttackRelease(1.0)
  } 
  else if (keyCode == 50) { // 2
		osc.frequency.value = 'D4';
		ampEnv.triggerAttackRelease(0.5)
  } 
  else if (keyCode == 51) { // 3
		osc.frequency.value = 'E4';
		ampEnv.triggerAttackRelease(0.5)
  } 
  else if (keyCode == 52) { // 4
		osc.frequency.value = 'F4';
		ampEnv.triggerAttackRelease(0.5)
  }
  else if (keyCode == 53) { // 5
    lfo.connect(ampEnv);
  }
}
