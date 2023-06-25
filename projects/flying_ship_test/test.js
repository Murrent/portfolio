const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');
const graphCanvas = document.getElementById('canvas2');
const gc = graphCanvas.getContext('2d');
graphCanvas.width = 170;
graphCanvas.height = 500;
canvas.width = 800;
canvas.height = 500;
var lastTime = Date.now();
var delta;
var now;
var fps;
var ms;
var oldDelta = [];
var oldP = [];
var oldP1 = [];
var oldP2 = [];
//------------------CLASSES-----------------------------------------------------
class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
class Line {
  constructor(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }
}
class Player {
  constructor(x, y) {
    this.pos = new Vec(x, y);
    this.size = new Vec(60, 30);
    this.velocity = new Vec(0, 0);
    this.rotation = 0;
    this.dead = false;
  }
}
class Rectangle {
  constructor(x, y, sizeX, sizeY, color, damage) {
    this.pos = new Vec(x, y);
    this.size = new Vec(sizeX, sizeY);
    this.color = color;
    this.damage = damage;
  }
}
//-------------------GLOBAL VARIABLES-------------------------------------------
var obstacles = [];
var player = new Player(100, 250);
var key = {space: false};
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);
function keyDown(event) {
  switch (event.code) {
    case "Space": key.space = true;
    break;
  }
}
function keyUp(event) {
  switch (event.code) {
    case "Space": key.space = false;
    break;
  }
}
setInterval(function() {
  obstacles.push(new Rectangle(canvas.width, Math.random()*canvas.height/2+100, Math.random()*300+50, Math.random()*50+50, "black", true));
}, 1000)
setInterval(function() {
  fps = Math.round(1/delta*100);
  ms = delta*10;
}, 100)
//----------------FUNCTIONS-----------------------------------------------------
function playerMovement(p) {
  if (key.space) {
    p.velocity.y -= 0.3*delta;
  }
  else {
    p.velocity.y += 0.3*delta;
  }
  p.pos.y += p.velocity.y;

  if (p.pos.y+p.size.y > canvas.height) {
    p.pos.y = canvas.height-p.size.y;
    p.velocity.y = 0;
  }
  else if (p.pos.y < 0) {
    p.pos.y = 0;
    p.velocity.y = 0;
  }
  p.rotation = p.velocity.y*3;
}
//------------------DRAWING FUNCTION--------------------------------------------
function drawGame() {
  playerMovement(player);

  c.beginPath();
  c.translate(player.pos.x + player.size.x/2, player.pos.y + player.size.y/2)
  c.rotate(player.rotation*Math.PI/180);
  c.rect(-player.size.x/2, -player.size.y/2, player.size.x, player.size.y);
  c.stroke();
  c.resetTransform();
  c.closePath();

    //right bottom
    var cor1 = new Vec(player.pos.x + player.size.x/2 + ((player.size.x/2 *
      Math.cos(player.rotation*Math.PI/180))-(player.size.y/2 * Math.sin(player.rotation*Math.PI/180))),
                     player.pos.y + player.size.y/2 + ((player.size.x/2 *
      Math.sin(player.rotation*Math.PI/180))+(player.size.y/2 * Math.cos(player.rotation*Math.PI/180))));

    //left bottom
    var cor2 = new Vec(player.pos.x + player.size.x/2 + ((-player.size.x/2 *
      Math.cos(player.rotation*Math.PI/180))-(player.size.y/2 * Math.sin(player.rotation*Math.PI/180))),
                       player.pos.y + player.size.y/2 + ((-player.size.x/2 *
      Math.sin(player.rotation*Math.PI/180))+(player.size.y/2 * Math.cos(player.rotation*Math.PI/180))));

    //left top
    var cor3 = new Vec(player.pos.x + player.size.x/2 + ((-player.size.x/2 *
      Math.cos(player.rotation*Math.PI/180))-(-player.size.y/2 * Math.sin(player.rotation*Math.PI/180))),
                       player.pos.y + player.size.y/2 + ((-player.size.x/2 *
      Math.sin(player.rotation*Math.PI/180))+(-player.size.y/2 * Math.cos(player.rotation*Math.PI/180))));

    //right top
    var cor4 = new Vec(player.pos.x + player.size.x/2 + ((player.size.x/2 *
      Math.cos(player.rotation*Math.PI/180))-(-player.size.y/2 * Math.sin(player.rotation*Math.PI/180))),
                       player.pos.y + player.size.y/2 + ((player.size.x/2 *
      Math.sin(player.rotation*Math.PI/180))+(-player.size.y/2 * Math.cos(player.rotation*Math.PI/180))));

  drawCircle(cor1.x, cor1.y, 2);
  drawCircle(cor2.x, cor2.y, 2);
  drawCircle(cor3.x, cor3.y, 2);
  drawCircle(cor4.x, cor4.y, 2);

  if (oldP1.length >= 50) {
    oldP1.shift();
  }
  if (oldP2.length >= 50) {
    oldP2.shift();
  }
  c.fillStyle = 'rgba(0, 162, 255, 0.5)';
  oldP1.push({x: cor3.x, y: cor3.y});
  oldP2.push({x: cor2.x, y: cor2.y});
  c.beginPath();
  c.moveTo(oldP1[0].x, oldP1[0].y);
  for (var i = 1; i < oldP1.length; i++) {
    var curPos = oldP1[i];
    curPos.x--;
    c.lineTo(curPos.x, curPos.y);
  }
  c.lineTo(oldP2[oldP2.length-1].x, oldP2[oldP2.length-1].y);
  for (var i = 1; i < oldP2.length; i++) {
    var e = oldP2.length-i;
    var curPos = oldP2[e];
    curPos.x--;
    c.lineTo(curPos.x, curPos.y);
  }
  c.lineTo(oldP1[0].x, oldP1[0].y);
  c.fill();
  c.closePath();
  /*for (var i = 0; i < oldP1.length; i++) {
    var old = oldP1[i];
    old.x-= 1;
    if (i > 0) {
      var prevOld = oldP1[i-1];
      c.beginPath();
      c.moveTo(old.x, old.y);
      c.lineTo(prevOld.x,prevOld.y);
      c.stroke();
    }
  }
  for (var i = 0; i < oldP2.length; i++) {
    var old = oldP2[i];
    old.x-= 1;
    if (i > 0) {
      var prevOld = oldP2[i-1];
      c.beginPath();
      c.moveTo(old.x, old.y);
      c.lineTo(prevOld.x,prevOld.y);
      c.fill();
      c.closePath();
    }
  }*/
  c.fillStyle = "black";

  for (var i = 0; i < obstacles.length; i++) {
    var obj = obstacles[i];
    obj.pos.x -= 5*delta;
    c.beginPath();
    c.rect(obj.pos.x, obj.pos.y, obj.size.x, obj.size.y);
    c.fill();
    c.closePath();
    if (obj.pos.x + obj.size.x < 0) {
      obstacles.shift();
      i--;
    }
    else {
      var hitboxObj = 50;
      if (obj.x - hitboxObj < player.x + player.size.x + hitboxObj &&
          obj.x + obj.size.x + hitboxObj > player.x - hitboxObj &&
          obj.y - hitboxObj < player.y + player.size.y + hitboxObj &&
          obj.y + obj.size.y + hitboxObj > player.y - hitboxObj) {
            console.log("inside");
      }
      var obsLines = {top:    new Line(obj.pos.x, obj.pos.y, obj.pos.x + obj.size.x, obj.pos.y),
                      bottom: new Line(obj.pos.x, obj.pos.y + obj.size.y, obj.pos.x  + obj.size.x, obj.pos.y + obj.size.y),
                      right:  new Line(obj.pos.x + obj.size.x, obj.pos.y, obj.pos.x + obj.size.x, obj.pos.y + obj.size.y),
                      left:   new Line(obj.pos.x, obj.pos.y, obj.pos.x, obj.pos.y + obj.size.y)};
      /*drawLine(obsLines.top);
      drawLine(obsLines.bottom);
      drawLine(obsLines.right);
      drawLine(obsLines.left);*/

      if (collosionOrganizer(cor1, cor2, cor3, cor4, obsLines.top) && player.velocity.y > 0) {
        player.pos.y = obj.pos.y-player.size.y;
        player.velocity.y = 0;
      }
      else if (collosionOrganizer(cor1, cor2, cor3, cor4, obsLines.bottom) && player.velocity.y < 0) {
        player.pos.y = obj.pos.y + obj.size.y;
        player.velocity.y = 0;
      }
      else if (/*collosionOrganizer(cor1, cor2, cor3, cor4, obsLines.right) || */collosionOrganizer(cor1, cor2, cor3, cor4, obsLines.left)) {
        console.log("dead");
        while (obstacles.length > 0) {
          obstacles.splice(i, 1);
        }
      }
    }
  }
}
function drawLine(obj) {
  c.beginPath();
  c.moveTo(obj.x1, obj.y1);
  c.lineTo(obj.x2, obj.y2);
  c.stroke();
  c.closePath();
}
function drawCircle(x, y, size) {
  c.beginPath();
  c.arc(x, y, size, 0, Math.PI*2);
  c.fill();
  c.closePath();
}
//------------------COLLISION DETECTION-----------------------------------------
function collosionOrganizer(c1, c2, c3, c4, obs) {
  if (
    linesTouching(c1.x, c1.y, c2.x, c2.y, obs) ||
    linesTouching(c3.x, c3.y, c4.x, c4.y, obs) ||
    //linesTouching(c2.x, c2.y, c3.x, c3.y, obs) ||
    linesTouching(c1.x, c1.y, c4.x, c4.y, obs) ) {
    return true;
  }
  else {
    return false;
  }
}
function linesTouching(x1, y1, x2, y2, obs) {
  var x3 = obs.x1;
  var y3 = obs.y1;
  var x4 = obs.x2;
  var y4 = obs.y2;
  var denominator = ((x2 - x1) * (y4 - y3)) - ((y2 - y1) * (x4 - x3));
  var numerator1 = ((y1 - y3) * (x4 - x3)) - ((x1 - x3) * (y4 - y3));
  var numerator2 = ((y1 - y3) * (x2 - x1)) - ((x1 - x3) * (y2 - y1));

  if (denominator == 0) return numerator1 == 0 && numerator2 == 0;

  var r = numerator1 / denominator;
  var s = numerator2 / denominator;

  return (r >= 0 && r <= 1) && (s >= 0 && s <= 1);
}
//------------------ANIMATION FUNCTION------------------------------------------
const frameLength = 1000 / 60;
let timeSinceLastUpdate = 0;

