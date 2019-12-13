
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
  direction = "up";
  spliceCtrLine = 0;

  // drawing modes
  frameRate(30);
  var density = displayDensity();
  pixelDensity(density);
  smooth();

  var lastYplanet = 0;
  for (let index = 0; index < 150; index++) {
    if (index % 30 == 0) {
      planets.push(new Planet(lastYplanet));
      lastYplanet += 500;
    }
    else {
      lines.push(new randLine());
    }
  }
}

function draw() {
  background(0);
  stroke(255);
  for (let i = 0; i < lines.length; i++) {
    strokeWeight(5);
    lines[i].move();
    lines[i].display();
  }
  for (let i = 0; i < planets.length; i++) {
    planets[i].move();
    planets[i].display();
  }
}
function keyPressed() {
  // Clear sketch
  if (keyCode === 32) background(255) // 32 = SPACE BAR 
  if (key == 's' || key == 'S') saveThumb(width, height);
  if (keyCode === 38) direction = "up"; // 38 = ArrowUp
  if (keyCode === 40) direction = "down"; // 40 = ArrowDown
}

// Thumb
function saveThumb(w, h) {
  let img = get(width / 2 - w / 2, height / 2 - h / 2, w, h);
  save(img, 'thumb.jpg');
}

class randLine {
  constructor() {
    this.arIndex = overallIndexLines;
    overallIndexLines++;
    if (direction == "up") {
      this.x1 = int(random(width));
      this.x2 = this.x1;
      this.y1 = int(random(height * 3));
      this.y2 = this.y1 + lineLength;
    }
    else if (direction == "down") {
      this.x1 = int(random(width));
      this.x2 = this.x1;
      this.y1 = 0 - int(random(height * 5));
      debugger;
      this.y2 = this.y1 - lineLength;
    }
  }

  move() {
    if (direction == "up") {
      this.y1 -= speed;
      this.y2 -= speed;

      if (this.y2 < 0) {
        this.y1 = height + int(random(height));
        this.y2 = this.y1 + lineLength;
      }
    }
    else if (direction == "down") {
      this.y1 += speed;
      this.y2 += speed;

      if (this.y2 > height) {
        this.y1 = 0 - int(random(height));
        this.y2 = this.y1 - lineLength;
      }
    }
  }

  display() {
    line(this.x1, this.y1, this.x2, this.y2);
  }
}

class Planet {
  constructor(lastYpos) {
    this.arIndex = overallIndexPlanets;
    overallIndexPlanets++;
    if (direction == "up") {
      this.xPos = int(random(width));
      this.yPos = height + int(random(height)) + lastYpos;
      this.diameter = int(random(height / 6, height / 3));
    }
    else if (direction == "down") {
      this.xPos = int(random(width));
      this.yPos = 0 - int(random(height));
      this.diameter = int(random(height / 6, height / 3));
    }
  }

  move() {
    if (direction == "up") {
      this.yPos -= speed;
      if (this.yPos + this.diameter < 0) {
        // Planet is out of window
        this.xPos = int(random(width));
        this.yPos = height + int(random(height)) + 2000;
        this.diameter = int(random(height / 6, height / 3));
      }
    }
    else if (direction == "down") {
      this.yPos += speed;
      if (this.yPos - this.diameter > height) {
        this.xPos = int(random(width));
        this.yPos = 0 - int(random(height)) - 2000;
        this.diameter = int(random(height / 6, height / 3));
      }
    }
  }

  display() {
    noStroke();
    fill(255);
    ellipse(this.xPos, this.yPos, this.diameter);
    fill(0);
    ellipse(this.xPos + 5, this.yPos + 7, this.diameter);
  }
}
// Thumb
function saveThumb(w, h) {
  let img = get(width / 2 - w / 2, height / 2 - h / 2, w, h);
  save(img, 'thumb.jpg');
}