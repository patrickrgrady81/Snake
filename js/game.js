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
}