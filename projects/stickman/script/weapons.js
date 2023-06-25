function genShots() {
  akShotSingle.currentTime = 0;
  akShotSingle.play();

  var cos = Math.cos(gun.rotation);
  var sin = Math.sin(gun.rotation);
  gun.velx = cos*10;
  gun.vely = sin*10;
  flashON = true;
 var dist = 0.5*gun.sizeX;
 var offsetX = -dist*Math.cos(gun.rotation);
 var offsetY = -dist*Math.sin(gun.rotation);

  shots.push({
    color: "black",
    x: gun.x + gun.sizeX/2 + offsetX,
    y: gun.y + gun.sizeY/2 + offsetY - 8,
    prevX: gun.prevX + groundMovement.velx + gun.sizeX/2,
    prevY: gun.prevY + gun.sizeY/2,
    sizeX: 10,
    sizeY: 2,
    velx: -Math.cos(gun.rotation)*30+Math.random()*1.2-0.6,
    vely: -Math.sin(gun.rotation)*30+Math.random()*1.2-0.6,
    rotation: gun.rotation,
    hitX: gun.hitX,
    hitY: gun.hitY,
    img: bullet,
    shooter: "player"
  });
}
function drawShot() {
  if (flashON == true) {
    var cos = Math.cos(gun.rotation);
    var sin = Math.sin(gun.rotation);
    var flash = {x: -60*cos+gun.prevX+gun.sizeX/2,y: -60*sin+gun.prevY+gun.sizeY/2-3}
    c.beginPath();
    c.fillStyle = "yellow";
    c.arc(flash.x, flash.y, 3, 0, Math.PI*2);
    c.moveTo(flash.x+0*-cos-2.5*sin, flash.y+0*-sin+2.5*cos);
    c.lineTo(flash.x+10*-cos-0*sin, flash.y+10*-sin+0*cos);
    c.lineTo(flash.x+0*-cos+2.5*sin, flash.y+0*-sin-2.5*cos);
    c.fill();
    c.closePath();
    c.fillStyle = "black";
    flashON = false;
  }

for (var i = 0; i < shots.length; i++) {
  if (pause == false) {
    shots[i].prevX = shots[i].x;
    shots[i].prevY = shots[i].y;
    shots[i].x += shots[i].velx + groundMovement.velx;
    shots[i].y += shots[i].vely;
    shots[i].vely += 0.01;
  }
  }
}
function hitShot(xhit, yhit) {
  var offsetY = -1;
  var offsetX = -5;
  if (xhit >= gun.x+gun.sizeX/2) {offsetX = 5;}
  if (yhit >= gun.y+gun.sizeY/2) {offsetY = 1;}
  var x = Math.floor((xhit + groundMovement.velx - groundMovement.x+offsetX) / 50)
  var y = Math.floor((yhit - groundMovement.y+offsetY) / 50)

  if (y < 0 || y > canvas.height || x < 0 || x > canvas.width) {}
  else {
    if (x == null || y == null || map[x][y] == null) {}
    else if (map[x][y].walkable == false && map[x][y].image == wood) {
      if (map[x][y].hp <= 0) {
        genPieces(map[x][y].x, map[x][y].y, 25, woodPieces);
        map[x][y].walkable = true;
      }
      else {
        map[x][y].hp--;
        genPieces(map[x][y].x+25, map[x][y].y+25, 3, woodPieces);
      }

    }
    else if (map[x][y].walkable == false && map[x][y].image == metalImg) {
      genHit(xhit, yhit, -0.3,-0.3);
    }
    else if (map[x][y].walkable == false && map[x][y].image == dirtGround) {
      genSplash(xhit, yhit, "brown")
    }
    else if (map[x][y].walkable == false || map[x][y].walkable == null) {
      genSplash(xhit, yhit, "white")
    }
    for (var i = 0; i < smallMonsters.length; i++) {
      if ( smallMonsters[i].x < xhit + offsetX &&
           smallMonsters[i].x + smallMonsters[i].sizeX > xhit + offsetX &&
           smallMonsters[i].y < yhit + offsetY &&
           smallMonsters[i].y + smallMonsters[i].sizeY > yhit + offsetY) {
             genSplash(smallMonsters[i].x+smallMonsters[i].sizeX/2, smallMonsters[i].y+smallMonsters[i].sizeY/2, "red")
             smallMonsters[i].hp -= 0.2;
             experience += 8;
         }
    }
  }
}

