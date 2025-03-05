import { Game } from "./game.js"
export let TheGame = new Game()
// display the board graphics
TheGame.display()
// Handling events
let pressedKeys = []
function HandleEvents() {
    document.addEventListener("keydown", function (event) {
        if (!pressedKeys.includes(event.key)) {
            pressedKeys.push(event.key)
        }
    });
    document.addEventListener("keyup", function (event) {
        let index = pressedKeys.indexOf(event.key);
        pressedKeys.splice(index, 1);
    });
}
let timeout;
window.addEventListener("resize", () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        console.log("Resized, reloading...");
        location.reload();
    }, 50); // Reload after 500ms of no resizing
});
HandleEvents()
// this will run aproximetly every 16ms
function main() {
    let pressedKey = pressedKeys[pressedKeys.length - 1]
    if (TheGame.started) {
        TheGame.incrementTimer()
    }
    if (TheGame.ball.isMoving) {
        TheGame.ball.move(TheGame.paddle.positionY)
    }
    if (TheGame.isPaused) {
        if (pressedKey === "Enter") {
            if (TheGame.lifes !== 0) {
                TheGame.start()
                TheGame.ball.isMoving = true
            } else {
                TheGame = new Game()
                TheGame.display()
            }
        } else if (pressedKey === "r") {
            TheGame = new Game()
            TheGame.display()
            console.log("game                                 restarted!");

        } else if (pressedKey === "n" && TheGame.win) {
            TheGame = new Game();
            TheGame.level++; // Increment level after creating a new Game instance
            TheGame.win = false; // Reset win status
            console.log("Game restarted! Level:", TheGame.level);
            TheGame.display();
        }
        
    }
    if ((pressedKey === " " || pressedKey === "ArrowUp") && !TheGame.isPaused) {
        TheGame.start()
        TheGame.ball.isMoving = true
    } else if (pressedKey === "Escape") {
        TheGame.pause()
        TheGame.ball.isMoving = false
        TheGame.isPaused = true
    }
    if (pressedKey === "ArrowLeft" && !TheGame.isPaused) {
        TheGame.paddle.moveLeft(pressedKey)
    } else if (pressedKey === "ArrowRight" && !TheGame.isPaused) {
        TheGame.paddle.moveRight(pressedKey)
    }
    requestAnimationFrame(main)
}
requestAnimationFrame(main)

