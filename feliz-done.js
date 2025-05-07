//variabler
let icecube;
let xIs1 = -10;
let xIs2 = 360;
const xIs1Slut = 60;
const xIs2Slut = 230;

let yFe = 95;
let yScn = 95;
fe = false;
scn = false;

flytIs = false;
ildTaend = true;
storeVolume = false;
mindreVolume = false;

let mangeCirklerLille = [];
let mangeCirklerStor = [];
let nyCirkler = [];
let orangeCirkler = [];

let antalCirklerLille = 10;
let antalCirklerStor = 10;
let antalOrangeCirkler = 5;

// Variabler til glasset
let GlasP1x = 150; //150
let GlasP1y = 170; //170
let GlasP2x = 150; //150
let GlasP2y = 370; //370
let GlasP3x = 330; //330
let GlasP3y = 370; //370
let GlasP4x = 330; //330
let GlasP4y = 170; //170

function preload()
{
  icecube = loadImage('icecubes.png');
  ild = loadImage('ild.png');
  reagens = loadImage('reagens.png');
}

function setup() 
{
  createCanvas(870, 450);

  angleMode(DEGREES);

  //knapper
  let button1 = createButton('Større volume');
  button1.position(760, 390);
  button1.size(110,30);
  button1.mousePressed(startStore);

  let button2 = createButton('Mindre volume');
  button2.position(760, 420);
  button2.size(110,30);
  button2.mousePressed(startMindre);

  let button3 = createButton('Tilsæt Fe3+');
  button3.position(640, 390);
  button3.size(110,30);
  button3.mousePressed(startFE);

  let button4 = createButton('Tilsæt SCN-');
  button4.position(640, 420);
  button4.size(110,30);
  button4.mousePressed(startSCN);

  let button5 = createButton('Tilføj varme');
  button5.position(520, 390);
  button5.size(110,30);
  button5.mousePressed(startIldTaend);

  let button6 = createButton('Tilføj kulde');
  button6.position(520, 420);
  button6.size(110,30);
  button6.mousePressed(startFlytIs);

  let button7 = createButton('Reset');
  button7.position(760, 35);
  button7.size(110,30);
  button7.mousePressed(reset);

  for (let i = 0; i < antalCirklerLille; i++) {
    mangeCirklerLille.push(nyCirkel(3));
  }

  for (let j = 0; j < antalCirklerStor; j++) {
    mangeCirklerStor.push(nyCirkel(3));
  }

  for (let o = 0; o < antalOrangeCirkler; o++) {
    orangeCirkler.push(nyCirkel(5));
  }

}

function draw() 
{
  background(220);
  fyld();

  tegnOgFlytAlle(mangeCirklerLille, color(100, 200, 170));
  tegnOgFlytAlle(mangeCirklerStor, color(150, 100, 250));
  tegnOgFlytAlle(nyCirkler, color(200, 0, 0));
  tegnOgFlytAlle(orangeCirkler, color(250));

  reaktionLilleOgStor();
  reaktionOrangeOgRod();

  reaktionLilleOgStor();
  reaktionOrangeOgRod();

  tegnGlas();
  tegnIs();
  opdaterIs();
  tegnIld();
  opdaterIld();
  opdaterStore();
  opdaterMindre();
  tegnReagens();
  opdaterFE();
  opdaterSCN();
  visGUI();

}


//Atom funktioner
function nyCirkel(r) {
  const x = random(GlasP1x + 40, GlasP4x - 40);
  const y = random(GlasP1y + 5, GlasP3y-5);
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
  }
}

function flyt(c) {
  c.x += c.vx;
  c.y += c.vy;
  if (c.x < GlasP1x + c.r || c.x > GlasP4x - c.r) c.vx *= -1;
  if (c.y < GlasP1y + c.r || c.y > GlasP3y - c.r) c.vy *= -1;
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
        nyLilla.x = rx + random(-3, 3);
        nyLilla.y = ry + random(-3, 3);
        let nyGron = nyCirkel(3);
        nyGron.x = rx + random(-3, 3);
        nyGron.y = ry + random(-3, 3);
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

function startFlytIs()
{
  reset();
  flytIs = true;
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
    kulde();
  }

  /*if (abs(xIs2 - xIs2Slut) <= 1)
  {
    flytIs = false;
    kulde();
  }*/
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
  reset();
  ildTaend = false;
  
  for (let o = 0; o < antalOrangeCirkler; o++) {
    orangeCirkler.push(nyCirkel(5));
  }
}

