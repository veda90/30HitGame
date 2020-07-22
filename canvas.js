//import { CircleSide } from './geometry';
let c = document.getElementById("canvas");
var ctx = c.getContext("2d");
//Fetching HTML elements
let stopButton = document.getElementById("btnStop");
let startButton = document.getElementById("btnStart");
let resetButton = document.getElementById("btnReset");
let hit = document.getElementById("hit");
let score = document.getElementById("score");
const circle = {
    x: 20,
    y: 480,
    radius: 10,
    dx: 3,
    dy: 7
};
const pointer = {
    x: 0,
    y: 0
};
let hitCount = 0;
let scoreCount = 0;
class Rectangle {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }
}
class CircleSide {
    constructor(side, x, y) {
        this.side = side;
        this.x = x;
        this.y = y;
        this.side = side;
        this.x = x;
        this.y = y;
    }
}
/* Map 1*/
// let rect1 = new Rectangle(100,100,50,150,'blue');
// let rect4 = new Rectangle(50,250,250,40,'blue');
// let rect2 = new Rectangle(350,200,250,150,'black');
// let rect3 = new Rectangle(200,50,380,30,'green');
// let rect5 = new Rectangle(690,300,40,200,'green');
// let rect6 = new Rectangle(455,390,300,40,'green');
/** Map2 */
// let rect1 = new Rectangle(70,80,130,30,'gray');
// let rect2 = new Rectangle(110,30,40,40,'blue');
// let rect3 = new Rectangle(590,80,130,30,'gray');
// let rect4 = new Rectangle(630,30,40,40,'blue');
// let rect5 = new Rectangle(250,200,85,100,'gray');
// let rect6 = new Rectangle(300,240,110,60,'gray');
// let rect7 = new Rectangle(350,300,100,50,'gray');
// let rect8 = new Rectangle(410,275,100,75,'gray');
// let rect9 = new Rectangle(490,400,50,90,'gray');
// let rect10 = new Rectangle(680,400,50,90,'gray');
// let rect11 = new Rectangle(590,420,40,40,'red');
/** Map2 */
let rect1 = new Rectangle(70, 80, 30, 200, 'gray');
let rect2 = new Rectangle(100, 250, 40, 30, 'gray');
let rect3 = new Rectangle(200, 80, 80, 30, 'gray');
let rect4 = new Rectangle(280, 80, 30, 200, 'gray');
let rect5 = new Rectangle(180, 250, 60, 30, 'gray');
let rect6 = new Rectangle(165, 150, 50, 50, 'red');
let rect7 = new Rectangle(440, 310, 30, 80, 'gray');
let rect8 = new Rectangle(470, 310, 180, 30, 'gray');
let rect9 = new Rectangle(520, 430, 150, 30, 'gray');
let rect10 = new Rectangle(670, 400, 30, 60, 'gray');
let rect11 = new Rectangle(550, 365, 40, 40, 'red');
let rect12 = new Rectangle(500, 100, 80, 80, 'blue');
let rectArr = [rect1, rect2, rect3, rect4, rect5, rect6, rect7, rect8, rect9, rect10, rect11, rect12];
function drawCircle() {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'purple';
    ctx.fill();
}
//Fetch all the rectangles from array and draw it on canvas
rectArr.forEach(element => {
    //draw fill rectangle
    ctx.fillStyle = element.color;
    ctx.fillRect(element.x, element.y, element.width, element.height);
});
drawCircle();
let painting = false;
function startPosition() {
    painting = true;
}
function endPosition() {
    painting = false;
}
/*-----------------------------------------*/
/*  Angle determination  */
/* ---------------------------------*/
function paint(e) {
    if (!painting)
        return;
    ctx.clearRect(0, 0, c.width, c.height);
    drawMap();
    drawCircle();
    ctx.setLineDash([4, 16]);
    ctx.strokeStyle = "blue";
    ctx.lineDashOffset = 4;
    ctx.lineWidth = 1;
    ctx.lineCap = "round";
    const rect = c.getBoundingClientRect();
    pointer.x = e.clientX - rect.left;
    pointer.y = e.clientY - rect.top;
    let newX = pointer.x;
    let newY = pointer.y;
    let tan = (newY - 480) / (newX - 20);
    let angle = Math.atan(tan);
    let sin = Math.sin(angle);
    let cos = Math.cos(angle);
    let x1 = 20 + (cos * 10);
    let y1 = 480 + (sin * 10);
    let unitX = 20 + (cos * 6);
    let unitY = 480 + (sin * 6);
    ctx.moveTo(x1, y1);
    ctx.lineTo(newX, newY);
    circle.dx = unitX - 20;
    circle.dy = unitY - 480;
    ctx.stroke();
}
//Adding touch event listners
function startup() {
    c.addEventListener("touchstart", startPosition, false);
    c.addEventListener("touchend", endPosition, false);
    c.addEventListener("touchmove", paint, false);
}
document.addEventListener("DOMContentLoaded", startup);
c.addEventListener("mousemove", paint);
c.addEventListener("mousedown", startPosition);
c.addEventListener("mouseup", endPosition);
/* Function to draw map which includes all the rectangles which will act as obstacles */
function drawMap() {
    //Fetch all the rectangles from array and draw it on canvas   
    rectArr.forEach(element => {
        //draw fill rectangle
        ctx.fillStyle = element.color;
        ctx.fillRect(element.x, element.y, element.width, element.height);
    });
}
let reqToken;
//----------------------------------------------------
//    ---- Main functin which runs the game -----
//---------------------------------------------------
function update() {
    ctx.clearRect(0, 0, c.width, c.height);
    drawMap();
    //change position
    circle.x += circle.dx;
    circle.y += circle.dy;
    //detect side walls
    if (circle.x + circle.radius > c.width || circle.x - circle.radius < 0) {
        circle.dx *= -1;
    }
    //detext the top and bottom
    if (circle.y + circle.radius > c.height || circle.y - circle.radius < 0) {
        circle.dy *= -1;
    }
    drawCircle();
    reqToken = requestAnimationFrame(update);
    CollisionDetection();
}
stopButton.onclick = function () {
    cancelAnimationFrame(reqToken);
};
startButton.onclick = function () {
    reqToken = requestAnimationFrame(update);
};
resetButton.onclick = function () {
    cancelAnimationFrame(reqToken);
    ctx.clearRect(0, 0, c.width, c.height);
    hitCount = 0;
    scoreCount = 0;
    circle.x = 20;
    circle.y = 480;
    drawCircle();
    drawMap();
    hit.innerHTML = "0";
    score.innerHTML = "0";
};
//Function for collision detection with any block inside canvas
function CollisionDetection() {
    let L = new CircleSide("L", circle.x - circle.radius, circle.y); // Left 
    let T = new CircleSide("T", circle.x, circle.y - circle.radius); // Top
    let R = new CircleSide("R", circle.x + circle.radius, circle.y); // Right
    let B = new CircleSide("B", circle.x, circle.y + circle.radius); // Bottom
    let boundaryL = CheckHit(L);
    if (boundaryL > 0) {
        //reverse the x direction
        console.log("Reversing the HORIZONTAL direction");
        circle.dx *= -1;
        //Check Deep Impact and correct it
        if ((L.x + circle.dx) < boundaryL) {
            let diffL = boundaryL - L.x;
            circle.x += diffL;
        }
    }
    let boundaryT = CheckHit(T);
    if (boundaryT > 0) {
        console.log("Reversing the  VERTICAL direction");
        circle.dy *= -1;
        //Check Deep Impact and correct it
        if ((T.y + circle.dy) < boundaryT) {
            let diffT = boundaryT - T.y;
            circle.y += diffT;
        }
    }
    let boundaryR = CheckHit(R);
    //console.log("boundary: "+ boundaryR);
    if (boundaryR > 0) {
        console.log("Reversing the HORIZONTAL direction");
        circle.dx *= -1;
        //Check Deep Impact and correct it
        if ((R.x + circle.dx) > boundaryR) {
            let diffR = boundaryR - R.x;
            circle.x += diffR;
        }
    }
    let boundaryB = CheckHit(B);
    //console.log("boundary: "+ boundaryB);
    if (boundaryB > 0) {
        console.log("Reversing the  VERTICAL direction");
        circle.dy *= -1;
        //Check Deep Impact and correct it
        if ((B.y + circle.dy) > boundaryB) {
            let diffB = boundaryB - B.y;
            circle.y += diffB;
        }
    }
}
// Check if it is a hit or not
function CheckHit(cs) {
    for (let element of rectArr) {
        let left = element.x;
        let top = element.y;
        let right = element.x + element.width;
        let bottom = element.y + element.height;
        if (left < cs.x && cs.x < right && top < cs.y && cs.y < bottom) {
            console.log("there's a HIT !!!");
            hitCount++;
            if (hitCount >= 30) {
                cancelAnimationFrame(reqToken);
            }
            hit.innerHTML = hitCount.toString();
            if (element.color == "blue") {
                scoreCount += 5;
                score.innerHTML = scoreCount.toString();
            }
            if (element.color == "red") {
                scoreCount += 10;
                score.innerHTML = scoreCount.toString();
            }
            if (cs.side === 'L') {
                console.log("hit at the RIGHT edge");
                console.log("Boundary is: " + right);
                return right;
            }
            else if (cs.side === 'T') {
                console.log("hit at the BOTTOM edge");
                console.log("Boundary is: " + bottom);
                return bottom;
            }
            else if (cs.side === 'R') {
                console.log("hit at the LEFT edge");
                console.log("Boundary is: " + left);
                return left;
            }
            else if (cs.side === 'B') {
                console.log("hit at the TOP edge");
                console.log("Boundary is: " + top);
                return top;
            }
            else {
                return 90;
            }
        }
    }
    return -100;
}
