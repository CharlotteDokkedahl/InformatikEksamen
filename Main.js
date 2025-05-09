//Globale variabler

//Variabler til isterninger
let icecube;
let xIs1 = -10;
let xIs2 = 360;
const xIs1Slut = 60;
const xIs2Slut = 230;
flytIs = false;

//Variabler til ild
ildTaend = true;

//Variabler til tilsætning af stoffer
let yFe = 95;
let yScn = 95;
fe = false;
scn = false;

//Variabler til volumer
storeVolume = false;
mindreVolume = false;

//Cirkel arrays
let mangeCirklerLilla = [];       //SCN-
let mangeCirklerGron = [];       //Fe3+
let nyCirkler = [];             //FeSCN2+
let usynligCirkler = [];        //Usynlig

//Antal af cirkler
let antalCirklerLilla = 10;
let antalCirklerGron = 10;
let antalUsynligCirkler = 5;

// Variabler til glassets koordinater
let GlasP1x = 150;
let GlasP1y = 170;
let GlasP2x = 150;
let GlasP2y = 370;
let GlasP3x = 330;
let GlasP3y = 370;
let GlasP4x = 330;
let GlasP4y = 170;

function preload() //Loader billeder inden programmet loades
{
  icecube = loadImage('icecubes.png');
  ild = loadImage('ild.png');
  reagens = loadImage('reagens.png');
}

function setup() 
{
  createCanvas(870, 450);
  angleMode(DEGREES);

  //Knapper
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

  //Starter arrays
  for (let i = 0; i < antalCirklerLilla; i++) 
  {
    mangeCirklerLilla.push(nyCirkel(3));
  }

  for (let j = 0; j < antalCirklerGron; j++) 
  {
    mangeCirklerGron.push(nyCirkel(3));
  }

  for (let o = 0; o < antalUsynligCirkler; o++) 
  {
    usynligCirkler.push(nyCirkel(5));
  }

}

