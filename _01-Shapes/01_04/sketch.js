var stars = [];
var shootingStar;
var moon;
var drawMode;
var pg;

function setup() {
	pixelDensity(1);
  createCanvas(windowWidth, windowHeight);
  frameRate(60);

  // setup sky
  for (var i = 0; i < 100; i++) {
    stars.push(new Star());
  }
  shootingStar = new ShootingStar();
  moon = new Moon();
  pg = createGraphics(windowWidth, windowHeight);
}

function draw() {

  // draw gradient background
  background(220);
  var color1 = color(0, 0, 153);
  var color2 = color(204, 51, 0);
  setGradient(0, 0, windowWidth, windowHeight, color1, color2);

  // draw sky and move it
  for (var i = 0; i < 50; i++) {
    stars[i].draw();
  }
  shootingStar.draw();
  moon.draw();
  rotateSky(drawMode);

  // draw mountain line with noise
  drawMountain();
  image(pg, 0, windowHeight/2, 0, 0);
}

function drawMountain(){

  // noise function to draw mountain line
  pg.noStroke();
  pg.fill(180,180,180);
  pg.beginShape();
  for (var x = 0; x < width; x++) {
	var nx = map(x, 0, width, 0, 10);
	var y = (windowHeight/2) * noise(nx);
	pg.vertex(x, y/2);
  }
  pg.vertex(windowWidth, windowHeight);
  pg.vertex(0,windowHeight);
  pg.endShape();
}

function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();
    for (let i = y; i <= y + h; i++) {
      var inter = map(i, y, y + h, 0, 1);
      var c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }  
}

function Star() {
  this.x = random(windowWidth);
  this.y = random(windowHeight + 400) - 400;
  this.w = 5;
  this.h = 5;
}

Star.prototype.draw = function() {
  noStroke();
  fill(255, 255, 0);
  ellipse(this.x, this.y, this.w, this.h);

  // star blinking
  if (this.w == 5 && frameCount % 5 == 0) {
    this.w = 7;
    this.h = 7;
  } else if(this.w == 7 && frameCount % 5 == 0){
    this.w = 5;
    this.h = 5;
  }
}

function ShootingStar() {
  this.x = random(windowWidth - 200);
  this.y = random(windowHeight - 400);
  this.w = 20;
  this.h = 5;
}

ShootingStar.prototype.draw = function() {
  noStroke();
  fill(255, 255, 0);
  ellipse(this.x, this.y, this.w, this.h);

  // fadeout of shooting star
  if (this.h > 0) {
    this.h -= 0.2;
  }
  this.w += 7;
  this.x += 5;
}

function Moon() {
  this.x = windowWidth / 2;
  if(drawMode == 2){
	this.y = windowHeight/5;
	} 
  else {
	  this.y = windowHeight - windowHeight/3;
	}
  this.w = windowHeight / 10;
  this.h = windowHeight / 10;
}

Moon.prototype.draw = function() {
  noStroke();
  fill(255, 255, 0);
  ellipse(this.x, this.y, this.w, this.h);
}

function keyPressed() {
  // key commands
  if (keyCode === 32) setup() // 32 = Space
  if (keyCode === 38) drawMode = 2 // 38 = ArrowUp
  if (keyCode === 40) drawMode = 1 // 40 = ArrowDown

}

function rotateSky(drawMode){
  // rotation based on direction through keypress
	if(drawMode == 2){
		moon.y += 1;
		for (var i = 0; i < 50; i++) {
			stars[i].y += 1;
		}
	}
	else if(drawMode == 1){
		moon.y -= 1;
		for (var i = 0; i < 50; i++) {
			stars[i].y -= 1;
		}
	}
	else {
		// do nothing
	}
}
