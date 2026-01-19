const canvasSize = 1024;
let poolBallBackground;
let outcome = "Shake";

const magic8BallResponses = [
  "It is certain",
  "Reply hazy, try again",
  "Don’t count on it",
  "It is decidedly so",
  "Ask again later",
  "My reply is no",
  "Without a doubt",
  "Better not tell you now",
  "My sources say no",
  "Yes definitely",
  "Cannot predict now",
  "Outlook not so good",
  "You may rely on it",
  "Concentrate and ask again",
  "Very doubtful",
  "As I see it, yes",
  "Most likely",
  "Outlook good",
  "Yes",
  "Signs point to yes"
];

let btn;
let msg;

function preload() {
  poolBallBackground = loadImage('pool-ball.png');
}

function setup() {
  createCanvas(canvasSize, canvasSize).parent('canvas-container');
  
  btn = select('#shakeBall');
  
  btn.mousePressed(shakeBall);
}

function draw() {
  image(poolBallBackground, 0, 0, width, height);
  
  drawOutcome();
}

function drawOutcome() {
  push();
  textAlign(CENTER, CENTER);
  textSize(42);
  fill(0);
  stroke(255);
  strokeWeight(6);
    
  fill(255);
  noStroke();
  text(outcome, width/2, height/2);
  pop();
}

function shakeBall() {
  if (outcome === "Shake") {
    let num = floor(random(magic8BallResponses.length));
    outcome = magic8BallResponses[num];
    btn.html('Reset');
  } else {
    outcome = "Shake";
    btn.html('Shake');
  }
}