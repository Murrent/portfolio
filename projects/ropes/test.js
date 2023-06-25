const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 800;

class Line {
  constructor(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }
}
class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
class Circle {
  constructor(x, y, prevX, prevY, velx, vely, size) {
    this.pos = new Vec(x, y);
    this.prevPos = new Vec(prevX, prevY);
    this.vel = new Vec(velx, vely);
    this.size = size;
    this.gravity = true;
    this.grabbed = {status: false, x: 0, y: 0};
  }
}
class RopePart{
  constructor(x, y) {
    this.pos = new Vec(x, y);
    this.btm = new Vec(x + 30, y + 30);
    this.prev = new Vec(0,0);
    this.vel = new Vec(0, 0);
	this.stuck = false;
  }
}
class Box {
  constructor(x, y, width, height){
    this.pos = new Vec(x,y);
    this.size = new Vec(width, height);
  }
}

function abs(a){return Math.sqrt( a.x*a.x + a.y*a.y );}
function absSQ(a){return a.x*a.x + a.y*a.y;}
function add(a, b){return new Vec( a.x+b.x, a.y+b.y );}
function sub(a, b){return new Vec( a.x-b.x, a.y-b.y );}
function scale(a, scalar){return new Vec( a.x*scalar, a.y*scalar );}
function dot(a, b){return a.x*b.x + a.y*b.y;}
var cloth = [];
var box = [];
var rope = [];
var rope2 = [];
var lines = [];
var circles = [];
var lDown = false;
var key = {w: false, s: false, a: false, d: false};
c.strokeStyle = "blue";
c.lineWidth = 10;
document.addEventListener("mousemove", mouse);
document.addEventListener("mousedown", mousedown);
document.addEventListener("mouseup", mouseup);
document.addEventListener('keydown', function(event) {
    if(event.keyCode == 87) {
        key.w = true;
    }
    if(event.keyCode == 83) {
        key.s = true;
    }
    if(event.keyCode == 65) {
        key.a = true;
    }
    if(event.keyCode == 68) {
        key.d = true;
    }
});
document.addEventListener('keyup', function(event) {

      if(event.keyCode == 87) {
          key.w = false;
      }
      if(event.keyCode == 83) {
          key.s = false;
      }
      if(event.keyCode == 65) {
          key.a = false;
      }
      if(event.keyCode == 68) {
          key.d = false;
      }
});
function mouse(event) {
  mouse.x = (event.clientX-(window.innerWidth-canvas.width)/2);
  mouse.y = (event.clientY-(window.innerHeight-canvas.height)/2);
}
function mousedown() {
  if (event.button == 0) {
    lDown = true;
  }
}
function mouseup() {
  if (event.button == 0) {
    lDown = false;
  }
}

for (var x = 0; x < 5; x++) {
	var line = [];
	for (var y = 0; y < 5; y++) {
		line.push(new RopePart(100+x*50, 100+y*50));
	}
	cloth.push(line);
}

box.push(new Box(300, 400, 100, 100));

rope.push(new RopePart(300, 100));
rope[0].stuck = true;
rope.push(new RopePart(500, 140));
rope.push(new RopePart(300, 180));
rope.push(new RopePart(100, 220));
rope.push(new RopePart(100, 100));
rope.push(new RopePart(100, 400));
rope.push(new RopePart(300, 180));
rope.push(new RopePart(100, 220));
rope.push(new RopePart(100, 100));/*
rope.push(new RopePart(100, 400));
rope.push(new RopePart(300, 180));
rope.push(new RopePart(100, 220));
rope.push(new RopePart(100, 100));
rope.push(new RopePart(100, 400));
rope.push(new RopePart(300, 180));
rope.push(new RopePart(100, 220));
rope.push(new RopePart(100, 100));
rope.push(new RopePart(100, 400));*/


