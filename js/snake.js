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
  }

  grow() {
    this.parts++;
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
    } else { 
      this.speed = this.remember;
      this.remeber = { x: 0, y: 0 };
    }
   }
  
  draw() { 
    this.ctx.fillStyle = "green";
    // loop for all pieces
    for (let i = 0; i <= this.parts-1; i++) {
      this.ctx.fillRect(this.body[i].x, this.body[i].y, this.size, this.size);
      
    }
  }

  moving() { 
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