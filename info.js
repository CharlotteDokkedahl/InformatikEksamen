function setup() 
{
  createCanvas(displayWidth-600,displayHeight-500);
}

function draw() 
{
  background(220);
  
  rect(500,50,350,270);
  
  textSize(20);
  text('Teori og brugervejledning',510,35);
  text('Tempratur:',505,360);
  text('Stoffer:',625,360);
  text('Volume:',745,360);
  
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
  
  let button6 = createButton('Tilføj kulde');
  button6.position(500, 400);
  button6.size(110,30);
}