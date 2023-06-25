function spawnSmallMonster(x, y) {
  smallMonsters.push({x: x,
                y: y,
                sizeX: 50,
                sizeY: 50,
                velx: 0,
                vely: 0,
                velIncrease: -0.3,
                friction: 0.9,
                gravity: 0.982,
                jump: false,
                hp: 1,
                hpBarWidth: 80,
                legX: 0,
                legY: 0,
                legSwitch: true,
                lineWidth: 2})
}
function drawAnts() {
  for (var i = 0; i < smallMonsters.length; i++) {
    if (pause == false) {
      smallMonsters[i].velx += smallMonsters[i].velIncrease;
      smallMonsters[i].velx *= smallMonsters[i].friction;
      smallMonsters[i].x += groundMovement.velx;
      smallMonsters[i].x += smallMonsters[i].velx;
      smallMonsters[i].vely += smallMonsters[i].gravity;
      smallMonsters[i].y += smallMonsters[i].vely;
    }
    if (smallMonsters[i].vely > 0) {
      var x = Math.floor((smallMonsters[i].x - groundMovement.x + groundMovement.velx) / 50)
        % 1000;
        var rightx = Math.floor((smallMonsters[i].x + smallMonsters[i].sizeX - groundMovement.x + groundMovement.velx) / 50)
          % 1000;
          var nextBottomy = Math.floor((smallMonsters[i].y + smallMonsters[i].sizeY + smallMonsters[i].vely) / 50)
            % 1000;
        if (x < 0 || map[x][nextBottomy] == null || map[rightx][nextBottomy] == null) {}
        else if (map[rightx][nextBottomy] == null || map[x][nextBottomy] == null) {smallMonsters.splice(i,1);}
        else if (map[rightx][nextBottomy].walkable == false || map[x][nextBottomy].walkable == false) {
          smallMonsters[i].vely = 0;
          smallMonsters[i].y = map[x][nextBottomy].y - smallMonsters[i].sizeY - smallMonsters[i].vely;

        }
    }
      if (smallMonsters[i].vely < 0) {
        var x = Math.floor((smallMonsters[i].x - groundMovement.x + groundMovement.velx) / 50)
          % 1000;
        var rightx = Math.floor((smallMonsters[i].x + smallMonsters[i].sizeX - groundMovement.x) / 50)
          % 1000;
          var nexty = Math.floor((smallMonsters[i].y+smallMonsters[i].vely) / 50)
            % 1000;
        if (x < 0 || map[x][nexty] == null || map[rightx][nexty] == null) {}
        else if (map[x][nexty] == null || map[rightx][nexty] == null) {smallMonsters.splice(i,1);}
        else if (map[x][nexty].walkable == false || map[rightx][nexty].walkable == false) {
          smallMonsters[i].y = map[x][nexty].y + map[x][nexty].sizeY - smallMonsters[i].vely;
          smallMonsters[i].vely = 0;
        }
      }
      if (smallMonsters[i].velx < 0) {
        var x = Math.floor((smallMonsters[i].x + smallMonsters[i].velx - groundMovement.velx - groundMovement.x-1) / 50)
          % 1000;
       var y = Math.floor((smallMonsters[i].y) / 50)
          % 1000;
          var bottomy = Math.floor((smallMonsters[i].y + smallMonsters[i].sizeY - 1) / 50)
            % 1000;
        if (smallMonsters[i].x - groundMovement.x <= 0) {smallMonsters[i].velx = 0; smallMonsters[i].velIncrease = -smallMonsters[i].velIncrease;}
        else if (map[x][y] == null || map[x][bottomy] == null) {smallMonsters.splice(i,1);}
        else if (map[x][y].walkable == false || map[x][bottomy].walkable == false) {
          smallMonsters[i].x = map[x][y].x + map[x][y].sizeX + groundMovement.x;
          smallMonsters[i].velx = 0;
          smallMonsters[i].velIncrease = -smallMonsters[i].velIncrease;

        }
       }
       else if (smallMonsters[i].velx > 0) {
         var rightx = Math.floor((smallMonsters[i].x + smallMonsters[i].sizeX - groundMovement.velx + smallMonsters[i].velx - groundMovement.x +1) / 50)
           % 1000;
           var y = Math.floor((smallMonsters[i].y) / 50)
              % 1000;
              var bottomy = Math.floor((smallMonsters[i].y + smallMonsters[i].sizeY - 1) / 50)
                % 1000;
         if (smallMonsters[i].x + smallMonsters[i].sizeX - groundMovement.x >= -50 + mapTileWidth*50) {smallMonsters[i].velx = 0; smallMonsters[i].velIncrease = -smallMonsters[i].velIncrease;}
         else if (map[rightx][y] == null || map[rightx][bottomy] == null) {smallMonsters.splice(i,1);}
         else if (map[rightx][y].walkable == false || map[rightx][bottomy].walkable == false) {
           smallMonsters[i].x = map[rightx][y].x - smallMonsters[i].sizeX  + groundMovement.x;
           smallMonsters[i].velx = 0;
           smallMonsters[i].velIncrease = -smallMonsters[i].velIncrease;
         }
       }
       for (var a = 0; a < smallMonsters.length; a++) {
       if (smallMonsters[i].x < smallMonsters[a].x + smallMonsters[a].sizeX &&
           smallMonsters[i].x > smallMonsters[a].x &&
           smallMonsters[i].velx < 0 && i !== a ||
           smallMonsters[i].x > smallMonsters[a].x &&
           smallMonsters[i].x < smallMonsters[a].x + smallMonsters[a].sizeX &&
           smallMonsters[i].velx > 0 && i !== a) {
             smallMonsters[i].x = smallMonsters[a].x + smallMonsters[a].sizeX;
             smallMonsters[i].velx = -smallMonsters[i].velx;
             smallMonsters[a].velx = -smallMonsters[a].velx;
             smallMonsters[i].velIncrease = -smallMonsters[i].velIncrease;
             smallMonsters[a].velIncrease = -smallMonsters[a].velIncrease;
           }
         }
    if (smallMonsters[i].x < player.x + player.sizeX + 200 &&
        smallMonsters[i].x > player.x &&
        smallMonsters[i].velx < 0 ||
        smallMonsters[i].x > player.x - 200 &&
        smallMonsters[i].x < player.x + player.sizeX &&
        smallMonsters[i].velx > 0 ) {

          if (smallMonsters[i].jump == false) {
            if (smallMonsters[i].velx < 0) {
              smallMonsters[i].velx = -30;
            }
            else if (smallMonsters[i].velx > 0) {
              smallMonsters[i].velx = 30;
            }
            smallMonsters[i].vely = -15;
            smallMonsters[i].jump = true;
            const e = i;
            setTimeout(function() {
              if (smallMonsters[e] == null) {}
              else {
                smallMonsters[e].jump = false;
              }
            }, 2000);
          }
    }
    if ( smallMonsters[i].x < player.x + player.sizeX &&
         smallMonsters[i].x + smallMonsters[i].sizeX > player.x &&
         smallMonsters[i].y < player.y + player.sizeY &&
         smallMonsters[i].y + smallMonsters[i].sizeY > player.y) {
           genSplash(player.x+player.sizeX/2, player.y+player.sizeY/2, "red");
           damageAmount = 0.2;
           takingDamage = true;
    }


    if (smallMonsters[i].hp < 0.01) {
      genSplash(smallMonsters[i].x + smallMonsters[i].sizeX/2, smallMonsters[i].y + smallMonsters[i].sizeY/2, "red")
      smallMonsters.splice(i, 1);
    }
    else {

      c.beginPath();
      c.rect(smallMonsters[i].x + smallMonsters[i].sizeX/2 - smallMonsters[i].hpBarWidth/2, smallMonsters[i].y-20, smallMonsters[i].hpBarWidth, 3);
      c.stroke();
      c.closePath();

      c.beginPath();
      c.fillStyle = "red";
      c.rect(smallMonsters[i].x + smallMonsters[i].sizeX/2 - smallMonsters[i].hpBarWidth/2, smallMonsters[i].y-20, smallMonsters[i].hpBarWidth * smallMonsters[i].hp, 3);
      c.fill();
      c.closePath();
      c.fillStyle = "black";

      if (smallMonsters[i].vely == 0) {
        smallMonsters[i].legY = 0;
        if (smallMonsters[i].legX > 15) {
          if (smallMonsters[i].velx < 0) {smallMonsters[i].legSwitch = true;}
          else if (smallMonsters[i].velx > 0) {smallMonsters[i].legSwitch = false;}
        }
        else if (smallMonsters[i].legX < 5) {
          if (smallMonsters[i].velx < 0) {smallMonsters[i].legSwitch = false;}
          else if (smallMonsters[i].velx > 0) {smallMonsters[i].legSwitch = true;}
          }
          if (pause == false) {
            if (smallMonsters[i].legSwitch == true) {
              smallMonsters[i].legX += smallMonsters[i].velx;
            }
            else {
              smallMonsters[i].legX -= smallMonsters[i].velx;
            }
          }
        }
      c.beginPath();
      c.lineWidth = smallMonsters[i].lineWidth;
      c.moveTo(smallMonsters[i].x + smallMonsters[i].sizeX/2 + smallMonsters[i].legX, smallMonsters[i].y + smallMonsters[i].sizeY - smallMonsters[i].legY);
      c.lineTo(smallMonsters[i].x + smallMonsters[i].sizeX*0.7, smallMonsters[i].y + smallMonsters[i].sizeY * 0.8);
      c.moveTo(smallMonsters[i].x + smallMonsters[i].sizeX/2 - smallMonsters[i].legX, smallMonsters[i].y + smallMonsters[i].sizeY - smallMonsters[i].legY);
      c.lineTo(smallMonsters[i].x + smallMonsters[i].sizeX*0.3, smallMonsters[i].y + smallMonsters[i].sizeY * 0.8);
      c.stroke();
      c.closePath();

      if (smallMonsters[i].velx > 0) {}

      var coords = [ [smallMonsters[i].x + smallMonsters[i].sizeX/2,   smallMonsters[i].y + smallMonsters[i].sizeY/2-4, 21, 2, 1, 1, false, 0],
                     [(smallMonsters[i].velx > 0) ? smallMonsters[i].x + smallMonsters[i].sizeX/2+10 : smallMonsters[i].x + smallMonsters[i].sizeX/2-10,smallMonsters[i].y + 10, 3, 2, 1, 0, false, 0],
                     [(smallMonsters[i].velx > 0) ? smallMonsters[i].x + smallMonsters[i].sizeX - 4 : smallMonsters[i].x + 5, smallMonsters[i].y + 30,
                      10, (smallMonsters[i].velx > 0) ? 0.5 : 1.5, 0, 0, (smallMonsters[i].velx > 0) ? false : true, (smallMonsters[i].velx > 0) ? 135 : 0]];

      for (var g = 0; g < coords.length; g++){
          c.beginPath();
          if (coords[g][5] == 1){c.fillStyle = "white";}
          else {c.fillStyle = "black";}
          c.translate(coords[g][0], coords[g][1])
          c.rotate(coords[g][7]);
          c.arc(0, 0, coords[g][2], 0, Math.PI * coords[g][3], coords[g][6]);
          if (coords[g][4] == 1) {c.fill();}
          else {c.stroke();}
          if (coords[g][5] == 1) {c.stroke();}
          c.closePath();
          c.resetTransform();
      }
      c.lineWidth = 1;
      c.fillStyle = "black";

      var armX = (smallMonsters[i].velx > 0) ? 0.4 : 0.6;
      var elbowX = (smallMonsters[i].velx > 0) ? 0.2 : 0.8;
      var operator = (smallMonsters[i].velx > 0) ? 1 : -1;
      c.beginPath();
      c.lineWidth = smallMonsters[i].lineWidth;
      c.moveTo(smallMonsters[i].x + smallMonsters[i].sizeX*armX, smallMonsters[i].y + smallMonsters[i].sizeY * 0.4);
      c.lineTo(smallMonsters[i].x + smallMonsters[i].sizeX*elbowX + operator*smallMonsters[i].legX, smallMonsters[i].y + smallMonsters[i].sizeY*0.6 - smallMonsters[i].legY);
      c.lineTo(smallMonsters[i].x + smallMonsters[i].sizeX*armX + operator*smallMonsters[i].legX, smallMonsters[i].y + smallMonsters[i].sizeY * 0.7);
      c.stroke();
      c.closePath();
      c.lineWidth = 1;

    }
  }
}

