//variabler för canvasens lägsta och högsta x och y värden
var minWidth = 0;
var minHeight = 0;
var totalHeight = 800;
var totalWidth = 500;
//Här har jag skapat booleans och valt vad som ska hända när sidan först laddas
var moveObjects = false;
var pausePlay = true;
var muteSound = false;
var muteMusic = false;
var lobbyPlaying = false;
var gameMusic = false;
//hämtade från html id:n och classer
const pausePlayImg = document.getElementById('pauseBtn');
const muteImg = document.getElementById('audioMuteBtn');
const muteImg2 = document.getElementById('musicMuteBtn');
const menuScreen = document.getElementById('menuId');
const optScreen = document.getElementById('optWhole');
const optWheelBtn = document.getElementById('optWheel');
const tutorialScreen = document.getElementById('tutorialId');
const backButton = document.getElementById('backBtn');
const countDownTimer = document.getElementsByClassName('countDownClass')[0];
const countDownValue = document.getElementById('countDownId');
const sliderEValue = document.getElementById('volumeController');
const sliderEOut = document.getElementById('volumeValue');
const sliderMValue = document.getElementById('musicController');
const sliderMOut = document.getElementById('musicValue');
const secretImg = document.getElementById('questionMark');

var abilityFreeze = false;
var freezeP1 = false;
var freezeP2 = false;
var freezeTimer = 0;
var abilityControls = false;
var revControlsP1 = false;
var revControlsP2 = false;
var moveWholeMap = false;
var abilityStrongP1 = false;
var abilityStrongP2 = false;
var punchUp = false;
var punchDown = false;
var colorStrong = "yellow";
var strongSize = 0;
var abilityTimer;
var tryAbilityTime = 1000;
var abilityNow = "None";

var goalDelay = 1500;
var winnerName = "";
var particleSide = 0;
var explosionDirection = 1;
var smallExplosionColor = "gray";
// Array för explosionen när man gör mål och en del andra partiklar
var ballBoom = [];
//array för score
var pointsListP1 = [];
var pointsColorP1 = "white";
var pointsListP2 = [];
var pointsColorP2 = "white";
//2 olika canvaser för poängsystemet
//player1
var pointsCanvasP1 = document.getElementById('scoreP1');
pointsCanvasP1.width = 500;
pointsCanvasP1.height = 50;
var contextP1 = pointsCanvasP1.getContext('2d');
//Player2
var pointsCanvasP2 = document.getElementById('scoreP2');
pointsCanvasP2.width = 500;
pointsCanvasP2.height = 50;
var contextP2 = pointsCanvasP2.getContext('2d');

//p1 & p2 = objekt för player1 och player2 dX och dY är distance i y-led och x-led och det används till att räkna ut hur nära bollen och player1/2 är.
var p1 = {
    x: totalWidth / 2,
    y: totalHeight - 100,
    size: 30,
    color1: "blue",
    color2: "black",
    velX: 0,
    velY: 0,
    dX: 0,
    dY: 0,
    score: 0
};
var p2 = {
    x: totalWidth / 2,
    y: 100,
    size: 30,
    color1: "red",
    color2: "black",
    velX: 0,
    velY: 0,
    dX: 0,
    dY: 0,
    score: 0
};
//ball är objekt för pucken, ballDot är objekt för pricken i bollen.
var ball = {
    x: 500 / 2,
    y: 800 / 2,
    prevX: 500 / 2,
    prevY: 800 / 2,
    size: 20,
    color1: "gray",
    color2: "black",
    velX: 0,
    velY: 0
};
var ballDot = {
    x: 500 / 2,
    y: 800 / 2,
    size: 10,
    color1: "black"
};
var secretBall = {
    x: -100,
    y: totalHeight / 2 - 40,
    size: 80,
    img: "questionmark.png"
};
//variabel för accelerationen på players
var velIncrease = 0.8;
//variabler för all musik och ljudeffekter
var blip = new Audio("sounds/blip.wav");
var blip2 = new Audio("sounds/blip2.wav");
var goalSound = new Audio("sounds/boom.wav");
var winnerSound = new Audio("sounds/winner.wav");
var threeSound = new Audio("sounds/3.wav");
var twoSound = new Audio("sounds/2.wav");
var oneSound = new Audio("sounds/1.wav");
var goSound = new Audio("sounds/go.wav");
var powerUp = new Audio("sounds/powerUp.wav")
var music = new Audio("sounds/Victory.mp3");
var lobbyMusic = new Audio("sounds/lobby.wav");

