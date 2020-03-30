class Game {
  constructor(width, height) {
    this.WIDTH = width;
    this.HEIGHT = height;
  }

  clearScreen(ctx) {
    ctx.fillStyle = "blue"
    ctx.fillRect(0, 0, this.WIDTH, this.HEIGHT);
  }
}