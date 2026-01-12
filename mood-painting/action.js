let canvasSize = 2048;

let bgColor = [125, 48, 90];
let strokeColor = [96, 124, 50];
let fillColor = [96, 124, 50];

let goodbadVal = 0;
let happysadVal = 0;
let energyVal = 0;
let calmVal = 0;
let anxietyVal = 0;

let chosenShape = 'square';
let chosenShapeSize = 128;
let sadGray = false;
let shapeCount = 5;

const terribleColors = [[39, 37, 27], [27, 39, 39], [39, 27, 39]];
const badColors = [[52, 28, 15], [15, 51, 29], [29, 14, 52]];
const neutralColors = [[125, 48, 90], [96, 124, 50], [96, 124, 50]];
const goodColors = [[242, 167, 75], [75, 241, 172], [172, 73, 243]];
const amazingColors = [[235, 224, 193], [194, 235, 224], [224, 193, 235]];

const anxiousShape = 'triangle';
const neutralShape = 'square';
const relaxShape = 'circle';

const tiredShapeSize = 64;
const neutralShapeSize = 256;
const energeticShapeSize = 512;

const zenShapeCount = 1;
const calmShapeCount = 5;
const neutralShapeCount = 7;
const crazyShapeCount = 10;
const insaneShapeCount = 15;

function savePNG() {
  const timestamp = year() + '-' + nf(month(), 2) + '-' + nf(day(), 2) + '_' +
                    nf(hour(), 2) + '-' + nf(minute(), 2) + '-' + nf(second(), 2);
  saveCanvas('mood-painting' + timestamp, 'png');
}

function updateParameters() {
  goodbadVal = parseInt(document.getElementById('goodbadSlider').value) || 0;
  happysadVal = parseInt(document.getElementById('happysadSlider').value) || 0;
  energyVal = parseInt(document.getElementById('energySlider').value) || 0;
  calmVal = parseInt(document.getElementById('calmSlider').value) || 0;
  anxietyVal = parseInt(document.getElementById('anxietySlider').value) || 0;

  // Color palette based on good/bad
  if (goodbadVal === -5) {
    [bgColor, strokeColor, fillColor] = terribleColors;
  } else if (goodbadVal >= -4 && goodbadVal <= -2) {
    [bgColor, strokeColor, fillColor] = badColors;
  } else if (goodbadVal >= -1 && goodbadVal <= 1) {
    [bgColor, strokeColor, fillColor] = neutralColors;
  } else if (goodbadVal >= 2 && goodbadVal <= 4) {
    [bgColor, strokeColor, fillColor] = goodColors;
  } else if (goodbadVal === 5) {
    [bgColor, strokeColor, fillColor] = amazingColors;
  }

  // Grayscale when sad
  sadGray = happysadVal < 0;

  // Shape size based on energy
  if (energyVal <= -3) {
    chosenShapeSize = tiredShapeSize;
  } else if (energyVal <= 2) {
    chosenShapeSize = neutralShapeSize;
  } else {
    chosenShapeSize = energeticShapeSize;
  }

  // Shape count based on calm
  if (calmVal <= -5) {
    shapeCount = insaneShapeCount;
  } else if (calmVal <= -2) {
    shapeCount = crazyShapeCount;
  } else if (calmVal <= 3) {
    shapeCount = neutralShapeCount;
  } else {
    shapeCount = calmVal === 5 ? zenShapeCount : calmShapeCount;
  }

  // Shape type based on anxiety
  if (anxietyVal <= -4) {
    chosenShape = relaxShape;
  } else if (anxietyVal <= 3) {
    chosenShape = neutralShape;
  } else {
    chosenShape = anxiousShape;
  }
}

function drawShapes(num, size, shapeType) {
  for (let i = 0; i < num; i++) {
    const x = random(width);
    const y = random(height);
    const rotation = random(TWO_PI);

    push();
    translate(x, y);
    rotate(rotation);

    stroke(strokeColor);
    strokeWeight(random(4, 20));
    fill(fillColor);

    if (shapeType === 'circle') {
      circle(0, 0, size * random(0.7, 1.4));
    } else if (shapeType === 'square') {
      rectMode(CENTER);
      square(0, 0, size * random(0.8, 1.3));
    } else if (shapeType === 'triangle') {
      const half = size / 2;
      triangle(0, -half, -half, half, half, half);
    }

    pop();
  }
}

function setup() {
  createCanvas(canvasSize, canvasSize).parent('canvas-container');
  pixelDensity(1);
  noLoop();

  document.getElementById('savePNG').addEventListener('click', savePNG);
  document.getElementById('paintFrame').addEventListener('click', redraw);
}

function draw() {
  background(bgColor);
  drawShapes(shapeCount, chosenShapeSize, chosenShape);

  if (sadGray) {
    filter(GRAY);
  }
}