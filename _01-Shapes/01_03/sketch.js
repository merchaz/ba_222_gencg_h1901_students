
// Global var
var canvas;
var lines = [];
var planets = [];
var overallIndexLines;
var overallIndexPlanets;
var firstCreationLine;
var firstCreationPlanet;
var speed;
var lineLength;
var direction;
var spliceCtrLine;
var lastXline;

function setup() {
  pixelDensity(1);
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5Container");
  frameRate(60);
  // Init Var
  overallIndexLines = 0;
  overallIndexPlanets = 0;
  lastXPos = 0;
  spliceCtrLine = 0;
  lastXline = 0;
  speed = 20;
  lineLength = height * 2;
  direction = "up";
  firstCreationLine = true;
  firstCreationPlanet = true;

  // Setup first planets and lines
  var lastYplanet = 0;
  while (lastXline < width) {
    lines.push(new HorizontalLine());
  }
  for (let index = 0; index < 6; index++) {
    planets.push(new Planet(lastYplanet));
    lastYplanet += 500;
  }
}

function draw() {
  background(0);
  stroke(255);

  // move and draw horizontal lines
  for (let i = 0; i < lines.length; i++) {
    strokeWeight(int(random(3, 5)));
    lines[i].move();
    lines[i].display();
  }
  // move and draw planets
  for (let i = 0; i < planets.length; i++) {
    planets[i].move();
    planets[i].display();
  }
}

function keyPressed() {
  // different options
  if (keyCode === 32) background(255) // 32 = SPACE BAR 
  if (keyCode === 38) direction = "up"; // 38 = ArrowUp
  if (keyCode === 40) direction = "down"; // 40 = ArrowDown
}

class HorizontalLine {
  constructor() {
    this.arIndex = overallIndexLines;
    overallIndexLines++;
    // line creation when direction up
    if (direction == "up") {
      this.x1 = lastXline + int(random(10, 20));
      lastXline = this.x1;
      this.x2 = this.x1;
      this.y1 = int(random(height * 3));
      this.y2 = this.y1 + lineLength;
    }
    // line creation when direction down
    else if (direction == "down") {
      this.x1 = int(random(width));
      this.x2 = this.x1;
      this.y1 = 0 - int(random(height * 5));
      this.y2 = this.y1 - lineLength;
    }
  }

  move() {
    if (direction == "up") {
      this.y1 -= speed;
      this.y2 -= speed;

      // when line out of window, move it to the other side
      if (this.y2 < 0) {
        this.y1 = height + int(random(height));
        this.y2 = this.y1 + lineLength;
      }
    }
    else if (direction == "down") {
      this.y1 += speed;
      this.y2 += speed;

      // when line out of window, move it to the other side
      if (this.y2 > height) {
        this.y1 = 0 - int(random(height));
        this.y2 = this.y1 - lineLength;
      }
    }
  }

  display() {
    // draw line
    line(this.x1, this.y1, this.x2, this.y2);
  }
}

class Planet {
  constructor(lastYpos) {
    this.arIndex = overallIndexPlanets;
    overallIndexPlanets++;

    // planet creation when direction up
    if (direction == "up") {
      this.xPos = int(random(width));
      this.yPos = height + int(random(height)) + lastYpos;
      this.diameter = int(random(height / 10, height / 4));
    }
    // planet creation when direction down
    else if (direction == "down") {
      this.xPos = int(random(width));
      this.yPos = 0 - int(random(height));
      this.diameter = int(random(height / 6, height / 3));
    }
  }

  move() {
    if (direction == "up") {
      this.yPos -= speed;

      // when planet out of window, move it to the other side
      if (this.yPos + this.diameter < 0) {        
        this.xPos = int(random(width));
        this.yPos = height + int(random(height)) + 2000;
        this.diameter = int(random(height / 6, height / 3));
      }
    }
    else if (direction == "down") {
      this.yPos += speed;

      // when planet out of window, move it to the other side
      if (this.yPos - this.diameter > height) {    
        this.xPos = int(random(width));
        this.yPos = 0 - int(random(height)) - 2000;
        this.diameter = int(random(height / 6, height / 3));
      }
    }
  }

  display() {
    // draw planet with shadow
    noStroke();
    fill(255);
    ellipse(this.xPos, this.yPos, this.diameter);
    fill(0);
    ellipse(this.xPos + 5, this.yPos + 7, this.diameter);
  }
}
