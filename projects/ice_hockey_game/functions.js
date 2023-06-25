function startGame() {
  //gömmer startMenu
  document.getElementById('startMenu').style.display = "none";  //gömmer startMenu
  lobbyPlaying = true;  //kör lobby musiken

  genPointsP1();
  genPointsP2();
}
function draw() {
    drawON = !drawON; //
    if (!drawON) {backButton.style.left = "7vw";} // flyttar ut draw-knappens position
    else         {backButton.style.left = "0px";  }
  }
//slider ger ett värde från 0-100 och det värdet delar jag på 100 eftersom "ljudeffekt.value" bara kan ha värden fån 0-1
sliderEValue.oninput = function() {
  sliderEOut.innerHTML = this.value;// ändrar värdet på volumeValue i html paragrafen
  prevEVolume = this.value; //ger prevEVolume värdet från this.value
  blip.volume = this.value / 100;
    blip.play();
  blip2.volume = this.value / 100;
  goalSound.volume = this.valye / 100;
  winnerSound.volume = this.value / 100;
  threeSound.volume = this.value / 100;
  twoSound.volume = this.value / 100;
  oneSound.volume = this.value / 100;
  goSound.volume = this.value / 100;
  powerUp.volume = this.value / 100;
  freezeSound.volume = this.value / 100;
  bigBoySound.volume = this.value / 100;
  reverseSound.volume = this.value / 100;
  megaPunchSound.volume = this.value / 100;
  wholeMapSound.volume = this.value / 100;
  shotSound.volume = this.value / 100;
  if (muteSound == true) {muteFun();}
  if (this.value == 0) {muteFun();}
}
sliderMValue.oninput = function() {
  sliderMOut.innerHTML = this.value;// ändrar värdet på musicValue i html paragrafen
  prevMVolume = this.value; //ger prevMVolume värdet från this.value
  music.volume = this.value / 100;
  lobbyMusic.volume = this.value / 200; //det här ljudet var extra högt, därför har den ett lägt värde
  if (muteMusic == true) {mute2Fun();}
  if (this.value == 0) {mute2Fun();}
}

function resetBall() {
  //återställer positioner och hastigheter för ball, p1, p2
  ball.velX = 0;
  ball.velY = 0;
  ball.x = totalWidth / 2;
  ball.y = totalHeight / 2;
  p1.x = totalWidth / 2;
  p1.y = totalHeight - 100;
  p1.velX = 0;
  p1.velY = 0;
  p2.x = totalWidth / 2;
  p2.y = 100;
  p2.velX = 0;
  p2.velY = 0;

}
function goalPoint1(){
  p1.score ++; //lägger in 1 poäng i värde
  resetBall();
  moveObjects = false;
  particleSide = 0;
  explosionDirection = 1;
  genPointsP1();
  genExplosion();
  clearInterval(abilityTimer);
  if (p1.score == 10) {winnerName = "Player Blue"; winner();}
  else {
  setTimeout(function() {
  countDown();
  ball.velX = (Math.random() * 2) - 1;//bollens hastighet vid tekning
  ball.velY = (Math.random() * -1) - 0.2;}, goalDelay);
}}
function goalPoint2() {
  p2.score ++;//lägger in 1 poäng i värde
  resetBall();
  moveObjects = false;
  particleSide = totalHeight;
  explosionDirection = -1;
  genPointsP2();
  genExplosion();
  clearInterval(abilityTimer);
  if (p2.score == 10) {winnerName = "Player Red"; winner();}
  else {
  setTimeout(function() {
  countDown();
  //bollens hastighet vid tekning
  ball.velX = (Math.random() * 4) - 2;
  ball.velY = (Math.random() * 2) + 1;}, goalDelay);
  }
}
function countDown() {
  //diven för timers visas
  countDownTimer.style.display = "flex";
  document.getElementById('countDownId').innerHTML = "3";
  threeSound.play();
  moveObjects = false;
  resetBall();
  //räknar ned innan den startar
  setTimeout(function() {
    countDownValue.innerHTML = "2";
    if (muteSound == false) {twoSound.play();}}, 500)//väntar 0.5s och sedan kör den koden
  setTimeout(function() {
    countDownValue.innerHTML = "1";
    if (muteSound == false) {oneSound.play();}}, 1000)//väntar 1s och kör sedan koden
  setTimeout(function() {
    countDownValue.innerHTML = "GO!";
    if (muteSound == false) {goSound.play();}
    moveObjects = true;
    clearInterval(abilityTimer);
    abilityTimer = setInterval(ability, tryAbilityTime);
  setTimeout(function() {countDownTimer.style.display = "none";}, 500)
}, 1500)
}

