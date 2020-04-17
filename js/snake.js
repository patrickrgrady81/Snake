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
  
  hitSelf() { 
    for (let i = 0; i < this.parts - 2; i++) { 
      if (this.body[i].x == this.head.x && this.body[i].y == this.head.y) { 
        return true
      }
    }
  }

  eat(food) { 
    // if (this.head.x)
    // console.log(this.head.x);
    // console.log(food.pos.y + food.size);
    let topRightHit = false;
    let topLeftHit = false;
    let topHit = false;
    let rightSideHit = false;
    let leftSideHit = false;
    let sideHit = false;
    let collision = false;

    if (this.head.x + this.size <= food.pos.x + food.size && this.head.x + this.size >= food.pos.x) {
      // console.log("Top Right");
      topRightHit = true;
    }
    if (this.head.x >= food.pos.x && this.head.x <= food.pos.x + food.size) { 
      // console.log("Top Left");
      topLeftHit = true;
    }
    if (topRightHit || topLeftHit) {
      // console.log("Top Hit");
      topHit = true;
    }

    if (this.head.y >= food.pos.y && this.head.y <= food.pos.y + food.size ) { 
      // console.log("Left Side Hit");
      leftSideHit = true;
    }
    if (this.head.y + this.size >= food.pos.y && this.head.y + this.size <= food.pos.y + food.size ) { 
      // console.log("Right Side Hit");
      rightSideHit = true;
    }
    if (leftSideHit || rightSideHit)
      // console.log("Side Hit");
      sideHit = true;
    
    if (sideHit && topHit) { 
      collision = true;
    }
    return collision;
  }

  
  draw() { 
    this.ctx.fillStyle = "green";
    // loop for all pieces
    // for (let i = 0; i <= this.parts-1; i++) {
    //   this.ctx.fillRect(this.body[i].x, this.body[i].y, this.size, this.size);
      
    // }
    this.body.map((part) => {
      this.ctx.fillRect(part.x, part.y, this.size, this.size);
    });
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

    // this.body.map((part, i) => {
    //   if (this.moving()) {
    //     console.table(part);

    //     part.x = this.body[i+1].x;
    //     part.y = this.body[i+1].y;
    //   }});
    this.head.x += this.speed.x;
    this.head.y += this.speed.y;
  }
}