//Volume funktioner
function opdaterStore()
{
  if(storeVolume)
    {
      reset();
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
      reset();
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

function tegnReagens()
{
  push();
  imageMode(CENTER);
  rotate(100);
  reagens.resize(30,120);
  image(reagens, 60, -100);
  pop();
  
  push();
  imageMode(CENTER);
  rotate(260);
  reagens.resize(30,120);
  image(reagens, -140, 360);
  pop();

  if(fe) 
  {
    fill(100,200,170);
    circle(170, yFe, 20);
  }

  if (scn)
  {
    fill(150,100,250);
    circle(300,yScn,20);
  }
}

function startFE()
{
  fe = true;
}


function opdaterFE()
{
  if(fe)
  {
    yFe = yFe + 2;

    if(yFe >= 185)
    {
      fe = false;
      yFe = 95;

      for (let i = 0; i < 5; i++) {
        let nyGrøn = nyCirkel(3);
        mangeCirklerLille.push(nyGrøn);
      }
    }
  }
}

function startSCN()
{
  scn = true;
}

function opdaterSCN()
{
  if(scn)
  {
    yScn = yScn + 2;
    
    if(yScn == 185)
    {
      scn = false;
      yScn = 95;

      for (let i = 0; i < 5; i++) {
        let nyGrøn = nyCirkel(3);
        mangeCirklerStor.push(nyGrøn);
      }
    }
  }
}

function visGUI() 
{
  //Tekstboks og tekst
  fill(255);
  stroke(0);
  rect(500,50,350,270);

  fill(0);
  noStroke();
  textSize(15);
  textWrap(WORD);
  text('Dette er en simulation over den kemiske ligevægt:',505,65);
  text('Fe3+(aq) + SCN-(aq) <-> FeSCN2+(aq)(rød)',525,85);
  text('I en kemisk ligevægt kan du foretage forskellige indgreb. Indgreb i kemisk ligevægt kan beskrives ved Henry Le Chateliers princip:', 505,105,350);
  push();
  textAlign(CENTER);
  textStyle(ITALIC);
  text('Et ydre indgreb i et ligevægtssystem fremkalder en forskydning, som formindsker virkningen af indgrebet.',525,165,300);
  pop();
  text('For at foretage et indgreb i den simulere reaktion kan du trykke på en af det 6 knapper nedenunder. Oplever du at programmet ikke fungere kan du trykke på knappen "Reset" ovenover.',505,240,350);

  //Tekst over knapper
  fill(0);
  noStroke();
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
 noStroke();
 fill(rød,100,100,150);
 rect(GlasP1x,GlasP1y,GlasP4x-GlasP1x,GlasP2y-GlasP1y);

}

function kulde() 
{
  for (let i = orangeCirkler.length - 3; i >= 0; i--) {
    orangeCirkler.splice(i, 1);
  }
}


function reset() 
{
  // Nulstil alle variabler og arrays
  xIs1 = -10;
  xIs2 = 360;

  flytIs = false;
  ildTaend = true;
  storeVolume = false;
  mindreVolume = false;

  // Variabler til glasset
  GlasP1x = 150; //150
  GlasP1y = 170; //170
  GlasP2x = 150; //150
  GlasP2y = 370; //370
  GlasP3x = 330; //330
  GlasP3y = 370; //370
  GlasP4x = 330; //330
  GlasP4y = 170; //170

  // Tøm alle arrays og genskab dem
  mangeCirklerLille = [];
  mangeCirklerStor = [];
  nyCirkler = [];
  orangeCirkler = [];

  for (let i = 0; i < antalCirklerLille; i++) {
    mangeCirklerLille.push(nyCirkel(3));
  }

  for (let j = 0; j < antalCirklerStor; j++) {
    mangeCirklerStor.push(nyCirkel(3));
  }

  for (let o = 0; o < antalOrangeCirkler; o++) {
    orangeCirkler.push(nyCirkel(5));
  }
}