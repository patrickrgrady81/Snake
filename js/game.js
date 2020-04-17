export default class Game {
  constructor(width, height, context) {
    this.WIDTH = width;
    this.HEIGHT = height;
    this.ctx = context;
    this.speed = 0;
    this.score = 0;
  }

  addScore() { 
    this.score += 1;
    // this.speed = Math.floor(this.score / 2);
    this.getNewSpeed();
  }

  getNewSpeed() {
    const r = Math.floor(Math.random() * 10 + 1);

    switch (true) {
      case (this.speed < 10):
        // 30% chance of speeding up
        if (r <= 3) {
          this.speed++;
        }
        break;
      case (this.speed < 20):
        // 50% chance of speeding up
        if (r <= 5) {
          this.speed++;
        }
        break;
      case (this.speed < 30):
        // 80% chance of speeding up
        if (r <= 8) {
          this.speed++;
        }
        break;
      default:
        this.speed++;
    }
  }

  HUD() { 
    this.showScore();
    this.showSpeed();
  }

  showSpeed() { 
    this.ctx.fillStyle = "white";
    this.ctx.font = "20px Monospace";
    this.ctx.fillText(`SPEED: ${this.speed}`, 30, 40);
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
  gameOver() { 
    this.clearScreen();
    this.ctx.fillStyle = "white";
    this.ctx.font = "30px Monospace";
    this.ctx.fillText(`GAME OVER!`, this.WIDTH / 2 - 70, this.HEIGHT / 2 - 20);
    this.ctx.fillText(`SCORE: ${this.score}`, this.WIDTH / 2 - 60, this.HEIGHT / 2 + 20);
 }
}