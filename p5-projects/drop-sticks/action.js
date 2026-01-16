let bgColor = [30, 30, 30];
let fgColor = [240, 240, 255];
let stickCount = 42;
let canvas;
function setup() {
  canvas = createCanvas(1024, 1024).parent('canvas-container');
  pixelDensity(1);
  noLoop();
  redrawCanvas();
  document.getElementById('savePNG').addEventListener('click', savePNG);
}
function redrawCanvas() {
  background(...bgColor);
  stroke(...fgColor);
  strokeWeight(5);
  const len = width * 0.7;
  const margin = len / 2;
  for (let i = 0; i < stickCount; i++) {
    const x = random(margin, width - margin);
    const y = random(margin, height - margin);
    const a = random(TWO_PI);
    line(x, y, x + cos(a) * len, y + sin(a) * len);
  }
}
function savePNG() {
  const timestamp = year() + '-' + nf(month(), 2) + '-' + nf(day(), 2) + '_' + nf(hour(), 2) + '-' + nf(minute(), 2) + '-' + nf(second(), 2);
  saveCanvas('drop-sticks' + timestamp, 'png');
}
function hexToRgb(hex) {
  hex = hex.replace('#', '');
  return [
    parseInt(hex.substring(0,2), 16),
    parseInt(hex.substring(2,4), 16),
    parseInt(hex.substring(4,6), 16)
  ];
}
document.addEventListener('DOMContentLoaded', () => {
  const q = document.getElementById('quantity');
  const bg = document.getElementById('bgColor');
  const fg = document.getElementById('fgColor');
  const update = () => {
    stickCount = parseInt(q.value) || 0;
    bgColor = hexToRgb(bg.value);
    fgColor = hexToRgb(fg.value);
    redrawCanvas();
  };
  q.oninput = update;
  bg.oninput = update;
  fg.oninput = update;
});