class c4 {
  constructor(x, y, sizeX, sizeY, velx, vely, gravity, rotation, rotationVel, stuck, img) {
    this.x = x;
    this.y = y;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.velx = velx;
    this.vely = vely;
    this.gravity = gravity;
    this.rotation = rotation;
    this.rotationVel = rotationVel;
    this.stuck = stuck;
    this.img = img;
  }
}
function genC4() {
  if (c4Count > 0) {
      throwItem.currentTime = 0;
      throwItem.play();
      granadeCooldown = true;
      c4Count--;
      c4s.push(new c4(player.x + player.sizeX/2 - groundMovement.x,
                                player.y + player.sizeY/4,
                                10,
                                30,
                                -Math.cos(gun.rotation + Math.random()*0.02-0.01)*40,
                                -Math.sin(gun.rotation + Math.random()*0.02-0.01)*40,
                                0.99,
                                0,
                                10,
                                false,
                                c4Img));
      setTimeout(function() {
        genExplosion(c4s[0].x+groundMovement.x, c4s[0].y)
        explosionSound.currentTime = 0;
        explosionSound.play();
        for (var i = 0; i < smallMonsters.length; i++) {
          if (c4s[0].x+groundMovement.x+200 > smallMonsters[i].x + smallMonsters[i].sizeX/2 &&
              c4s[0].x+groundMovement.x-200 < smallMonsters[i].x + smallMonsters[i].sizeX/2 &&
              c4s[0].y+200 > smallMonsters[i].y + smallMonsters[i].sizeY/2 &&
              c4s[0].y-200 < smallMonsters[i].y + smallMonsters[i].sizeY/2) {
                smallMonsters[i].hp -= 0.8;
                genSplash(smallMonsters[i].x + smallMonsters[i].sizeX/2, smallMonsters[i].y + smallMonsters[i].sizeY/2, "red");
          }
        }
        if (c4s[0].x+groundMovement.x+200 > player.x + player.sizeX/2 &&
            c4s[0].x+groundMovement.x-200 < player.x + player.sizeX/2 &&
            c4s[0].y+200 > player.y + player.sizeY/2 &&
            c4s[0].y-200 < player.y + player.sizeY/2) {
              var dx = c4s[0].x - (player.x+player.sizeX/2-groundMovement.x);
              var dy = c4s[0].y - (player.y+player.sizeY/2);
              if (dx < 5 && dx >= 0) {dx = 5;}
              else if (dx > -5 && dx < 0) {dx = -5;}
              if (dy < 5 && dy >= 0) {dy = 5;}
              else if (dy > -5 && dy < 0) {dy = -5;}
              groundMovement.velx += 200/dx;
              player.vely -= 500/dy;
              player.hp -= 0.4;
              genSplash(player.x + player.sizeX/2, player.y + player.sizeY/2, "red");
              takingDamage = true;
        }
        var xleft2 = Math.floor((c4s[0].x - 100) / 50)
          % 1000;
          var xleft = Math.floor((c4s[0].x - 50) / 50)
            % 1000;
            var xmid = Math.floor((c4s[0].x) / 50)
              % 1000;
              var xright = Math.floor((c4s[0].x + 50) / 50)
                % 1000;
                var xright2 = Math.floor((c4s[0].x + 100) / 50)
                  % 1000;
                  var ytop2 = Math.floor((c4s[0].y - 100) / 50)
                    % 1000;
                    var ytop = Math.floor((c4s[0].y - 50) / 50)
                      % 1000;
                      var ymid = Math.floor((c4s[0].y) / 50)
                        % 1000;
                        var ybottom = Math.floor((c4s[0].y + 50) / 50)
                          % 1000;
                          var ybottom2 = Math.floor((c4s[0].y + 100) / 50)
                            % 1000;
                    function c4Area(x, y, area) {
                      if (x < 0 || map[x][y] == null) {}
                       else if (map[x][y].walkable == false && map[x][y].image == wood) {
                        genPieces(map[x][y].x, map[x][y].y, 25, woodPieces);
                        map[x][y].walkable = true;
                        woodBreakSound.currentTime = 0;
                				woodBreakSound.play();
                      }
                      else if (map[x][y].walkable == false && map[x][y].image == metalImg && area == true) {
                        genPieces(map[x][y].x, map[x][y].y, 25, metalPieces);
                        map[x][y].walkable = true;
                        metalBreakSound.currentTime = 0;
                        metalBreakSound.play();
                      }
                    }

                    c4Area(xleft2,ytop,false);
                    c4Area(xleft2,ymid,true); //1st section
                    c4Area(xleft2,ybottom,false);


                    c4Area(xleft,ytop2,false);
                    c4Area(xleft,ytop,true);
                    c4Area(xleft,ymid,true); //2nd section
                    c4Area(xleft,ybottom,true);
                    c4Area(xleft,ybottom2,false);

                    c4Area(xmid,ytop2,true);
                    c4Area(xmid,ytop,true);
                    c4Area(xmid,ymid,true); //3rd section
                    c4Area(xmid,ybottom,true);
                    c4Area(xmid,ybottom2,true);

                    c4Area(xright,ytop2,false);
                    c4Area(xright,ytop,true);
                    c4Area(xright,ymid,true); //4th section
                    c4Area(xright,ybottom,true);
                    c4Area(xright,ybottom2,false);

                    c4Area(xright2,ytop,false);
                    c4Area(xright2,ymid,true); //5th section
                    c4Area(xright2,ybottom,false);
        c4s.shift();
      }, 3000);

  }
}
function drawc4() {
  for (var i = 0; i < c4s.length; i++) {

    if (c4s[i].velx < 0) {
      var x = Math.floor((c4s[i].x + c4s[i].velx-1) / 50)
        % 1000;
     var y = Math.floor((c4s[i].y + c4s[i].sizeY/2) / 50)
        % 1000;
      if (x < 0 || map[x][y] == null) {}
      else if (map[x][y].walkable == false) {
           c4s[i].x = map[x][y].x + map[x][y].sizeX;
           c4s[i].rotation = 0;
           c4s[i].vely = 0;
           c4s[i].velx = 0;
           c4s[i].stuck = true;
      }
     }
     else if (c4s[i].velx > 0) {
       var rightx = Math.floor((c4s[i].x + c4s[i].sizeX + c4s[i].velx +1) / 50)
         % 1000;
         var y = Math.floor((c4s[i].y + c4s[i].sizeY/2) / 50)
            % 1000;
       if (rightx < 0 || map[rightx][y] == null) {}
       else if (map[rightx][y].walkable == false) {
            c4s[i].x = map[rightx][y].x - c4s[i].sizeX;
            c4s[i].rotation = 0;
            c4s[i].vely = 0;
            c4s[i].velx = 0;
            c4s[i].stuck = true;
       }
      }
      if (c4s[i].vely < 0) {
        var x = Math.floor((c4s[i].x + c4s[i].sizeX/2) / 50)
          % 1000;
          var nexty = Math.floor((c4s[i].y + c4s[i].vely) / 50)
            % 1000;
        if (x < 0 || map[x][nexty] == null) {}
        else if (map[x][nexty].walkable == false) {
          c4s[i].y = map[x][nexty].y + map[x][nexty].sizeY - c4s[i].sizeX;
          c4s[i].rotation = 90;
          c4s[i].vely = 0;
          c4s[i].velx = 0;
          c4s[i].stuck = true;
        }
       }
       else if (c4s[i].vely > 0) {
       var x = Math.floor((c4s[i].x + c4s[i].sizeX/2) / 50)
         % 1000;
           var nextBottomy = Math.floor((c4s[i].y + c4s[i].sizeY + c4s[i].vely) / 50)
             % 1000;
         if (x < 0 || map[x][nextBottomy] == null) {}
         else if (map[x][nextBottomy].walkable == false) {
           c4s[i].y = map[x][nextBottomy].y - c4s[i].sizeX*2;
           c4s[i].rotation = 90;
           c4s[i].vely = 0;
           c4s[i].velx = 0;
           c4s[i].stuck = true;
         }
       }
         if (c4s[i].stuck == false) {
           c4s[i].vely += c4s[i].gravity;
           c4s[i].vely *= c4s[i].gravity;
           c4s[i].y += c4s[i].vely;
           c4s[i].x += c4s[i].velx;
           c4s[i].rotation += c4s[i].rotationVel;
         }
    c.beginPath();
    c.translate(c4s[i].x + c4s[i].sizeX/2 + groundMovement.x, c4s[i].y + c4s[i].sizeY/2);
    c.rotate(c4s[i].rotation * Math.PI / 180);
    c.drawImage(c4s[i].img, -c4s[i].sizeX/2, -c4s[i].sizeY/2, c4s[i].sizeX, c4s[i].sizeY);
    c.stroke();
    c.resetTransform();
    c.closePath();
  }
}

