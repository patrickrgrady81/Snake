export default class Food{
  constructor(game, context) {
    this.game = game;
    this.ctx = context;

    this.pos = { x: 0, y: 0 };
    this.size = 16;
    this.pos.x = Math.floor(Math.random() * (this.game.WIDTH - (this.size + 10)) + 10); //set to random
    this.pos.y = Math.floor(Math.random() * (this.game.HEIGHT - (this.size + 10)) + 10); //set to random

  }
  
  hit() {
    this.pos.x = Math.floor(Math.random() * this.game.WIDTH - (this.size + 10)); //set to random
    this.pos.y = Math.floor(Math.random() * this.game.HEIGHT - (this.size + 10)); //set to random
   }

  draw() {
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(this.pos.x, this.pos.y, this.size, this.size);
   }

  update() { }


}