function genPointsP1() {
  var xPosP1 = -25;
  for (var i = 0; i < 11; i++) {
    pointsListP1.push({//lägger till objekt för poängcirklarna till player 1
      fill: pointsColorP1,
      stroke: "black",
      x: xPosP1,
      y: 25,
      size: 24
    });
    xPosP1 += 50;//nästa cirkel ritas ut 50 pixlar bort
    drawPointsP1(pointsListP1[i]);//ritar ut cirklarna
  }
}
function drawPointsP1(object) {
  pointsListP1[p1.score].fill = "blue";// ändrar färg till blå när poängen ökas
  contextP1.beginPath();
  contextP1.fillStyle = object.fill;
  contextP1.strokeStyle = object.stroke;
  contextP1.arc(object.x, object.y, object.size, 0, 2 * Math.PI, false);
  contextP1.fill();
  contextP1.stroke();
  contextP1.closePath();
}
function genPointsP2() {
  var xPosP2 = -25;
  for (var i = 0; i < 11; i++) {
    pointsListP2.push({
      fill: pointsColorP2,
      stroke: "black",
      x: xPosP2,
      y: 25,
      size: 24
    });
    xPosP2 += 50;
    drawPointsP2(pointsListP2[i]);
  }
}
function drawPointsP2(object) {
  pointsListP2[p2.score].fill = "red";
  contextP2.beginPath();
  contextP2.fillStyle = object.fill;
  contextP2.strokeStyle = object.stroke;
  contextP2.arc(object.x, object.y, object.size, 0, 2 * Math.PI, false);
  contextP2.fill();
  contextP2.stroke();
  contextP2.closePath();
}