class granade {
  constructor(x, y, size, velx, vely, velIncrease, gravity) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.velx = velx;
    this.vely = vely;
    this.velIncrease = velIncrease;
    this.gravity = gravity;
  }
}
function genGranade() {
  if (granadeCount > 0) {
      throwItem.currentTime = 0;
      throwItem.play();
      granadeCooldown = true;
      granadeCount--;
      granades.push(new granade(player.x + player.sizeX/2 - groundMovement.x,
                                player.y + player.sizeY/4,
                                10,
                                -Math.cos(gun.rotation)*40,
                                -Math.sin(gun.rotation)*40,
                                0,
                                0.99));
      setTimeout(function() {
        genExplosion(granades[0].x+groundMovement.x, granades[0].y)
        explosionSound.currentTime = 0;
        explosionSound.play();
        for (var i = 0; i < smallMonsters.length; i++) {
          if (granades[0].x+groundMovement.x+200 > smallMonsters[i].x + smallMonsters[i].sizeX/2 &&
              granades[0].x+groundMovement.x-200 < smallMonsters[i].x + smallMonsters[i].sizeX/2 &&
              granades[0].y+200 > smallMonsters[i].y + smallMonsters[i].sizeY/2 &&
              granades[0].y-200 < smallMonsters[i].y + smallMonsters[i].sizeY/2) {
                smallMonsters[i].hp -= 0.5;
          }
        }
        if (granades[0].x+groundMovement.x+200 > player.x + player.sizeX/2 &&
            granades[0].x+groundMovement.x-200 < player.x + player.sizeX/2 &&
            granades[0].y+200 > player.y + player.sizeY/2 &&
            granades[0].y-200 < player.y + player.sizeY/2) {
              var dx = granades[0].x - (player.x+player.sizeX/2-groundMovement.x);
              var dy = granades[0].y - (player.y+player.sizeY/2);
              groundMovement.velx += dx/5;
              player.vely -= dy/3;
              player.hp -= 0.3;
              takingDamage = true;
        }
        var xleft = Math.floor((granades[0].x - 50) / 50)
          % 1000;
          var xmid = Math.floor((granades[0].x) / 50)
            % 1000;
            var xright = Math.floor((granades[0].x + 50) / 50)
              % 1000;
              var ytop = Math.floor((granades[0].y - 50) / 50)
                % 1000;
                var ymid = Math.floor((granades[0].y) / 50)
                  % 1000;
                  var ybottom = Math.floor((granades[0].y + 50) / 50)
                    % 1000;
                    function granadeArea(x, y) {
                      if (x < 0 || map[x][y] == null) {}
                      else {
                        if (map[x][y].walkable == false && map[x][y].image == wood) {
                          genPieces(map[x][y].x, map[x][y].y, 25, woodPieces);
                          map[x][y].walkable = true;
                          woodBreakSound.currentTime = 0;
                  				woodBreakSound.play();
                        }
                        else if (map[x][y].walkable == false && map[x][y].image == metalImg) {
                          genPieces(map[x][y].x, map[x][y].y, 25, metalPieces);
                          map[x][y].walkable = true;
                          metalBreakSound.currentTime = 0;
                  				metalBreakSound.play();
                        }
                      }
                    }
                    granadeArea(xleft,ytop);
                    granadeArea(xleft,ymid);
                    granadeArea(xleft,ybottom);
                    granadeArea(xmid,ytop);
                    granadeArea(xmid,ybottom);
                    granadeArea(xright,ytop);
                    granadeArea(xright,ymid);
                    granadeArea(xright,ybottom);
        granades.shift();
      }, 3000);

  }
}
function drawGranade() {
  for (var i = 0; i < granades.length; i++) {

    if (granades[i].velx < 0) {
      var x = Math.floor((granades[i].x - granades[i].size + granades[i].velx-1) / 50)
        % 1000;
     var y = Math.floor((granades[i].y) / 50)
        % 1000;
        var bottomy = Math.floor((granades[i].y + granades[i].size - 1) / 50)
          % 1000;
      if (x < 0 || map[x][y] == null || map[x][bottomy] == null) {}
      else if (map[x][y].walkable == false ||
         map[x][bottomy].walkable == false) {
           granades[i].velx *= 0.6;
           granades[i].vely *= 0.6;
           granades[i].velx = -granades[i].velx;

      }
     }
     else if (granades[i].velx > 0) {
       var rightx = Math.floor((granades[i].x + granades[i].size + granades[i].velx +1) / 50)
         % 1000;
         var y = Math.floor((granades[i].y) / 50)
            % 1000;
            var bottomy = Math.floor((granades[i].y + granades[i].size - 1) / 50)
              % 1000;
       if (rightx < 0 || map[rightx][y] == null || map[rightx][bottomy] == null) {}
       else if (map[rightx][y].walkable == false ||
          map[rightx][bottomy].walkable == false) {
            granades[i].velx *= 0.6;
            granades[i].vely *= 0.6;
            granades[i].velx = -granades[i].velx;
       }
      }
      if (granades[i].vely < 0) {
        var x = Math.floor((granades[i].x) / 50)
          % 1000;
        var rightx = Math.floor((granades[i].x + granades[i].size) / 50)
          % 1000;
          var nexty = Math.floor((granades[i].y + granades[i].vely - granades[i].size) / 50)
            % 1000;
        if (x < 0 || rightx < 0 || map[x][nexty] == null || map[rightx][nexty] == null) {}
        else if (map[x][nexty].walkable == false || map[rightx][nexty].walkable == false) {
          granades[i].velx *= 0.6;
          granades[i].vely *= 0.6;
          granades[i].vely = -granades[i].vely;
        }
       }
       else if (granades[i].vely > 0) {
       var x = Math.floor((granades[i].x) / 50)
         % 1000;
         var rightx = Math.floor((granades[i].x + granades[i].size) / 50)
           % 1000;
           var nextBottomy = Math.floor((granades[i].y + granades[i].size + granades[i].vely) / 50)
             % 1000;
         if (x < 0 || rightx < 0 || map[rightx][nextBottomy] == null || map[x][nextBottomy] == null) {}
         else if (map[rightx][nextBottomy].walkable == false || map[x][nextBottomy].walkable == false) {
           granades[i].y = map[x][nextBottomy].y - granades[i].size;
           granades[i].velx *= 0.6;
           granades[i].vely *= 0.6;
           granades[i].vely = -granades[i].vely;
         }
       }
         granades[i].vely *= granades[i].gravity;
         granades[i].vely += granades[i].gravity;
         granades[i].y += granades[i].vely;
         granades[i].x += granades[i].velx;
    c.beginPath();
    c.arc(granades[i].x + groundMovement.x, granades[i].y, granades[i].size, 0, Math.PI*2);
    c.fill();
    c.closePath();

    c.beginPath();
    c.strokeStyle = "brown";
    c.arc(granades[i].x + groundMovement.x, granades[i].y, granades[i].size-3, 0, Math.PI*2);
    c.stroke();
    c.strokeStyle = "black";
    c.closePath();
  }
}
function grenadePath() {
  var x = player.x + player.sizeX/2 - groundMovement.x;
  var y = player.y + player.sizeY/4;
  var velx = -Math.cos(gun.rotation)*40;
  var vely = -Math.sin(gun.rotation)*40;
  c.beginPath();
  c.moveTo(x + groundMovement.x, y);
  for (var i = 0; i < 100; i++) {
    vely *= 0.99;
    vely += 0.99;
    x += velx;
    y += vely;
    c.lineTo(x + groundMovement.x, y);
  }
  c.stroke();
  c.closePath();
}
function genExplosion(x, y) {
  for (var i = 0; i < Math.floor(Math.random()*20)+100; i++) {
    spark.push({
      x: x,
      y: y,
      size: 5,
      prevX: 0,
      prevY: 0,
      velx: Math.random()*50 - 25,
      vely: Math.random()*50 - 25,
      gravity: 0.5
    });
  }
  for (var i = 0; i < 30; i++) {
    splash.push({x: x,
                y: y,
                velx: Math.random()*10-5,
                vely: Math.random()*10-5,
                size: Math.random()*50,
                color: "gray"
                })
  }
}

