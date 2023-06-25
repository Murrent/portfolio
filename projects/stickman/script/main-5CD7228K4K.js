const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');
canvas.width = 1200;//window.innerWidth;
canvas.height = 600;//window.innerHeight;
c.strokeSyle = "blue";
var bulletImg = document.getElementById('bullet');
var shellImg = document.getElementById('shell');
var akBody = document.getElementById('ak47Body');
var akBodyTurned = document.getElementById('ak47BodyTurned');
var akMags = document.getElementById('ak47Mag');
var akMagsTurned = document.getElementById('ak47MagTurned');

var gun =    {x: 69/2,
			  y: 16/2,
			  sizeY: 32/2,
			  sizeX: 138/2,
			  hitX: 0,
			  hitY: 0,
			  velx: 0,
			  rotation: 0,
			  vely: 0,
			  prevX: 0,
			  prevY: 0,
			  image: akBody};
var player = {x: 300,
			  y: 300,
			  prevX: 0,
			  prevY: 0,
			  sizeX: 30,
			  sizeY: 100,
			  velx: 0,
			  vely: 1,
			  gravity: 0.982,
			  friction: 0.9,
			  jump: true,
			  lineWidth: 3,
			  crouch: false,
			  standEnabled: true,
			  crouchLock: true,
			  hp: 1
			}
var portal = {x: 0, y: 0, sizeX: 100, sizeY: 150, image: portalImg}
var armYpos = 0.45;
var leg = {x: 0, y: 0}
var onMapItems = [];
var snowFlakes = [];
var snowFlakesON = true;
var snowFlakesInterval;
var trees = [];
var ground = [];
var woodPieces = [];
var metalPieces = [];
var map = [];
var blockLine = [];
var lastDistance = 1000000;
var prevLastDistance = lastDistance;
var hitTile;
var lastHit = false;
var endAim = {x: 0, y: 0};

var mapChoice = 4;
var mapText = [];
var backgroundImg;
var mapTileWidth = 200;
var groundMovement = {x:0, velx: 0, vely: 0, y:0};
var gunMag = [];
var magCount = 3;
var reloaded = false;
var reloadCheck = false;
var shots = [];
var ammoCount = 0;
var fireMode = true;
var spark = [];
var shells = [];
var explosiveType = true;
var expTypeLock = false;
var granades = [];
var granadeCount = 2;
var granadeCooldown = true;
var c4s = [];
var c4Count = 2;
var shootTimer;
var firstShot = true;
var flashON = false;
var rDown = false;
var leftDown = false;
var rightDown = false;
var mouseMode = true;
var blockCount = 0;

var bloodAlpha = 0.8;
var bloodAlphaSwitch = true;
var bloodON = false;
var takingDamage = false;
var damageAmount = 0;
var experience = 0;
var music = false;

var smallMonsters = [];
var turrets = [];
var turretShooting = false;
var turretShotInt;
var splash = [];
var canvasPosx = 0;
var key = {w: false, a: false, s: false, d: false,
					 r: false, g: false, e: false, b: false,
					 shift: false, c: false};
var pause = true;
window.onfocus = function() {
	if (snowFlakesON == true) {
		snowFlakesInterval = setInterval(function(){ genSnowFlakes()}, 1000);
	}
}
window.onblur = function() {
  while (snowFlakes.length > 0) {snowFlakes.pop();}
  clearInterval(snowFlakesInterval);
}