function ability() {
  var spawnRate = Math.round(Math.random()*30);//sannolikhet till att spawna en ability är 1-50
  if (spawnRate == 1) {
    secretBall.x = (Math.random()*350)+50;//x värdet där abilityn ska spawna
    clearInterval(abilityTimer);// slutar testa spawnchance
  }
}
function drawSecret() {
  context.beginPath();//börjar rita
  context.drawImage(secretImg, secretBall.x, secretBall.y, secretBall.size, secretBall.size);//ritar ut bilden av ability
  context.closePath();//slutar rita
  var p1DistX = secretBall.x + (secretBall.size/2) - p1.x;
  var p1DistY = secretBall.y + (secretBall.size/2) - p1.y;
  var p1Distance = Math.sqrt(p1DistX * p1DistX + p1DistY * p1DistY); // matten för distancen mellan ability med player 1
  if (p1Distance <= (secretBall.size/2) + p1.size){
    powerUp.play();// spelar upp ljudet för powerup
    secretBall.x = -100; //lägger abilityn utanför canvasen så att den inte syns
      var abiliyChoice = Math.floor(Math.random()*5);//randomiserar en ability
    if      (abiliyChoice == 0) {
		freezeSound.currentTime = 0;
		freezeSound.play();
        freezeP2 = true;
        abilityNow = "Freeze";//abilityNow skriver ut vilken ability som är nu
		freezeTimer = new Date().getTime();
        currentAbility();
        setTimeout(function() {freezeP2 = false; p2.color1 = "red"; abilityNow = "None"; currentAbility();}, 3000)}//stänger av abilityn efter 3s
    else if (abiliyChoice == 1) {
		bigBoySound.currentTime = 0;
		bigBoySound.play();
        p1.size = 50;
        abilityNow = "Big boy";
        currentAbility();
        setTimeout(function() {p1.size = 30; abilityNow = "None"; currentAbility();}, 10000)}//stänger av abilityn efter 10s
    else if (abiliyChoice == 2) {
		reverseSound.currentTime = 0;
		reverseSound.play();
      revControlsP2 = true;
      abilityNow = "Confused";
      currentAbility();
      setTimeout(function() {revControlsP2 = false; abilityNow = "None"; currentAbility();}, 5000)}//stänger av abilityn efter 5s
    else if (abiliyChoice == 3) {
		wholeMapSound.currentTime = 0;
		wholeMapSound.play();
      moveWholeMap = true;
      abilityNow = "Whole Map";
      currentAbility();
    setTimeout(function() {moveWholeMap = false; abilityNow = "None"; currentAbility();}, 10000)}//stänger av abilityn efter 10s
    else if (abiliyChoice == 4) {
		megaPunchSound.currentTime = 0;
		megaPunchSound.play();
        abilityNow = "MEGA PUNCH!";
        currentAbility();
        punchUp = true;
        abilityStrongP1 = true;
        p1.color2 = "yellow";
        setTimeout(function() {
          p1.color2 = "black";
          abilityStrongP1 = false;
          abilityNow = "None";
          context.lineWidth = 1;
          currentAbility();}, 5000)}//stänger av abilityn efter 5s
  }
  //nedan är samma som ovan fast för player 2
  var p2DistX = secretBall.x + (secretBall.size/2) - p2.x;
  var p2DistY = secretBall.y + (secretBall.size/2) - p2.y;
  var p2Distance = Math.sqrt(p2DistX * p2DistX + p2DistY * p2DistY);
  if (p2Distance <= (secretBall.size/2) + p2.size){
        powerUp.play();
        secretBall.x = -100;
        var abiliyChoice = Math.floor(Math.random()*5);
    if (abiliyChoice == 0) {
		freezeSound.currentTime = 0;
		freezeSound.play();
        freezeP1 = true;
        abilityNow = "Freeze";
		freezeTimer = new Date().getTime();
        currentAbility();
        setTimeout(function() {freezeP1 = false; p1.color1 = "blue"; abilityNow = "None"; currentAbility();}, 3000)}
    else if (abiliyChoice == 1) {
		bigBoySound.currentTime = 0;
		bigBoySound.play();
        p2.size = 50;
        abilityNow = "Big boy";
        currentAbility();
        setTimeout(function() {p2.size = 30; abilityNow = "None"; currentAbility();}, 10000)}
    else if (abiliyChoice == 2) {
		reverseSound.currentTime = 0;
		reverseSound.play();
      revControlsP1 = true;
      abilityNow = "Confused";
      currentAbility();
      setTimeout(function() {revControlsP1 = false; abilityNow = "None"; currentAbility();}, 5000)}
    else if (abiliyChoice == 3) {
		wholeMapSound.currentTime = 0;
		wholeMapSound.play();
        moveWholeMap = true;
        abilityNow = "Whole Map";
        currentAbility();
      setTimeout(function() {moveWholeMap = false; abilityNow = "None"; currentAbility();}, 10000)}
    else if (abiliyChoice == 4) {
		megaPunchSound.currentTime = 0;
		megaPunchSound.play();
        abilityNow = "MEGA PUNCH!";
        currentAbility();
        abilityStrongP2 = true;
        punchDown = true;
        p2.color2 = "yellow";
        setTimeout(function() {
          p2.color2 = "black";
          abilityStrongP2 = false;
          context.lineWidth = 1;
          abilityNow = "None";
          currentAbility();}, 5000)}
  }
}
function currentAbility() {
  document.getElementById('ability').innerHTML = "Ability: " + abilityNow;
  setTimeout(function() {
    clearInterval(abilityTimer);
    abilityTimer = setInterval(ability, tryAbilityTime);
  }, 10000)
}
function confused(player) {
  context.beginPath();
  context.font = "40px Tahoma";
  context.fillStyle = "white";
  context.textAlign = "center";
  context.fillText("?", player.x, player.y+player.size/2);
  context.closePath();
}
function megaPunch(player) {
  //genSmallExplosion(player.x, player.y, "yellow", particlesStrong);
  context.beginPath();
  context.strokeStyle = colorStrong;
  context.lineWidth = 4;
  context.arc(player.x, player.y, strongSize + player.size, 0, 2 * Math.PI);
  context.stroke();
  context.closePath();
  
  
  if (strongSize < player.size*2) {
	  context.beginPath();
	  context.strokeStyle = colorStrong;
	  context.lineWidth = 4;
	  context.arc(player.x, player.y, player.size*2 - strongSize, 0, 2 * Math.PI);
	  context.stroke();
	  context.closePath();
  }
  context.beginPath();
  context.strokeStyle = colorStrong;
  context.lineWidth = 4;
  context.arc(player.x, player.y, player.size + 1 - strongSize, 0, 2 * Math.PI);
  context.stroke();
  context.closePath();
  
  if (strongSize >= player.size) {strongSize = 0;}
  else {strongSize++;}
  player.dy = ball.y - player.y;
  player.dx = ball.x - player.x;
  player.distance = Math.sqrt(player.dx*player.dx + player.dy*player.dy);
  if (player.distance <= ball.size + player.size) {
    ball.velX = 0;
    ball.velY = 0;
    player.velX = 0;
    player.velY = 0;
    ball.x = player.x;
    if (punchDown == true) {
      ball.y = player.y + ball.size + player.size;
      setTimeout(function() {
		shotSound.currentTime = 0;
		shotSound.play();
        var dx = (totalWidth/2) - ball.x;
        var dy = totalHeight - ball.y;
        ball.velY = dy*0.05;
        ball.velX = dx*0.05;
        abilityStrongP2 = false;
        p2.color2 = "black";
        context.lineWidth = 1;
      }, 1000);
    }
    if (punchUp == true) {
      ball.y = player.y - ball.size - player.size;
      setTimeout(function() {
		shotSound.currentTime = 0;
		shotSound.play();
        var dx = (totalWidth/2) - ball.x;
        var dy = ball.y;
        ball.velY = dy*0.05;
        ball.velX = dx*0.05;
        abilityStrongP1 = false;
        p1.color2 = "black";
        context.lineWidth = 1;
      }, 1000);
    }
    punchUp = false;
    punchDown = false;
  }
}