var freezeSound = new Audio("sounds/freeze.wav");
var bigBoySound = new Audio("sounds/bigBoy.wav");
var reverseSound = new Audio("sounds/reverse.wav");
var megaPunchSound = new Audio("sounds/megaPunch.wav");
var wholeMapSound = new Audio("sounds/wholeMap.wav");
var shotSound = new Audio("sounds/shot.wav");
//det här är startvolymen. prevEVolume och prevMVolume gör det möjligt att clicka på mute sound/music och sedan få tillbaka förra värdet genom att trycka på unmute
var prevEVolume = 50;
var prevMVolume = 50;
music.volume = prevMVolume / 100;
lobbyMusic.volume = prevMVolume / 200;
//drawON är true vilket gör att skärmen rensas varje update
var drawON = true;
//hämtar spelets canvas från html och skapar variabler för höjden och bredden
var canvas = document.getElementById('gameCanvas');
canvas.width = totalWidth;
canvas.height = totalHeight;
var context = canvas.getContext('2d');
//alla dessa inputs är false som standard
var key = {w: false, a: false, s: false, d: false, up: false, down: false, right: false, left: false};

//aktiverar functionen controls om knappar trycks ned på tangentbordet
document.addEventListener('keydown', controls);
//aktiverar functionen controlsUp om knappar släpps på tangentbordet
document.addEventListener('keyup', controlsUp);

//ändrar inputs till true om det är rött knappar dvs. w,a,s,d eller pilarna: upp,ned,höger,vänster.
function controls(event) {
    if (event.which == 87) {
        key.w = true;
    }
    if (event.which == 83) {
        key.s = true;
    }
    if (event.which == 65) {
        key.a = true;
    }
    if (event.which == 68) {
        key.d = true;
    }

    if (event.which == 38) {
        key.up = true;
    }
    if (event.which == 40) {
        key.down = true;
    }
    if (event.which == 37) {
        key.left = true;
    }
    if (event.which == 39) {
        key.right = true;
    }
}

//ändrar samma knappar som åvan till false när dem inte trycks ned längre
function controlsUp(event) {
    if (event.which == 87) {
        key.w = false;
    }
    if (event.which == 83) {
        key.s = false;
    }
    if (event.which == 65) {
        key.a = false;
    }
    if (event.which == 68) {
        key.d = false;
    }

    if (event.which == 38) {
        key.up = false;
    }
    if (event.which == 40) {
        key.down = false;
    }
    if (event.which == 37) {
        key.left = false;
    }
    if (event.which == 39) {
        key.right = false;
    }
}

//hämtar värdena från objektet som valts och sätter in i funktionen. object = objektets namn t.ex. om p1 sätts in blir det p1.color1, p1.color2, p1.x osv.
function player(object) {
    context.beginPath();
    context.fillStyle = object.color1;
    context.strokeStyle = object.color2;
    context.arc(object.x, object.y, object.size, 0, 2 * Math.PI, false);
    context.fill();
    context.stroke();
    context.closePath();
}

