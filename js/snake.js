class Snake { 
  constructor() { 
    this.size = 15;
    this.speed = 0;
    this.pos = {x: 100, y: 100};
  }

  draw(ctx) { 
    ctx.fillStyle = "green";
    ctx.fillRect(this.pos.x, this.pos.y, this.size, this.size);
  }

  update() { 
    
  }
}