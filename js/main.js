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
let delay = 80;


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
    snake.grow();
    food.hit();
  }

  // draw
  game.clearScreen();
  food.draw();
  snake.draw();

  delay = 90 - Math.floor(snake.parts / 2) + 3;

  setTimeout(gameLoop, delay);
  // window.requestAnimationFrame(gameLoop);
}