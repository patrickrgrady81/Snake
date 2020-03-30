export default class Game {
  constructor(width, height, context) {
    this.WIDTH = width;
    this.HEIGHT = height;
    this.ctx = context;
  }

  clearScreen() {
    this.ctx.fillStyle = "blue"
    this.ctx.fillRect(0, 0, this.WIDTH, this.HEIGHT);
  }

  collisions(me, you) { 
    // if (me.pos.x)
    // console.log(me.pos.x);
    // console.log(you.pos.y + you.size);
    let topRightHit = false;
    let topLeftHit = false;
    let topHit = false;
    let rightSideHit = false;
    let leftSideHit = false;
    let sideHit = false;
    let collision = false;

    if (me.pos.x + me.size <= you.pos.x + you.size && me.pos.x + me.size >= you.pos.x) {
      // console.log("Top Right");
      topRightHit = true;
    }
    if (me.pos.x >= you.pos.x && me.pos.x <= you.pos.x + you.size) { 
      // console.log("Top Left");
      topLeftHit = true;
    }
    if (topRightHit || topLeftHit) {
      // console.log("Top Hit");
      topHit = true;
    }

    if (me.pos.y >= you.pos.y && me.pos.y <= you.pos.y + you.size ) { 
      // console.log("Left Side Hit");
      leftSideHit = true;
    }
    if (me.pos.y + me.size >= you.pos.y && me.pos.y + me.size <= you.pos.y + you.size ) { 
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
    if (toCheck.pos.x > this.WIDTH)
      toCheck.pos.x = 0;
    if (toCheck.pos.x < 0)
      toCheck.pos.x = this.WIDTH;
    if (toCheck.pos.y > this.HEIGHT)
      toCheck.pos.y = 0
    if (toCheck.pos.y < 0)
      toCheck.pos.y = this.HEIGHT
  
  }
}