export default class Snake { 
  constructor(context) { 
    this.ctx = context;

    this.size = 16;
    this.speedx = 0;
    this.speedy = 0;
    this.maxSpeed = 2;
    this.body = [];
    this.createBody();
  }

  createBody() { 
    this.pos = {x: 100, y: 100};
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
    this.ctx.fillRect(this.pos.x, this.pos.y, this.size, this.size);
  }

  update() { 
    this.pos.x += this.speedx;
    this.pos.y += this.speedy;
  }
}