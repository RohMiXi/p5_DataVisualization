const circles = [];
let coverImg, coverImg2, coverShadow, coverShadow2;
let titleFont, osFont;

let covXpos= -85;
let covYpos= -85; // Starting position of shape
let shaXpos= -100;
let shaYpos= 0;

let covXspeed, covYspeed, shaXspeed, shaYspeed;

let covXdir = 1;
let covYdir = 1;
let shaXdir = 1;
let shaYdir = 1;

let data;
let android = [];
let androidAge = [];

let OSarray = [];

let index = 0;
let tempIndex = 0;
let OSindex = 0;

let colorSet = [];
let adjRad = [];
let palDist = 680;



function preload()
{
  titleFont = loadFont('data/fonts/arsenica/ArsenicaTrial-Demibold.ttf');
  dateFont = loadFont('data/fonts/SUIT/SUIT-Heavy.ttf');
  infoFont = loadFont('data/fonts/SUIT/SUIT-Medium.ttf');
  data = loadTable('data/dataSet/2017to2019_OS_Usage.csv', 'csv', 'header');
}



function setup() {
  createCanvas(700, 1000);
  noStroke();
  //colors      Yellow   Banana      Rajah    french pink    rose     Phiox       sky blue    Azure    blue       Seablue    OxfordBlue
  colorSet = ["#FFFF02", "#FED825", "#FFA15A", "#FF6496", "#FE2BCC", "#EC02E2", "#00CCFF", "#007AFF", "#0000FF", "#016394", "#08204F"];
  coverImg = loadImage('data/cover_back.png');
  coverImg2 = loadImage('data/cover_ios_back.png');
  coverShadow = loadImage('data/cover_shadow.png');
  coverShadow2 = loadImage('data/cover_ios_shadow.png');

  let tot_row = data.getRowCount();
  let tot_col = data.getColumnCount();

  for (let i = OSindex; i<17; i+=2) {
    OSarray[index] = data.getRow(i);
    index++;
  }
  index = 0;

  adjustRadius();
  addCircles();
}



function addCircles()
{
  for (let i = 0; i< 11; i++) {
    circles[i] = new MoveCircle(random(width), random(height), colorSet[i], adjRad[i]);
  }
}



function adjustRadius()
{
  for (let i = 0; i <11; i++)
  {
    adjRad[i] = OSarray[index].arr[i+2] / OSarray[OSindex].arr[6];
  }
}



function keyPressed()
{
  if (keyCode === LEFT_ARROW)
  {
    index--;
  } else if (keyCode === RIGHT_ARROW)
  {
    index++;
  }
  if (keyCode === UP_ARROW)
  {
    OSindex++;
    if (OSindex == 1)
    {
      for (let i = OSindex; i<19; i+=2) {
        OSarray[tempIndex] = data.getRow(i);
        tempIndex++;
      }
      tempIndex = 0;
    }
  } else if (keyCode === DOWN_ARROW)
  {
    OSindex--;

    if (OSindex == 0)
    {
      for (let i = OSindex; i<19; i+=2) {
        OSarray[tempIndex] = data.getRow(i);
        tempIndex++;
      }
      tempIndex = 0;
    }
  }

  if (index <=0)
  {
    index = 0;
  }

  if (index >8)
  {
    index = 8;
  }
  if (OSindex <=0)
  {
    OSindex = 0;
  }

  if (OSindex >1)
  {
    OSindex = 1;
  }
  adjustRadius();
  addCircles();
}



