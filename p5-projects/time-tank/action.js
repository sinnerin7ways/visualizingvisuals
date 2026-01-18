const canvasSize = 128;
const bgColor = [96, 136, 220];
const topY = 14;

let timeObj;
let glassImg, sandImg, bigFishImg, shrimpImg, bigRockImg, tinyBubbleImg, regBubbleImg, bigBubbleImg, statueImg;
let tinyBubbles = [];
let bigBubbles = [];
let regBubbles = [];
let lastMonth = -1;
let lastDay = -1;

function savePNG() {
  const ts = `${year()}-${nf(month(),2)}-${nf(day(),2)}_${nf(hour(),2)}-${nf(minute(),2)}-${nf(second(),2)}`;
  saveCanvas(`time-tank${ts}`, 'png');
}

function dist(x1, y1, x2, y2) {
  return Math.hypot(x1 - x2, y1 - y2);
}

function resetBigBubbles(m) {
  bigBubbles = Array(m).fill().map(() => ({
    x: random(0, canvasSize - bigBubbleImg.width),
    y: canvasSize + random(20, 100),
    vx: 0, vy: 0,
    speed: random(0.15, 0.28)
  }));
}

function resetRegBubbles(d) {
  regBubbles = Array(d).fill().map(() => ({
    x: random(0, canvasSize - regBubbleImg.width),
    y: canvasSize + random(20, 100),
    vx: 0, vy: 0,
    speed: random(0.35, 0.55)
  }));
}

function updateBubbles(bubbles, size, others = []) {
  const radius = size / 2;
  const minDist = size + 2;

  bubbles.forEach(b => {
    if (b.y <= topY) {
      b.y = topY;
      b.vy = 0;
      return;
    }

    b.vy -= b.speed * 0.02;
    b.y += b.vy;
    b.x += b.vx;

    [...bubbles, ...others].forEach(o => {
      if (o === b) return;
      const d = dist(b.x + radius, b.y + radius, o.x + radius, o.y + radius);
      if (d < minDist && d > 0.1) {
        const force = (minDist - d) * 0.05;
        const dx = (b.x - o.x) / d;
        const dy = (b.y - o.y) / d;
        b.vx += dx * force;
        b.vy += dy * force;
      }
    });

    b.vx *= 0.92;
    b.vy = Math.max(b.vy, -b.speed * 1.2);
    b.x = constrain(b.x, 0, canvasSize - size);
  });
}

function drawTime(t) {
  image(sandImg, 0, 0);
  image(statueImg, canvasSize - statueImg.width, canvasSize - statueImg.height - 8);

  let h = t.hourVar;
  let isPM = h >= 12;
  let y = isPM ? 32 : 64;
  let prog = (h % 12) / 12 + t.minuteVar / (12 * 60);
  let dirRight = !isPM;
  let x = (dirRight ? prog : 1 - prog) * (canvasSize - 32);

  push();
  if (dirRight) {
    translate(x + 32, y);
    scale(-1, 1);
    image(bigFishImg, 0, 0);
  } else {
    image(bigFishImg, x, y);
  }
  pop();

  let totalSec = t.minuteVar * 60 + t.secondVar;
  let shrimpProg = (totalSec % 60) / 60;
  let dir = Math.floor(totalSec / 60) % 2;
  let shrimpDirRight = dir === 0;
  let shrimpX = (shrimpDirRight ? shrimpProg : 1 - shrimpProg) * (canvasSize - 32);
  let shrimpY = canvasSize - 29;

  push();
  if (!shrimpDirRight) {
    translate(shrimpX + 32, shrimpY);
    scale(-1, 1);
    image(shrimpImg, 0, 0);
  } else {
    image(shrimpImg, shrimpX, shrimpY);
  }
  pop();

  tinyBubbles.forEach(b => b.y > 0 && image(tinyBubbleImg, b.x, b.y));

  updateBubbles(bigBubbles, 12, regBubbles);
  updateBubbles(regBubbles, 8, bigBubbles);

  bigBubbles.forEach(b => image(bigBubbleImg, b.x, b.y));
  regBubbles.forEach(b => image(regBubbleImg, b.x, b.y));

  image(bigRockImg, 0, canvasSize - 42);
  image(glassImg, 0, 0);
}

function preload() {
  glassImg      = loadImage('assets/glass.png');
  sandImg       = loadImage('assets/sandy-bottom.png');
  bigFishImg    = loadImage('assets/big-fish.png');
  shrimpImg     = loadImage('assets/shrimp.png');
  bigRockImg    = loadImage('assets/big-rock.png');
  tinyBubbleImg = loadImage('assets/tiny-bubble.png');
  regBubbleImg  = loadImage('assets/reg-bubble.png');
  bigBubbleImg  = loadImage('assets/big-bubble.png');
  statueImg     = loadImage('assets/statue.png');
}

function setup() {
  createCanvas(canvasSize, canvasSize).parent("canvas-container");
  noSmooth();
  pixelDensity(1);
}

function draw() {
  timeObj = {
    hourVar: hour(),
    minuteVar: minute(),
    secondVar: second(),
    monthVar: month(),
    dayVar: day()
  };

  background(bgColor);

  if (frameCount % 10 === 0) {
    tinyBubbles.push({ x: random(4, 28), y: canvasSize - 20, phase: random(TWO_PI) });
  }

  tinyBubbles.forEach(b => {
    b.y -= 0.3 + random(0.2);
    b.x += sin(b.phase + frameCount / 20) * 0.3;
  });

  tinyBubbles = tinyBubbles.filter(b => b.y > 0);

  const curMonth = timeObj.monthVar;
  const curDay = timeObj.dayVar;

  if (curMonth !== lastMonth) {
    resetBigBubbles(curMonth);
    lastMonth = curMonth;
  }

  if (curDay !== lastDay) {
    resetRegBubbles(curDay);
    lastDay = curDay;
  }

  drawTime(timeObj);
}