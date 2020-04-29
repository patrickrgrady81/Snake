import Snake from "./snake.js";
import Game from "./game.js";


export default class inputHandler {
  constructor(snake, game) { 
    this.game = game;

    this.snake = snake;
    this.keyMap = {
      // For WASD
      65: 'left',
      87: 'up',
      68: 'right',
      83: 'down',
      
      // For arrrow keys
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down',

      32: 'space',
      13: 'enter',
      76: 'l'
    }
    this.pressedKeys = {
      left: false,
      right: false,
      up: false,
      down: false,
      space: false,
      enter: false,
      l: false
    }

    document.addEventListener("keydown", (event) => { 
      // console.log(event.keyCode);
      event.preventDefault;
      let key = this.keyMap[event.keyCode];
      this.pressedKeys[key] = true;
    }, false);

    document.addEventListener("keyup", (event) => {
      event.preventDefault;
      let key = this.keyMap[event.keyCode];
      this.pressedKeys[key] = false;
    }, false);

  }


  update() {
    if (this.pressedKeys.left) {
      if (this.game) {
        if (!this.game.mainMenuRunning) {
          this.snake.moveLeft();
        }
      }
    }
    if (this.pressedKeys.right) {
      if (this.game) {
        if (!this.game.mainMenuRunning) {
          this.snake.moveRight();
        }
      }
    }
    if (this.pressedKeys.up) {
      if (this.game) {
        if (!this.game.mainMenuRunning) {
          this.snake.moveUp();
        }
      }
    }
    if (this.pressedKeys.down) {
      if (this.game) {
        if (!this.game.mainMenuRunning) {
          this.snake.moveDown();
        }
      }
    }
    if (this.pressedKeys.space) {
      if (this.game) {
        if (this.game.mainMenuRunning) {
          return;
        } else {
          this.snake.stop();
        }
      }
    }

    if (this.pressedKeys.enter) {
      if (this.game) {
        if (this.game.mainMenuRunning) {
          this.game.mainMenuRunning = false;
        }
      }
    }

    if (this.pressedKeys.l) {
      if (this.game.mainMenuRunning) { 
        this.game.logout();
      }
    }
  }
}
 
