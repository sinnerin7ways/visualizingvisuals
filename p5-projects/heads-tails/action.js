const canvasSize = 512;
const btn = document.getElementById('paintFrame');
const msg = document.getElementById('message');
let outcome = "none";
let headImage;
let tailImage;
let noneImage;
function flipCoin() {
  let num = random(1, 100);
  if(num > 50){
    outcome = 'tails'
  }else{
    outcome = 'heads'
  }
  redraw();
  btn.onclick = reset;
  btn.innerHTML = 'Reset';
}
function reset(){
  outcome = 'none';
  btn.onclick = flipCoin;
  btn.innerHTML = 'Flip Coin';
}
function drawCoin(){
  if(outcome == 'heads'){
    image(headImage, 0, 0);
    msg.innerHTML = 'Heads';
  }else if(outcome == 'tails'){
    image(tailImage, 0, 0);
    msg.innerHTML = 'Tails';
  }else if(outcome == 'none'){
    image(noneImage, 0, 0);
    msg.innerHTML = 'Outcome';
  }
}
function preload(){
  headImage = loadImage('coins/heads.png');
  tailImage = loadImage('coins/tails.png');
  noneImage = loadImage('coins/none.png');
}
function setup() {
  createCanvas(canvasSize, canvasSize).parent('canvas-container');
  btn.onclick = flipCoin;
}
function draw() {
  background(0);
  drawCoin();
}