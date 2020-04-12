export default class Snake { 
  constructor(context) {
    this.ctx = context;

    this.size = 16;
    this.speedx = 0;
    this.speedy = 0;
    this.maxSpeed = 16;

    this.head = {};
    this.body = [];
    this.parts = 3;
    this.createBody();
    }

  createBody() { 
    this.head = { x: 160, y: 100 };
    for (let i = this.parts - 1; i > 0; i--){
      let x = this.head.x - this.size * i;
      let y = 100;
      this.body.push({ x: x, y: y });
    }
    this.body.push(this.head);
    console.log(this.body);
  }

  speedUp() { 
    // this.maxSpeed += 1;
  }

  grow() { 
    console.log();
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
    console.log(this.body);
    // this.ctx.fillRect(this.head.x, this.head.y, this.size, this.size);
    for (let i = 0; i <= this.parts-1; i++) {
      console.log(i);
      this.ctx.fillRect(this.body[i].x, this.body[i].y, this.size, this.size);
      // console.log(`${i}: x: ${this.body[i].x}, y: ${this.body[i].y}`);
      
    }
  }

  moving() { 
    // console.log(`speedx: ${this.speedx}, speedy: ${this.speedy}`);
    if (this.speedx != 0 || this.speedy != 0) {
      return true;
    }
    return false;
  }

  update() { 
    // loop for all pieces
    for (let i = 0; i < this.parts - 1; i++){
      if (this.moving()) {
        this.body[i].x = this.body[i + 1].x;
        this.body[i].y = this.body[i + 1].y;
      }
    }
    this.head.x += this.speedx;
    this.head.y += this.speedy;
  }
}