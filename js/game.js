import Snake from "./snake.js"
import inputHandler from "./inputHandler.js"
import Food from "./food.js"

export default class Game {
  constructor(width, height, context) {
    this.WIDTH = width;
    this.HEIGHT = height;
    this.ctx = context;
    this.snake = new Snake(this.ctx);
    this.food = new Food(this.ctx, this.snake, this.WIDTH, this.HEIGHT);

    this.localSite = "http://localhost:3000/api/v1/";
    this.herokuSite = "https://paddysnake.herokuapp.com/api/v1/";
    this.site = this.localSite;

    this.loggedIn = false;

    this.iHandler = new inputHandler(this.snake, this);

    this.speed = 0;
    this.score = 0;
    this.mainMenuRunning = true;
    this.highScores = null;

    this.thisSecond = 0;
    this.frames = 0;
    this.FPS = 0;
    this.exit = true;
    this.paused = false;
    this.color = "midnightBlue"
    this.delay = 80;
  }

  menuLoop = () => { 
    this.clearScreen(this.color);

    const sec = Math.floor(Date.now() / 1000);  // What is the second right now Date.now() gives miliseconds, /1000 gives 1 second
    if (sec != this.thisSecond) {                    // if it's not the same, then it's been a full second, so start the frame count over
      this.thisSecond = sec;
      this.FPS = frames;
      this.frames = 1;
    } else {                                    // otherwise it still hasn't been a full second
      this.frames++;
    }
    
    this.ctx.fillStyle = "white";
    this.ctx.font = "20px Monospace";
    this.ctx.fillText(`${this.version}`, 20, 20);
    this.ctx.fillText(`Welcome ${this.username}`, this.WIDTH / 2 - 55 - this.username.length * 5, 120);
    this.ctx.fillText(`Prees L to logout`, this.WIDTH / 2 - 100, 150);
    this.ctx.fillText(`PaddySnake`, this.WIDTH / 2 - 55, this.HEIGHT / 2 - 40);
    this.ctx.fillText(`----------`, this.WIDTH / 2 - 55, this.HEIGHT / 2 - 10);
    this.ctx.fillText(`Press ENTER to start`, this.WIDTH / 2 -102, this.HEIGHT / 2 + 40 );
    this.ctx.fillText(`Use WASD or arrow keys to move`, this.WIDTH / 2 - 175, this.HEIGHT / 2 + 80 );

    this.iHandler.update();

    if (this.mainMenuRunning) {
      setTimeout(this.menuLoop, 100)
    } else { 
      this.gameLoop();
    }
  }

  gameLoop = () => {

    // update
    this.iHandler.update();
    this.snake.update();

    // check bounds
    this.checkBounds(this.snake.head);

    // check collsions
    if (this.snake.eat(this.food)) {
      this.snake.grow();
      this.food.eat();
      this.addScore();
    }
    if (this.snake.hitSelf()) {
      this.gameOver();
      return;
    }

    // draw
    this.draw();

    this.delay = 130 - this.speed;
    setTimeout(this.gameLoop, this.delay);
  }

  addScore = () => {
    this.score += 1;
    this.getNewSpeed();
  }

  getNewSpeed = () => {
    const r = Math.floor(Math.random() * 10 + 1);

    switch (true) {
      case (this.speed < 10):
        // 30% chance of speeding up
        if (r <= 3) {
          this.speed++;
        }
        break;
      case (this.speed < 20):
        // 50% chance of speeding up
        if (r <= 5) {
          this.speed++;
        }
        break;
      case (this.speed < 30):
        // 80% chance of speeding up
        if (r <= 8) {
          this.speed++;
        }
        break;
      default:
        this.speed++;
    }
  }

  HUD = () => {
    this.showScore();
    this.showSpeed();
  }

  showSpeed = () => {
    this.ctx.fillStyle = "white";
    this.ctx.font = "20px Monospace";
    this.ctx.fillText(`SPEED: ${this.speed}`, 30, 40);
  }

  showScore = () => {
    this.ctx.fillStyle = "white";
    this.ctx.font = "20px Monospace";
    this.ctx.fillText(`SCORE: ${this.score}`, this.WIDTH - 130, 40);
    
  }

