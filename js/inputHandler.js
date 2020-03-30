import Snake from "./snake.js";


export default class inputHandler {
  constructor(snake) { 
    this.snake = snake;
    this.keyMap = {
      68: 'right',
      65: 'left',
      87: 'up',
      83: 'down'
    }
    this.pressedKeys = {
      left: false,
      right: false,
      up: false,
      down: false
    }

    document.addEventListener("keydown", (event) => { 
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
      this.snake.moveLeft();
    }
    if (this.pressedKeys.right) {
      this.snake.moveRight();
    }
    if (this.pressedKeys.up) {
      this.snake.moveUp();
    }
    if (this.pressedKeys.down) {
      this.snake.moveDown();
    }
    if (!this.pressedKeys.right && !this.pressedKeys.left && !this.pressedKeys.up && !this.pressedKeys.down) {
      this.snake.stop();
    }
  }
}
 
