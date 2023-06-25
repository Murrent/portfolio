function drawPlayer(obj) {
  if (player.jump == true) {
    obj.vely += obj.gravity;
  }

  obj.x += obj.velx;
  obj.y += obj.vely;
}
function playerJump() {

    if (player.vely < 1 && player.vely > -1 && player.crouch == false) {
      player.vely = -20;
      leg.x = 35;
      leg.y = 20;
    }
}
function playerCrouch() {
  if (player.crouch == true && player.jump == false && player.sizeY == 100) {
    player.sizeY = 50;
    player.y = player.y + player.sizeY;
    armYpos = 0.6;
  }
  else if (player.crouch == false && player.standEnabled == true && player.jump == false && player.sizeY == 50) {
      player.sizeY = 100;
      player.y = player.y - player.sizeY/2;
      armYpos = 0.45;
    }
}

function genBlock() {
  var x = Math.floor((mouse.x - groundMovement.x) / 50);
  var y = Math.floor((mouse.y) / 50);
  var px = Math.floor((player.x + player.sizeX/2 - groundMovement.x) / 50);
  var py = Math.floor((player.y + player.sizeY/2) / 50);
  if (x + 4 > px &&
      x - 4 < px &&
      y + 5 > py &&
      y - 4 < py) {
        c.fillStyle = "darkgreen";
        var range = true;
      }
      else {
        c.fillStyle = "red";
        var range = false;
      }
  c.beginPath();
  c.globalAlpha = 0.4;
  c.rect(x*50+groundMovement.x, y*50, 50, 50);
  c.stroke();
  c.fill();
  c.closePath();
  c.strokeStyle = "black";
  c.globalAlpha = 1;
  if (x < 0 || y < 0 || map[x][y] == null) {}
    else if (map[x][y].walkable == true && leftDown == true && blockCount > 0 && range == true) {
      map[x][y] = new tile(x, y, 50, 50, false, 0, stoneImg);
      blockCount--;
    }
    else if (map[x][y].walkable == false && rightDown == true && map[x][y].image == stoneImg && range == true) {
      map[x][y].walkable = true;
      blockCount++;
    }
}
function drawArm() {
  c.beginPath();
  c.lineWidth = player.lineWidth;
  c.translate(gun.prevX + gun.sizeX/2 + groundMovement.velx , gun.prevY + gun.sizeY*0.8);
  c.rotate(gun.rotation);
  c.lineTo(10, 0);
  c.lineTo(-15,0);
  c.stroke();
  c.closePath();
  c.resetTransform();

  c.beginPath();
  c.moveTo(player.x + player.sizeX/2, player.y + player.sizeY*armYpos);
  c.translate(gun.prevX + gun.sizeX/2 + groundMovement.velx , gun.prevY + gun.sizeY*0.8);
  c.rotate(gun.rotation);
  c.lineTo(10, 0);
  c.stroke();
  c.closePath();
  c.resetTransform();
  c.lineWidth = 1;
}
function drawArm2() {
  if (pause == false){
    if (mouse.x > gun.x+gun.sizeX/2) {
      var y = 5;
    }
    else {
      var y = -5;
    }
  }
  else {
    var y = 5;
  }
  c.beginPath();
  c.lineWidth = player.lineWidth;
  c.translate(gun.x + gun.sizeX/2 + groundMovement.velx , gun.y + gun.sizeY/2);
  c.rotate(gun.rotation);
  c.moveTo(-20, 2 * -y);
  c.lineTo(-40,y);
  c.stroke();
  c.closePath();
  c.resetTransform();

  c.beginPath();
  c.moveTo(player.x + player.sizeX/2, player.y + player.sizeY*armYpos);
  c.translate(gun.x + gun.sizeX/2 + groundMovement.velx , gun.y + gun.sizeY/2);
  c.rotate(gun.rotation);
  c.lineTo(-20, 2 * -y);
  c.stroke();
  c.closePath();
  c.resetTransform();
  c.lineWidth = 1;
}
function legs() {
  function walkSound() {
    var selected = Math.round(Math.random()*2);
    switch (selected) {
      case 0:
        wood1.currentTime = 0;
        wood1.play();
        break;
        case 1:
          wood2.currentTime = 0;
          wood2.play();
          break;
          case 2:
            wood3.currentTime = 0;
            wood3.play();
            break;
    }
  }
  if (player.jump == false && pause == false) {
    leg.x += player.velx + groundMovement.velx;
    leg.y = 0;
    if (leg.x > 25) {
      leg.x -= 50;
      walkSound();
    }
    if (leg.x < -25) {
      leg.x += 50;
      walkSound();
      }
    }
  c.beginPath();
  c.lineWidth = player.lineWidth;
  c.moveTo(player.x + player.sizeX/2 + leg.x, player.y + player.sizeY - leg.y);
  c.lineTo(player.x + player.sizeX*0.6 + leg.x/2, player.y + player.sizeY*0.8 - leg.y);
  c.lineTo(player.x + player.sizeX/2, player.y + player.sizeY * 0.6);
  c.lineTo(player.x + player.sizeX*0.7 - leg.x/2, player.y + player.sizeY*0.8 - leg.y);
  c.lineTo(player.x + player.sizeX/2 - leg.x, player.y + player.sizeY - leg.y);
  c.stroke();
  c.closePath();
  c.lineWidth = 1;

}
function upperbody() {
  c.beginPath();
  c.lineWidth = player.lineWidth;
  if (player.crouch == true) {
    c.moveTo(player.x + player.sizeX/2, player.y + player.sizeY * 0.6);
  }
  else {
    c.moveTo(player.x + player.sizeX/2, player.y + 30);
  }
  c.lineTo(player.x + player.sizeX/2, player.y + player.sizeY * 0.6);
  c.stroke();
  c.closePath();
  var coords = [ [player.x + player.sizeX/2,  player.y + 15, 15, 2, 1, 1, false],
                 [player.x + player.sizeX/2-5,player.y + 10, 3,  2, 1, 0, false],
                 [player.x + player.sizeX/2+5,player.y + 10, 3,  2, 1, 0, false],
                 [player.x + player.sizeX/2,  (takingDamage == true || player.hp == 0) ? player.y + 25 : player.y + 17,
                    8,  1, 0, 0, (takingDamage == true  || player.hp == 0) ? true : false] ];

  for(var i = 0; i < coords.length; i++){
      c.beginPath();
      if (coords[i][5] == 1){c.fillStyle = "white";}
      else {c.fillStyle = "black";}
      c.arc(coords[i][0], coords[i][1], coords[i][2], 0, Math.PI * coords[i][3], coords[i][6]);
      if (coords[i][4] == 1) {c.fill();}
      else {c.stroke();}
      if (coords[i][5] == 1) {c.stroke();}
  }
  c.lineWidth = 1;
  c.fillStyle = "black";
}

