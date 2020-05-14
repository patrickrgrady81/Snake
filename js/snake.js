export default class Snake { 
  constructor(context) {
    this.ctx = context;

    this.size = 16;
    this.speed = { x: 16, y:0 };

    this.head = {};
    this.body = [];
    this.parts = 3;
    this.remember = {x: 16, y: 0};
    this.createBody();

    this.paused = false;
    }

  createBody = () => { 
    this.head = { x: 160, y: 100 };
    for (let i = this.parts - 1; i > 0; i--){
      const x = this.head.x - this.size * i;
      const y = 100;
      this.body.push({ x: x, y: y });
    }
    this.body.push(this.head);
  }

  grow = () => {
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

  moveLeft = () => {
    if (this.speed.y != 0) {
      this.speed.x = -this.size;
      this.speed.y = 0;
    }
  }
  
  moveRight = () => {
    if (this.speed.y != 0) {
      this.speed.x = this.size;
      this.speed.y = 0;
    }
  }

  moveUp = () => {
    if (this.speed.x != 0) {
      this.speed.y = -this.size;
      this.speed.x = 0;
    }
  }
  
  moveDown = () => {
    if (this.speed.x != 0) {
      this.speed.y = this.size;
      this.speed.x = 0;
    }
  }
  
  hitSelf = () => { 
    for (let i = 0; i < this.parts - 2; i++) { 
      if (this.body[i].x == this.head.x && this.body[i].y == this.head.y) { 
        return true
      }
    }
  }

  eat = (food) => { 
    let topRightHit = false;
    let topLeftHit = false;
    let topHit = false;
    let rightSideHit = false;
    let leftSideHit = false;
    let sideHit = false;
    let collision = false;

    if (this.head.x + this.size <= food.pos.x + food.size && this.head.x + this.size >= food.pos.x) {
      topRightHit = true;
    }
    if (this.head.x >= food.pos.x && this.head.x <= food.pos.x + food.size) { 
      topLeftHit = true;
    }
    if (topRightHit || topLeftHit) {
      topHit = true;
    }
    if (this.head.y >= food.pos.y && this.head.y <= food.pos.y + food.size ) { 
      leftSideHit = true;
    }
    if (this.head.y + this.size >= food.pos.y && this.head.y + this.size <= food.pos.y + food.size ) { 
      rightSideHit = true;
    }
    if (leftSideHit || rightSideHit)
      sideHit = true;
    
    if (sideHit && topHit) { 
      collision = true;
    }
    return collision;
  }

  
  draw = () => { 
    this.ctx.fillStyle = "green";

    this.body.map((part, i) => {
      if (i == this.parts - 1) {
        // head
        this.ctx.fillStyle = "#5AB12F"
      } else { 
        this.ctx.fillStyle = "#569638"
      }
      this.ctx.strokeRect(part.x, part.y, this.size, this.size);
      this.ctx.fillRect(part.x, part.y, this.size, this.size);
    });
  }

  moving = () => { 
    if (this.speed.x != 0 || this.speed.y != 0) {
      return true;
    }
    return false;
  }

  update = () => { 
    for (let i = 0; i < this.parts - 1; i++) {
      if (this.moving()) {
        this.body[i].x = this.body[i + 1].x;
        this.body[i].y = this.body[i + 1].y;
      }
    }
    this.head.x += this.speed.x;
    this.head.y += this.speed.y;
  }
}