function startFun() {
  //gömmer menyn och visar tillbaka knappen och options knappen
  menuScreen.style.display = "none";
  backButton.style.display = "flex";
  optWheelBtn.style.display = "flex";
  //nollställer score
  p1.score = 0;
  p2.score = 0;
  if (pausePlay == false) {pausePlay = true;}
  countDown();
  //byter vilken sorts musik som ska spelas
  gameMusic = true;
  lobbyPlaying = false;
  //stoppar musiken och spolar tillbaka till 0
  lobbyMusic.pause();
  lobbyMusic.currentTime = 0;
}
function tutorialFun() {
  //gömmer menyn och visar tutorialScreen och tillbaka knappen
  menuScreen.style.display = "none";
  tutorialScreen.style.display = "flex";
  backButton.style.display = "flex";
}
function optionsFun() {
  //visar optionsScreen
  optScreen.style.display = "flex";
}
function optWheelFun() {
  //visar optionsScreen och pausar spelet
  optScreen.style.display = "flex";
  if (pausePlay == true) {pauseFun();}
}
function menuButton() {
  //stannar spelet och visar menyn
  moveObjects = false;
  tutorialScreen.style.display = "none";
  menuScreen.style.display = "flex";
  backButton.style.display = "none";
  optScreen.style.display = "none";
  optWheelBtn.style.display = "none";
  document.getElementById('winnerDiv').style.display = "none";
  //byter bilden på pauseknappen om spelet är pausat
  if (pausePlay == false) {pausePlay = true; pausePlayImg.style.backgroundImage = "url(pause.png)"}
  gameMusic = false;
  music.pause();
  music.currentTime = 0;
  lobbyPlaying = true;
  lobbyMusic.play();
  backButton.style.zIndex = 2;
  p1.score = 0;
  p2.score = 0;
  pointsListP2.length = 0;
  pointsListP1.length = 0;
  genPointsP1();
  genPointsP2();
  clearInterval(abilityTimer);
}
function pauseFun() {
  //byter det föregående värdet på pausePlay to motsatta värdet sedan pausas/startas spelet och byter bild på knappen
  pausePlay = !pausePlay;
  if (pausePlay == true) {
    moveObjects = true;
    pausePlayImg.style.backgroundImage = "url(pause.png)";
    abilityTimer = setInterval(ability, tryAbilityTime);
  }
  else {
    moveObjects = false;
    pausePlayImg.style.backgroundImage = "url(play.png)";
    clearInterval(abilityTimer);
  }
}
function muteFun() {
  //byter föregående värde på muteSound till motsatta värdet
  muteSound = !muteSound;
  if (muteSound == true) {
    //nollställer all volym och ändrar bild, slider hamnar på 0 och goalDelay blir till 500
    muteImg.style.backgroundImage = "url(volumeOFF.png)";
    sliderEOut.innerHTML = 0;
    blip.volume = 0;
    blip2.volume = 0;
    goalSound.volume = 0;
    winnerSound.volume = 0;
    threeSound.volume = 0;
    twoSound.volume = 0;
    oneSound.volume = 0;
    goSound.volume = 0;
    powerUp.volume = 0;
	freezeSound.volume = 0;
    bigBoySound.volume = 0;
    reverseSound.volume = 0;
    megaPunchSound.volume = 0;
    wholeMapSound.volume = 0;
	shotSound.volume = 0;
    document.getElementById('volumeController').value = 0;
    goalDelay = 500;
  }
  else {
    //sätter all volym till det förra värdet och ändrar bild på knappen. slider får sitt förra värde och goalDelay blir 1500
    muteImg.style.backgroundImage = "url(volumeON.png)";
    sliderEOut.innerHTML = prevEVolume;
    document.getElementById('volumeController').value = prevEVolume;
    blip.volume = prevEVolume / 100;
    blip2.volume = prevEVolume / 100;
    goalSound.volume = prevEVolume / 100;
    winnerSound.volume = prevEVolume / 100;
    threeSound.volume = prevEVolume / 100;
    twoSound.volume = prevEVolume / 100;
    oneSound.volume = prevEVolume / 100;
    goSound.volume = prevEVolume / 100;
    powerUp.volume = prevEVolume / 100;
	freezeSound.volume = prevEVolume / 100;
    bigBoySound.volume = prevEVolume / 100;
    reverseSound.volume = prevEVolume / 100;
    megaPunchSound.volume = prevEVolume / 100;
    wholeMapSound.volume = prevEVolume / 100;
    goalDelay = 1500;
  }
}
function mute2Fun() {
  //byter föregående värde på muteMusic till motsatta värdet
  muteMusic = !muteMusic;
  if (muteMusic == true) {
    //nollställer all volym och ändrar bild, slider hamnar på 0
    muteImg2.style.backgroundImage = "url(volumeOFF.png)";
    sliderMOut.innerHTML = 0;
    music.volume = 0;
    lobbyMusic.volume = 0;
    document.getElementById('musicController').value = 0;
  }
  else {
    //sätter volym och slider till förra värdet och ändrar bildenpå knappen
    muteImg2.style.backgroundImage = "url(volumeON.png)";
    sliderMOut.innerHTML = prevMVolume;
    music.volume = prevMVolume / 200;
    lobbyMusic.volume = prevMVolume / 200;
    document.getElementById('musicController').value = prevMVolume;
  }
}
function xButton() {
  //gömmer optionsScreen
  optScreen.style.display = "none";
}

