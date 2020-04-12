export default class Snake { 
  constructor(context) {
    this.ctx = context;

    this.size = 16;
    this.speed = { x: 0, y:0 };

    this.head = {};
    this.body = [];
    this.parts = 3;
    this.remember = {x: 16, y: 0};
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
    // this.size += 1;
  }

  grow() {
    this.parts++;
    console.log(`x: ${this.body[0].x}, y:${this.body[0].y}`);
    if (this.moving()) {
      if (this.speed.x > 0) {
        this.body.unshift({ x: this.body[0].x - 16, y: this.body[0].y });
      } else if (this.speed < 0) {
        this.body.unshift({ x: this.body[0].x + 16, y: this.body[0].y });
      } else if (this.speed.y > 0) {
        this.body.unshift({ x: this.body[0].x, y: this.body[0].y - 16 });
      } else {
      this.body.unshift({ x: this.body[0].x, y: this.body[0].y + 16 });
      }
    }
  }

  moveLeft() {
    if (this.speed.y != 0) {
      this.speed.x = -this.size;
      this.speed.y = 0;
    }
  }
  
  moveRight() {
    if (this.speed.y != 0) {
      this.speed.x = this.size;
      this.speed.y = 0;
    }
  }

  moveUp() {
    if (this.speed.x != 0) {
      this.speed.y = -this.size;
      this.speed.x = 0;
    }
  }
  
  moveDown() {
    if (this.speed.x != 0) {
      this.speed.y = this.size;
      this.speed.x = 0;
    }
  }

  stop() {
    if (this.moving()) {
      this.remeber = this.speed;
      this.speed = { x: 0, y: 0 };
      console.log(`x: ${this.remember.x}, y: ${this.remember.y}`);
    } else { 
      console.log(`x: ${this.remember.x}, y: ${this.remember.y}`);
      this.speed = this.remember;
      this.remeber = { x: 0, y: 0 };
    }
   }
  
  draw() { 
    this.ctx.fillStyle = "green";
    // loop for all pieces
    // console.log(this.body);
    // this.ctx.fillRect(this.head.x, this.head.y, this.size, this.size);
    for (let i = 0; i <= this.parts-1; i++) {
      // console.log(i);
      this.ctx.fillRect(this.body[i].x, this.body[i].y, this.size, this.size);
      // console.log(`${i}: x: ${this.body[i].x}, y: ${this.body[i].y}`);
      
    }
  }

  moving() { 
    // console.log(`speed.x: ${this.speed.x}, speed.y: ${this.speed.y}`);
    if (this.speed.x != 0 || this.speed.y != 0) {
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
    this.head.x += this.speed.x;
    this.head.y += this.speed.y;
  }
}