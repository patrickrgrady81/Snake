export default class Snake { 
  constructor(context) { 
    this.ctx = context;

    this.size = 16;
    this.speedx = 0;
    this.speedy = 0;
    this.maxSpeed = 2;

    this.pos = {};
    this.body = [];
    this.createBody();
  }

  createBody() { 
    this.pos = { x: 100, y: 100 }; // How to make this into the Body?
    // everything looks for this.pos, everything needs to be refactored!
    // Bit I tried this 3 fucking times and it is shit every time!
    // What else can I do to change this?
    // maybe this.pos is the head and we can use that to create the body
    // then no refactor is neccesary 
    // this.body would start at this.pos-this.size and go from there
    
  }
  addBody() { 
    
  }

  speedUp() { 
    this.maxSpeed += 0.1;
  }

  grow() { 

  }

  moveLeft() {
    this.speedx = -this.maxSpeed;
    this.speedy = 0;
  }
  
  moveRight() {
    this.speedx = this.maxSpeed;
    this.speedy = 0;
  }

  moveUp() {
    this.speedy = -this.maxSpeed;
    this.speedx = 0;
  }
  
  moveDown() {
    this.speedy = this.maxSpeed;
    this.speedx = 0;
  }

  stop() {
    this.speedx = 0;
    this.speedy = 0
   }
  
  draw() { 
    this.ctx.fillStyle = "green";
    // loop for all pieces
    this.ctx.fillRect(this.pos.x, this.pos.y, this.size, this.size);
  }

  update() { 
    // loop for all pieces
    this.pos.x += this.speedx;
    this.pos.y += this.speedy;
  }
}