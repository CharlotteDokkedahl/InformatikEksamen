//variabler
xIs1 = -10;
xIs2 = 360;
xIs1Slut = 60;
xIs2Slut = 230;
flytIs = false;
ildTaend = true;
storeVolume = false;
mindreVolume = false;

GlasP1x = 150; //150
GlasP1y = 170; //170
GlasP2x = 150; //150
GlasP2y = 370; //370
GlasP3x = 330; //330
GlasP3y = 370; //370
GlasP4x = 330; //330
GlasP4y = 170; //170

let mangeCirklerLille = [];
let mangeCirklerStor = [];
let nyCirkler = [];
let orangeCirkler = [];

let antalCirklerLille = 10;
let antalCirklerStor = 10;
let antalOrangeCirkler = 5;

function preload()
{
    icecube = loadImage('icecubes.png');
    ild = loadImage('ild.png');
}

function setup() 
{
    createCanvas(870, 450);

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

    let button4 = createButton('Tilsæt SCN-');
    button4.position(640, 420);
    button4.size(110,30);

    let button5 = createButton('Tilføj varme');
    button5.position(520, 390);
    button5.size(110,30);
    button5.mousePressed(startIldTaend);

<<<<<<< HEAD
let button6 = createButton('Tilføj kulde');
button6.position(500, 400);
button6.size(110,30);
button6.mousePressed(startFlytIs);

for (let i = 0; i < antalCirklerLille; i++) {
  mangeCirklerLille.push(new Cirkler(3));
}

for (let j = 0; j < antalCirklerStor; j++) {
  mangeCirklerStor.push(new Cirkler(3));
}

for (let o = 0; o < antalOrangeCirkler; o++) {
  orangeCirkler.push(new Cirkler(5));
}
=======
    let button6 = createButton('Tilføj kulde');
    button6.position(520, 420);
    button6.size(110,30);
    button6.mousePressed(startFlytIs);
>>>>>>> ae059c00d987c22c40aa6882d18106d47be556ee

}

function draw() 
{
background(220);

<<<<<<< HEAD
  // små lilla
  for (let i = mangeCirklerLille.length - 1; i >= 0; i--) {
    mangeCirklerLille[i].TegnCirkel(100, 200, 170);
    mangeCirklerLille[i].FlytCirkel();
    mangeCirklerLille[i].Glas();
  }
=======
fill(255);
stroke(0);
rect(500,50,350,270);
  line(GlasP1x,GlasP1y,GlasP2x,GlasP2y);
  line(GlasP2x,GlasP2y,GlasP3x,GlasP3y);
  line(GlasP3x,GlasP3y,GlasP4x,GlasP4y);
>>>>>>> ae059c00d987c22c40aa6882d18106d47be556ee

  // store grønne
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
    orangeCirkler[o].TegnCirkel(250);
    orangeCirkler[o].FlytCirkel();
  }

  // reaktion mellem lilla og grøn => rød
  for (let i = mangeCirklerLille.length - 1; i >= 0; i--) {
    for (let j = mangeCirklerStor.length - 1; j >= 0; j--) {
      if (mangeCirklerLille[i].Interaktion(mangeCirklerStor[j])) {
        // lav en ny rød cirkel midt imellem
        let midX = (mangeCirklerLille[i].xCirkel + mangeCirklerStor[j].xCirkel) / 2;
        let midY = (mangeCirklerLille[i].yCirkel + mangeCirklerStor[j].yCirkel) / 2;

        let ny = new Cirkler(5);
        ny.xCirkel = midX;
        ny.yCirkel = midY;
        nyCirkler.push(ny);

        mangeCirklerLille.splice(i, 1);
        mangeCirklerStor.splice(j, 1);
        break;
      }
    }
  }

  // reaktion mellem orange og rød => lilla og grøn
  for (let o = 0; o < orangeCirkler.length; o++) {
    for (let r = nyCirkler.length - 1; r >= 0; r--) {
      if (orangeCirkler[o].Interaktion(nyCirkler[r])) {
        let rx = nyCirkler[r].xCirkel;
        let ry = nyCirkler[r].yCirkel;

        let nyLilla = new Cirkler(3);
        nyLilla.xCirkel = rx + random(-5, 5);
        nyLilla.yCirkel = ry + random(-5, 5);

        let nyGrøn = new Cirkler(3);
        nyGrøn.xCirkel = rx + random(-5, 5);
        nyGrøn.yCirkel = ry + random(-5, 5);

        mangeCirklerLille.push(nyLilla);
        mangeCirklerStor.push(nyGrøn);

        nyCirkler.splice(r, 1);
        break;
      }
    }
  }



  fill(0);
  textSize(20);
  text('Teori og brugervejledning',510,35);
  text('Tempratur:',505,360);
  text('Stoffer:',625,360);
  text('Volume:',745,360);

