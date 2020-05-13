export default class Food{
  constructor(context, snake, width, height) {
    this.snake = snake;
    this.ctx = context;
    this.width = width;
    this.height = height;

    this.pos = { x: 0, y: 0 };
    this.size = 16;
    this.getPos();


  }

  getPos = () => {
    this.pos.x = Math.floor(Math.random() * (this.width - (this.size + 10)) + 10);
    this.pos.y = Math.floor(Math.random() * (this.height - (this.size + 10)) + 10);
    if (this.pos.x < this.size) {
      this.pos.x = this.size;
    }
    if (this.pos.y < this.size) {
      this.pos.y = this.size;
    }

    this.snake.body.map((part) => {
      let topRightHit = false;
      let topLeftHit = false;
      let topHit = false;
      let rightSideHit = false;
      let leftSideHit = false;
      let sideHit = false;
      let collision = false;
  
      if (part.x + this.size <= this.pos.x + this.size && part.x + this.size >= this.pos.x) {
        topRightHit = true;
      }
      if (part.x >= this.pos.x && part.x <= this.pos.x + this.size) {
        topLeftHit = true;
      }
      if (topRightHit || topLeftHit) {
        topHit = true;
      }
  
      if (part.y >= this.pos.y && part.y <= this.pos.y + this.size) {
        leftSideHit = true;
      }
      if (part.y + this.size >= this.pos.y && part.y + this.size <= this.pos.y + this.size) {
        rightSideHit = true;
      }
      if (leftSideHit || rightSideHit)
        sideHit = true;
      
      if (sideHit && topHit) {
        collision = true;
      }
      if (collision) { 
        this.getPos();
      }
    });
  }
  
  eat = () => {
    this.getPos();
   }

  draw = () => {
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(this.pos.x, this.pos.y, this.size, this.size);
  }
}