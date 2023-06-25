class tile {
  constructor(x, y, sizeX, sizeY, walkable, hp, image) {
    this.x = x*50;
    this.y = y*50;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.walkable = walkable;
    this.hp = hp;
    this.image = image;
  }
}
function drawMap(obj) {
	if (obj == null || obj.walkable == true) {
		return;
	}
	c.drawImage(obj.image, obj.x + groundMovement.x, obj.y + groundMovement.y, obj.sizeX, obj.sizeY);

	var obj = {top: new Line(obj.x+groundMovement.x, obj.y, obj.x+obj.sizeX+groundMovement.x, obj.y),
	bottom: new Line(obj.x+groundMovement.x, obj.y+obj.sizeY, obj.x+obj.sizeX+groundMovement.x, obj.y+obj.sizeY),
	rightSide: new Line(obj.x+obj.sizeX+groundMovement.x, obj.y, obj.x+obj.sizeX+groundMovement.x, obj.y+obj.sizeY),
	leftSide: new Line(obj.x+groundMovement.x, obj.y, obj.x+groundMovement.x, obj.y+obj.sizeY)}
}

function shotTileCollision(shot, obj){
	if (obj == null || obj.walkable == true) {
		return;
	}
	obj = {top: new Line(obj.x+groundMovement.x, obj.y, obj.x+obj.sizeX+groundMovement.x, obj.y),
	bottom: new Line(obj.x+groundMovement.x, obj.y+obj.sizeY, obj.x+obj.sizeX+groundMovement.x, obj.y+obj.sizeY),
	rightSide: new Line(obj.x+obj.sizeX+groundMovement.x, obj.y, obj.x+obj.sizeX+groundMovement.x, obj.y+obj.sizeY),
	leftSide: new Line(obj.x+groundMovement.x, obj.y, obj.x+groundMovement.x, obj.y+obj.sizeY)}
	lineDetection(shot, obj.top);
	lineDetection(shot, obj.bottom);
	lineDetection(shot, obj.rightSide);
	lineDetection(shot, obj.leftSide);
}
function lineDetection(shot, side) {
	var firstx = shot.prevX;
	var firsty = shot.prevY;
	var endx = shot.x;
	var endy = shot.y;

	var dx = firstx - endx;
	var dy = firsty - endy;

	var uA = ((side.endX-side.x)*(endy-side.y) - (side.endY-side.y)*(endx-side.x)) /
	         ((side.endY-side.y)*(firstx-endx) - (side.endX-side.x)*(firsty-endy));
	var uB = ((firstx-endx)*(endy-side.y) - (firsty-endy)*(endx-side.x)) /
	         ((side.endY-side.y)*(firstx-endx) - (side.endX-side.x)*(firsty-endy));
	if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
		var intersectionX = endx + (uA * (firstx-endx));
		var intersectionY = endy + (uA * (firsty-endy));

		var distX = firstx - intersectionX;
		var distY = firsty - intersectionY;
		var checkDistance = Math.sqrt(distX*distX + distY*distY);
  		if (checkDistance <= lastDistance) {
  			lastHit = true;
  			lastDistance = checkDistance;
  			gun.hitX = intersectionX;
  			gun.hitY = intersectionY;
	 	}
  }
}

