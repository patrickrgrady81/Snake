import Game from "./game.js"
import Snake from "./snake.js"
import inputHandler from "./inputHandler.js"
import Food from "./food.js"

let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");

let game = new Game(canvas.width, canvas.height, ctx);
let snake = new Snake(ctx);
let input = new inputHandler(snake);
let food = new Food(game, ctx);


// gameLoop
let lastTime = 0;
window.requestAnimationFrame(gameLoop);

function gameLoop() { 

  // update
  input.update();
  snake.update();
  // check bounds
  game.checkBounds(snake.head);
  // check collsions
  if (game.collisions(snake, food)) {
    snake.speedUp();
    snake.grow();
    food.hit();
  }

  // draw
  game.clearScreen();
  food.draw();
  snake.draw();

  setTimeout(gameLoop, 80);
  // window.requestAnimationFrame(gameLoop);
}