function shotAntCollision(shot, ant){

	ant = {top: new Line(ant.x, ant.y, ant.x+ant.sizeX, ant.y),
    bottom: new Line(ant.x, ant.y+ant.sizeY, ant.x+ant.sizeX, ant.y+ant.sizeY),
    rightSide: new Line(ant.x+ant.sizeX, ant.y, ant.x+ant.sizeX, ant.y+ant.sizeY),
    leftSide: new Line(ant.x, ant.y, ant.x, ant.y+ant.sizeY)}


	lineDetection(shot, ant.top);
	lineDetection(shot, ant.bottom);
	lineDetection(shot, ant.rightSide);
	lineDetection(shot, ant.leftSide);
}

function genSplash(x, y, color) {
  for (var i = 0; i < 20; i++) {
    splash.push({x: x,
                y: y,
                velx: Math.random()*10-5,
                vely: Math.random()*10-5,
                size: Math.random()*5,
                color: color
                })
  }
}
function drawSplash() {
  for (var i = 0; i < splash.length; i++) {
    if (pause == false) {
      splash[i].x += splash[i].velx + groundMovement.velx;
      splash[i].y += splash[i].vely;
      splash[i].size-= 0.5;
    }
    if (splash[i].size < 1) {
      splash.splice(i, 1);
    }
    else {
      c.beginPath();
      c.fillStyle = splash[i].color;
      c.arc(splash[i].x, splash[i].y, splash[i].size, 0, 2*Math.PI);
      c.fill();
      c.closePath();
      c.fillStyle = "black";
    }
  }
}

