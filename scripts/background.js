// noinspection DuplicatedCode

const bgDiv = document.getElementById("bgDiv");
const bgCanvas = document.getElementById('bgCanvas');
const c = bgCanvas.getContext("2d")
bgCanvas.height = bgDiv.height;
bgCanvas.width = bgDiv.width;

let body = document.body,
    html = document.documentElement;

let height = Math.max(body.scrollHeight, body.offsetHeight,
    html.clientHeight, html.scrollHeight, html.offsetHeight);
let width = Math.max(body.scrollWidth, body.offsetWidth,
    html.clientWidth, html.scrollWidth, html.offsetWidth);

class V2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

let mouseTrigger = false;
let mouse = new V2(0, 0);
let mouseOnPage = new V2(0, 0);

class Particle {
    constructor(pos, vel) {
        this.pos = pos;
        this.vel = vel;
    }
}

let currentParticle = 0;
let trailParticles = new Array(100);
for (let i = 0; i < trailParticles.length; i++) {
    trailParticles[i] = new Particle({x: 0, y: 0}, {x: 0, y: 0});
}

let rainParticles = new Array(1000);
for (let i = 0; i < rainParticles.length; i++) {
    rainParticles[i] = new Particle({x: Math.random() * width, y: Math.random() * height}, {
        x: 5 + Math.random() * 10,
        y: 10 + Math.random() * 10
    });
}

document.addEventListener("mousemove", mouseMove);
document.addEventListener("mouseup", mouseup);

function mouseMove(event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
}

function mouseup() {
    mouseTrigger = true;
}

const frameLength = 1000 / 60;
let timeSinceLastUpdate = 0;

function update() {
    requestAnimationFrame(update);
    if (Date.now() - timeSinceLastUpdate < frameLength) {
        return;
    }
    timeSinceLastUpdate = Date.now();

    //console.log(height);
    height = Math.max(body.scrollHeight, body.offsetHeight,
        html.clientHeight, html.scrollHeight, html.offsetHeight);
    width = Math.max(body.scrollWidth, body.offsetWidth,
        html.clientWidth, html.scrollWidth, html.offsetWidth);
    bgCanvas.height = height;
    bgCanvas.width = width;

    mouseOnPage.x = mouse.x + html.scrollLeft;
    mouseOnPage.y = mouse.y + html.scrollTop;

    trailParticles[currentParticle].pos.x = mouseOnPage.x;
    trailParticles[currentParticle].pos.y = mouseOnPage.y;
    currentParticle = (currentParticle + 1) % trailParticles.length;

    c.clearRect(0, 0, bgCanvas.width, bgCanvas.height);

    // Mouse tracer
    c.beginPath();
    c.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    c.moveTo(trailParticles[currentParticle].pos.x, trailParticles[currentParticle].pos.y);
    for (let i = 1; i < trailParticles.length; i++) {
        const index = (currentParticle + i) % trailParticles.length;
        c.lineTo(trailParticles[index].pos.x, trailParticles[index].pos.y);
    }
    c.stroke()
    c.closePath();

    // Rain particles
    for (let i = 0; i < rainParticles.length; i++) {
        let particle = rainParticles[i];

        c.beginPath();
        c.strokeStyle = '#4160da';
        c.moveTo(particle.pos.x, particle.pos.y);
        c.lineTo(particle.pos.x + particle.vel.x, particle.pos.y + particle.vel.y);
        c.stroke()
        c.closePath();

        c.beginPath();
        c.arc(particle.pos.x, particle.pos.y, 5, 0, Math.PI * 2);
        //c.fill();
        c.closePath();

        particle.pos.x += particle.vel.x;
        particle.pos.y += particle.vel.y;

        if (particle.pos.x > width) {
            particle.pos.x = 0;
        } else if (particle.pos.x < 0) {
            particle.pos.x = width;
        }
        if (particle.pos.y > height) {
            particle.pos.y = 0;
        } else if (particle.pos.y < 0) {
            particle.pos.y = height;
        }
    }

    maffs();
    draw();
    if (Math.random() < 0.01)
        lightning(Math.random() * width, Math.random() * height, 1);
}


//----------------------------------------------------------------------------------------------------------------------

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

class RopePart {
    constructor(x, y) {
        this.pos = new Vec(x, y);
        this.btm = new Vec(x + 30, y + 30);
        this.prev = new Vec(0, 0);
        this.vel = new Vec(0, 0);
        this.stuck = false;
    }
}

function scale(a, scalar) {
    return new Vec(a.x * scalar, a.y * scalar);
}

let rope = [];
let lines = [];
c.strokeStyle = "blue";
c.lineWidth = 10;

let ropePicked = false;

rope.push(new RopePart(200, 580));
rope[0].stuck = false;
rope.push(new RopePart(200, 550));
rope.push(new RopePart(200, 520));
rope.push(new RopePart(200, 490));
rope.push(new RopePart(200, 460));
rope.push(new RopePart(200, 430));
rope.push(new RopePart(200, 400));
rope.push(new RopePart(200, 370));
rope.push(new RopePart(200, 340));
rope.push(new RopePart(200, 310));
rope.push(new RopePart(200, 280));
rope.push(new RopePart(200, 250));
rope.push(new RopePart(100, 100));
rope[11].stuck = true;