function genSmallExplosion(x, y, ballColor, amount) {
  //skapar 100 object med color, posX, posY, velX, velY, size.
  var i = amount;
  while (i--) {
    const theta = Math.random() * 2 * Math.PI;
    const totalVel = Math.random() * 10;
    ballBoom.push({
      color: ballColor,
      posX: x,
      posY: y,
      velX: Math.cos(theta) * totalVel,//(Math.random() < 0.5 ? -1 : 1) * Math.sqrt(totalVel*totalVel - velY*velY),//random nummer mellan 5 och -5
      velY: Math.sin(theta) * totalVel,//velY,//random nummer mellan 5 och -5
      size: Math.floor(Math.random() * 10)//random tal mellan 0 och 10
    });
  }
  //nu är objekten skapade
  drawExplosion();
}

function genExplosion() {
  //skapar 100 object med color, posX, posY, velX, velY, size.
  var i = 200;
  while (i--) {
  const totalVel = Math.random() * 5;
    ballBoom.push({
      color: "rgb(" +
       (Math.floor(Math.random() * 256)) + ", "
      + (Math.floor(Math.random() * 256)) + ", "
      + (Math.floor(Math.random() * 256)) + ")",
      posX: totalWidth / 2,
      posY: particleSide,
      velX: Math.cos(Math.random() * 2 * Math.PI) * totalVel,//random X hastighet
      velY: Math.sin(Math.random() * explosionDirection * Math.PI) * totalVel,//random Y hastighet.
      //explosionDirection gör så att partiklarna inte åker mot utsidan av canvasen
      size: Math.floor(Math.random() * 20)//random tal mellan 0 och 20
    });
  }
  //nu är objekten skapade
  drawExplosion();
}
//bollarna blir mindre, ökar i velocity och sen kollas det om bollarna är större än 0. är dem större än 0 ritas dom ut annars tas dem bort från arrayen
function drawExplosion() {
  for (var i = 0; i < ballBoom.length; i++) {
    ballBoom[i].posY += ballBoom[i].velY;
    ballBoom[i].posX += ballBoom[i].velX;
    ballBoom[i].size -= 0.5;
    if (ballBoom[i].size > 0){
    particles(ballBoom[i]);//positionerna är uppdaterade och nu ska dem ritas ut
  }
    else {ballBoom.splice(i, 1); i--;}
  }
}
function particles(object){
  //hämtar värdena från objektet som valts och sätter in i funktionen. object = objektets namn t.ex. om ballBoom[34] sätts in blir det ballBoom[34].color, ballBoom[34].posX osv.
  context.beginPath();
  context.fillStyle = object.color;
  context.strokeStyle = object.color;
  context.arc(object.posX, object.posY, object.size, 0, 2 * Math.PI, false);
  context.fill();
  context.stroke();
  context.closePath();
  }
function winner() {
  document.getElementById('winnerDiv').style.display = "flex";//visar winnerDiv
  backButton.style.zIndex = 4;
  gameMusic = false;
  music.pause();
  music.currentTime = 0;
  document.getElementById('winnerPlayer').innerHTML = winnerName;
  winnerSound.play();
  //återställer poäng
  p1.score = 0;
  p2.score = 0;
}

update();
