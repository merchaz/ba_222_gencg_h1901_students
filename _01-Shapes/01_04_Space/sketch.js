// Based on the code P_2_0_02.pde from
// Generative Gestaltung, ISBN: 978-3-87439-759-9
// Global var
var b = 255, p = false;
var lines = [];
var planets = [];
var revealerRect;
var overallIndex;
var lastYposLine;
var lastXposLine;
var minNextX;
 
function setup() {
  // Canvas setup
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5Container");
  overallIndex = 0;
  lastYposLine = 0;
  lastXposLine = 0;
  minNextX = 5;
  frameRate(30);
  // Detect screen density (retina)
  var density = displayDensity();
  pixelDensity(density);
  // Colors and drawing modes
  background(0);
  smooth();
  // Init Var
  setupLines(2);
  //setupPlanets(30);
  
}

function setupLines(count){
  for (let index = 0; index < count; index++) {
    lines.push(new randLine(true));
  }
}

function setupPlanets(count){
  for (let index = 0; index < count; index++) {
    planets.push(new Planet());
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

  console.log(lines.length);
}

function keyPressed() {
  // Clear sketch
  if (keyCode === 32) background(255) // 32 = SPACE BAR 
  if (key == 's' || key == 'S') saveThumb(650, 350);
}

// Thumb
function saveThumb(w, h) {
  let img = get( width/2-w/2, height/2-h/2, w, h);
  save(img,'thumb.jpg');
}

class randLine {
  constructor(firstIteration) {
    this.arIndex = overallIndex;
    overallIndex++;
    if (firstIteration) {
      this.x1 = random(windowWidth);
      this.x2 = this.x1;
      this.y1 = random(windowHeight);
      this.y2 = this.y1 + 500;
    } else {
      this.x1 = random(windowWidth);
      this.x2 = this.x1;
      this.y1 = windowHeight;
      this.y2 = this.y1 + 500;
    }
    this.speed = 10;
  }

  move() {
    this.y1 -= this.speed;
    this.y2 -= this.speed;
    
    if (this.y2 < 0) {
      console.log(this.y2, this.arIndex);
      console.log(lines);
      debugger;
      lines.splice(this.arIndex, 1);
      overallIndex--;
      lines.push(new randLine(false));
    }
    
  }

  display() {
    line(this.x1, this.y1, this.x2, this.y2);
  }
}

class Planet {
  constructor() { 
    this.xPos = random(windowWidth);
    this.yPos = random(16000);
    this.diameter = random(100, 300);
    this.speed = 10;
  }

  move(){
    this.yPos -= this.speed;
  }

  display(){
    noStroke();
    fill(255);
    ellipse(this.xPos, this.yPos, this.diameter);
    fill(0);
    ellipse(this.xPos+5, this.yPos+7, this.diameter);
  }
}