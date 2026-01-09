let bgColor=[100,100,100];
let fgColor=[255,255,255];
let stickCount=10;
let prevBgColor=[...bgColor];
let prevFgColor=[...fgColor];
let prevStickCount=stickCount;

function savePNG(){
    let timestamp=year()+'-'+nf(month(),2)+'-'+nf(day(),2)+'_'+nf(hour(),2)+'-'+nf(minute(),2)+'-'+nf(second(),2);
    saveCanvas('drop-sticks_'+timestamp,'png');
}

function setup(){
    createCanvas(2048,2048).parent('ground-container');
    pixelDensity(1);
    redrawCanvas();
    noLoop();
    document.getElementById('savePNG').addEventListener('click',savePNG);
}

function redrawCanvas(){
    background(...bgColor);
    drawSticks(stickCount);
}

function drawSticks(count){
    stroke(...fgColor);
    strokeWeight(10);
    let lineLength=1024;
    let margin=lineLength/2;
    for(let i=0;i<count;i++){
        let x1=random(margin,width-margin);
        let y1=random(margin,height-margin);
        let angle=random(TWO_PI);
        let x2=x1+cos(angle)*lineLength;
        let y2=y1+sin(angle)*lineLength;
        line(x1,y1,x2,y2);
    }
}

function updateFromControls(){
    let newBg=[
        parseInt(document.getElementById('bgRed').value)||0,
        parseInt(document.getElementById('bgGreen').value)||0,
        parseInt(document.getElementById('bgBlue').value)||0
    ];
    let newFg=[
        parseInt(document.getElementById('fgRed').value)||255,
        parseInt(document.getElementById('fgGreen').value)||255,
        parseInt(document.getElementById('fgBlue').value)||255
    ];
    let newStickN=parseInt(document.getElementById('stickNum').value)||10;
    bgColor=newBg;
    fgColor=newFg;
    stickCount=newStickN;
    if(newStickN!==prevStickCount||
        newBg[0]!==prevBgColor[0]||newBg[1]!==prevBgColor[1]||newBg[2]!==prevBgColor[2]||
        newFg[0]!==prevFgColor[0]||newFg[1]!==prevFgColor[1]||newFg[2]!==prevFgColor[2]){
        redrawCanvas();
        prevBgColor=[...bgColor];
        prevFgColor=[...fgColor];
        prevStickCount=stickCount;
    }
}