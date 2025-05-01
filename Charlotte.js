// Variabler til isterninger
let xIs1 = -10;
let xIs2 = 360;
const xIs1Slut = 60;
const xIs2Slut = 230;
let flytIs = false;

// Arrays til cirkler
let mangeCirklerLille = [];
let mangeCirklerStor = [];
let nyCirkler = [];
let orangeCirkler = [];

let antalCirklerLille = 10;
let antalCirklerStor = 10;
let antalOrangeCirkler = 2
;

let icecube;

function preload() {
  icecube = loadImage("icecubes.png");
}

function setup() {
  createCanvas(870, 450);
  
  createButton("Større volume").position(740, 370).size(110, 30);
  createButton("Mindre volume").position(740, 400).size(110, 30);
  createButton("Tilsæt Fe3+").position(620, 370).size(110, 30);
  createButton("Tilsæt SCN-").position(620, 400).size(110, 30);
  createButton("Tilføj varme").position(500, 370).size(110, 30);
  createButton("Tilføj kulde").position(500, 400).size(110, 30).mousePressed(startFlytIs);

  for (let i = 0; i < antalCirklerLille; i++) mangeCirklerLille.push(nyCirkel(3));
  for (let j = 0; j < antalCirklerStor; j++) mangeCirklerStor.push(nyCirkel(3));
  for (let o = 0; o < antalOrangeCirkler; o++) orangeCirkler.push(nyCirkel(5));
}

function draw() {

  background(220);
  fyld();

  tegnOgFlytAlle(mangeCirklerLille,100, 200, 170);
  tegnOgFlytAlle(mangeCirklerStor,150, 100, 250);
  tegnOgFlytAlle(nyCirkler,200, 0, 0);
  tegnOgFlytAlle(orangeCirkler,250,250,250);

  reaktionLilleOgStor();
  reaktionOrangeOgRod();

  visGUI();
  tegnIs();
  opdaterIs();

}

function nyCirkel(r) {
  const x = random(155, 325);
  const y = random(175, 365);
  return {
    x, y, r,
    vx: random(-3, 3),
    vy: random(-3, 3),
  };
}

function tegnOgFlytAlle(arr,r,g,b) {
  for (let i = arr.length - 1; i >= 0; i--) {
    fill(r,g,b);
    noStroke();
    circle(arr[i].x, arr[i].y, arr[i].r * 2);
    flyt(arr[i]);
    if (arr === mangeCirklerLille && i === 0) tegnGlas();
  }
}

function flyt(c) {
  c.x += c.vx;
  c.y += c.vy;
  if (c.x < 150 + c.r || c.x > 330 - c.r) c.vx *= -1;
  if (c.y < 170 + c.r || c.y > 370 - c.r) c.vy *= -1;
}

function afstand(a, b) {
  return dist(a.x, a.y, b.x, b.y);
}

function reaktionLilleOgStor() {
  for (let i = mangeCirklerLille.length - 1; i >= 0; i--) {
    for (let j = mangeCirklerStor.length - 1; j >= 0; j--) {
      if (afstand(mangeCirklerLille[i], mangeCirklerStor[j]) < mangeCirklerLille[i].r + mangeCirklerStor[j].r) {
        const midX = (mangeCirklerLille[i].x + mangeCirklerStor[j].x) / 2;
        const midY = (mangeCirklerLille[i].y + mangeCirklerStor[j].y) / 2;
        const ny = nyCirkel(5);
        ny.x = midX;
        ny.y = midY;
        nyCirkler.push(ny);
        mangeCirklerLille.splice(i, 1);
        mangeCirklerStor.splice(j, 1);
        break;
      }
    }
  }
}

function reaktionOrangeOgRod() {
  for (let o = 0; o < orangeCirkler.length; o++) {
    for (let r = nyCirkler.length - 1; r >= 0; r--) {
      if (afstand(orangeCirkler[o], nyCirkler[r]) < orangeCirkler[o].r + nyCirkler[r].r) {
        const rx = nyCirkler[r].x;
        const ry = nyCirkler[r].y;
        let nyLilla = nyCirkel(3);
        nyLilla.x = rx + random(-5, 5);
        nyLilla.y = ry + random(-5, 5);
        let nyGron = nyCirkel(3);
        nyGron.x = rx + random(-5, 5);
        nyGron.y = ry + random(-5, 5);
        mangeCirklerLille.push(nyLilla);
        mangeCirklerStor.push(nyGron);
        nyCirkler.splice(r, 1);
        break;
      }
    }
  }
}

function tegnGlas() {
  stroke(0);
  strokeWeight(2);
  line(150, 170, 150, 370);
  line(150, 370, 330, 370);
  line(330, 370, 330, 170);
}

function tegnIs() {
  icecube.resize(115, 100);
  image(icecube, xIs1, 300);
  image(icecube, xIs2, 300);
}

function opdaterIs() {
  if (flytIs) {
    if (abs(xIs1 - xIs1Slut) > 1) 
      xIs1++;
    if (abs(xIs2 - xIs2Slut) > 1) 
      xIs2--;
  }
  if (abs(xIs1 - xIs1Slut) <= 1 && abs(xIs2 - xIs2Slut) <= 1) 
    flytIs = false;
    tilføjKulde();
}

function tilføjKulde(){
  antalOrangeCirkler = 1;
}

function startFlytIs() {
  flytIs = true;
}

function visGUI() {
  fill(0);
  textSize(20);
  text("Teori og brugervejledning", 510, 35);
  text("Tempratur:", 505, 360);
  text("Stoffer:", 625, 360);
  text("Volume:", 745, 360);
}

function fyld() {
  let rød=200;
 if (nyCirkler.length>4){ 
  rød=255;
 }
 fill(rød,100,100,150);
 rect(150,170,180,200);

}

