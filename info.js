//variabler
xIs1 = -10;
xIs2 = 360;
xIs1Slut = 60;
xIs2Slut = 230;
flytIs = false;

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
}

function setup() 
{
createCanvas(870, 450);

let button1 = createButton('Større volume');
button1.position(740, 370);
button1.size(110,30);

let button2 = createButton('Mindre volume');
button2.position(740, 400);
button2.size(110,30);

let button3 = createButton('Tilsæt Fe3+');
button3.position(620, 370);
button3.size(110,30);

let button4 = createButton('Tilsæt SCN-');
button4.position(620, 400);
button4.size(110,30);

let button5 = createButton('Tilføj varme');
button5.position(500, 370);
button5.size(110,30);
button5.mousePressed();

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

}

function draw() 
{
background(220);

  // små lilla
  for (let i = mangeCirklerLille.length - 1; i >= 0; i--) {
    mangeCirklerLille[i].TegnCirkel(100, 200, 170);
    mangeCirklerLille[i].FlytCirkel();
    mangeCirklerLille[i].Glas();
  }

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

  if(abs(xIs2 - xIs2Slut) <= 1)
    {
      flytIs = false;
    }

    
}

function startFlytIs()
{
flytIs = true;
}

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

    if (this.xCirkel < this.GlasP1x + this.rCirkel) this.speedX *= -1;
    if (this.xCirkel > this.GlasP4x - this.rCirkel) this.speedX *= -1;
    if (this.yCirkel < this.GlasP1y + this.rCirkel) this.speedY *= -1;
    if (this.yCirkel > this.GlasP2y - this.rCirkel) this.speedY *= -1;
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