rope2.push(new RopePart(500, 200));
rope2[0].stuck = true;
rope2.push(new RopePart(600, 140));
rope2.push(new RopePart(500, 180));
rope2.push(new RopePart(700, 220));
rope2.push(new RopePart(600, 260));
rope2.push(new RopePart(600, 180));
/*
circles.push(new Circle(100, 100, 0,0,0,0, 3));
circles.push(new Circle(130, 100, 0,0,0,0, 3));
circles.push(new Circle(160, 100, 0,0,0,0, 3));
circles.push(new Circle(190, 100, 0,0,0,0, 3));
circles.push(new Circle(210, 100, 0,0,0,0, 3));
circles.push(new Circle(240, 100, 0,0,0,0, 3));
circles.push(new Circle(240, 100, 0,0,0,0, 3));
circles.push(new Circle(240, 100, 0,0,0,0, 3));
circles.push(new Circle(240, 100, 0,0,0,0, 3));
circles.push(new Circle(240, 100, 0,0,0,0, 3));
circles.push(new Circle(240, 100, 0,0,0,0, 3));
circles.push(new Circle(240, 100, 0,0,0,0, 3));
circles.push(new Circle(240, 100, 0,0,0,0, 3));
circles.push(new Circle(240, 100, 0,0,0,0, 3));
circles.push(new Circle(240, 100, 0,0,0,0, 3));*/
function pointRect(x, y, rx, ry, sizex, sizey){
  if( x > rx &&
      x < rx + sizex &&
      y > ry &&
      y < ry + sizey){
        return true;
      }
  return false;
}
function lightning(x, y, power) {
  for (var e = 0; e < power; e++) {
    for (var i = 0; i < 60; i++) {
      if (i == 0) {
        lines.push(new Line(x, y, x+Math.random()*30-15, y+Math.random()*1-15));
      }
      else {
        lines.push(new Line(lines[i-1].x2, lines[i-1].y2, lines[i-1].x2+Math.random()*30-15, lines[i-1].y2+Math.random()*1-15));
      }
    }
    for (var i = 0; i < lines.length; i++) {
      c.beginPath();
      c.moveTo(lines[i].x1, lines[i].y1);
      c.lineTo(lines[i].x2, lines[i].y2);
      c.stroke();
      c.closePath();

    }
    while (lines.length > 0) {
      lines.shift();
    }

  }
}
function draw() {
	
	for (var x = 0; x < cloth.length; x++) {
		for (var y = 0; y < cloth[x].length; y++) {
			var cur = cloth[x][y];
			c.beginPath();
			c.arc(cur.pos.x, cur.pos.y, 10, 0, Math.PI*2);
			//c.stroke();
			c.closePath();
		}
	}
	
	
  //lightning(canvas.width/2, canvas.height, 3)
  //lightning(mouse.x, mouse.y, 1)
  for (var i = 0; i < circles.length; i++) {
    var cir = circles[i];
    c.beginPath();
    //c.moveTo(cir.pos.x, cir.pos.y);
    //c.lineTo(circles[i-1].pos.x, circles[i-1].pos.y);
    c.arc(cir.pos.x, cir.pos.y, cir.size, 0, Math.PI * 2);
    c.stroke();
    c.closePath();
  }
  
  for (var i = 1; i < rope.length-1; i++) {
    var rop = rope[i];
    c.beginPath();
    c.moveTo(rop.pos.x, rop.pos.y);
    c.lineTo(rope[i-1].pos.x, rope[i-1].pos.y);
    //c.arc(cir.pos.x, cir.pos.y, cir.size, 0, Math.PI * 2);
	c.strokeStyle = "blue";
    c.stroke();
    c.closePath();
	c.font = "20px Georgia";
	c.fillStyle = "black";
	//c.fillText(i, rop.pos.x, rop.pos.y);
  }
  
  for (var i = 1; i < rope2.length-1; i++) {
    var rop = rope2[i];
    c.beginPath();
    c.moveTo(rop.pos.x, rop.pos.y);
    c.lineTo(rope2[i-1].pos.x, rope2[i-1].pos.y);
    //c.arc(cir.pos.x, cir.pos.y, cir.size, 0, Math.PI * 2);
	c.strokeStyle = "red";
    c.stroke();
    c.closePath();
	c.font = "20px Georgia";
	c.fillStyle = "black";
	//c.fillText(i, rop.pos.x, rop.pos.y);
  }
  
	c.beginPath();
    c.arc(rope[rope.length-2].pos.x, rope[rope.length-2].pos.y, 30, 0, Math.PI * 2);
    //c.stroke();
    c.closePath();
	
	c.beginPath();
    c.arc(rope[2].pos.x, rope[2].pos.y, 30, 0, Math.PI * 2);
    //c.stroke();
    c.closePath();
	
	c.beginPath();
    c.arc(rope[4].pos.x, rope[4].pos.y, 20, 0, Math.PI * 2);
    //c.stroke();
    c.closePath();
}