document.addEventListener("mousemove", follow);
document.addEventListener("mousedown", down);
document.addEventListener("mouseup", up);
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);
var mouse = {x:0, y:0}
function down() {
	if (event.button == 0) {leftDown = true;}
	if (event.button == 2) {rightDown = true;}
  if (reloaded == true && pause == false && mouseMode == true && event.button == 0 && ammoCount > 0) {
		if (firstShot == true) {
		  genShots();
		  if (ammoCount > 0) {
			ammoCount--;
		  }
		  genShell(gun.x+gun.sizeX/2-groundMovement.x, gun.y, gun.rotation);
		  firstShot = false;
		}
		if (fireMode == true) {
		  shootTimer = setInterval(function() {
				if (ammoCount > 0) {
				  ammoCount--;
				}
				if (ammoCount > 0) {
				  genShots();
				  genShell(gun.x+gun.sizeX/2-groundMovement.x, gun.y, gun.rotation);
				}
	  	}, 100);
		}
	}
}
function up() {
	if (event.button == 2) {rightDown = false;}
  if (event.button == 0) {
		leftDown = false;
	clearInterval(shootTimer);
	firstShot = true;
	akShot.pause();
	akShot.currentTime = 0;
  }
}
function follow(event) {
	if (pause == false) {
		mouse.x = event.clientX-(window.innerWidth-canvas.width)/2;
		mouse.y = event.clientY-(window.innerHeight-canvas.height)/2;
	}
}
function aimFunction() {
  var dx = gun.x + gun.sizeX/2 - mouse.x;
  var dy = gun.y + gun.sizeY/2 - mouse.y;
  gun.rotation = Math.atan2(dy, dx);
  gunMag.rotation = gun.rotation;
  if (mouse.x > gun.x+gun.sizeX/2) {
	gun.image = akBodyTurned;
  }
  else {
	gun.image = akBody;
  }
}
function keyDown(event) {
  switch (event.code) {
	case "KeyW": key.w = true;
	break;
	case "KeyS": key.s = true;
	break;
	case "KeyA": key.a = true; break;
	case "KeyD": key.d = true; break;
	case "KeyR": key.r = true; break;
	case "KeyC": key.c = true;
	if (rDown == false) {
		rDown = true;
		mouseMode = !mouseMode;
	}
	break;
	case "KeyG": key.g = true; break;
	case "KeyB": key.b = true; break;
	case "ShiftLeft": key.shift = true; break;
	case "KeyE": key.e = true;
	if (expTypeLock == false) {
	  expTypeLock = true;
	  explosiveType = !explosiveType;
	}
	break;
  }
}
function keyUp(event) {
  switch (event.code) {
	case "KeyW": key.w = false; break;
	case "KeyS": key.s = false;
	if (player.standEnabled == true && player.jump == true) {
	player.crouch = false;
	playerCrouch();
	}
	break;
	case "KeyA": key.a = false; break;
	case "KeyD": key.d = false; break;
	case "KeyR": key.r = false;
	reloadCheck = true;
	break;
	case "KeyC": key.c = false;
	rDown = false;
	break;
	case "KeyG": key.g = false;
	granadeCooldown = false;
	break;
	case "ShiftLeft": key.shift = false; break;
	case "KeyB": key.b = false;
	fireMode = !fireMode;
	break;
	case "KeyE": key.e = false;
	expTypeLock = false;
	break;
  }

}

