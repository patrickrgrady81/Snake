export default class Game {
  constructor(width, height, context) {
    this.WIDTH = width;
    this.HEIGHT = height;
    this.ctx = context;
    this.score = 0;
  }

  addScore() { 
    this.score += 1;
  }

  showScore() { 
    // console.log(this.score);
    this.ctx.fillStyle = "white";
    this.ctx.font = "20px Monospace";
    this.ctx.fillText(`SCORE: ${this.score}`, this.WIDTH - 130, 40);
    
  }

  clearScreen() {
    this.ctx.fillStyle = "MidnightBlue"
    this.ctx.fillRect(0, 0, this.WIDTH, this.HEIGHT);
  }

  collisions(me, you) { 
    // if (me.head.x)
    // console.log(me.head.x);
    // console.log(you.pos.y + you.size);
    let topRightHit = false;
    let topLeftHit = false;
    let topHit = false;
    let rightSideHit = false;
    let leftSideHit = false;
    let sideHit = false;
    let collision = false;

    if (me.head.x + me.size <= you.pos.x + you.size && me.head.x + me.size >= you.pos.x) {
      // console.log("Top Right");
      topRightHit = true;
    }
    if (me.head.x >= you.pos.x && me.head.x <= you.pos.x + you.size) { 
      // console.log("Top Left");
      topLeftHit = true;
    }
    if (topRightHit || topLeftHit) {
      // console.log("Top Hit");
      topHit = true;
    }

    if (me.head.y >= you.pos.y && me.head.y <= you.pos.y + you.size ) { 
      // console.log("Left Side Hit");
      leftSideHit = true;
    }
    if (me.head.y + me.size >= you.pos.y && me.head.y + me.size <= you.pos.y + you.size ) { 
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

  checkBounds(toCheck) { 
    if (toCheck.x > this.WIDTH)
      toCheck.x = 0;
    if (toCheck.x < 0)
      toCheck.x = this.WIDTH;
    if (toCheck.y > this.HEIGHT)
      toCheck.y = 0
    if (toCheck.y < 0)
      toCheck.y = this.HEIGHT
  
  }
}