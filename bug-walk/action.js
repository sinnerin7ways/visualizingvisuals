const canvasSize = 512;
const PATH_WIDTH = 3;

let bugs = [];
let running = false;
let totalSteps = 0;
let maxSteps = 200;

const bgColor = [8, 8, 14];

class Bug {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = canvasSize / 2;
    this.y = canvasSize / 2;
    this.prevX = this.x;
    this.prevY = this.y;
    this.dir = floor(random(4));
    this.hue = random(360);
  }

  update() {
    this.prevX = this.x;
    this.prevY = this.y;

    if (random() < turnChance) {
      this.dir = (this.dir + (random() < 0.5 ? 1 : 3) + 4) % 4;
    }

    let nextX = this.x;
    let nextY = this.y;

    if (this.dir === 0) nextY--;
    else if (this.dir === 1) nextX++;
    else if (this.dir === 2) nextY++;
    else if (this.dir === 3) nextX--;

    if (nextX < 0 || nextX >= canvasSize) {
      this.dir = (this.dir === 1) ? 3 : 1;
    }
    if (nextY < 0 || nextY >= canvasSize) {
      this.dir = (this.dir === 0) ? 2 : 0;
    }

    if (this.dir === 0) this.y--;
    else if (this.dir === 1) this.x++;
    else if (this.dir === 2) this.y++;
    else if (this.dir === 3) this.x--;
  }

  show() {
    colorMode(HSB, 360, 100, 100);
    stroke(this.hue, 85, 100, 1.0);
    strokeWeight(PATH_WIDTH);
    strokeCap(ROUND);
    strokeJoin(ROUND);
    line(this.prevX, this.prevY, this.x, this.y);
  }
}

function setup() {
  createCanvas(canvasSize, canvasSize).parent('canvas-container');
  pixelDensity(1);
  noSmooth();
  colorMode(HSB, 360, 100, 100);
  background(...bgColor);
  resetSimulation();
  noLoop();
}

function draw() {
  for (let bug of bugs) {
    bug.update();
    bug.show();
  }

  totalSteps++;
  if (totalSteps >= maxSteps) {
    noLoop();
    running = false;
  }
}

function resetSimulation() {
  bugs = [];
  background(...bgColor);
  totalSteps = 0;

  const qty = parseInt(document.getElementById('quantitySlider').value || 1);
  const dist = parseInt(document.getElementById('distanceSlider').value || 1);

  maxSteps = dist * 100;
  turnChance = 0.05;

  for (let i = 0; i < qty; i++) {
    bugs.push(new Bug());
  }

  running = true;
  loop();
}

function updateParameters() {
  if (!running) resetSimulation();
}

document.getElementById('actionButt').onclick = function() {
  resetSimulation();
  this.textContent = "Reset";
};

document.getElementById('savePNG').onclick = function() {
  saveCanvas('bug-walk-' + nf(frameCount, 5), 'png');
};