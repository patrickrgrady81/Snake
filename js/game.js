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

  HUD() { 
    this.showScore();
  }

  showScore() { 
    this.ctx.fillStyle = "white";
    this.ctx.font = "20px Monospace";
    this.ctx.fillText(`SCORE: ${this.score}`, this.WIDTH - 130, 40);
    
  }

  clearScreen() {
    this.ctx.fillStyle = "MidnightBlue"
    this.ctx.fillRect(0, 0, this.WIDTH, this.HEIGHT);
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