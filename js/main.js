import Game from "./game.js"
import Snake from "./snake.js"
import inputHandler from "./inputHandler.js"
import Food from "./food.js"

window.addEventListener('DOMContentLoaded', run);

function run() {
  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d");

  const width = canvas.width;
  const height = canvas.height;

  const game = new Game(width, height, ctx);
  const snake = new Snake(ctx, game);
  const input = new inputHandler(snake, game);
  const food = new Food(game, ctx, snake);

  const localResetDb = "4/26/2020";
  const versionName = `The Refactor and Validate Update`;
  const version = `v0.6.2 (${versionName})`;

  const color = "midnightBlue"
  let delay = 80;
  let v = document.getElementsByClassName("version");
  populateVersion(v);

  checkForSession();
  game.getHighScores();

  

  // ===============
  // Event Listeners
  // ===============

  let signin = document.getElementById("signin-btn");
  let signup = document.getElementById("signup-btn");
  let signIn = document.getElementById("signIn");
  let signUp = document.getElementById("signUp");

  signin.addEventListener("click", switchMenus)
  signup.addEventListener("click", switchMenus);

  // sign in as Anonymous
  let anon = document.getElementById("anon-btn");
  anon.addEventListener("click", (e) => { 
    e.preventDefault();
    let username = "anonymous";
    let password = "password"; 

    let res = fetch(game.site.concat("login"),
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
        loginAndStart(data);
      } else { 
        // get #form then add a child with a p that shows this message
        let error = document.getElementById("errorSignIn")
        error.innerHTML = "Invalid username or password";
      }
    })
    .catch((err) => { 
      console.log(err);
    })
 
  });

  // When Submit is clicked
  window.addEventListener("submit", (e) => {
    e.preventDefault();

    if (e.target.id === "signInForm") {
      let username = e.target[0].value.toLowerCase();
      let password = e.target[1].value;
      
      let res = fetch(game.site.concat("login"),
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
        // If we get a user back, then sign in was successful
        if (data.user) {
          loginAndStart(data)
        } else { 
          // unsuccessful sign in
          let error = document.getElementById("errorSignIn")
          error.innerHTML = "Invalid username or password";
        }
      })
      .catch((err) => { 
        console.log(err);
      })
    } else { 
      let username = e.target[0].value.toLowerCase();
      let email = e.target[1].value.toLowerCase();
      let password = e.target[2].value;
      let password_confirmation = e.target[3].value;

      let res = fetch(game.site.concat("signup"),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          username, email, password, password_confirmation
        })
      }
      ).then((res) => {
        return res.json();
      })
        .then((data) => { 
        // If we get a user back, then sign up was successful
        if (data.user) {
          loginAndStart(data)
        } else { 
          // unsuccessful sign up
          // get #form then add a child with a p that shows this message
          let error = document.getElementById("errorSignUp")
          if (data.error) { 
            error.innerHTML = data.error;
          } else {
            error.innerHTML = "Invalid username or password";
          }
        }
      })
      .catch((err) => { 
        console.log(err);
      })
    }
  });


  // =========
  // Functions
  // =========

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

    delay = 130 - game.speed;
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
    ctx.fillText(`Prees L to logout`, width / 2 - 100, 150);
    ctx.fillText(`PaddySnake`, width / 2 - 55, height / 2 - 40);
    ctx.fillText(`----------`, width / 2 - 55, height / 2 - 10);
    ctx.fillText(`Press ENTER to start`, width / 2 -102, height / 2 + 40 );
    ctx.fillText(`Use WASD or arrow keys to move, space to pause / unpause`, width / 2 -312, height / 2 + 80 );
    ctx.fillText(`Caution, pausing may kill you when you return...`, width / 2 -285, height / 2 + 120 );

    input.update();

    if (game.mainMenuRunning) {
      setTimeout(menuLoop, 100)
    } else { 
      gameLoop();
    }
  }

  function loginAndStart(data) { 
    game.loggedIn = true;
    game.username = data.user.username;
    game.login();
    menuLoop();
  }

  function switchMenus(e) { 
    e.preventDefault();
    signIn.classList.toggle("noShow")
    signIn.classList.toggle("show")
    signUp.classList.toggle("noShow")
    signUp.classList.toggle("show")
    document.getElementById("errorSignIn").innerHTML = "";
    document.getElementById("errorSignUp").innerHTML = "";
  }

  function populateVersion(v) { 
    for (let i = 0; i < v.length; i++) { 
      v[i].innerHTML = version;
    }
  }

  function checkForSession() { 

    let res = fetch(game.site.concat("check"))
      .then(res => { 
        return res.json();
      })
      .then(data => {
        if (data.session) {
          console.log("There is a session");
          loginAndStart(data);
        } else { 
          console.log(`No session data: ${data.session}`);
        }
      })
      .catch(err => { 
        console.log(err);
      })
  }
}