function charMovement() {
  player.prevX = player.x;
  player.prevY = player.y;
  var runBoost = 1;
  if (reloadCheck == true) {
	checkReload();
	reloadCheck = false;
  }
	if (mouseMode == false) {
		genBlock();
	}
  if (key.e == true) {}
	if (key.g == true) {
		if (explosiveType == true) {grenadePath();}
		else {grenadePath();}
	}
  if (key.g == false && granadeCooldown == false) {
		if (explosiveType == true) {genGranade();}
		else {genC4();}
  }
  if (key.shift == true) {runBoost = 2;}
  if (key.w == true) {
		if (player.jump == false) {
		player.jump = true;
		playerJump();
		}
  }
  if (key.s == true) {
		if (player.crouch == false && player.jump == false) {
		player.crouch = true;
		playerCrouch();
		}
  }
  if (key.a == true) {
		if (groundMovement.x >= 0) {player.velx -= 0.5*runBoost;}
		else {groundMovement.velx += 0.5*runBoost;}
  }
  if (key.d == true) {
		if (groundMovement.x >= 0) {player.velx += 0.5*runBoost;}
		else {groundMovement.velx -= 0.5*runBoost;}
  }

 if (player.velx < 0 || groundMovement.velx > 0) {
   var x = Math.floor((player.x + player.velx - groundMovement.velx - groundMovement.x-1) / 50)
	 % 1000;
  var y = Math.floor((player.y) / 50)
	 % 1000;
   var halfy = Math.floor((player.y + player.sizeY/2) / 50)
	 % 1000;
	 var bottomy = Math.floor((player.y + player.sizeY - 1) / 50)
	   % 1000;
   if (player.x <= 0) {player.x = 0; player.velx = 0;}
   if (x < 0 || bottomy == null || map[x][halfy] == null || map[x][y] == null ||
	  map[x][bottomy] == null) {}
   else if (map[x][halfy].walkable == false || map[x][y].walkable == false ||
	  map[x][bottomy].walkable == false) {
	 player.x = map[x][y].x + map[x][y].sizeX;
	 groundMovement.x = groundMovement.x;
	 groundMovement.velx = 0;
	 if (key.s == true) {
	   player.vely = 0;
	 }
	 if (groundMovement.x <= 0 && player.x >= 300) {
	   player.x = 300;
	 }
	 player.velx = 0;

   }
  }
  else if (player.velx > 0 || groundMovement.velx < 0) {
	var rightx = Math.floor((player.x + player.sizeX - groundMovement.velx + player.velx - groundMovement.x +1) / 50)
	  % 1000;
	  var y = Math.floor((player.y) / 50)
		 % 1000;
	   var halfy = Math.floor((player.y + player.sizeY/2) / 50)
		 % 1000;
		 var bottomy = Math.floor((player.y + player.sizeY - 1) / 50)
		   % 1000;
	 if (player.x + player.sizeX > canvas.width) {player.x = canvas.width - player.sizeX; player.velx = 0;}
	 if (x < 0 || map[rightx][halfy] == null || map[rightx][y] == null ||
		map[rightx][bottomy] == null) {}
	else if (map[rightx][halfy].walkable == false || map[rightx][y].walkable == false ||
	   map[rightx][bottomy].walkable == false) {
	  player.x = map[rightx][y].x - player.sizeX-1;
	  groundMovement.x = groundMovement.x;
	  groundMovement.velx = 0;
	  if (key.s == true) {
		player.vely = 0;
	  }
	  if (groundMovement.x <= 0 && player.x >= 300) {
		player.x = 300;
	  }
	  player.velx = 0;
	}
   }
   if (player.vely < 0 || groundMovement.vely > 0) {
	 var x = Math.floor((player.x - groundMovement.x + groundMovement.velx) / 50)
	   % 1000;
	 var rightx = Math.floor((player.x + player.sizeX - groundMovement.x) / 50)
	   % 1000;
	   var nexty = Math.floor((player.y+player.vely) / 50)
		 % 1000;
	if (x < 0 || map[x][nexty] == null || map[rightx][nexty] == null) {}
	else if (map[x][nexty].walkable == false || map[rightx][nexty].walkable == false) {
		player.vely = 0;
	   player.y = map[x][nexty].y + map[x][nexty].sizeY - player.vely;
	   //player.gravity = 0;
	 }
	}
	//else if (player.vely > 0 || groundMovement.vely < 0) {
	var x = Math.floor((player.x - groundMovement.x + groundMovement.velx) / 50)
	  % 1000;
	  var rightx = Math.floor((player.x + player.sizeX - groundMovement.x + groundMovement.velx) / 50)
		% 1000;
		var nextBottomy = Math.floor((player.y + player.sizeY + player.vely) / 50)
		  % 1000;
		if (player.y > canvas.height + player.sizeY) {
			player.hp = 0;
		}
	  if (x < 0 || map[rightx][nextBottomy] == null || map[x][nextBottomy] == null) {}
	  else if (map[rightx][nextBottomy].walkable == false || map[x][nextBottomy].walkable == false) {
		player.vely = 0;
		player.jump = false;
		player.y = map[x][nextBottomy].y - player.sizeY - player.vely;
		//player.gravity = 0;s
	  }
	  else {player.jump = true;}

	  if (player.crouch == true){
		var x = Math.floor((player.x - groundMovement.x + groundMovement.velx) / 50)
		  % 1000;
		var rightx = Math.floor((player.x + player.sizeX - groundMovement.x) / 50)
		  % 1000;
		  var nexty = Math.floor((player.y+player.vely-player.sizeY) / 50)
			% 1000;
			var bottomy = Math.floor((player.y+player.vely-player.sizeY) / 50)//dunno if this gonna work
			% 1000;
		if (map[x][nexty] == null || map[rightx][nexty] == null || map[rightx][bottomy] == null || map[x][bottomy] == null) {}
		else if (map[x][nexty].walkable == false || map[rightx][nexty].walkable == false || map[rightx][bottomy].walkable == false || map[x][bottomy].walkable == false) {
		  player.standEnabled = false;
		}
		else {
		  player.standEnabled = true;
		}
		if (key.s == false && player.standEnabled == true) {
		  player.crouch = false;
		  playerCrouch();
		}
		groundMovement.velx *= 0.8;
		player.velx *= 0.8;
	  }
	  else {
		player.crouch == false
		playerCrouch();
		groundMovement.velx *= 0.9;
		//groundMovement.vely *= 0.95;
		player.velx *= 0.9;
	  }




  if (player.velx > 0.01 && player.velx < -0.01) {player.x += player.velx;}
  if (player.vely > 0.01 && player.vely < -0.01) {player.y += player.vely;}


  if (groundMovement.x < 0) {
	if (-groundMovement.x >= mapTileWidth*50-1203 && player.x >= 300) {
	  player.velx += -groundMovement.velx;
	  groundMovement.velx = 0;
	  groundMovement.x = -mapTileWidth*50+1203
	  player.x += player.velx;
	}
	else {
	  groundMovement.velx += -player.velx;
	  player.velx = 0;
	  groundMovement.x += groundMovement.velx;
	  player.x = 300;
	}
  }
  else {
	if (groundMovement.x <= 0 && player.x >= 300) {
	  groundMovement.velx += -player.velx;
	  player.velx = 0;
	  groundMovement.x += groundMovement.velx;
	  player.x = 300;
	}
	else {
	  player.velx += -groundMovement.velx;
	  groundMovement.velx = 0;
	  groundMovement.x = 0;
	  player.x += player.velx;
	  }
  }
}

