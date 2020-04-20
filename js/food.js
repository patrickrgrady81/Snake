export default class Food{
  constructor(game, context, snake) {
    this.snake = snake;
    this.game = game;
    this.ctx = context;

    this.pos = { x: 0, y: 0 };
    this.size = 16;
    this.getPos();


  }

  getPos() {
    this.pos.x = Math.floor(Math.random() * (this.game.WIDTH - (this.size + 10)) + 10); //set to random
    this.pos.y = Math.floor(Math.random() * (this.game.HEIGHT - (this.size + 10)) + 10); //set to random
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
        // console.log("Top Right");
        topRightHit = true;
      }
      if (part.x >= this.pos.x && part.x <= this.pos.x + this.size) {
        // console.log("Top Left");
        topLeftHit = true;
      }
      if (topRightHit || topLeftHit) {
        // console.log("Top Hit");
        topHit = true;
      }
  
      if (part.y >= this.pos.y && part.y <= this.pos.y + this.size) {
        // console.log("Left Side Hit");
        leftSideHit = true;
      }
      if (part.y + this.size >= this.pos.y && part.y + this.size <= this.pos.y + this.size) {
        // console.log("Right Side Hit");
        rightSideHit = true;
      }
      if (leftSideHit || rightSideHit)
        // console.log("Side Hit");
        sideHit = true;
      
      if (sideHit && topHit) {
        collision = true;
      }
      if (collision) { 
        // console.log("Wrong place");
        this.getPos();
      }
    });
  }
  
  eat() {
    this.getPos();
   }

  draw() {
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(this.pos.x, this.pos.y, this.size, this.size);
   }
}