class Turret {
  constructor(x, y, aimx, aimy, rotation, shooting, turretShotInt) {
    this.x = x;
    this.y = y;
    this.aimx = aimx;
    this.aimy = aimy;
    this.rotation = rotation;
    this.shooting = shooting;
    this.turretShotInt = turretShotInt;
  }
}
function drawTurret() {
  for (var i = 0; i < turrets.length; i++) {
    var obj = turrets[i];
    if (player.x < obj.x + groundMovement.x + 500 &&
        player.x > obj.x + groundMovement.x - 500 &&
        player.y < obj.y + 500 &&
        player.y > obj.y - 500 && pause == false) {
          var dx = player.x + player.sizeX/2 - groundMovement.x - obj.x - 15;
          var dy = player.y + player.sizeY/2 - obj.y - 15;
          obj.rotation = Math.atan2(dy, dx);
          turretShot(obj);
    }
    else {
      clearInterval(obj.turretShotInt);
      obj.turretShooting = false;
    }
    c.beginPath();
    c.rect(obj.x + groundMovement.x, obj.y, 15, 15);
    c.fill();
    c.closePath();
    c.fillStyle = "black";
    c.beginPath();
    c.translate(obj.x + 7.5 + groundMovement.x, obj.y + 7.5)
    c.rotate(obj.rotation);
    c.rect(0, -3.75, 30, 5);
    c.fill();
    c.closePath();
    c.resetTransform();
    c.fillStyle = "black";
  }
}
function turretShot(obj) {
  if (obj.turretShooting == false) {
    obj.turretShooting = true;
    obj.turretShotInt = setInterval(function() {
      akShotSingle.currentTime = 0;
      akShotSingle.play();
      var cos = Math.cos(gun.rotation);
      var sin = Math.sin(gun.rotation);
     var dist = 0.5*50;
     var offsetX = -dist*Math.cos(gun.rotation);
     var offsetY = -dist*Math.sin(gun.rotation);
     genShell(obj.x+15, obj.y+15, obj.rotation);
      shots.push({
        color: "black",
        x: obj.x + groundMovement.x+5,
        y: obj.y +5,
        prevX: obj.x + groundMovement.velx,
        prevY: obj.x,
        sizeX: 10,
        sizeY: 3,
        velx: Math.cos(obj.rotation)*10,
        vely: Math.sin(obj.rotation)*10,
        rotation: obj.rotation,
        hitX: gun.hitX,
        hitY: gun.hitY,
        img: turBulletImg,
        shooter: "turret"
      });
    }, 400);
  }
}