//collision mellan ball och p1
function p1BallCollision() {
    var ballSpeedX = ball.velX;
    var ballSpeedY = ball.velY;

    ball.x = p1.x + (ball.prevX - p1.x) * (ball.size + p1.size)
        / (Math.sqrt((ball.prevX - p1.x) * (ball.prevX - p1.x)
            + (ball.prevY - p1.y) * (ball.prevY - p1.y)));
    ball.y = p1.y + (ball.prevY - p1.y) * (ball.size + p1.size)
        / (Math.sqrt((ball.prevX - p1.x) * (ball.prevX - p1.x)
            + (ball.prevY - p1.y) * (ball.prevY - p1.y)));

    ball.velX = 0.8 * (p1.dx * (2 * Math.sqrt(ballSpeedX * ballSpeedX + ballSpeedY * ballSpeedY)
            + Math.sqrt(p1.velX * p1.velX + p1.velY * p1.velY))
        / (ball.size + p2.size) + ballSpeedX);
    ball.velY = 0.8 * (p1.dy * (2 * Math.sqrt(ballSpeedX * ballSpeedX + ballSpeedY * ballSpeedY)
            + Math.sqrt(p1.velX * p1.velX + p1.velY * p1.velY))
        / (ball.size + p1.size) + ballSpeedY);
}

//collision mellan ball och p2
function p2BallCollision() {
    var ballSpeedX = ball.velX;
    var ballSpeedY = ball.velY;

    ball.x = p2.x + (ball.prevX - p2.x) * (ball.size + p2.size)
        / (Math.sqrt((ball.prevX - p2.x) * (ball.prevX - p2.x)
            + (ball.prevY - p2.y) * (ball.prevY - p2.y)));
    ball.y = p2.y + (ball.prevY - p2.y) * (ball.size + p2.size)
        / (Math.sqrt((ball.prevX - p2.x) * (ball.prevX - p2.x)
            + (ball.prevY - p2.y) * (ball.prevY - p2.y)));

    ball.velX = 0.8 * (p2.dx * (2 * Math.sqrt(ballSpeedX * ballSpeedX + ballSpeedY * ballSpeedY)
            + Math.sqrt(p2.velX * p2.velX + p2.velY * p2.velY))
        / (ball.size + p2.size) + ballSpeedX);
    ball.velY = 0.8 * (p2.dy * (2 * Math.sqrt(ballSpeedX * ballSpeedX + ballSpeedY * ballSpeedY)
            + Math.sqrt(p2.velX * p2.velX + p2.velY * p2.velY))
        / (ball.size + p2.size) + ballSpeedY);
}

