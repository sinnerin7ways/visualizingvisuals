const CANVAS_SIZE   = 1024;
const BALL_DIAMETER = Math.floor(CANVAS_SIZE * 0.1953125);
const FONT_SIZE     = Math.floor(CANVAS_SIZE * 0.08545);

const BG_COLOR    = [50, 50, 50];
const STROKE_COLOR = [0, 0, 0];
const WHITE_FILL   = [255, 251, 237];
const RED_FILL     = [255, 70, 33];

let whiteBalls = [];
let powerBall  = 0;

const ballPositions = [
  [CANVAS_SIZE/3,     CANVAS_SIZE/4],
  [CANVAS_SIZE/3*2,   CANVAS_SIZE/4],
  [CANVAS_SIZE/3,     CANVAS_SIZE/4*2],
  [CANVAS_SIZE/3*2,   CANVAS_SIZE/4*2],
  [CANVAS_SIZE/3,     CANVAS_SIZE/4*3],
  [CANVAS_SIZE/3*2,   CANVAS_SIZE/4*3]   // powerball
];

function savePNG() {
  const timestamp = `${year()}-${nf(month(), 2)}-${nf(day(), 2)}_${nf(hour(), 2)}-${nf(minute(), 2)}-${nf(second(), 2)}`;
  saveCanvas(`powerball-${timestamp}`, 'png');
}

function shuffleFisherYates(arr) {
  // Modern Fisher–Yates shuffle using p5.js random()
  for (let i = arr.length - 1; i > 0; i--) {
    const j = floor(random(i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function selectNumbers() {
  // 1–69 white balls
  const allWhite = Array.from({ length: 69 }, (_, i) => i + 1);
  
  // True uniform shuffle
  shuffleFisherYates(allWhite);
  
  // Take first 5 and sort ascending (as shown on tickets)
  whiteBalls = allWhite.slice(0, 5).sort((a, b) => a - b);
  
  // Powerball 1–26
  powerBall = floor(random(1, 27));
}

function drawBalls() {
  // White balls
  for (let i = 0; i < 5; i++) {
    fill(WHITE_FILL);
    strokeWeight(10);
    circle(ballPositions[i][0], ballPositions[i][1], BALL_DIAMETER);

    fill(STROKE_COLOR);
    strokeWeight(6);
    text(whiteBalls[i], ballPositions[i][0], ballPositions[i][1]);
  }

  // Powerball
  fill(RED_FILL);
  strokeWeight(12);
  circle(ballPositions[5][0], ballPositions[5][1], BALL_DIAMETER);

  fill(STROKE_COLOR);
  strokeWeight(6);
  text(powerBall, ballPositions[5][0], ballPositions[5][1]);
}

function setup() {
  createCanvas(CANVAS_SIZE, CANVAS_SIZE).parent('canvas-container');
  
  // Click to generate new numbers
  document.getElementById('paintFrame')?.addEventListener('click', redraw);
  
  noLoop();
  stroke(STROKE_COLOR);
  textSize(FONT_SIZE);
  textAlign(CENTER, CENTER);    // ← centers numbers perfectly
}

function draw() {
  background(BG_COLOR);
  
  selectNumbers();     // new numbers every redraw (every click)
  drawBalls();
}