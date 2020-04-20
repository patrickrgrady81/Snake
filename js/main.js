import Game from "./game.js"
import Snake from "./snake.js"
import inputHandler from "./inputHandler.js"
import Food from "./food.js"


window.addEventListener('DOMContentLoaded', () => { run() })

function run() {
  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d");

  const width = canvas.width;
  const height = canvas.height;

  const game = new Game(width, height, ctx);
  const snake = new Snake(ctx, game);
  const input = new inputHandler(snake, game);
  const food = new Food(game, ctx, snake);

  let delay = 80;

  game.login();
  game.getHighScores();
  window.requestAnimationFrame(menuLoop);
  window.requestAnimationFrame(gameLoop);

  function gameLoop() {

    // game.mainMenu()

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
      game.gameOver();
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

  function menuLoop() { 
    game.clearScreen();

    const sec = Math.floor(Date.now() / 1000);  // What is the second right now Date.now() gives miliseconds, /1000 gives 1 second
    if (sec != game.thisSecond) {                    // if it's not the same, then it's been a full second, so start the frame count over
      game.thisSecond = sec;
      game.FPS = frames;
      game.frames = 1;
    } else {                                    // otherwise it still hasn't been a full second
      game.frames++;
    }

    // showFPS(game.FPS);
    
    ctx.fillStyle = "white";
    ctx.font = "20px Monospace";
    ctx.fillText(`PaddySnake`, width / 2 - 20, height / 2 - 30);
    ctx.fillText(`Press SPACE to start`, width / 2 -42, height / 2);

    game.iHandler.update();

    if (game.mainMenuRunning) {
      requestAnimationFrame(menuLoop);
    } else { 
      return;
    }
  }

  function showFPS(FPS) {
    game.clearScreen();
    game.ctx.font = "20px Monospace";
    game.ctx.fillStyle = "white";
    game.ctx.fillText(`FPS: ${game.FPS}`, 10, game.HEIGHT-40);
  }
}