function movement() {
    //lägger till hastighet till p1,p1,ball
    p1.x += p1.velX;
    p1.y += p1.velY;
    p2.x += p2.velX;
    p2.y += p2.velY;
    ball.y += ball.velY;
    ball.x += ball.velX;
    //nedanför är friktionen för bollen pch spelarna
    ball.velY *= 0.99;
    ball.velX *= 0.99;
    p1.velX *= 0.9;
    p1.velY *= 0.9;
    p2.velX *= 0.9;
    p2.velY *= 0.9;

    // detta gör så att bollens hastighet inte blir mer än 20(annars kan bollen flippa ur och åka supersnabbt)
    if (ball.velX >= 20) {
        ball.velX = 20;
    }
    if (ball.velY >= 20) {
        ball.velY = 20;
    }
    //det nedanför ökar/minskar med velIncrease när man trycker ner w,a,s,d och pilarna: upp, ned, höger, vänster.
    if (revControlsP1 == false) {
        var newX = 0;
        var newY = 0;
        if (key.w) {
            newY -= velIncrease;
        }
        if (key.s) {
            newY += velIncrease;
        }
        if (key.a) {
            newX -= velIncrease;
        }
        if (key.d) {
            newX += velIncrease;
        }

        if (newX != 0 && newY != 0) {
            var soon = Math.sin(45) * (newX * newX);

            if (newX > 0) {
                p1.velX += soon;
            }
            if (newX < 0) {
                p1.velX -= soon;
            }
            if (newY > 0) {
                p1.velY += soon;
            }
            if (newY < 0) {
                p1.velY -= soon;
            }
        } else {
            if (key.w) {
                p1.velY -= velIncrease;
            }
            if (key.s) {
                p1.velY += velIncrease;
            }
            if (key.a) {
                p1.velX -= velIncrease;
            }
            if (key.d) {
                p1.velX += velIncrease;
            }
        }

        //if (key.w == true) {p1.velY -= velIncrease;}
        //if (key.s == true) {p1.velY += velIncrease;}
        //if (key.a == true) {p1.velX -= velIncrease;}
        //if (key.d == true) {p1.velX += velIncrease;}
    } else {
        var newX = 0;
        var newY = 0;
        if (key.w) {
            newY += velIncrease;
        }
        if (key.s) {
            newY -= velIncrease;
        }
        if (key.a) {
            newX += velIncrease;
        }
        if (key.d) {
            newX -= velIncrease;
        }

        if (newX != 0 && newY != 0) {
            var soon = Math.sin(45) * (newX * newX);

            if (newX > 0) {
                p1.velX += soon;
            }
            if (newX < 0) {
                p1.velX -= soon;
            }
            if (newY > 0) {
                p1.velY += soon;
            }
            if (newY < 0) {
                p1.velY -= soon;
            }
        } else {
            if (key.w) {
                p1.velY += velIncrease;
            }
            if (key.s) {
                p1.velY -= velIncrease;
            }
            if (key.a) {
                p1.velX += velIncrease;
            }
            if (key.d) {
                p1.velX -= velIncrease;
            }
        }
    }

    if (freezeP1) {
        var date = new Date();
        var slowness = date.getTime() - freezeTimer;
        p1.velX *= 1 / (1 + slowness / 300);
        p1.velY *= 1 / (1 + slowness / 300);
        p1.color1 = "#E6E6FA";
    }
    if (revControlsP2 == false) {
        var newX = 0;
        var newY = 0;
        if (key.up) {
            newY -= velIncrease;
        }
        if (key.down) {
            newY += velIncrease;
        }
        if (key.left) {
            newX -= velIncrease;
        }
        if (key.right) {
            newX += velIncrease;
        }

        if (newX != 0 && newY != 0) {
            var soon = Math.sin(45) * (newX * newX);

            if (newX > 0) {
                p2.velX += soon;
            }
            if (newX < 0) {
                p2.velX -= soon;
            }
            if (newY > 0) {
                p2.velY += soon;
            }
            if (newY < 0) {
                p2.velY -= soon;
            }
        } else {
            if (key.up) {
                p2.velY -= velIncrease;
            }
            if (key.down) {
                p2.velY += velIncrease;
            }
            if (key.left) {
                p2.velX -= velIncrease;
            }
            if (key.right) {
                p2.velX += velIncrease;
            }
        }

        //if (key.w == true) {p1.velY -= velIncrease;}
        //if (key.s == true) {p1.velY += velIncrease;}
        //if (key.a == true) {p1.velX -= velIncrease;}
        //if (key.d == true) {p1.velX += velIncrease;}
    } else {
        var newX = 0;
        var newY = 0;
        if (key.up) {
            newY += velIncrease;
        }
        if (key.down) {
            newY -= velIncrease;
        }
        if (key.left) {
            newX += velIncrease;
        }
        if (key.right) {
            newX -= velIncrease;
        }

        if (newX != 0 && newY != 0) {
            var soon = Math.sin(45) * (newX * newX);

            if (newX > 0) {
                p2.velX += soon;
            }
            if (newX < 0) {
                p2.velX -= soon;
            }
            if (newY > 0) {
                p2.velY += soon;
            }
            if (newY < 0) {
                p2.velY -= soon;
            }
        } else {
            if (key.up) {
                p2.velY += velIncrease;
            }
            if (key.down) {
                p2.velY -= velIncrease;
            }
            if (key.left) {
                p2.velX += velIncrease;
            }
            if (key.right) {
                p2.velX -= velIncrease;
            }
        }
    }

    if (freezeP2) {
        var date = new Date();
        var slowness = date.getTime() - freezeTimer;
        p2.velX *= 1 / (1 + slowness / 300);
        p2.velY *= 1 / (1 + slowness / 300);
        p2.color1 = "#E6E6FA";
    }
}

