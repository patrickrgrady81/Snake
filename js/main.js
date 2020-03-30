import Game from "./game.js"
import Snake from "./snake.js"
import inputHandler from "./inputHandler.js"

let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");

let game = new Game(canvas.width, canvas.height, ctx);
let snake = new Snake(ctx);
let input = new inputHandler(snake);


// gameLoop
let lastTime = 0;
window.requestAnimationFrame(gameLoop);

function gameLoop() { 

  // update
  input.update();
  snake.update();

  // draw
  game.clearScreen();
  snake.draw();

  window.requestAnimationFrame(gameLoop);
}