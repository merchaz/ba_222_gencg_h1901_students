// Based on the code P_2_1_3_04.pde from
// Generative Gestaltung, ISBN: 978-3-87439-759-9

// Global var
// The var are initialised in gui.js
var count;

function setup() {
  // Canvas setup
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5Container");
  // Detect screen density (retina)
  var density = displayDensity();
  pixelDensity(density);
  // Init var
  // some of the var are initialised in gui.js
  count = 0;
  drawMode = 1;
}

function draw() {

  colorMode(HSB, 360, 100, 100, 255);
  rectMode(CENTER);
  smooth();
  stroke(150);
  noFill();

  background(0, 255);
  count = 20;

  for (let gridY = 0; gridY <= 0; gridY++) {
    for (let gridX = 0; gridX <= 0; gridX++) {

      let tileWidth = width / 1;
      let tileHeight = height / 1;
      let posX = tileWidth * gridX + tileWidth / 2;
      let posY = tileHeight * gridY + tileHeight / 2;

      push();
      translate(posX, posY);
	  
	for (let i = 0; i < count; i++) {
            rect(0, 0, tileWidth, tileHeight);
            scale(1 - 3.0 / count);          
          }   
		
      pop();

    }
  }
}

function keyPressed() {


  if (key == '1') drawMode = 1;
  if (key == '2') drawMode = 2;


}

// Tools

// resize canvas when the window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight, false);
}

// Int conversion
function toInt(value) {
  return ~~value;
}

// Timestamp
function timestamp() {
  return Date.now();
}