//billeder
icecube.resize(115,100);
image(icecube, xIs1, 300);
image(icecube, xIs2, 300);

ild.resize(110,110);
image(ild, 185, 360);

  //Starter isen
  if (flytIs) 
  {
    if(abs(xIs1 - xIs1Slut) > 1)
      {
       xIs1 = xIs1 + 1;
      }
    if(abs(xIs2 - xIs2Slut) > 1)
      {
       xIs2 = xIs2 - 1;
     }
  }

  //Stopper isen
  if(abs(xIs1 - xIs1Slut) <= 1)
    {
      flytIs = false;
    }

<<<<<<< HEAD
  if(abs(xIs2 - xIs2Slut) <= 1)
    {
      flytIs = false;
    }

    
=======
if(ildTaend)
  {
    fill(220);
    noStroke();
    rect(225,375,30,30);
  }

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
>>>>>>> ae059c00d987c22c40aa6882d18106d47be556ee
}

function startFlytIs()
{
flytIs = true;
}

<<<<<<< HEAD
class Cirkler {
  constructor(r) {
    this.GlasP1x = 150;
    this.GlasP1y = 170;
    this.GlasP2x = 150;
    this.GlasP2y = 370;
    this.GlasP3x = 330;
    this.GlasP3y = 370;
    this.GlasP4x = 330;
    this.GlasP4y = 170;

    this.xCirkel = random(this.GlasP1x + 5, this.GlasP4x - 5);
    this.yCirkel = random(this.GlasP1y + 5, this.GlasP2y - 5);
    this.rCirkel = r;
    this.speedX = random(-3, 3);
    this.speedY = random(-3,3);
  }

  TegnCirkel(red, green, blue) {
    fill(red, green, blue);
    noStroke();
    circle(this.xCirkel, this.yCirkel, this.rCirkel * 2);
  }

  FlytCirkel() {
    this.xCirkel += this.speedX;
    this.yCirkel += this.speedY;

    if (this.xCirkel < this.GlasP1x + this.rCirkel+2) this.speedX *= -1;
    if (this.xCirkel > this.GlasP4x - this.rCirkel-2) this.speedX *= -1;
    if (this.yCirkel < this.GlasP1y + this.rCirkel+2) this.speedY *= -1;
    if (this.yCirkel > this.GlasP2y - this.rCirkel-2) this.speedY *= -1;
  }

  Interaktion(anden) {
    let distance = dist(this.xCirkel, this.yCirkel, anden.xCirkel, anden.yCirkel);
    return this.rCirkel + anden.rCirkel > distance;
  }

  Glas() {
    stroke(0);
    strokeWeight(2);
    line(this.GlasP1x, this.GlasP1y, this.GlasP2x, this.GlasP2y);
    line(this.GlasP2x, this.GlasP2y, this.GlasP3x, this.GlasP3y);
    line(this.GlasP3x, this.GlasP3y, this.GlasP4x, this.GlasP4y);
  }
}

=======
function startIldTaend()
{
ildTaend = false;
}

function startStore()
{
storeVolume = true;
}

function startMindre()
{
mindreVolume = true;
}
>>>>>>> ae059c00d987c22c40aa6882d18106d47be556ee