function animation() {
  requestAnimationFrame(animation);
  if (Date.now() - timeSinceLastUpdate < frameLength) {
    return;
  }
  now = Date.now();
  delta = (now-lastTime)/10;
  lastTime = now;
  timeSinceLastUpdate = Date.now();
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.fillText(ms + ": ms", 10, 20);
  c.fillText(fps + ": fps", 10, 30);
  statistics();
  drawGame();
}
//-----------------STATISTICS GRAPH---------------------------------------------
function statistics() {
  gc.clearRect(0, 0, canvas.width, canvas.height);
  oldDelta.push({x: graphCanvas.width, delta: delta});
  if (oldDelta.length >= 200) {
    oldDelta.shift();
  }
  for (var i = 0; i < oldDelta.length; i++) {
    var od = oldDelta[i];
    od.x-= 1;
    if (i > 0) {
      var prevOD = oldDelta[i-1];
      gc.beginPath();
      gc.moveTo(od.x, -od.delta+50);
      gc.lineTo(prevOD.x, -prevOD.delta+50);
      gc.stroke();
      gc.closePath();

      gc.beginPath();
      gc.moveTo(od.x, Math.round(1/-od.delta*100)/10+200);
      gc.lineTo(prevOD.x, Math.round(1/-prevOD.delta*100)/10+200);
      gc.stroke();
      gc.closePath();
    }
  }

  oldP.push({x: graphCanvas.width, y: player.pos.y});
  if (oldP.length >= 200) {
    oldP.shift();
  }
  for (var i = 0; i < oldP.length; i++) {
    var old = oldP[i];
    old.x-= 1;
    if (i > 0) {
      var prevOld = oldP[i-1];
      gc.beginPath();
      gc.moveTo(old.x, old.y/10+300);
      gc.lineTo(prevOld.x, prevOld.y/10+300);
      gc.stroke();
      gc.closePath();
    }
  }
}
animation();
