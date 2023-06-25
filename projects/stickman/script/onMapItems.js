class item {
  constructor(x, y, sizeX, sizeY, velx, vely, velIncrease, rotation, rotationVel, rotationIncrease, scale, image) {
    this.x = x;
    this.y = y;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.velx = velx;
    this.vely = vely;
    this.velIncrease = velIncrease;
    this.rotation = rotation;
    this.rotationVel = rotationVel;
    this.rotationIncrease = rotationIncrease;
    this.scale = scale;
    this.image = image;
  }
}
function drawItems() {
  for (var i = 0; i < onMapItems.length; i++) {
    if (onMapItems[i].x + groundMovement.x < player.x + player.sizeX &&
        onMapItems[i].x + onMapItems[i].sizeX + groundMovement.x > player.x &&
        onMapItems[i].y + onMapItems[i].sizeY > player.y &&
        onMapItems[i].y < player.y + player.sizeY) {
          if (onMapItems[i].image == ak47Mag) {magCount++; experience += 15;}
          else if (onMapItems[i].image == c4Img) {c4Count++; experience += 45;}
          else if (onMapItems[i].image == granadeImg) {granadeCount++; experience += 35;}
          else if (onMapItems[i].image == stoneImg) {blockCount++;}
          else if (onMapItems[i].image == keyYImg) {openDoor(onMapItems[i]);}
          else if (onMapItems[i].image == healthImg) {
            player.hp += 0.2;
            experience += 30;
            if (player.hp > 1) {player.hp = 1}
          }
          lootPickup.currentTime = 0;
          lootPickup.play();
        onMapItems.splice(i, 1);
    }
    else {
      var x = Math.floor((onMapItems[i].x + onMapItems[i].sizeX/2) / 50)
        % 1000;
          var y = Math.floor((onMapItems[i].y + onMapItems[i].sizeY + onMapItems[i].vely) / 50)
            % 1000;
        if (x < 0 || y < 0 || map[x][y] == null) {}
        else if (map[x][y] == null || map[x][y] == null) {onMapItems.splice(i,1);}
        else if (map[x][y].walkable == false) {
          onMapItems[i].vely = 0 ;
        }
        else if (map[x][y+1].walkable == true) {
          if (onMapItems[i].velIncrease < 0) {
            onMapItems[i].velIncrease /= -1;
          }
          onMapItems[i].vely += onMapItems[i].velIncrease;
          onMapItems[i].y += onMapItems[i].vely;
        }
        else {
          if (pause == false) {
            if (onMapItems[i].rotationVel > 1) {
              onMapItems[i].rotationIncrease = -onMapItems[i].rotationIncrease;
            }
            else if (onMapItems[i].rotationVel < -1) {
              onMapItems[i].rotationIncrease = -onMapItems[i].rotationIncrease;
            }
            onMapItems[i].rotationVel += onMapItems[i].rotationIncrease;
            onMapItems[i].rotation += onMapItems[i].rotationVel;
            if (onMapItems[i].vely > 1) {
              onMapItems[i].velIncrease = -onMapItems[i].velIncrease;
            }
            else if (onMapItems[i].vely < -1) {
              onMapItems[i].velIncrease = -onMapItems[i].velIncrease;
            }
            onMapItems[i].vely += onMapItems[i].velIncrease;
            onMapItems[i].y += onMapItems[i].vely;
            onMapItems[i].scale += onMapItems[i].rotationVel*0.005;
          }
        }
      c.beginPath();
      c.translate(onMapItems[i].x + onMapItems[i].sizeX/2 + groundMovement.x, onMapItems[i].y + onMapItems[i].sizeY/2);
      c.rotate(onMapItems[i].rotation/180*Math.PI);
      c.scale(onMapItems[i].scale,onMapItems[i].scale);
      c.drawImage(onMapItems[i].image, -onMapItems[i].sizeX/2, -onMapItems[i].sizeY/2, onMapItems[i].sizeX, onMapItems[i].sizeY);
      c.closePath();
      c.resetTransform();
    }
  }
}
