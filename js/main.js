canvas = document.getElementById("game");
ctx = canvas.getContext("2d");

game = new Game(canvas.width, canvas.height);
snake = new Snake();

game.clearScreen(ctx);
snake.draw(ctx);

let lastTime = 0;
window.requestAnimationFrame(gameLoop);

function gameLoop() { 

  // update
  // inputHandler();
  snake.update();

  // draw
  snake.draw(ctx);

  window.requestAnimationFrame(gameLoop);
}