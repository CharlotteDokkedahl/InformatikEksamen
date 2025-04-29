let mangeCirklerLille = [];
let mangeCirklerStor = [];
let nyCirkler = [];
let orangeCirkler = [];

let antalCirklerLille = 10;
let antalCirklerStor = 10;
let antalOrangeCirkler = 5; // <-- Ændr dette tal for at få flere/færre orange cirkler

function setup() {
  createCanvas(400, 400);

  for (let i = 0; i < antalCirklerLille; i++) {
    mangeCirklerLille.push(new Cirkler(random(0, 400), random(0, 400), 7));
  }

  for (let j = 0; j < antalCirklerStor; j++) {
    mangeCirklerStor.push(new Cirkler(random(0, 400), random(0, 400), 7));
  }

  for (let o = 0; o < antalOrangeCirkler; o++) {
    orangeCirkler.push(new Cirkler(random(0, 400), random(0, 400), 10));
  }
}

function draw() {
  background(220);

  // små
  for (let i = mangeCirklerLille.length - 1; i >= 0; i--) {
    mangeCirklerLille[i].TegnCirkel(100, 200, 170);
    mangeCirklerLille[i].FlytCirkel();
  }

  // store
  for (let j = mangeCirklerStor.length - 1; j >= 0; j--) {
    mangeCirklerStor[j].TegnCirkel(150, 100, 250);
    mangeCirklerStor[j].FlytCirkel();
  }

  // røde
  for (let k = nyCirkler.length - 1; k >= 0; k--) {
    nyCirkler[k].TegnCirkel(200, 0, 0);
    nyCirkler[k].FlytCirkel();
  }

  // orange
  for (let o = orangeCirkler.length - 1; o >= 0; o--) {
    orangeCirkler[o].TegnCirkel(200,100,100);
    orangeCirkler[o].FlytCirkel();
  }

  // reaktion mellem lille og stor -> rød
  for (let i = mangeCirklerLille.length - 1; i >= 0; i--) {
    for (let j = mangeCirklerStor.length - 1; j >= 0; j--) {
      if (mangeCirklerLille[i].Interaktion(mangeCirklerStor[j])) {
        let midX = (mangeCirklerLille[i].x + mangeCirklerStor[j].x) / 2;
        let midY = (mangeCirklerLille[i].y + mangeCirklerStor[j].y) / 2;
        nyCirkler.push(new Cirkler(midX, midY, 10));

        mangeCirklerLille.splice(i, 1);
        mangeCirklerStor.splice(j, 1);
        break;
      }
    }
  }

  // reaktion mellem orange og rød -> lille og stor
  for (let o = 0; o < orangeCirkler.length; o++) {
    for (let r = nyCirkler.length - 1; r >= 0; r--) {
      if (orangeCirkler[o].Interaktion(nyCirkler[r])) {
        mangeCirklerLille.push(new Cirkler(nyCirkler[r].x + random(-20, 20), nyCirkler[r].y + random(-20, 20), 7));
        mangeCirklerStor.push(new Cirkler(nyCirkler[r].x + random(-20, 20), nyCirkler[r].y + random(-20, 20), 7));
        nyCirkler.splice(r, 1);
        break;
      }
    }
  }
}

class Cirkler {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.speedX = random(-2, 2);
    this.speedY = random(-2, 2);
  }

  TegnCirkel(red, green, blue) {
    fill(red, green, blue);
    noStroke();
    circle(this.x, this.y, this.r * 2);
  }

  FlytCirkel() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > width) this.speedX *= -1;
    if (this.y < 0 || this.y > height) this.speedY *= -1;
  }

  Interaktion(anden) {
    let distance = dist(this.x, this.y, anden.x, anden.y);
    return this.r + anden.r > distance;
  }
}
