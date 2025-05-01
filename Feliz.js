// Variabler til isterninger
let icecube;
let xIs1 = -10;
let xIs2 = 360;
const xIs1Slut = 60;
const xIs2Slut = 230;
let flytIs = false;

ildTaend = true;
storeVolume = false;
mindreVolume = false;

// Arrays til cirkler
let mangeCirklerLille = [];
let mangeCirklerStor = [];
let nyCirkler = [];
let orangeCirkler = [];

const antalCirklerLille = 10;
const antalCirklerStor = 10;
const antalOrangeCirkler = 5;

// Variabler til glasset
let GlasP1x = 150; //150
let GlasP1y = 170; //170
let GlasP2x = 150; //150
let GlasP2y = 370; //370
let GlasP3x = 330; //330
let GlasP3y = 370; //370
let GlasP4x = 330; //330
let GlasP4y = 170; //170


function preload() {
  icecube = loadImage("icecubes.png");
  ild = loadImage('ild.png');
}

function setup() {
  createCanvas(870, 450);
  
  createButton("Større volume").position(760, 390).size(110, 30).mousePressed(startStore);
  createButton("Mindre volume").position(760, 420).size(110, 30).mousePressed(startMindre);
  createButton("Tilsæt Fe3+").position(640, 390).size(110, 30);
  createButton("Tilsæt SCN-").position(640, 420).size(110, 30);
  createButton("Tilføj varme").position(520, 390).size(110, 30).mousePressed(startIldTaend);
  createButton("Tilføj kulde").position(520, 420).size(110, 30).mousePressed(startFlytIs);

  for (let i = 0; i < antalCirklerLille; i++) mangeCirklerLille.push(nyCirkel(3));
  for (let j = 0; j < antalCirklerStor; j++) mangeCirklerStor.push(nyCirkel(3));
  for (let o = 0; o < antalOrangeCirkler; o++) orangeCirkler.push(nyCirkel(5));
}

function draw() {
  background(220);

  tegnOgFlytAlle(mangeCirklerLille, color(100, 200, 170));
  tegnOgFlytAlle(mangeCirklerStor, color(150, 100, 250));
  tegnOgFlytAlle(nyCirkler, color(200, 0, 0));
  tegnOgFlytAlle(orangeCirkler, color(250));

  reaktionLilleOgStor();
  reaktionOrangeOgRod();

  visGUI();
  tegnGlas();
  tegnIs();
  opdaterIs();
  tegnIld();
  opdaterIld();
  opdaterStore();
  opdaterMindre();

  stroke(0);
  strokeWeight(2);
  line(GlasP1x,GlasP1y,GlasP2x,GlasP2y);
  line(GlasP2x,GlasP2y,GlasP3x,GlasP3y);
  line(GlasP3x,GlasP3y,GlasP4x,GlasP4y);
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

function tegnOgFlytAlle(arr, farve) {
  for (let i = arr.length - 1; i >= 0; i--) {
    fill(farve);
    noStroke();
    circle(arr[i].x, arr[i].y, arr[i].r * 2);
    flyt(arr[i]);
    //if (arr === mangeCirklerLille && i === 0) tegnGlas();
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

function tegnGlas() 
{
  stroke(0);
  strokeWeight(2);
  line(GlasP1x,GlasP1y,GlasP2x,GlasP2y);
  line(GlasP2x,GlasP2y,GlasP3x,GlasP3y);
  line(GlasP3x,GlasP3y,GlasP4x,GlasP4y);
}


//Is funktioner
function tegnIs() 
{
  icecube.resize(115, 100);
  image(icecube, xIs1, 300);
  image(icecube, xIs2, 300);
}

function opdaterIs() {
  if (flytIs) 
  {
    if (abs(xIs1 - xIs1Slut) > 1)
    {
      xIs1 = xIs1 + 1;
    }
    if (abs(xIs2 - xIs2Slut) > 1)
    {
      xIs2 = xIs2 - 1;
    }
  }
  if (abs(xIs1 - xIs1Slut) <= 1)
  {
    flytIs = false;
  }

  if (abs(xIs2 - xIs2Slut) <= 1)
  {
    flytIs = false;
  }
}

function startFlytIs() 
{
  flytIs = true;
}

//Ild funktioner
function tegnIld()
{
  ild.resize(110,110);
  image(ild, 185, 360);
}

function opdaterIld()
{
  if(ildTaend)
    {
      fill(220);
      noStroke();
      rect(225,375,30,30);
    }
}

function startIldTaend()
{
  ildTaend = false;
}

//Volume funktioner
function opdaterStore()
{
  if(storeVolume)
    {
      GlasP1x = 120;
      GlasP1y = 170;
      GlasP2x = 120;
      GlasP2y = 370;
      GlasP3x = 360;
      GlasP3y = 370;
      GlasP4x = 360;
      GlasP4y = 170;
    }
}

function startStore()
{
  storeVolume = true;
}

function opdaterMindre()
{
  if(mindreVolume)
    {
      GlasP1x = 180;
      GlasP1y = 170;
      GlasP2x = 180;
      GlasP2y = 370;
      GlasP3x = 300;
      GlasP3y = 370;
      GlasP4x = 300;
      GlasP4y = 170;
    }
}

function startMindre()
{
  mindreVolume = true;
}


function visGUI() 
{
  fill(255);
  stroke(0);
  rect(500,50,350,270);

  fill(0);
  noStroke();
  textSize(20);
  text("Teori og brugervejledning", 510, 35);
  text("Tempratur:", 505, 360);
  text("Stoffer:", 625, 360);
  text("Volume:", 745, 360);
}
