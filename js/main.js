canvas = document.getElementById("game");
ctx = canvas.getContext("2d");

game = new Game(canvas.width, canvas.height);
snake = new Snake();

game.clearScreen(ctx);
snake.draw(ctx);