// Based on the code P_2_0_03.pde from
// Based on the code P_2_0_02.pde from
// Generative Gestaltung, ISBN: 978-3-87439-759-9

// Global var
var b = 255, p = false;
var strokeColor, canvas;
 
var lines = [];
var planets = [];
var overallIndexLines;
var overallIndexPlanets;
var firstCreationLine;
var firstCreationPlanet;
var speed;
var lineLength;

function setup() {
  // Canvas setup and variables
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5Container");
  overallIndexLines = 0;
  overallIndexPlanets = 0;
  lastXPos = 0;
  firstCreationLine = true;
  firstCreationPlanet = true;
  lineLength = height * 2;// / 3 * 2;
  speed = 20;

  // drawing modes
  frameRate(30);
  var density = displayDensity();
  pixelDensity(density);
  smooth();
}

function draw() {
  background(0);
  stroke(255);
  smooth();
  noFill();
  
  for (let index = 0; index < 150; index++) {
    if (index % 30 == 0) {
      planets.push(new Planet());
    }
    else {
      lines.push(new randLine(true));
    }  
  }
}

function keyPressed() {
  // Clear sketch
  if (keyCode === 32) background(255) // 32 = SPACE BAR 
  if (key == 's' || key == 'S') saveThumb(width, height);
}

// Thumb
function saveThumb(w, h) {
  let img = get( width/2-w/2, height/2-h/2, w, h);
  save(img,'thumb.jpg');
}

class randLine {
  constructor(firstIteration) {
    this.arIndex = overallIndexLines;
    overallIndexLines++;
    if (firstIteration) {
      this.x1 = int(random(width));
      this.x2 = this.x1;
      this.y1 = int(random(height * 2));
      this.y2 = this.y1 + lineLength;
    } else {
      this.x1 = int(random(width));
      this.x2 = this.x1;
      this.y1 = height + int(random(height));;
      this.y2 = this.y1 + lineLength;
    }
    lastXPos = this.x1;
  }

// Tools
  move() {
    this.y1 -= speed;
    this.y2 -= speed;
    
    if (this.y2 < 0) {
        lines.splice(this.arIndex, 1);
        firstCreationLine = false;
        for (let index = this.arIndex; index < lines.length; index++) {
          lines[index].arIndex--;          
        }
      overallIndexLines--;
      lines.push(new randLine(false));    
    }
    
  }

  display(){
    line(this.x1, this.y1, this.x2, this.y2);
  }
}

class Planet {

  constructor(firstIteration) {
    this.arIndex = overallIndexPlanets;
    overallIndexPlanets++;
    if (firstIteration) {
      this.xPos = int(random(width));
      this.yPos = height + int(random(10000));
      this.diameter = random(100, 300);
      
    } else {
      this.xPos = int(random(width));
      this.yPos = height + int(random(10000));
      this.diameter = random(100, 300);
    }
  }

  move(){
    this.yPos -= speed;

    if (this.yPos + this.diameter < 0) {
      planets.splice(this.arIndex, 1);
      firstCreationPlanet = false;
      for (let index = this.arIndex; index < planets.length; index++) {
        planets[index].arIndex--;          
      }
    overallIndexPlanets--;
    planets.push(new Planet(false));    
    }
  }

  display(){
    noStroke();
    fill(255);
    ellipse(this.xPos, this.yPos, this.diameter);
    fill(0);
    ellipse(this.xPos+5, this.yPos+7, this.diameter);
  }
}
// Thumb
function saveThumb(w, h) {
  let img = get( width/2-w/2, height/2-h/2, w, h);
  save(img,'thumb.jpg');
}