function draw() 
{
  background(220);
  fyld(); //Fylder glassets baggrund

  //Kører funktioner der flytter og tegner cirklerne
  tegnOgFlytAlle(mangeCirklerLilla, color(100, 200, 170));
  tegnOgFlytAlle(mangeCirklerGron, color(150, 100, 250));
  tegnOgFlytAlle(nyCirkler, color(200, 0, 0));
  tegnOgFlytAlle(usynligCirkler, color(250,250,250,0));

  //Kører funktioner der får cirkler til at reagere
  reaktionLillaOgGron();
  reaktionUsynligOgRod();

  //Kører diverse funktioner
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


//Cirkel funktioner

function nyCirkel(r) //Opretter en ny cirkel med tilfældig postition og hastighed
{
  let x = random(GlasP1x + 40, GlasP4x - 40);
  let y = random(GlasP1y + 5, GlasP3y - 5);

  let speedX = random(-3,3);
  let speedY = random(-3,3);

  let cirkel = {
    x: x, 
    y: y, 
    r: r, 
    vx: speedX, 
    vy: speedY
  }; 

  return cirkel;
}

function tegnOgFlytAlle(arr, farve) //Tegner og flytter cirkler i arrays
{
  for (let i = arr.length - 1; i >= 0; i--) 
  {
    fill(farve);
    noStroke();
    circle(arr[i].x, arr[i].y, arr[i].r * 2);
    flyt(arr[i]);
  }
}

function flyt(c) //Opdaterer position og vægkollision
{
  c.x = c.x + c.vx;
  c.y = c.y + c.vy;

  //Kollision
  if (c.x < GlasP1x + c.r) 
  {
   c.vx = c.vx * -1; 
  }

  if (c.x > GlasP4x - c.r) 
  {
   c.vx = c.vx * -1;
  }

  if (c.y < GlasP1y + c.r) 
  {
   c.vy = c.vy * -1;
  }

  if (c.y > GlasP3y - c.r) 
  {
   c.vy = c.vy * -1; 
  }
  
}

function afstand(a, b) //Regner afstand mellem cirkler
{
  return dist(a.x, a.y, b.x, b.y);
}

function reaktionLillaOgGron() //Reaktion mellem lilla og grøn giver rød
{
  for (let i = mangeCirklerLilla.length - 1; i >= 0; i--) 
  {
    for (let j = mangeCirklerGron.length - 1; j >= 0; j--) 
    {
      if (afstand(mangeCirklerLilla[i], mangeCirklerGron[j]) < mangeCirklerLilla[i].r + mangeCirklerGron[j].r) 
      {
        const midX = (mangeCirklerLilla[i].x + mangeCirklerGron[j].x) / 2;
        const midY = (mangeCirklerLilla[i].y + mangeCirklerGron[j].y) / 2;
        const ny = nyCirkel(5);
        ny.x = midX;
        ny.y = midY;
        nyCirkler.push(ny);
        mangeCirklerLilla.splice(i, 1);
        mangeCirklerGron.splice(j, 1);
        break;
      }
    }
  }
}

function reaktionUsynligOgRod() //Reaktion mellem rød og usynlig giver lilla og grøn
{
  for (let o = 0; o < usynligCirkler.length; o++) 
  {
    for (let r = nyCirkler.length - 1; r >= 0; r--) 
    {
      if (afstand(usynligCirkler[o], nyCirkler[r]) < usynligCirkler[o].r + nyCirkler[r].r) 
      {
        const rx = nyCirkler[r].x;
        const ry = nyCirkler[r].y;
        let nyLilla = nyCirkel(3);
        nyLilla.x = rx + random(-3, 3);
        nyLilla.y = ry + random(-3, 3);
        let nyGron = nyCirkel(3);
        nyGron.x = rx + random(-3, 3);
        nyGron.y = ry + random(-3, 3);
        mangeCirklerLilla.push(nyLilla);
        mangeCirklerGron.push(nyGron);
        nyCirkler.splice(r, 1);
        break;
      }
    }
  }
}

function tegnGlas() //Tegner glasset der indeholder cirklerne
{
  stroke(0);
  strokeWeight(2);
  line(GlasP1x,GlasP1y,GlasP2x,GlasP2y);
  line(GlasP2x,GlasP2y,GlasP3x,GlasP3y);
  line(GlasP3x,GlasP3y,GlasP4x,GlasP4y);
}

//Is funktioner
function tegnIs() //Indsætter billeder af isterninger
{
  icecube.resize(115, 100);
  image(icecube, xIs1, 300);
  image(icecube, xIs2, 300);
}

function startFlytIs() //Starter isfunktionerne efter knappen trykkes
{
  reset(); //Resetter alle andre indgrebsfunktioner
  flytIs = true;
}

function opdaterIs() //Får isterninger til at bevæge sig mod midten
{
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
  
  if (abs(xIs1 - xIs1Slut) <= 1) //Stopper bevægelsen og starter kulde funktion
  {
    flytIs = false;

    for (let i = usynligCirkler.length - 3; i >= 0; i--) 
    {
      usynligCirkler.splice(i, 1); //Fjerner usynlige cirkler så der kommer flere røde
    }
  }

  /*if (abs(xIs2 - xIs2Slut) <= 1)
  {
    flytIs = false;
    kulde();
  }*/
}

//Ild funktioner
function tegnIld() //Indsætter billede af ild
{
  ild.resize(110,110);
  image(ild, 185, 360);
}

function opdaterIld() //Fjerner rektangel så ild er synligt
{
  if(ildTaend)
    {
      fill(220);
      noStroke();
      rect(225,375,30,30);
    }
}

function startIldTaend() //Starter ildfunktionerne
{
  reset(); //Resetter alle andre indgrebsfunktioner
  ildTaend = false;
  
  for (let o = 0; o < antalUsynligCirkler; o++) //Laver usynlige cirkler så der kommer mindre røde cirkler
  {
    usynligCirkler.push(nyCirkel(5));
  }
}

//Tilsætning af stoffer
function tegnReagens() //Indsætter billeder af 2 reagensglas
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

  if(fe) //Tegner lilla cirkel når fe = true
  {
    fill(100,200,170);
    circle(170, yFe, 20);
  }

  if (scn) //Tegner grøn cirkel når scn = true
  {
    fill(150,100,250);
    circle(300,yScn,20);
  }
}

