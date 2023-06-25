const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');
canvas.width = 1800;
canvas.height = 900;

const canvas2 = document.getElementById('canvas2');
const c2 = canvas2.getContext('2d');
canvas2.width = 1800;
canvas2.height = 900;
c2.drawImage(bgndImg, 0, 0, 1800, 900);
class Line {
  constructor(x1, y1, x2, y2, vel) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.vel = vel;
  }
}
class Circle {
  constructor(x, y, size, velx, vely, color, prevx, prevy) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.velx = velx;
    this.vely = vely;
    this.color = color;
    this.prevx = prevx;
    this.prevy = prevy;
  }
}
class Rectangle {
  constructor(x, y, sizeX, sizeY, velx, vely, prevx, prevy, rotation, img) {
    this.x = x;
    this.y = y;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.velx = velx;
    this.vely = vely;
    this.prevx = prevx;
    this.prevy = prevy;
    this.rotation = rotation;
    this.img = img;
  }
}
class Rect {
  constructor(x,y,sizeX,sizeY) {
    this.x = x;
    this.y = y;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
  }
}
class Dot {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
  }
}
document.addEventListener("mousemove", mouse);
function mouse(event) {
  mouse.x = (event.clientX-(window.innerWidth-canvas.width)/2);
  mouse.y = (event.clientY-(window.innerHeight-canvas.height)/2);
}
var snow2 = [];
var grass = [];
var firework = [];
var sparkle = [];
var snow = [];
var lines = [];
var bomb = [];
var fire = [];
var bombs = 11;
for (var i = 0; i < 1800; i++) {
  var x = i+Math.floor(Math.random()*20);
  var heigth = Math.random()*5+785;
  grass.push(new Line(0+x, canvas.height-100, 10+x, heigth, 0));
}
setInterval(function() {
  var rocket = Math.round(Math.random()*3);
  var xStart = Math.random()*1400+200;
  if (rocket == 0) {
    for (var i = 0; i < 1; i++) {
        firework.push(new Rectangle(xStart, canvas.height-100, 15, 30, Math.random()*4-2, Math.random()*-2-3, 0, 0, 0, rocketImg));
        setTimeout(function() {
          for (var i = 0; i < bombs; i++) {
            var velocity = Math.random()*Math.PI*2;
            var colorBomb = "rgb(" +
             (Math.floor(Math.random() * 256)) + ", "
            + (Math.floor(Math.random() * 256)) + ", "
            + (Math.floor(Math.random() * 256)) + ")";
            bomb.push(new Circle(firework[0].x, firework[0].y, 3, firework[0].velx/10+Math.cos(velocity)*Math.random()*10, firework[0].vely/10+Math.sin(velocity)*Math.random()*10, colorBomb, 0, 0));
          }
          firework.shift();
          setTimeout(function() {
            for (var i = 0; i < bombs; i++) {
              for (var e = 0; e < 20; e++) {
                var velocity = Math.random()*Math.PI*2;
                sparkle.push(new Circle(bomb[0].x, bomb[0].y, Math.ceil(Math.random()*2), bomb[0].velx+Math.cos(velocity)*Math.random()*10, bomb[0].vely+Math.sin(velocity)*Math.random()*10, bomb[0].color, 0, 0));
              }
              bomb.shift();
            }
          }, 500)
        }, Math.random()*10+900)
    }
  }
  else if (rocket == 1) {
    var rocketAmount = Math.ceil(Math.random()*3);
    for (var i = 0; i < rocketAmount; i++) {
        var explSize = Math.random()*20+5;
        var colorRocket = "rgb(" +
         (Math.floor(Math.random() * 256)) + ", "
        + (Math.floor(Math.random() * 256)) + ", "
        + (Math.floor(Math.random() * 256)) + ")";
        firework.push(new Rectangle(xStart, canvas.height-100, 15, 30, Math.random()*4-2, Math.random()*-2-3, 0, 0, 0, rocketImg));
          setTimeout(function() {
            var amount = Math.round(Math.random()*50+5);
              for (var e = 0; e < 50; e++) {
                var velocity = e/(Math.PI*2);
                var speed = Math.random()*explSize;
                var color = "rgb(" +
                 (Math.floor(Math.random() * 256)) + ", "
                + (Math.floor(Math.random() * 256)) + ", "
                + (Math.floor(Math.random() * 256)) + ")";
                sparkle.push(new Circle(firework[0].x, firework[0].y, 1, firework[0].velx/10+Math.cos(velocity)*speed, firework[0].vely/10+Math.sin(velocity)*speed, color, 0, 0));
              }
              firework.shift();

        }, Math.random()*10+900)
    }
  }
  else if (rocket == 2) {
    for (var i = 0; i < 1; i++) {
        var colorBomb = "rgb(" +
         (Math.floor(Math.random() * 256)) + ", "
        + (Math.floor(Math.random() * 256)) + ", "
        + (Math.floor(Math.random() * 256)) + ")";
        firework.push(new Rectangle(xStart, canvas.height-100, 15, 30, Math.random()*4-2, Math.random()*-2-3, 0, 0, 0, rocketImg));
        setTimeout(function() {
          var splitSize = Math.random()*10+3;
          for (var i = 0; i < bombs; i++) {
            var velx = (i-bombs/2)*splitSize;
            var velocity = Math.random()*Math.PI*2;
            bomb.push(new Circle(firework[0].x, firework[0].y, 3, firework[0].velx/10+velx, firework[0].vely/3, colorBomb, 0, 0));
          }
          firework.shift();
          setTimeout(function() {
            for (var i = 0; i < bombs; i++) {
              for (var e = 0; e < 10; e++) {
                var velocity = Math.random()*Math.PI*2;
                var color = "rgb(" +
                 (Math.floor(Math.random() * 256)) + ", "
                + (Math.floor(Math.random() * 256)) + ", "
                + (Math.floor(Math.random() * 256)) + ")";
                sparkle.push(new Circle(bomb[0].x, bomb[0].y, 1, bomb[0].velx+Math.cos(velocity)*Math.random()*10, bomb[0].vely+Math.sin(velocity)*Math.random()*10, bomb[0].color, 0, 0));
              }
              bomb.shift();
            }
          }, 500)
        }, Math.random()*10+900)
    }
  }
  else if (rocket == 3) {
    for (var i = 0; i < 1; i++) {
        var colorBomb = "rgb(" +
         (Math.floor(Math.random() * 256)) + ", "
        + (Math.floor(Math.random() * 256)) + ", "
        + (Math.floor(Math.random() * 256)) + ")";
        firework.push(new Rectangle(xStart, canvas.height-100, 15, 30, Math.random()*4-2, Math.random()*-2-3, 0, 0, 0, rocketImg));
        setTimeout(function() {
          var splitSize = Math.random()*4+2;
          for (var i = 0; i < bombs; i++) {
              var velx = (i-bombs/2)*splitSize;
              var vely = -(i-bombs/2)*splitSize;
            bomb.push(new Circle(firework[0].x, firework[0].y, 3, firework[0].velx/10+velx, firework[0].vely/10+vely, colorBomb, 0, 0));
          }
          for (var i = 0; i < bombs; i++) {
              var velx = (i-bombs/2)*splitSize;
              var vely = (i-bombs/2)*splitSize;
            bomb.push(new Circle(firework[0].x, firework[0].y, 3, firework[0].velx/10+velx, firework[0].vely/10+vely, colorBomb, 0, 0));
          }
          firework.shift();
          setTimeout(function() {
            for (var i = 0; i < bombs*2; i++) {
              for (var e = 0; e < 20; e++) {
                var velocity = Math.random()*Math.PI*2;
                var color = "rgb(" +
                 (Math.floor(Math.random() * 256)) + ", "
                + (Math.floor(Math.random() * 256)) + ", "
                + (Math.floor(Math.random() * 256)) + ")";
                sparkle.push(new Circle(bomb[0].x, bomb[0].y, 1, bomb[0].velx+Math.cos(velocity)*Math.random()*10, bomb[0].vely+Math.sin(velocity)*Math.random()*10, bomb[0].color, 0, 0));
              }
              bomb.shift();
            }
          }, 300)
        }, Math.random()*10+900)
    }
  }
}, 500);
setInterval(function() {
  for (var i = 0; i < 1; i++) {
    var size = Math.random()*3+1;
    snow.push(new Circle(Math.random()*1800, -10, size, 0, 0.1, "#6A6A6A", Math.random()*0.01-0.005+size/1000, 0));
  }
},100);
for (var i = 0; i < 100; i++) {
  var size = Math.random()*3+1;
  snow.push(new Circle(Math.random()*1800, Math.random()*790, size, 0, 0.1, "#6A6A6A", Math.random()*0.01-0.005+size/1000, 0));
}
function drawOnce(obj) {
  c2.beginPath();
  c2.fillStyle = "#6A6A6A";
  c2.strokeStyle = "#6A6A6A";
  c2.arc(obj.x, obj.y, obj.size, 0, Math.PI*2);
  c2.fill();
  c2.stroke();
  c2.closePath();
}
function draw() {
  for (var i = 0; i < grass.length; i++) {
    c.beginPath();
    c.strokeStyle = "green";
    c.moveTo(grass[i].x1, grass[i].y1);
    c.lineTo(grass[i].x2, grass[i].y2);
    //c.stroke();
    c.closePath();
  }
  for (var i = 0; i < snow.length; i++) {
    var obj = snow[i];
    if (obj.vely != 0) {
      obj.y += obj.size/5;
      obj.velx += obj.prevx;
      obj.x += obj.velx;
      if (obj.velx > obj.size/10 || obj.velx < -obj.size/10) {
        obj.prevx = -obj.prevx;
      }
    }
    if (obj.y >= canvas.height-100) {
      snow2.push(new Dot(obj.x, obj.y, obj.size));
      drawOnce(obj);
      snow.splice(i, 1);
    }
    else {
      var collided = false;
      for (var e = 0; e < snow2.length; e++) {
        var obj2 = snow2[e];
        var dx = obj.x - obj2.x;
        var dy = obj.y - obj2.y;
        var distance = Math.sqrt(dx*dx + dy*dy);
        if (distance <= obj.size/2) {
          //snow2.push(new Dot(obj.x, obj.y, obj.size));
          collided = true;
          drawOnce(obj);
          snow.splice(i, 1);
        }
      }
      if (collided == true) {
        snow2.push(new Dot(obj.x, obj.y, obj.size));
      }
    }
    c.beginPath();
    c.fillStyle = obj.color;
    c.arc(obj.x, obj.y, obj.size, 0, Math.PI*2);
    c.fill();
    c.closePath();
  }

  for (var i = 0; i < firework.length; i++) {
    var obj = firework[i];
    obj.prevx = obj.x;
    obj.prevy = obj.y;
    obj.velx *= 1.03;
    obj.vely *= 1.03;
    obj.x += obj.velx;
    obj.y += obj.vely;
    obj.vely += 0.01;
    fire.push(new Circle(obj.x+obj.sizeX/2, obj.y+obj.sizeY-3, 1, Math.random()*4-2, Math.random()*8+2, "yellow", 0, 0));
    c.translate(obj.x + obj.sizeX/2, obj.y + obj.sizeY/2);
    c.rotate(obj.velx*2/180*Math.PI*2);
    c.drawImage(obj.img, -obj.sizeX/2, -obj.sizeY/2, obj.sizeX, obj.sizeY);
    c.resetTransform();
  }
  for (var i = 0; i < sparkle.length; i++) {
    var obj = sparkle[i];
    if (obj.velx < 0.1  && obj.velx > -0.1 && obj.vely > -0.1) {
      sparkle.splice(i, 1);
    }
    obj.prevx = obj.x;
    obj.prevy = obj.y;
    obj.velx *= 0.95;
    obj.vely *= 0.95;
    obj.vely += 0.05;
    obj.x += obj.velx;
    obj.y += obj.vely;
    //lines.push({x: obj.x, y: obj.y, x2: obj.prevx, y2: obj.prevy, color: obj.color});
    setTimeout(function() {
      //lines.shift();
    },50)
    c.beginPath();
    c.strokeStyle = obj.color;
    c.lineWidth = obj.size;
    c.moveTo(obj.prevx, obj.prevy);
    c.lineTo(obj.x, obj.y);
    c.stroke();
    c.closePath();
    c.strokeStyle = "black";
  }
  for (var i = 0; i < bomb.length; i++) {
    var obj = bomb[i];
    obj.prevx = obj.x;
    obj.prevy = obj.y;
    obj.velx *= 0.93;
    obj.vely *= 0.93;
    obj.x += obj.velx;
    obj.y += obj.vely;
    obj.vely += 0.01;
    c.beginPath();
    c.fillStyle = obj.color;
    c.arc(obj.x, obj.y, obj.size, 0, Math.PI*2);
    c.fill();
    c.closePath();
    c.fillStyle = "black";
  }

  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    c.beginPath();
    c.lineWidth = 2;
    c.strokeStyle = line.color;
    c.moveTo(line.x2,line.y2);
    c.lineTo(line.x, line.y);
    c.globalAlpha = 1;
    c.stroke();
    c.closePath();
    c.globalAlpha = 1;
    c.lineWidth = 1;
    c.strokeStyle = "black";
  }
  for (var i = 0; i < fire.length; i++) {
    var obj = fire[i];
    if (obj.velx < 0.1  && obj.velx > -0.1 && obj.vely > -0.1) {
      fire.splice(i, 1);
    }
    obj.prevx = obj.x;
    obj.prevy = obj.y;
    obj.velx *= 0.93;
    obj.vely *= 0.93;
    obj.x += obj.velx;
    obj.y += obj.vely;
    obj.vely += 0.01;
    c.beginPath();
    c.fillStyle = obj.color;
    c.arc(obj.x, obj.y, obj.size, 0, Math.PI*2);
    c.fill();
    c.closePath();
    c.fillStyle = "black";
  }

  c.beginPath();
  c.fillStyle = "#6A6A6A";
  c.globalAlpha = 1;
  c.rect(0, canvas.height-100, canvas.width, 100);
  c.fill();
  c.closePath();
  c.fillStyle = "black";
  c.globalAlpha = 1;
}
function maffs() {
  for (var i = 0; i < grass.length; i++) {
       grass[i].vel += Math.random()*0.2-0.1;
    if (grass[i].x2 > grass[i].x1+10) {
      grass[i].vel = -0.1;
    }
    else if (grass[i].x2 < grass[i].x1+5) {
      grass[i].vel = +0.1;
    }
    grass[i].x2 += grass[i].vel;
  }
}
const frameLength = 1000 / 60;
let timeSinceLastUpdate = 0;

function animation() {
  requestAnimationFrame(animation);
  if (Date.now() - timeSinceLastUpdate < frameLength) {

    return;
  }
  timeSinceLastUpdate = Date.now();
  c.clearRect(0, 0, canvas.width, canvas.height);
  //c2.clearRect(mouse.x-25, mouse.y-25, 50, 50);
  c.drawImage(rocketImg, mouse.x-7.5, mouse.y-15, 15, 30);
  maffs();
  draw();
}
animation();