function obstacleDetected() {
  for (var i = 0; i < ground.length; i++) {
    var obj = ground[i];
  }
}
//-----Spawns snow and draws snow-----------------------------------------------
function genSnowFlakes() {
	if (pause == false) {
		for (var i = 0; i < 10; i++) {
			snowFlakes.push({x: Math.random()*(mapTileWidth*50+canvas.height)-canvas.height,
											 y: 0,
											 size: Math.random()*3+2
											 })
		}
	}
}
function drawSnow() {
  for (var i = 0; i < snowFlakes.length; i++) {
		if (pause == false) {
			snowFlakes[i].x += snowFlakes[i].size/2;
	    snowFlakes[i].y += snowFlakes[i].size/2;
		}
    if (snowFlakes[i].y > canvas.height) {
      snowFlakes.splice(i, 1);
    }
    c.beginPath();
    c.fillStyle = "white";
    c.arc(snowFlakes[i].x + groundMovement.x, snowFlakes[i].y, snowFlakes[i].size, 0, 2*Math.PI);
    c.fill();
    c.closePath();
    c.fillStyle = "black";
  }
}
function drawTrees() {
  for (var i = 0; i < trees.length; i++) {
    c.beginPath();
    c.drawImage(trees[i].img, trees[i].x+groundMovement.x, trees[i].y, trees[i].sizeX, trees[i].sizeY);
    c.closePath();
  }
}
//-------------------end of map portal and--------------------------------------
function drawPortal() {
	if ( player.x > 1050) {
				mapChoice++;
				player.x = 300;
				groundMovement.x = 0;
				newMap();
			}
	c.beginPath();
	c.drawImage(portal.image, portal.x+groundMovement.x, portal.y, portal.sizeX, portal.sizeY);
	c.closePath();
}
//----------pieces generated when block are destroyed---------------------------
class piece {
  constructor(x, y, sizeX, sizeY, velx, vely, gravity, rotation, rotationVel) {
    this.x = x;
    this.y = y;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.velx = velx;
    this.vely = vely;
    this.gravity = gravity;
    this.rotation = rotation;
    this.rotationVel = rotationVel;
  }
}
function genPieces(x, y, amount, pieceType) {
  var firstX = x;
  for (var i = 0; i < amount; i++) {
    pieceType.push(new piece(x, y, 10, 10, Math.random()*10 -5, Math.random()*-20, 0.982, 0, Math.random()*10-5));
    if (x >= firstX + 40) {
      x = firstX;
      y += 10;
    }
    else {
      x += 10;
    }
  }
}
function drawPieces(obj, image) {
  for (var i = 0; i < obj.length; i++) {
    obj[i].x += obj[i].velx;
    obj[i].y += obj[i].vely;
    obj[i].vely += obj[i].gravity;
    obj[i].rotation += obj[i].velx;
    c.beginPath();
    c.translate(obj[i].x + obj[i].sizeX/2 + groundMovement.x, obj[i].y + obj[i].sizeY/2);
    c.rotate(obj[i].rotation * Math.PI / 180);
    c.drawImage(image , -obj[i].sizeX/2, -obj[i].sizeY/2, obj[i].sizeX, obj[i].sizeY);
    c.stroke();
    c.closePath();
    c.resetTransform();
    if (obj[i].y > canvas.height+100) {
      obj.splice(i, 1);
    }
  }
}
//-------------Writes inserted text on canvas-----------------------------------
class text {
  constructor(x, y, font, color, text) {
    this.x = x;
    this.y = y;
    this.font = font;
    this.color = color;
    this.text = text;
  }
}
function drawText() {
  for (var i = 0; i < mapText.length; i++) {
    c.font = mapText[i].font;
    c.fillStyle = mapText[i].color;
    c.fillText(mapText[i].text, mapText[i].x + groundMovement.x, mapText[i].y);
  }
}
//---Generates and draws background images along the mapWidth-------------------
function drawBackground() {
	var x = groundMovement.x/10;
	var length = Math.ceil((mapTileWidth*50)/1200);
	for (var i = 0; i < length; i++) {
		c.drawImage(backgroundImg, x, 0, 1200, 600);
		x += 1200
	}
}

function openDoor(obj) {
  if (mapChoice == 4) {
    switch (obj.image) {
      case keyYImg:
        map[100][7].walkable = true;
        map[100][8].walkable = true;
        map[100][9].walkable = true;
        break;
      default:

    }
  }
}

class Circle {
  constructor(x, y, size, velx, vely, prevx, prevy, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.velx = velx;
    this.vely = vely;
    this.prevx = prevx;
    this.prevy = prevy;
    this.color = color;
  }
}
function fireworks() {
  shootFireworks = setInterval(function() {
    for (var i = 0; i < 1; i++) {
      var rgb = "rgb(" +
       (Math.floor(Math.random() * 256)) + ", "
      + (Math.floor(Math.random() * 256)) + ", "
      + (Math.floor(Math.random() * 256)) + ")";
        firework.push(new Circle(500, 530, 5, Math.random()*50-25, Math.random()*-30-20, 0, 0, rgb));
        setTimeout(function() {
          for (var e = 0; e < 30; e++) {
            var velocity = Math.random()*Math.PI*2;
            var rgb = "rgb(" +
             (Math.floor(Math.random() * 256)) + ", "
            + (Math.floor(Math.random() * 256)) + ", "
            + (Math.floor(Math.random() * 256)) + ")";
            sparkle.push(new Circle(firework[0].x, firework[0].y, 3, firework[0].velx+Math.cos(velocity)*Math.random()*10, firework[0].vely+Math.sin(velocity)*Math.random()*10, 0, 0, rgb));
          }
          firework.shift();
        }, 300)
    }
  }, 1000)
}
function drawFireworks() {
  for (var i = 0; i < firework.length; i++) {
    var obj = firework[i];

    obj.velx *= 0.93;
    obj.vely *= 0.93;
    obj.x += obj.velx;
    obj.y += obj.vely;
    obj.vely += 0.1;
    c.fillStyle = obj.color;
    c.beginPath();
    c.arc(obj.x, obj.y, obj.size, 0, Math.PI*2);
    c.fill();
    c.closePath();
    c.fillStyle = "black";

  }
  for (var e = 0; e < sparkle.length; e++) {
    var obj2 = sparkle[e];
    if (obj2.velx < 0.1  && obj2.velx > -0.1 && obj2.vely > -0.1) {
      sparkle.splice(e, 1);
    }
    obj2.prevx = obj2.x;
    obj2.prevy = obj2.y;
    obj2.velx *= 0.95;
    obj2.vely *= 0.95;
    obj2.vely += 0.1;
    obj2.x += obj2.velx;
    obj2.y += obj2.vely;
    c.fillStyle = obj2.color;
    c.strokeStyle = obj2.color;
    c.beginPath();
    c.arc(obj2.x, obj2.y, obj2.size, 0, Math.PI*2);
    c.fill();
    c.closePath();
    c.beginPath();
    c.lineWidth = 2;
    c.moveTo(obj2.prevx, obj2.prevy);
    c.lineTo(obj2.x, obj2.y);
    c.stroke();
    c.closePath();
    c.lineWidth = 1;
    c.fillStyle = "black";
    c.strokeStyle = "black";
  }
}