function wallCollision() {
    //collision för väggarna, om bollen kommer utanför banan hamnar den
    //på canvasens totalWidth/totalHeight - bollens storlek och hastigheten byter håll
    if (ball.x >= totalWidth - ball.size) {
        ball.velX = -ball.velX;
        ball.x = totalWidth - ball.size;
        blip2.play();
        genSmallExplosion(ball.x, ball.y, smallExplosionColor, Math.round(Math.abs(ball.velX) + Math.abs(ball.velY)));
    }
    if (ball.x <= minWidth + ball.size) {
        ball.velX = -ball.velX;
        ball.x = minWidth + ball.size;
        blip2.play();
        genSmallExplosion(ball.x, ball.y, smallExplosionColor, Math.round(Math.abs(ball.velX) + Math.abs(ball.velY)));
    }
    if (ball.y >= totalHeight - ball.size && ball.x <= 150 || ball.y >= totalHeight - ball.size && ball.x >= 350) {
        ball.velY = -ball.velY;
        ball.y = totalHeight - ball.size;
        blip2.play();
        genSmallExplosion(ball.x, ball.y, smallExplosionColor, Math.round(Math.abs(ball.velX) + Math.abs(ball.velY)));
    }
    if (ball.y <= minHeight + ball.size && ball.x <= 150 || ball.y <= minHeight + ball.size && ball.x >= 350) {
        ball.velY = -ball.velY;
        ball.y = minHeight + ball.size;
        ball.size;
        blip2.play();
        genSmallExplosion(ball.x, ball.y, smallExplosionColor, Math.round(Math.abs(ball.velX) + Math.abs(ball.velY)));
    }
    //p1's collision för väggarna. om p1 kommer utanför hoppar p1 tillbaka in på banan och byter velocity(om p1 slår i en vägg i y-led bytet x-velocity håll. om p1 slår i en vägg i x-led byter y-velocity håll)
    if (p1.x >= totalWidth - p1.size) {
        p1.velX = -p1.velX;
        p1.x = totalWidth - p1.size;
    }
    if (p1.x <= minWidth + p1.size) {
        p1.velX = -p1.velX;
        p1.x = minWidth + p1.size;
    }
    if (p1.y >= totalHeight - p1.size) {
        p1.velY = -p1.velY;
        p1.y = totalHeight - p1.size;
    }
    if (moveWholeMap == false) {
        if (p1.y <= totalHeight / 2 + p1.size) {
            p1.velY = -p1.velY;
            p1.y = totalHeight / 2 + p1.size;
        }//totalHeight/2 eftersom man inte ska åka över mitt-linjen
    } else {
        if (p1.y <= p1.size) {
            p1.velY = -p1.velY;
            p1.y = p1.size;
        }
    }
    //p2's collision för väggarna. om p2 kommer utanför hoppar p1 tillbaka in på banan och byter velocity(om p2 slår i en vägg i y-led bytet x-velocity håll. om p2 slår i en vägg i x-led byter y-velocity håll)
    if (p2.x >= totalWidth - p2.size) {
        p2.velX = -p2.velX;
        p2.x = totalWidth - p2.size;
    }
    if (p2.x <= minWidth + p2.size) {
        p2.velX = -p2.velX;
        p2.x = minWidth + p2.size;
    }
    if (moveWholeMap == false) {
        if (p2.y >= totalHeight / 2 - p2.size) {
            p2.velY = -p2.velY;
            p2.y = totalHeight / 2 - p2.size;
        } //totalHeight/2 eftersom man inte ska åka över mitt-linjen
    } else {
        if (p2.y >= totalHeight - p2.size) {
            p2.velY = -p2.velY;
            p2.y = totalHeight - p2.size;
        }
    }
    if (p2.y <= minHeight + p2.size) {
        p2.velY = -p2.velY;
        p2.y = minHeight + p2.size;
    }
}

