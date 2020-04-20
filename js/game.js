import inputHandler from "./inputHandler.js";

export default class Game {
  constructor(width, height, context) {
    this.WIDTH = width;
    this.HEIGHT = height;
    this.ctx = context;

    this.localSite = "http://localhost:3000/api/v1/scores";
    this.herokuSite = "https://paddysnake.herokuapp.com/api/v1/scores";
    this.site = this.herokuSite;

    this.loggedIn = true;

    this.iHandler = new inputHandler();

    this.speed = 0;
    this.score = 0;
    this.mainMenuRunning = true;
    this.highScores = null;

    this.thisSecond = 0;
    this.frames = 0;
    this.FPS = 0;
    this.exit = true;

    this.gameState = {
      mainMenu: true,
      running: false,
      paused: false,
      gameOver: false
    }
  }

  addScore() {
    this.score += 1;
    this.getNewSpeed();
  }

  getNewSpeed() {
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

  HUD() {
    this.showScore();
    this.showSpeed();
  }

  showSpeed() {
    this.ctx.fillStyle = "white";
    this.ctx.font = "20px Monospace";
    this.ctx.fillText(`SPEED: ${this.speed}`, 30, 40);
  }

  showScore() {
    this.ctx.fillStyle = "white";
    this.ctx.font = "20px Monospace";
    this.ctx.fillText(`SCORE: ${this.score}`, this.WIDTH - 130, 40);
    
  }

  clearScreen() {
    this.ctx.fillStyle = "MidnightBlue"
    this.ctx.fillRect(0, 0, this.WIDTH, this.HEIGHT);
  }

  collisions(me, you) {
    let topRightHit = false;
    let topLeftHit = false;
    let topHit = false;
    let rightSideHit = false;
    let leftSideHit = false;
    let sideHit = false;
    let collision = false;

    if (me.head.x + me.size <= you.pos.x + you.size && me.head.x + me.size >= you.pos.x) {
      // console.log("Top Right");
      topRightHit = true;
    }
    if (me.head.x >= you.pos.x && me.head.x <= you.pos.x + you.size) {
      // console.log("Top Left");
      topLeftHit = true;
    }
    if (topRightHit || topLeftHit) {
      // console.log("Top Hit");
      topHit = true;
    }

    if (me.head.y >= you.pos.y && me.head.y <= you.pos.y + you.size) {
      // console.log("Left Side Hit");
      leftSideHit = true;
    }
    if (me.head.y + me.size >= you.pos.y && me.head.y + me.size <= you.pos.y + you.size) {
      // console.log("Right Side Hit");
      rightSideHit = true;
    }
    if (leftSideHit || rightSideHit)
      // console.log("Side Hit");
      sideHit = true;
    
    if (sideHit && topHit) {
      collision = true;
    }
    return collision;
  }

  checkBounds(toCheck) {
    if (toCheck.x > this.WIDTH - 8)
      toCheck.x = 0;
    if (toCheck.x < 0)
      toCheck.x = this.WIDTH - 8;
    if (toCheck.y > this.HEIGHT - 8)
      toCheck.y = 0
    if (toCheck.y < 0)
      toCheck.y = this.HEIGHT - 8
  
  }
  async gameOver() {
    this.clearScreen();
    this.ctx.fillStyle = "white";
    this.ctx.font = "30px Monospace";
    this.ctx.fillText(`GAME OVER!`, this.WIDTH / 2 - 70, this.HEIGHT / 2 - 20);
    this.ctx.fillText(`SCORE: ${this.score}`, this.WIDTH / 2 - 60, this.HEIGHT / 2 + 20);

    //
    // send score to backend
    let res = await fetch(this.site,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          score: this.score
        })
      }
    )
    this.getHighScores();
    
  }

  async login() { 
    console.log("Logging in.... ");
    
    let canvas = document.getElementById("game");
    let scores = document.getElementById("highScores");
    let form = document.getElementById("form");

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
      form.classList.remove("noShow");
      form.classList.add("show");
    }
  }

  async getHighScores() {
    try {
      let response = await fetch(this.site);
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

  loadHighScores(data) { 
    console.log(data);
    let scores = document.getElementById("highScoreList");
    scores.innerHTML = "";
    let newLi = document.createElement("li");
    newLi.innerHTML = "High Scores"
    newLi.id = "highScoreText"
    scores.appendChild(newLi);

    for (let i = 0; i < 10; i++) {
      newLi = document.createElement("li");
      newLi.innerHTML = `${i+1}: ${data[i].value}`;
      scores.appendChild(newLi);
    }
  }
}