function draw() {
  if (OSindex ==0)
  {
    background(235);
  } else if (OSindex == 1)
  {
    background(20);
  }


  for (const circle of circles) {
    circle.draw();
  }
  drawingContext.filter = 'blur(0px)';

  //cover
  covXspeed = random(0.1, 0.2);
  covYspeed = random(0.05, 0.15);

  shaXspeed = random(0, 0.3);
  shaYspeed = random(0, 0.3);

  covXpos = covXpos + (covXspeed * covXdir);
  covYpos = covYpos + (covYspeed * covYdir);

  shaXpos = shaXpos + (shaXspeed * shaXdir);
  shaYpos = shaYpos + (shaYspeed * shaYdir);

  if (covXpos < -85 || covXpos > random(-60, -45))
  {
    covXdir *= -1;
  }

  if (covYpos < -85 || covYpos > random(-50, -40))
  {
    covYdir *= -1;
  }

  if (shaXpos < -100 || shaXpos > random(-70, -50))
  {
    shaXdir *= -1;
  }

  if (shaYpos < 0|| shaYpos > random(10, 20))
  {
    shaYdir *= -1;
  }
  // cover END

  if (OSindex ==0)
  {
    image(coverImg, covXpos, covYpos);
    image(coverShadow, shaXpos, shaYpos);
  } else if (OSindex == 1)
  {
    image(coverImg2, covXpos, covYpos);
    image(coverShadow2, shaXpos, shaYpos);
  }



  //Text
  contentTitle();
  titleText();


  colorPalette();



  console.log(colorSet[index]);
  console.log(adjRad);
}


// moving circles class

class MoveCircle {
  constructor(x, y, c_, r) {
    this.x = x;
    this.y = y;

    if (OSindex == 0)
    {
      this.size = 300 * r;
    } else if (OSindex ==1)
    {
      this.size = 450 * r;
    }


    this.speedX = random(-2, 2);
    this.speedY = random(-2, 2);

    this.c = c_;
  }

  draw() {
    drawingContext.filter = 'blur(100px)';
    const centerX = width / 2;
    const centerY = height / 2;
    const distCenter = dist(this.x, this.y, centerX, centerY);

    this.speedX += (centerX - this.x) / distCenter / 5;
    this.speedY += (centerY - this.y) / distCenter / 5;

    this.x += this.speedX;
    this.y += this.speedY;

    fill(this.c);
    circle(this.x, this.y, this.size);
  }
}

function titleText()
{
  push();
  rotate(radians(90));
  textSize(160);
  textFont(titleFont);
  if (OSindex == 0)
  {
    fill(20);
    text('Android', 20, -20);
  } else if (OSindex ==1)
  {
    fill(240);
    text('Apple', 20, -20);
  }
  pop();

  push();
  rotate(radians(-90));
  textSize(90);
  textFont(titleFont);
  if (OSindex == 0)
  {
    fill(20);
    text('Android', 20, -20);
  } else if (OSindex ==1)
  {
    fill(240);
    text('Apple', 20, -20);
  }
  pop();
}


//OSarray[OSindex].arr[index],
// index --> 0 = Date, 1 = OS name, 2 = 7to12, 3 = 13to18, 4 = 19to24, 5 = 25to29,
// 6 = 30to34, 7 = 35to39, 8 = 40to44, 9 = 45to49, 10 = 50to54, 11 = 55to59, 12 = 60to69
function contentTitle()
{
  // date
  textSize(16);
  textFont(dateFont);
  if (OSindex == 0)
  {
    fill(20);
    text(OSarray[index].arr[0], 537, 125);
    fill(20);
    rect(530, 130, 200, 3);
  } else if (OSindex ==1)
  {
    fill(240);
    text(OSarray[index].arr[0], 537, 125);
    fill(240);
    rect(530, 130, 200, 3);
  }

  // information
  textFont(infoFont);
  if (OSindex == 0)
  {
    fill(20);
    textSize(14);
    text('Press ↑ to change OS', 275, 920);
  } else if (OSindex ==1)
  {
    fill(240);
    textSize(14);
    text('Press ↓ to change OS', 275, 920);
  }
}

function colorPalette()
{
  for (let i = 0; i < 11; i++)
  {
    push();
    fill(124);
    textSize(10);
    textAlign(RIGHT);
    if (i<3)
    {
      text((1+6*(i+1)) + 'to' + (6*(i+2)), 665, palDist + 5);
    } else if (i>=3 && i < 10)
    {
      text((5*(i+2)) + 'to' + (5*(i+3)-1), 665, palDist + 5);
    } else
    {
      text('60to69', 665, palDist + 5);
    }
    pop();
    fill(colorSet[i]);
    circle (680, palDist, 10);
    palDist += 20;
  }
  palDist = 680;
}