class Line {
  constructor(x, y, endX, endY) {
	this.x = x;
	this.y = y;
	this.endX = endX;
	this.endY = endY;
  }
}
function mouseAim() {
  if (mouse.x > gun.x+gun.sizeX/2) {var offsetY = 3;}
  else {var offsetY = -3;}
  var firstx = gun.prevX+gun.sizeX/2 + groundMovement.velx;
  var firsty = gun.prevY+gun.sizeY/2;
  var cos = Math.cos(gun.rotation);
  var sin = Math.sin(gun.rotation);

  var dx = firstx - mouse.x;
  var dy = firsty - mouse.y;
  var dist = 0.00001*Math.sqrt(dx*dx + dy*dy);
  var nx = dx/dist;
  var ny = dy/dist;

  firstx += -1*cos-offsetY*sin;
  firsty += -1*sin+offsetY*cos;

  c.beginPath();
  c.strokeStyle = "red";
  c.globalAlpha = 0.5;
  c.moveTo(firstx, firsty);
  var endx = firstx - nx;
  var endy = firsty - ny;

  c.lineTo(gun.hitX, gun.hitY);
  //c.stroke();
  c.closePath();

  c.beginPath();
  c.arc(gun.hitX, gun.hitY, 5, 0, Math.PI*2);
  //c.fill();
  c.closePath();
  c.strokeStyle = "black";
  c.globalAlpha = 1;

  var crossHairY = mouse.y -3;
  c.beginPath();
  c.lineWidth = 1;
  c.moveTo(mouse.x-10, crossHairY);
  c.lineTo(mouse.x-4, crossHairY);
  c.moveTo(mouse.x, crossHairY+10);
  c.lineTo(mouse.x, crossHairY+4);
  c.moveTo(mouse.x+10, crossHairY);
  c.lineTo(mouse.x+4, crossHairY);
  c.moveTo(mouse.x, crossHairY-10);
  c.lineTo(mouse.x, crossHairY-4);
  c.moveTo(mouse.x, crossHairY);
  c.arc(mouse.x, crossHairY, 1, 0, Math.PI *2);
  c.fill();
  c.stroke();
  c.closePath();
}