function checkReload() {
  if (reloaded == false && magCount > 0) {
    loadGunAudio.currentTime = 0;
    loadGunAudio.play();
    reloaded = true;
    magCount--;
    ammoCount = 30;
    reloadgun();
  }
  else if (reloaded == true) {
    var last = gunMag.length - 1;
    unloadGunAudio.currentTime = 0;
    unloadGunAudio.play();
    reloaded = false;
    ammoCount = 0;
    gunMag[last].x = gun.x;
    gunMag[last].y = gun.y;
    gunMag[last].rotation = gun.rotation;
    if (mouse.x > gun.x+gun.sizeX/2) {gunMag[last].scaleX = -1;}
    else {gunMag[last].scaleX = 1;}
    gunMag[last].fall = true;
    clearInterval(shootTimer);
    setTimeout(function(){
      gunMag.shift();
    },10000);
  }
}
function reloadgun() {
  var dist = 0.5*gun.sizeX;
  var offsetX = -dist*Math.cos(gun.rotation);
  var offsetY = -dist*Math.sin(gun.rotation);

  gunMag.push({x: 0,
               y: 0,
               sizeX: 24/2,
               sizeY: 30/2,
               velx: 0,
               vely: 0,
               rotation: gun.rotation,
               image: akMags,
               spin: 0,
               fall: false,
               gravity: 0.9,
               scaleX: (mouse.x > gun.x + gun.sizeX / 2) ? -1 : 1,
               scaleY: 1
               });
}
function drawMags() {
  for (var i = 0; i < gunMag.length; i++) {
    var curMag = gunMag[i];

    if (curMag.fall == true) {
      curMag.vely += 1.5;
      curMag.y += curMag.vely;
      curMag.vely *= curMag.gravity;
      curMag.x += groundMovement.velx;
        if (mouse.x > gun.x+gun.sizeX/2) {
          c.translate(curMag.x+gun.sizeX/2, curMag.y+curMag.sizeY/2);
          c.rotate(curMag.rotation);
          c.scale(curMag.scaleY, curMag.scaleX);
        }
        else {
        c.translate(curMag.x+gun.sizeX/2, curMag.y+curMag.sizeY/2);
        c.rotate(curMag.rotation);
        c.scale(curMag.scaleY, curMag.scaleX);
      }
      var x = Math.floor((curMag.x + curMag.velx - groundMovement.x) / 50)
        % 1000;
        var rightx = Math.floor((curMag.x + curMag.sizeX + curMag.velx - groundMovement.x) / 50)
          % 1000;
          var y = Math.floor((curMag.y+curMag.sizeY) / 50)
            % 1000;
        if (map[x] == null || map[x][y] == null || map[rightx][y] == null) {
          gunMag.splice(i, 1);
          continue;
        }
        else if (curMag.scaleX == -1) {
          var x = Math.floor((curMag.x + 50 + curMag.velx - groundMovement.x) / 50)
            % 1000;
            var rightx = Math.floor((curMag.x + 50 + curMag.sizeX + curMag.velx - groundMovement.x) / 50)
              % 1000;
          if (map[x][y].walkable == false || map[rightx][y].walkable == false) {
            curMag.y = map[x][y].y - curMag.sizeY;
            curMag.vely = -curMag.vely;
          }
        }
        else if (map[x][y].walkable == false || map[rightx][y].walkable == false) {
          curMag.y = map[x][y].y - curMag.sizeY;
          curMag.vely = -curMag.vely;
        }
    }
    else {
      if (mouse.x > gun.x+gun.sizeX/2) {
        c.translate(gun.x+gun.sizeX/2+groundMovement.velx, gun.y+gun.sizeY/2);
        c.rotate(gun.rotation);
        c.scale(1, -1);
      }
      else {
        c.translate(gun.x+gun.sizeX/2+groundMovement.velx, gun.y+gun.sizeY/2);
        c.rotate(gun.rotation);

      }
    }
  c.drawImage(curMag.image, -32, -2.5, curMag.sizeX, curMag.sizeY);
  c.resetTransform();
  }
}