function startFE() //Starter funktionen når der trykkes på knappen
{
  reset(); //Resetter alle andre indgreb
  fe = true;
}


function opdaterFE() //Får cirkel(Fe) til at falde ned og tilføjer flere grønne crikler
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
        mangeCirklerLilla.push(nyGrøn);
      }
    }
  }
}

function startSCN() //Starter funktionen når der trykkes på knappen
{
  reset(); //Resetter alle andre indgreb
  scn = true;
}

function opdaterSCN() //Får cirkel(SCN) til at falde ned og tilføjer flere lilla cirkler
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
        mangeCirklerGron.push(nyGrøn);
      }
    }
  }
}

//Volumefunktioner
function startStore() //Starter storvolume funktionen
{
  reset(); //Resetter alle andre indgreb
  storeVolume = true;
}

function opdaterStore() //Ændrer størrelsen på glasset
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

function startMindre() //Starter lillevolume funktionen
{
  reset(); //Resetter alle andre indgreb
  mindreVolume = true;
}

function opdaterMindre() //Ændrer størrelsen på glasset
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

//Viser alt GUI
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
  text('Fe3+(grøn) + SCN-(lilla) <-> FeSCN2+(rød)',525,85);
  text('I en kemisk ligevægt kan du foretage forskellige indgreb. Indgreb i kemisk ligevægt kan beskrives ved Henry Le Chateliers princip:', 505,105,350);
  push();
  textAlign(CENTER);
  textStyle(ITALIC);
  text('Et ydre indgreb i et ligevægtssystem fremkalder en forskydning, som formindsker virkningen af indgrebet.',525,165,300);
  pop();
  text('For at foretage et indgreb i den simulere reaktion kan du trykke på en af det 6 knapper nedenunder. Oplever du at programmet ikke fungerer kan du trykke på knappen "Reset" ovenover.',505,240,350);

  //Tekst over knapper
  fill(0);
  noStroke();
  textSize(20);
  text("Teori og brugervejledning", 510, 35);
  text("Tempratur:", 505, 360);
  text("Stoffer:", 625, 360);
  text("Volume:", 745, 360);

  //Tekst til antal cirkler
  fill(0);
  textSize(13);
  text("Fe 3+ (grøn): " + mangeCirklerLilla.length, 20, 190);
  text("SCN - (lilla): " + mangeCirklerGron.length, 20, 205);
  text("FeSCN 2+ (rød): " + nyCirkler.length, 20, 220);
}

function fyld() //Farver glassets baggrund 
{
  let rød = 200;

  if (nyCirkler.length>4)
  { 
    rød = 255;
  }

  noStroke();
  fill(rød,100,100,150);
  rect(GlasP1x,GlasP1y,GlasP4x-GlasP1x,GlasP2y-GlasP1y);
}

function reset() //Resetter alle indgrebsfunktioner
{
  // Nulstil alle variabler og arrays
  xIs1 = -10;
  xIs2 = 360;

  flytIs = false;
  ildTaend = true;
  storeVolume = false;
  mindreVolume = false;

  // Variabler til glasset
  GlasP1x = 150;
  GlasP1y = 170;
  GlasP2x = 150;
  GlasP2y = 370;
  GlasP3x = 330;
  GlasP3y = 370; 
  GlasP4x = 330; 
  GlasP4y = 170; 

  // Tøm alle arrays og genskaber dem
  mangeCirklerLilla = [];
  mangeCirklerGron = [];
  nyCirkler = [];
  usynligCirkler = [];

  for (let i = 0; i < antalCirklerLilla; i++) {
    mangeCirklerLilla.push(nyCirkel(3));
  }

  for (let j = 0; j < antalCirklerGron; j++) {
    mangeCirklerGron.push(nyCirkel(3));
  }

  for (let o = 0; o < antalUsynligCirkler; o++) {
    usynligCirkler.push(nyCirkel(5));
  }
}