function maffs() {
  //var angle = new Vec((rope[0].pos.x - rope[0].btm.x) * 0.1, (rope[0].pos.y - rope[0].btm.y) * 0.1);
  

	//cloth[4][0].pos.x = 500;
	//cloth[4][0].pos.y = 100;
  if (lDown){
    //cloth[0][0].pos.x = mouse.x;
    //cloth[0][0].pos.y = mouse.y;
	rope[0].pos.x = mouse.x;
	rope[0].pos.y = mouse.y;
    // circles[0].pos.x = mouse.x;
    // circles[0].pos.y = mouse.y;
  }
  /*
  
	var divide = 10;
	for (var x = 0; x < cloth.length; x++) {
		for (var y = 0; y < cloth[x].length; y++) {
			var cur = cloth[x][y];
			if (x > 0){
				var newVel = new Vec(cloth[x-1][y].pos.x - cur.pos.x - 50, cloth[x-1][y].pos.y - cur.pos.y - 50);
				
				if (Math.sqrt(newVel.x*newVel.x + newVel.y*newVel.y) < 50){
					newVel.x = -newVel.x;
					newVel.x = -newVel.y;
				}
				cur.vel.x += newVel.x;
				cur.vel.y += newVel.y;
			}
			if (x < cloth.length-1){
				var newVel = new Vec(cloth[x+1][y].pos.x - cur.pos.x - 50, cloth[x+1][y].pos.y - cur.pos.y - 50);
				
				if (Math.sqrt(newVel.x*newVel.x + newVel.y*newVel.y) < 50){
					newVel.x = -newVel.x;
					newVel.x = -newVel.y;
				}
				cur.vel.x += newVel.x;
				cur.vel.y += newVel.y;
			}
			if (y > 0){
				var newVel = new Vec(cloth[x][y-1].pos.x - cur.pos.x - 50, cloth[x][y-1].pos.y - cur.pos.y - 50);
				
				if (Math.sqrt(newVel.x*newVel.x + newVel.y*newVel.y) < 50){
					newVel.x = -newVel.x;
					newVel.x = -newVel.y;
				}
				cur.vel.x += newVel.x;
				cur.vel.y += newVel.y;
			}
			if (y < cloth[x].length-1){
				var newVel = new Vec(cloth[x][y+1].pos.x - cur.pos.x - 50, cloth[x][y+1].pos.y - cur.pos.y - 50);
				
				if (Math.sqrt(newVel.x*newVel.x + newVel.y*newVel.y) < 50){
					newVel.x = -newVel.x;
					newVel.x = -newVel.y;
				}
				cur.vel.x += newVel.x;
				cur.vel.y += newVel.y;
			}
			cur.vel.x *= 0.1;
			cur.vel.y *= 0.1;
			cur.vel.y += 1;
			//cur.vel.x += Math.random() * 5;
			cur.pos.x += cur.vel.x;
			cur.pos.y += cur.vel.y;
		}
	}*/
  
	//rope[rope.length-2].pos.x = rope2[rope2.length-2].pos.x;
	//rope[rope.length-2].pos.y = rope2[rope2.length-2].pos.y;
	

    for (var i = 0; i < rope.length-1; i++) {
      var rop = rope[i];
      var btmAngle = new Vec((rope[i+1].pos.x - rop.pos.x), (rope[i+1].pos.y - rop.pos.y));
      var hyp = Math.sqrt(btmAngle.x*btmAngle.x + btmAngle.y*btmAngle.y);
      rop.btm = new Vec(rop.pos.x + (btmAngle.x / hyp) * 30, rop.pos.y + (btmAngle.y / hyp) * 30);
    }
  for (var i = 1; i < rope.length-2; i++) {
    var rop = rope[i];
    rop.prev.x = rop.pos.x;
    rop.prev.y = rop.pos.y;
    //console.log(rop.pos);
	if (i > 0) {
		var newVel1 = new Vec((rope[i-1].btm.x - rop.pos.x)/10, (rope[i-1].btm.y - rop.pos.y)/10);
		rop.vel.x += newVel1.x;
		rop.vel.y += newVel1.y;
	}
	if (i < rope.length-2) {
		var newVel2 = new Vec((rope[i+1].pos.x - rop.btm.x)/10, (rope[i+1].pos.y - rop.btm.y)/10);
		rop.vel.x += newVel2.x;
		rop.vel.y += newVel2.y;
	}
	if (i == 4){
		var newVel = new Vec((rope2[rope2.length-3].btm.x - rop.pos.x)/10, (rope2[rope2.length-3].btm.y - rop.pos.y)/10);
		//rop.vel.x += newVel.x;
		//rop.vel.y += newVel.y;
	}
    rop.vel.x *= 0.9;
    rop.vel.y *= 0.9;
    rop.vel.y += 1;
    //rop.vel.x += Math.random() * 2;
    rop.pos.x += rop.vel.x;
    rop.pos.y += rop.vel.y;

	
	
  }
  
  
  for (var i = 0; i < rope.length; i++) {
    var rop = rope[i];
    if (rop.pos.x < 0) rop.pos.x = 0;
    if (rop.pos.x > canvas.width) rop.pos.x = canvas.width;
    if (rop.pos.y < 0) rop.pos.y = 0;
    if (rop.pos.y > canvas.height) rop.pos.y = canvas.height;
  }
  
  
   for (var i = 0; i < rope2.length-1; i++) {
      var rop = rope2[i];
      var btmAngle = new Vec((rope2[i+1].pos.x - rop.pos.x), (rope2[i+1].pos.y - rop.pos.y));
      var hyp = Math.sqrt(btmAngle.x*btmAngle.x + btmAngle.y*btmAngle.y);
      rop.btm = new Vec(rop.pos.x + (btmAngle.x / hyp) * 30, rop.pos.y + (btmAngle.y / hyp) * 30);
   }
  
  for (var i = 1; i < rope2.length-1; i++) {
    var rop = rope2[i];
    rop.prev.x = rop.pos.x;
    rop.prev.y = rop.pos.y;
    //console.log(rop.pos);
	if (i > 0) {
		var newVel1 = new Vec((rope2[i-1].btm.x - rop.pos.x)/10, (rope2[i-1].btm.y - rop.pos.y)/10);
		rop.vel.x += newVel1.x;
		rop.vel.y += newVel1.y;
	}
	if (i < rope2.length-2) {
		var newVel2 = new Vec((rope2[i+1].pos.x - rop.btm.x)/10, (rope2[i+1].pos.y - rop.btm.y)/10);
		rop.vel.x += newVel2.x;
		rop.vel.y += newVel2.y;
	}
	if (i == rope2.length-3) {
		var newVel = new Vec((rope[4].pos.x - rop.btm.x)/10, (rope[4].pos.y - rop.btm.y)/10);
		//rop.vel.x += newVel.x;
		//rop.vel.y += newVel.y;
	}
    //circles[i-1].vel.x -= newVel.x;
    //circles[i-1].vel.y -= newVel.y;
    rop.vel.x *= 0.9;
    rop.vel.y *= 0.9;
    rop.vel.y += 1;
    rop.vel.x += Math.random() * 2;
    rop.pos.x += rop.vel.x;
    rop.pos.y += rop.vel.y;
	if (rop.pos.x < 0) rop.pos.x = 0;
    if (rop.pos.x > canvas.width) rop.pos.x = canvas.width;
    if (rop.pos.y < 0) rop.pos.y = 0;
    if (rop.pos.y > canvas.height) rop.pos.y = canvas.height;
	
  }
  // for (var i = 1; i < circles.length; i++) {
  //   var cir = circles[i];
  //   //console.log(cir.pos);
  //   var newVel = new Vec((circles[i-1].pos.x - cir.pos.x)/20, (circles[i-1].pos.y - cir.pos.y)/20);
  //   //circles[i-1].vel.x -= newVel.x;
  //   //circles[i-1].vel.y -= newVel.y;
  //   cir.vel.x += newVel.x;
  //   cir.vel.y += newVel.y;
  //   cir.vel.x *= 0.8;
  //   cir.vel.y *= 0.8;
  //   cir.vel.y += 1;
  //   cir.pos.x += cir.vel.x;
  //   cir.pos.y += cir.vel.y;
  //   if (cir.pos.x < 0) cir.pos.x = 0;
  //   if (cir.pos.x > canvas.width) cir.pos.x = canvas.width;
  //   if (cir.pos.y < 0) cir.pos.y = 0;
  //   if (cir.pos.y > canvas.height) cir.pos.y = canvas.height;
  // }
  /*
  for (var i = 0; i < circles.length; i++) {
    var cir = circles[i];
	if (cir.pos.x > canvas.width-cir.size || cir.pos.x < cir.size) {
	  if (cir.pos.x > canvas.width-cir.size) {cir.pos.x = canvas.width-cir.size}
	  else {cir.pos.x = cir.size}
	  cir.vel.x = -cir.vel.x;
    }
    if (cir.pos.y > canvas.height*2) {
      circles.splice(i, 1);
    }
    else {
      cir.gravity = true;
    }
    if (cir.pos.x > mouse.x-cir.size &&
        cir.pos.x < mouse.x+cir.size &&
        cir.pos.y > mouse.y-cir.size &&
        cir.pos.y < mouse.y+cir.size) {
          var dist = new Vec(cir.pos.x - mouse.x, cir.pos.y - mouse.y);
          if (abs(dist) < 0) {
            if (lDown == true) {
              cir.gravity = false;
              cir.grabbed.status = true;
              cir.grabbed.x = dist.x;
              cir.grabbed.y = dist.y;
              cir.vel.x = 0;
              cir.vel.y = 0;
              cir.vel.x = mouse.x - cir.prevPos.x;
              cir.vel.y = mouse.y - cir.prevPos.y;
            }
            else {
              cir.grabbed.status = false;
            }
            cir.vel = add(cir.vel, scale(dist, 100));
          }
    }
    for (var e = 0; e < circles.length; e++) {
      var cir2 = circles[e];
      if (e != i) {
        if (cir.pos.x+cir.size >= cir2.pos.x-cir2.size &&
            cir.pos.x-cir.size <= cir2.pos.x+cir2.size &&
            cir.pos.y+cir.size >= cir2.pos.y-cir2.size &&
            cir.pos.y-cir.size <= cir2.pos.y+cir2.size) {
              var dist = new Vec(cir.pos.x - cir2.pos.x, cir.pos.y - cir2.pos.y);
              if (abs(dist) <= cir.size + cir2.size) {

                cir.pos.x = cir2.pos.x+(cir.prevPos.x-cir2.pos.x)*(cir.size+cir2.size)
                         /(Math.sqrt((cir.prevPos.x-cir2.pos.x)*(cir.prevPos.x-cir2.pos.x)
                         +(cir.prevPos.y-cir2.pos.y)*(cir.prevPos.y-cir2.pos.y)));
                cir.pos.y = cir2.pos.y+(cir.prevPos.y-cir2.pos.y)*(cir.size+cir2.size)
                         /(Math.sqrt((cir.prevPos.x-cir2.pos.x)*(cir.prevPos.x-cir2.pos.x)
                         +(cir.prevPos.y-cir2.pos.y)*(cir.prevPos.y-cir2.pos.y)));

                /*cir2.pos.x = cir.pos.x+(cir2.prevPos.x-cir.pos.x)*(cir2.size+cir.size)
                         /(Math.sqrt((cir2.prevPos.x-cir.pos.x)*(cir2.prevPos.x-cir.pos.x)
                         +(cir2.prevPos.y-cir.pos.y)*(cir2.prevPos.y-cir.pos.y)));
                cir2.pos.y = cir.pos.y+(cir2.prevPos.y-cir.pos.y)*(cir2.size+cir.size)
                         /(Math.sqrt((cir2.prevPos.x-cir.pos.x)*(cir2.prevPos.x-cir.pos.x)
                         +(cir2.prevPos.y-cir.pos.y)*(cir2.prevPos.y-cir.pos.y)));

                var m1 = (2*cir2.size)/(cir.size + cir2.size);
                var m2 = (2*cir.size)/(cir2.size + cir.size);
                var div1 = dot(sub(cir.vel, cir2.vel), sub(cir.pos, cir2.pos))/absSQ(sub(cir.pos, cir2.pos));
                var div2 = dot(sub(cir2.vel, cir.vel), sub(cir2.pos, cir.pos))/absSQ(sub(cir2.pos, cir.pos));
                cir.vel = sub(cir.vel, scale(sub(cir.pos, cir2.pos), m1 * div1));
                cir2.vel = sub(cir2.vel, scale(sub(cir2.pos, cir.pos), m2 * div2));


              }
            }
          }
        }

    cir.prevPos.x = cir.pos.x;
    cir.prevPos.y = cir.pos.y;
    if (cir.grabbed.status == true) {
      cir.pos.x = mouse.x + cir.grabbed.x;
      cir.pos.y = mouse.y + cir.grabbed.y;
    }
    else {
      cir.pos.x += cir.vel.x;
      cir.pos.y += cir.vel.y;
    }
    if (cir.gravity == true && i != 0) {
      cir.vel.y += 0.05;
    }
    cir.vel.x *= 0.99;
    cir.vel.y *= 0.99;

  }
  */

	rope[4].pos.y = 100;
}
const frameLength = 1000 / 60;
let timeSinceLastUpdate = 0;

function animation() {
  requestAnimationFrame(animation);
    if (Date.now() - timeSinceLastUpdate < frameLength) {
        return;
    }
    timeSinceLastUpdate = Date.now();
  c.beginPath();
  c.fillStyle = "white";
  c.globalAlpha = 1;
  c.rect(0, 0, canvas.width, canvas.height);
  c.fill();
  c.closePath();
  c.fillStyle = "black";
  c.globalAlpha = 1;
  maffs();
  draw();
}
animation();