  clearScreen = (color) => {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.WIDTH, this.HEIGHT);
  }

  collisions = (me, you) => {
    let topRightHit = false;
    let topLeftHit = false;
    let topHit = false;
    let rightSideHit = false;
    let leftSideHit = false;
    let sideHit = false;
    let collision = false;

    if (me.head.x + me.size <= you.pos.x + you.size && me.head.x + me.size >= you.pos.x) {
      topRightHit = true;
    }
    if (me.head.x >= you.pos.x && me.head.x <= you.pos.x + you.size) {
      topLeftHit = true;
    }
    if (topRightHit || topLeftHit) {
      topHit = true;
    }

    if (me.head.y >= you.pos.y && me.head.y <= you.pos.y + you.size) {
      leftSideHit = true;
    }
    if (me.head.y + me.size >= you.pos.y && me.head.y + me.size <= you.pos.y + you.size) {
      rightSideHit = true;
    }
    if (leftSideHit || rightSideHit)
      sideHit = true;
    
    if (sideHit && topHit) {
      collision = true;
    }
    return collision;
  }

  checkBounds = (toCheck) => {
    if (toCheck.x > this.WIDTH - 8)
      toCheck.x = 0;
    if (toCheck.x < 0)
      toCheck.x = this.WIDTH - 8;
    if (toCheck.y > this.HEIGHT - 8)
      toCheck.y = 0
    if (toCheck.y < 0)
      toCheck.y = this.HEIGHT - 8
  
  }
  gameOver = async () => {
    this.ctx.fillStyle = "white";
    this.ctx.font = "30px Monospace";
    this.ctx.fillText(`GAME OVER!`, this.WIDTH / 2 - 70, this.HEIGHT / 2 - 20);
    this.ctx.fillText(`SCORE: ${this.score}`, this.WIDTH / 2 - 60, this.HEIGHT / 2 + 20);
    this.ctx.font = "20px Monospace";
    this.ctx.fillText(`Reload the page to try again. You can do better than ${this.score}`, this.WIDTH / 2 - 300, this.HEIGHT / 2 + 60);

    let res = await fetch(this.site.concat("scores"),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          score: this.score,
          user: this.username
        })
      }
    )
    this.getHighScores();
  }

  login = () => { 
    let canvas = document.getElementById("game");
    let scores = document.getElementById("highScores");
    let form = document.getElementById("form-container");

      
    if (this.loggedIn) {
      canvas.classList.remove("noShow");
      canvas.classList.add("show");
      scores.classList.remove("noShow");
      scores.classList.add("show");
      form.classList.add("noShow");
      form.classList.remove("show");

    } else {
      canvas.classList.add("noShow");
      canvas.classList.remove("show");
      scores.classList.remove("show");
      scores.classList.add("noShow");
      form.classList.remove("noShow");
      form.classList.add("show");
    }
  }

  getHighScores = async () => {
    try {
      let response = await fetch(this.site.concat("scores"));
      let data = await response.json();
      this.loadHighScores(data);
    }
    catch{
      let scores = document.getElementById("highScoreList");
      let newLi = document.createElement("li");
      newLi.innerHTML = "Server Error: Server is probably not running, maybe you should check that :)"
      scores.appendChild(newLi);
    }
  }

  loadHighScores = (data) => { 
    let scores = document.getElementById("highScoreList");
    scores.innerHTML = "";
    let newLi = document.createElement("li");
    newLi.innerHTML = "High Scores"
    newLi.id = "highScoreText"
    scores.appendChild(newLi);

    for (let i = 0; i < 10; i++) {
      newLi = document.createElement("li");
      newLi.innerHTML = `${i+1}: ${data[i].name} ${data[i].score}`;
      scores.appendChild(newLi);
    }
  }

  draw = () => { 
      this.clearScreen("midnightBlue");
      this.food.draw();
      this.snake.draw();
      this.HUD();
  }

  logout = () => { 
    let res = fetch(this.site.concat("logout"),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },

        body: JSON.stringify({
          logout: true
        })
      }
    ).then(res => {
      return res.json();
    }).then((data) => {
      if (data.logout) {
        location.reload();
      }
    });
  
  }

  loginAndStart = (data) => {
    this.loggedIn = true;
    this.username = data.user.username;
    this.login();
    this.getHighScores();
    this.menuLoop();
  }
}
