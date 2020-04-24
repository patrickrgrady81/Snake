import Game from "./game.js"
import Snake from "./snake.js"
import inputHandler from "./inputHandler.js"
import Food from "./food.js"


window.addEventListener('DOMContentLoaded', () => { run() })

function run() {

  let res = null;
  let username;
  let password;

  window.addEventListener("submit", (e) => {
    e.preventDefault();
    username = e.target[0].value;
    password = e.target[1].value;
    
    res = fetch("http://localhost:3000/api/v1/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        username, password
      })
    }
    ).then((res) => {
      return res.json();
    })
    .then((data) => { 
      if (data.user) {
        game.loggedIn = true;
        game.username = data.user.username;
        game.login();
        menuLoop();
      } else { 
        console.log("Log In error!");
      }
    })
    .catch((err) => { 
      console.log(err);
    })});


  const versionName = "The Like You Better Square Update";
  const version = `v0.3.1 (${versionName})`;

  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d");

  const width = canvas.width;
  const height = canvas.height;

  const game = new Game(width, height, ctx);
  const snake = new Snake(ctx, game);
  const input = new inputHandler(snake, game);
  const food = new Food(game, ctx, snake);

  const color = "midnightBlue"

  let delay = 80;
  // game.login();
  game.getHighScores();

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
    game.draw(snake, food);

    delay = 110 - game.speed;
    setTimeout(gameLoop, delay);
  }

  function menuLoop() { 
    game.clearScreen(color);

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
    ctx.fillText(`${version}`, 20, 20);
    ctx.fillText(`Welcome ${game.username}`, width / 2 - 55, 120);
    ctx.fillText(`----`, width / 2 - 15, 150);
    ctx.fillText(`PaddySnake`, width / 2 - 55, height / 2 - 40);
    ctx.fillText(`----------`, width / 2 - 55, height / 2 - 10);
    ctx.fillText(`Press SPACE to start`, width / 2 -102, height / 2 + 40 );
    ctx.fillText(`Use WASD or arrow keys to move, space to pause / unpause`, width / 2 -312, height / 2 + 80 );

    input.update();

    if (game.mainMenuRunning) {
      setTimeout(menuLoop, 100)
    } else { 
      gameLoop();
    }
  }

  function showFPS(FPS) {
    game.clearScreen(color);
    game.ctx.font = "20px Monospace";
    game.ctx.fillStyle = "white";
    game.ctx.fillText(`FPS: ${game.FPS}`, 10, game.HEIGHT-40);
  }

  function loginLoop() { 

    game.clearScreen(color);

    const sec = Math.floor(Date.now() / 1000);  // What is the second right now Date.now() gives miliseconds, /1000 gives 1 second
    if (sec != game.thisSecond) {                    // if it's not the same, then it's been a full second, so start the frame count over
      game.thisSecond = sec;
      game.FPS = frames;
      game.frames = 1;
    } else {                                    // otherwise it still hasn't been a full second
      game.frames++;
    }
    

    // login here
    game.login();

    if (!game.loggedIn) {
      loginLoop();
    } else { 
      menuLoop();
      return;
    }
  }
}