var ampEnv;
var osc;
var fil;

function setup() {
    createCanvas(600, 400);
    
    osc = new Tone.PWMOscillator("C1", 0.4).start();
    fil = new Tone.Filter(300, "lowpass", -24);

    ampEnv = new Tone.AmplitudeEnvelope({
      "attack": 0.05,
      "decay": 0.2,
      "sustain": 0.4,
      "release": 0.8
    }).toMaster();
    
    osc.connect(ampEnv); 
    // fil.toMaster();


}

function mouseClicked() {
  ampEnv.triggerAttackRelease(0.3);
  fil.triggerAttackRelease(0.01);
}