function lightning(x, y, power) {
    c.lineWidth = 1;
    c.strokeStyle = "yellow";
    for (let e = 0; e < power; e++) {
        let i;
        for (i = 0; i < 50; i++) {
            if (i === 0) {
                lines.push(new Line(x, y, x + Math.random() * 30 - 15, y - 15));
            } else {
                lines.push(new Line(lines[i - 1].x2, lines[i - 1].y2, lines[i - 1].x2 + Math.random() * 30 - 15, lines[i - 1].y2 - 15));
            }
        }
        for (i = 0; i < lines.length; i++) {
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
    c.fillStyle = "blue";
    for (let i = 0; i < rope.length - 1; i++) {
        let rop = rope[i];
        c.beginPath();
        c.arc(rop.pos.x, rop.pos.y, 5, 0, Math.PI * 2);
        c.fill();
        c.closePath();
    }
    c.lineWidth = 10;
    for (let i = 1; i < rope.length - 1; i++) {
        let rop = rope[i];
        c.beginPath();
        c.moveTo(rop.pos.x, rop.pos.y);
        c.lineTo(rope[i - 1].pos.x, rope[i - 1].pos.y);
        c.strokeStyle = "blue";
        c.stroke();
        c.closePath();
    }

    c.beginPath();
    c.arc(rope[rope.length - 2].pos.x, rope[rope.length - 2].pos.y, 10, 0, Math.PI * 2);
    c.fill();
    c.closePath();

    if (!ropePicked) {
        const r = rope[0];
        const diffX = mouseOnPage.x - r.pos.x;
        const diffY = mouseOnPage.y - r.pos.y;
        const distSqr = diffX * diffX + diffY * diffY;
        if (distSqr < 20 * 20) {
            c.strokeStyle = "blue";
            c.lineWidth = "5";
            c.beginPath();
            c.arc(r.pos.x, r.pos.y, 20, 0, Math.PI * 2);
            c.stroke();
            c.closePath();
        }

        c.font = "20px Verdana";
        c.fillStyle = "rgba(255,255,255,0.25)";
        c.fillText("Click me!", r.pos.x - 38, r.pos.y - 20);
    }
}

function maffs() {
    let rop;
    let i;
    if (ropePicked) {
        rope[0].pos.x = mouseOnPage.x;
        rope[0].pos.y = mouseOnPage.y;
        if (mouseTrigger) {
            mouseTrigger = false;
            ropePicked = false;
            rope[0].stuck = false;
        }
    } else if (mouseTrigger) {
        mouseTrigger = false;
        const r = rope[0];
        const diffX = mouseOnPage.x - r.pos.x;
        const diffY = mouseOnPage.y - r.pos.y;
        const distSqr = diffX * diffX + diffY * diffY;
        if (distSqr < 20 * 20) {
            ropePicked = true;
            rope[0].stuck = true;
        }
    }

    for (i = 0; i < rope.length - 1; i++) {
        rop = rope[i];
        const btmAngle = new Vec((rope[i + 1].pos.x - rop.pos.x), (rope[i + 1].pos.y - rop.pos.y));
        const hyp = Math.sqrt(btmAngle.x * btmAngle.x + btmAngle.y * btmAngle.y);
        rop.btm = new Vec(rop.pos.x + (btmAngle.x / hyp) * 30, rop.pos.y + (btmAngle.y / hyp) * 30);
    }
    for (i = 0; i < rope.length - 1; i++) {
        rop = rope[i];
        if (rop.stuck) continue;
        rop.prev.x = rop.pos.x;
        rop.prev.y = rop.pos.y;

        // Turbulence
        rop.vel.x += Math.random() * 0.5;
        rop.vel.y += Math.random() * 0.1;

        if (i > 0) {
            const newVel1 = new Vec((rope[i - 1].btm.x - rop.pos.x) / 2, (rope[i - 1].btm.y - rop.pos.y) / 2);
            rop.vel.x += newVel1.x;
            rop.vel.y += newVel1.y;
        }
        if (i < rope.length - 2) {
            const newVel2 = new Vec((rope[i + 1].pos.x - rop.btm.x) / 2, (rope[i + 1].pos.y - rop.btm.y) / 2);
            rop.vel.x += newVel2.x;
            rop.vel.y += newVel2.y;
        }
        rop.vel.x *= 0.9;
        rop.vel.y *= 0.9;
        rop.vel.y += 1;
        rop.pos.x += rop.vel.x;
        rop.pos.y += rop.vel.y;
    }


    for (i = 0; i < rope.length; i++) {
        rop = rope[i];
        if (rop.pos.x < 0) rop.pos.x = 0;
        if (rop.pos.x > bgCanvas.width) rop.pos.x = bgCanvas.width;
        if (rop.pos.y < 0) rop.pos.y = 0;
        if (rop.pos.y > bgCanvas.height) rop.pos.y = bgCanvas.height;
    }
}

update();