const frameLength = 1000 / 60;
let timeSinceLastUpdate = 0;

function update() {
    requestAnimationFrame(update);
    if (Date.now() - timeSinceLastUpdate < frameLength) {

        return;
    }
    timeSinceLastUpdate = Date.now();
    //rensar inte skärmen om drawON = false
    if (!drawON) {
        document.getElementById('drawBtn').value = "Don't draw";
    } else {
        context.clearRect(0, 0, totalWidth, totalHeight);
        document.getElementById('drawBtn').value = "Draw";
    }
    //pricken på bollen har samma position som bollen
    ballDot.x = ball.x;
    ballDot.y = ball.y

    player(p1);//lägger in objekter p1 i funktionen och kör den
    if (revControlsP1 == true) {
        confused(p1);
    }
    player(p2);//somma fast med p2
    if (revControlsP2 == true) {
        confused(p2);
    }
    player(ball);//somma fast med ball
    player(ballDot);//somma fast med ballDot

    drawExplosion();// ritar ut explosion
    drawSecret();
    if (abilityStrongP1 == true) {
        megaPunch(p1);
    } else {
        //kollar ifall p1 och ball nuddar varandra och kör p1BallCollision om det är sant
        p1.dy = ball.y - p1.y;
        p1.dx = ball.x - p1.x;
        p1.distance = Math.sqrt(p1.dx * p1.dx + p1.dy * p1.dy);
        if (p1.distance <= ball.size + p1.size) {
            p1BallCollision();
            genSmallExplosion(ball.x, ball.y, smallExplosionColor, Math.round(Math.abs(ball.velX) + Math.abs(ball.velY)));
            blip.play();
        }
    }
    if (abilityStrongP2 == true) {
        megaPunch(p2);
    } else {
        //kollar ifall p2 och ball nuddar varandra och kör p2BallCollision om det är sant
        p2.dy = ball.y - p2.y;
        p2.dx = ball.x - p2.x;
        p2.distance = Math.sqrt(p2.dx * p2.dx + p2.dy * p2.dy);
        if (p2.distance <= ball.size + p2.size) {
            p2BallCollision();
            genSmallExplosion(ball.x, ball.y, smallExplosionColor, Math.round(Math.abs(ball.velX) + Math.abs(ball.velY)));
            blip.play();
        }
    }
    //jag har movement i ett if statement så att jag kan stänga av om på movement
    if (moveObjects == true) {
        movement();
    }
    //har musiken i if statements så att den kan stängas av och på
    if (lobbyPlaying == true) {
        lobbyMusic.play();
    }
    if (gameMusic == true) {
        music.play();
    }

    //kör goalPoint1/goalPoint2 om bollen hamnar i målens område
    if (ball.y >= totalHeight && ball.x >= 150 && ball.x <= 350) {
        goalPoint2();
        goalSound.play();
    }
    if (ball.y <= minHeight && ball.x >= 150 && ball.x <= 350) {
        goalPoint1();
        goalSound.play();
    }
    // kollar väggarnas collision
    wallCollision();
    //Gör så att pucken stannar dvs inte har någon hastighet när den rör sig för långsamt
    if (ball.velY < 0.01 && ball.velY > -0.01 && ball.velX < 0.01 && ball.velX > -0.01) {
        ball.velX = 0;
        ball.velY = 0;
    }
    //hämtar bollens position så att den kan användas i nästa update
    ball.prevX = ball.x;
    ball.prevY = ball.y;
}
