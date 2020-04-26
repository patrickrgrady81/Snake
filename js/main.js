import Game from "./game.js"
import Snake from "./snake.js"
import inputHandler from "./inputHandler.js"
import Food from "./food.js"

window.addEventListener('DOMContentLoaded', run);

function run() {
const versionName = "The Log Me In Update";
const version = `v0.4.0 (${versionName})`;

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
  game.getHighScores();

  let signin = document.getElementById("signin-btn");
  let signup = document.getElementById("signup-btn");
  let signIn = document.getElementById("signIn");
  let signUp = document.getElementById("signUp");

  signin.addEventListener("click", switchMenus)
  signup.addEventListener("click", switchMenus);

  function switchMenus(e) { 
    e.preventDefault();
    signIn.classList.toggle("noShow")
    signIn.classList.toggle("show")
    signUp.classList.toggle("noShow")
    signUp.classList.toggle("show")
  }
  
  window.addEventListener("submit", (e) => {
    e.preventDefault();

    if (e.target.id === "signInForm") {
      let username = e.target[0].value;
      let password = e.target[1].value;
      
      let res = fetch("http://localhost:3000/api/v1/login",
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
          // get #form then add a child with a p that shows this message
          const ourForm = document.getElementById("signInForm");
          const newP = document.createElement("p");
          newP.innerHTML = "Invalid username or password";
          newP.classList.add("newP");
          ourForm.appendChild(newP);
        }
      })
      .catch((err) => { 
        console.log(err);
      })
    } else { 
      console.log("Sign Up");
    }
  });


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
}