function drawGame() {
	drawBackground();
	drawTrees();
	drawSnow();
	drawPortal();
	if (pause == false){
		drawPlayer(player);
		charMovement();
	}
	legs();
	upperbody();
	drawArm2();
	drawMags();
	draw(gun);
	drawTurret();
	drawShot();
	drawShells();
	drawSparkle();
	drawArm();
	drawGranade();
	drawc4();
	drawItems();
	drawSplash();

	lastHit = false;
	var renderMax = 24 - Math.floor(groundMovement.x/50);
	var renderMin = 0 - Math.ceil(groundMovement.x/50);
	if (renderMin < 0) {renderMin = 0;}

	for (var x = renderMin; x < renderMax; x++) {
		for (var y = 0; y < 12; y++) {
			drawMap(map[x][y]);
		}
	}

	for (var i = 0; i < shots.length; i++) {
		lastDistance = 10000000;
		prevLastDistance = lastDistance;
		var shot = shots[i];
		playerShotDetection(shot, player);
		if (lastDistance < prevLastDistance) {prevLastDistance = lastDistance; hitTile = {block: false, hitYou: true};}
		for (var x = renderMin; x < renderMax; x++) {
			for (var y = 0; y < 12; y++) {
				shotTileCollision(shot, map[x][y]);
				if (lastDistance < prevLastDistance) {prevLastDistance = lastDistance; hitTile = {block: true, x: x, y: y};}
			}
		}
		for (var j = 0; j < smallMonsters.length; j++) {
			shotAntCollision(shot, smallMonsters[j]);
			if (lastDistance < prevLastDistance) {prevLastDistance = lastDistance; hitTile = {block: false, i: j};}
		}
		if (shots[i].x > canvas.width+1000 || shots[i].x < -1000 || shots[i].y > canvas.height) {
			shots.splice(i, 1);
		}

    else if (lastDistance < 10000000) {

		if (hitTile.block) {
			let x = hitTile.x;
			let y = hitTile.y;
			if (map[x][y].hp <= 0 && map[x][y].image == wood) {
			  genPieces(map[x][y].x, map[x][y].y, 25, woodPieces);
			  map[x][y].walkable = true;
				woodBreakSound.currentTime = 0;
				woodBreakSound.play();
			}
			else if (map[x][y].image == wood){
			  map[x][y].hp--;
			  genPieces(map[x][y].x+25, map[x][y].y+25, 3, woodPieces);
			}
			else if (map[x][y].walkable == false && map[x][y].image == metalImg) {
				genHit(gun.hitX, gun.hitY, -0.3,-0.3);
				metalShot.currentTime = 0;
				metalShot.play();
			}
			else if (map[x][y].walkable == false && map[x][y].image == dirtGround) {
				genSplash(gun.hitX, gun.hitY, "brown");
			}
			else if (map[x][y].walkable == false && map[x][y].image == stoneImg ||
							 map[x][y].walkable == false && map[x][y].image == caveGroundImg ||
						 	 map[x][y].walkable == false && map[x][y].image == caveStoneImg) {
				genSplash(gun.hitX, gun.hitY, "gray");
			}
			else if (map[x][y].walkable == false || map[x][y].walkable == null) {
				genSplash(gun.hitX, gun.hitY, "white");
			}
		}
		else if (hitTile.hitYou == true) {
			player.hp -= 0.001;
			genSplash(player.x+player.sizeX/2, player.y + player.sizeY/2, "red");
		}
		else {
			var ant = smallMonsters[hitTile.i];
			genSplash(ant.x+ant.sizeX/2, ant.y + ant.sizeY/2, "red");
			ant.hp -= 0.15;
			experience += 8;
		}

    	//hitShot(gun.hitX, gun.hitY);
    	shots.splice(i, 1);
    }
  	else{
      c.translate(shots[i].x+shots[i].sizeX/2, shots[i].y+shots[i].sizeY/2);
      c.rotate(shots[i].rotation);
      c.translate(-(shots[i].x+shots[i].sizeX/2), -(shots[i].y+shots[i].sizeY/2));
      c.drawImage(shots[i].img, shots[i].x-shots[i].sizeX/2, shots[i].y-shots[i].sizeY/2, shots[i].sizeX, shots[i].sizeY);
      c.resetTransform();
  	}
	}
	if (!lastHit) {
		gun.hitX = endAim.x;
		gun.hitY = endAim.y;
	}
	drawText();
	drawAnts();
	drawPieces(woodPieces, woodPieceImg);
	drawPieces(metalPieces, metalPieceImg);
	playerStats();
if (takingDamage == true) {takeDamage();}
	mouseAim();
}


function update() {
  requestAnimationFrame(update);
	c.clearRect(0, 0, canvas.width, canvas.height);
	if (music == true) {song.play();}
	if (pause == false){
		aimFunction();
	}
	drawGame();
}