function playerStats() {
  const statsCanvas = document.getElementById('statsCanvas');
  const cStats = statsCanvas.getContext('2d');
  statsCanvas.width = 1200;
  statsCanvas.height = 50;
  if (player.hp <= 0 && pause == false) {
    music = false;
    song.pause();
    song.currentTime = 0;
    player.hp = 0;
    pause = true;
    setTimeout(function() {
      music = true;
      player.hp = 1;
      mapChoice = mapChoice;
      player.x = 300;
      player.y = 300;
      player.velx = 0;
      player.vely = 0;
      experience -= 100;
      groundMovement.x = 0;
      newMap();
      magCount = 3;
      c4Count = 0;
      granadeCount = 2;
      ammoCount = 0;
      pause = false;
    }, 5000)
  }
  if (player.hp <= 0) {
    c.fillStyle = "red";
    c.font = "50px Tahoma";
    c.lineWidth = 2;
    c.fillText("YOU DIED!", 460, 300);
    c.strokeText("YOU DIED!", 460, 300);
    c.lineWidth = 1;
    c.fillStyle = "black";
    player.y -= 3;
  }

  c.beginPath();
  c.fillStyle = "black"
  c.rect(10,10,300,30);
  c.fill();
  c.stroke();
  c.closePath();

  c.beginPath();
  c.fillStyle = "red";
  c.rect(10,10,300*player.hp,30);
  c.fill();
  c.closePath();
  c.fillStyle = "black";

  c.beginPath();
  c.fillStyle = "white";
  c.font = "25px Tahoma";
  c.fillText(Math.ceil(1000*player.hp) + " HP",15,35);
  c.closePath();

  c.beginPath();
  c.fillStyle = "lightblue";
  c.rect(statsCanvas.width-320,20,300,5);
  c.fill();
  c.stroke();
  c.fillStyle = "black";
  c.closePath();
  c.drawImage(faceImg, statsCanvas.width-330 + (((-groundMovement.x+player.x)/50) / mapTileWidth)*300, 8, 30, 30);

  cStats.beginPath();
  cStats.fillStyle = "black";
  cStats.font = "20px Tahoma";
  cStats.fillText("Bullets: " + ammoCount,120,statsCanvas.height-18);
  cStats.closePath();

  cStats.beginPath();
  cStats.rect(215,statsCanvas.height-45,155,40);
  cStats.stroke();
  cStats.closePath();
  var bulletX = 220;
  for (var i = 0; i < ammoCount; i++) {
    cStats.beginPath();
    cStats.strokeStyle = "green";
    cStats.lineWidth = 4;
    cStats.moveTo(bulletX, statsCanvas.height-43);
    cStats.lineTo(bulletX, statsCanvas.height-7);
    cStats.stroke();
    cStats.closePath();
    bulletX += 5;
    cStats.strokeStyle = "black";
    cStats.lineWidth = 1;
  }
  cStats.beginPath();
  cStats.fillStyle = "black";
  cStats.font = "18px Tahoma";
  cStats.fillText(c4Count + "x C4",35,statsCanvas.height-32);
  cStats.closePath();

  cStats.translate(6,statsCanvas.height-48);
  cStats.rotate(90/180*Math.PI);
  cStats.drawImage(c4Img, 5, -26,10,30);
  cStats.stroke();
  cStats.resetTransform();

  cStats.fillStyle = "black";
  cStats.font = "18px Tahoma";
  cStats.fillText(granadeCount + "x Grenade",20,statsCanvas.height-6);

  cStats.arc(10,statsCanvas.height-12,8,0,2*Math.PI);
  cStats.fill();

  cStats.strokeStyle = "brown";
  cStats.arc(10,statsCanvas.height-12, 6, 0, Math.PI*2);
  cStats.stroke();
  cStats.strokeStyle = "black";

  if (explosiveType == true) {
    cStats.rect(1,statsCanvas.height-22,115,20);
  }
  else {
    cStats.rect(1,statsCanvas.height-48,115,20);
  }
  cStats.stroke();
  if (fireMode == true) {
    cStats.fillText("Fire mode: Full Auto",380,statsCanvas.height-20);
  }
  else {
    cStats.fillText("Fire mode: Single",380,statsCanvas.height-20);
  }
  cStats.stroke();

  cStats.drawImage(ak47Mag, 570, 10,24,30);
  cStats.font = "18px Tahoma";
  cStats.fillText(magCount + "x Mag",600,statsCanvas.height-20);

  cStats.font = "18px Tahoma";
  cStats.fillText("EXP: " + experience,700,statsCanvas.height-20);

  cStats.drawImage(stoneImg, 800, 10, 30, 30);
  cStats.font = "18px Tahoma";
  cStats.fillText("x" + blockCount,840,statsCanvas.height-20);

  cStats.fillText((mouseMode) ? "Buildmode OFF" : "Buildmode ON",880,statsCanvas.height-20);
}
function takeDamage() {

  if (bloodAlphaSwitch == true) {
    bloodAlpha-=0.01;
    if (bloodAlpha < 0.1) {bloodAlphaSwitch = false;}
  }
  else {
    bloodAlpha+=0.01;
    if (bloodAlpha > 0.8) {bloodAlphaSwitch = true;}
  }
  c.beginPath();
  c.globalAlpha = bloodAlpha;
  c.strokeStyle = "red";
  c.lineWidth = 1000;
  c.drawImage(eyeBlood, 0, 0, canvas.width, canvas.height);
  c.stroke();
  c.closePath();
  c.globalAlpha = 1;
  c.strokeStyle = "black";
  c.lineWidth = 1;
  if (bloodON == false) {
    bloodON = true;
    player.hp -= damageAmount;
    setTimeout(function() {
      bloodON = false;
      takingDamage = false;
      bloodAlpha = 0.8;
    }, 1000)
  }
}

function playerShotDetection(shot, obj) {
  obj = {top: new Line(obj.x, obj.y, obj.x+obj.sizeX, obj.y),
  bottom: new Line(obj.x, obj.y+obj.sizeY, obj.x+obj.sizeX, obj.y+obj.sizeY),
  rightSide: new Line(obj.x+obj.sizeX, obj.y, obj.x+obj.sizeX, obj.y+obj.sizeY),
  leftSide: new Line(obj.x, obj.y, obj.x, obj.y+obj.sizeY)}
  lineDetection(shot, obj.top);
  lineDetection(shot, obj.bottom);
  lineDetection(shot, obj.rightSide);
  lineDetection(shot, obj.leftSide);
}