function genHit(x, y, sparkX, sparkY) {
  for (var i = 0; i < Math.floor(Math.random()*7)+3; i++) {
    spark.push({
      x: x,
      y: y,
      size: 2,
      prevX: 0,
      prevY: 0,
      velx: sparkX*(Math.random()*50 - 25 ),
      vely: sparkY*(Math.random()*50 - 25 ),
      gravity: 0.5
    });
  }
}
function drawSparkle() {
  for (var i = 0; i < spark.length; i++) {
    if (pause == false) {
      spark[i].prevX = spark[i].x;
      spark[i].prevY = spark[i].y;
      spark[i].x += spark[i].velx;
      spark[i].y += spark[i].vely;
      spark[i].vely += spark[i].gravity;
    }

    if (spark[i].y > canvas.height+100) {
      spark.splice(i, 1);
    }
    else {
      c.strokeStyle = "yellow";
      c.beginPath();
      c.moveTo(spark[i].prevX, spark[i].prevY);
      c.lineTo(spark[i].x, spark[i].y);
      c.stroke();
      c.closePath();
      c.strokeStyle = "black";
    }
  }
}
function genShell(x, y, rotation) {
  shells.push({
    x: x,
    y: y,
    sizeX: 5,
    sizeY: 2.5,
    velx: Math.random()*2-1,
    vely: -Math.random()*10,
    rotation: rotation,
    spin: (Math.random()*0.4)-0.2,
    gravity: 0.5,
    friction: 0.9
  });
  drawShells();
  setTimeout(function(){
    shells.shift();
  },10000);
}
function drawShells() {
  for (var i = 0; i < shells.length; i++) {
    if (pause == false) {
      shells[i].x += shells[i].velx;
      shells[i].y += shells[i].vely;
      shells[i].spin *= 0.9;
      shells[i].rotation += shells[i].spin;
      var x = Math.floor((shells[i].x + shells[i].velx) / 50)
        % 1000;
       var y = Math.floor((shells[i].y+shells[i].sizeY) / 50)
          % 1000;
      if (map[x] == null || map[x][y] == null) {
        shells.splice(i,1);
        continue;
      }
      else if (map[x][y].walkable == false) {
        shells[i].y = map[x][y].y-shells[i].sizeY;
        shells[i].vely *= shells[i].gravity;
        shells[i].vely = -shells[i].vely;
        shells[i].velx *= shells[i].friction;
      }
      else {
        shells[i].vely += shells[i].gravity;
      }
    }

    c.translate(shells[i].x+shells[i].sizeX/2+groundMovement.x, shells[i].y+shells[i].sizeY/2);
    c.rotate(shells[i].rotation);
    c.translate(-(shells[i].x+shells[i].sizeX/2+groundMovement.x), -(shells[i].y+shells[i].sizeY/2));
    c.drawImage(shellImg, shells[i].x+groundMovement.x, shells[i].y, shells[i].sizeX, shells[i].sizeY);
    c.resetTransform();
  }
}

function draw(obj) {
  obj.prevX = obj.x;
  obj.prevY = obj.y
  obj.x = player.x-25;
  obj.y = player.y+30;
  obj.velx *= 0.9;
  obj.vely *= 0.9;
  obj.x += obj.velx;
  obj.y += obj.vely;
  c.translate(obj.prevX+obj.sizeX/2 + groundMovement.velx , obj.prevY+obj.sizeY/2);
  c.rotate(obj.rotation);
  c.translate(-(obj.prevX+obj.sizeX/2+25), -(obj.prevY+obj.sizeY/2));
  c.beginPath();
  c.drawImage(obj.image, obj.prevX, obj.prevY, obj.sizeX, obj.sizeY);
  c.closePath();

  c.resetTransform();
}
