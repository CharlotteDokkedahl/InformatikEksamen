//variabler
xIs1 = -10;
xIs2 = 360;
xIs1Slut = 60;
xIs2Slut = 230;
yFe = 95;
yScn = 95;
flytIs = false;
ildTaend = true;
storeVolume = false;
mindreVolume = false;
fe = false;
scn = false;

GlasP1x = 150; //150
GlasP1y = 170; //170
GlasP2x = 150; //150
GlasP2y = 370; //370
GlasP3x = 330; //330
GlasP3y = 370; //370
GlasP4x = 330; //330
GlasP4y = 170; //170

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

let button1 = createButton('Større volume');
button1.position(740, 370);
button1.size(110,30);
button1.mousePressed(startStore);

let button2 = createButton('Mindre volume');
button2.position(740, 400);
button2.size(110,30);
button2.mousePressed(startMindre);

let button3 = createButton('Tilsæt Fe3+');
button3.position(620, 370);
button3.size(110,30);
button3.mousePressed(startFE);

let button4 = createButton('Tilsæt SCN-');
button4.position(620, 400);
button4.size(110,30);
button4.mousePressed(startSCN);

let button5 = createButton('Tilføj varme');
button5.position(500, 370);
button5.size(110,30);
button5.mousePressed(startIldTaend)

let button6 = createButton('Tilføj kulde');
button6.position(500, 400);
button6.size(110,30);
button6.mousePressed(startFlytIs)

}

function draw() 
{
background(220);

if(fe) 
{
  fill(0,255,0);
  circle(170, yFe, 20);
}

if(scn)
{
  fill(0,0,255);
  circle(300, yScn, 20);
}

//bægerglas
fill(255);
stroke(0);
rect(500,50,350,270);
line(GlasP1x,GlasP1y,GlasP2x,GlasP2y);
line(GlasP2x,GlasP2y,GlasP3x,GlasP3y);
line(GlasP3x,GlasP3y,GlasP4x,GlasP4y);

//tekst
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

if(ildTaend)
  {
    fill(220);
    noStroke();
    rect(225,375,30,30);
  }

if(fe)
  {
    yFe = yFe + 1;
    
    if(yFe == 180)
      {
        fe = false;
        yFe = 95;
      }
  }

if(scn)
  {
    yScn = yScn + 1;
    
    if(yScn == 180)
      {
        scn = false;
        yScn = 95;
      }
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

}

function startFlytIs()
{
flytIs = true;
}

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

function startFE()
{
fe = true;
}

function startSCN()
{
scn = true;
}