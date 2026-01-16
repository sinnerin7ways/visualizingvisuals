const canvasSize = 2048;
const landColor = [68, 135, 28];
const seaColor = [29, 60, 134];
let octaves = 4;
let persistence = 0.5;
let seaThreshold = 0.5;
let featureSize = 5;
let noiseInc = 0.005 / featureSize;
function savePNG() {
  const timestamp = year() + '-' + nf(month(), 2) + '-' + nf(day(), 2) + '_' + nf(hour(), 2) + '-' + nf(minute(), 2) + '-' + nf(second(), 2);
  saveCanvas('perlin-map' + timestamp, 'png');
}
function updateParameters() {
  octaves = parseInt(document.getElementById('depthSlider').value);
  persistence = parseInt(document.getElementById('persistSlider').value) / 10;
  seaThreshold = parseInt(document.getElementById('seaLevelSlider').value) / 10;
  featureSize = parseInt(document.getElementById('sizeSlider').value);
  noiseInc = 0.005 / featureSize;
  redraw();
}
function setup() {
  createCanvas(canvasSize, canvasSize).parent('canvas-container');
  setAttributes('willReadFrequently', true);
  pixelDensity(1);
  noLoop();
  document.getElementById('savePNG').addEventListener('click', savePNG);
  document.getElementById('paintFrame').addEventListener('click', redraw);
  updateParameters();
}
function draw() {
  noiseSeed(Math.random() * 100000);
  noiseDetail(octaves, persistence);
  loadPixels();
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const n = noise(x * noiseInc, y * noiseInc);
      let col = n < seaThreshold ? seaColor : landColor;
      const i = (x + y * width) * 4;
      pixels[i] = col[0];
      pixels[i + 1] = col[1];
      pixels[i + 2] = col[2];
      pixels[i + 3] = 255;
      const level = Math.floor(n / 0.1) * 0.1;
      if (Math.abs(n - level) < 0.005) {
        pixels[i] *= 0.95;
        pixels[i + 1] *= 0.95;
        pixels[i + 2] *= 0.95;
      }
    }
  }
  updatePixels();
}