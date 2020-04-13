import Game from "./game.js"
import Snake from "./snake.js"
import inputHandler from "./inputHandler.js"
import Food from "./food.js"

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const width = canvas.width;
const height = canvas.height;

const game = new Game(width, height, ctx);
const snake = new Snake(ctx);
const input = new inputHandler(snake);
const food = new Food(game, ctx);

let delay = 80;

window.requestAnimationFrame(gameLoop);


function gameLoop() { 

  // update
  input.update();
  snake.update();

  // check bounds
  game.checkBounds(snake.head);

  // check collsions
  if (snake.eat(food)) {
    snake.grow();
    food.eat();
    game.addScore();
  }
  if (snake.hitSelf()) { 
    gameOver();
    return;
  }

  // draw
  game.clearScreen();
  food.draw();
  snake.draw();
  game.HUD();

  delay = 110 - game.speed;

  setTimeout(gameLoop, delay);
}

 function gameOver() { 
   game.clearScreen();
   game.ctx.fillStyle = "white";
   game.ctx.font = "30px Monospace";
   game.ctx.fillText(`GAME OVER!`, width / 2 - 70, height / 2 - 20);
   game.ctx.fillText(`SCORE: ${game.score}`, width / 2 - 60, height / 2 + 20);
}