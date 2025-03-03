import { Game } from "./game.js"

export let TheGame = new Game()
// display the board graphics
TheGame.display()
// Handling events
let pressedKey
function HandleEvents() {
    document.addEventListener("keydown", function (event) {
        pressedKey = event.key
    });
    document.addEventListener("keyup", function (event) {
        pressedKey = null
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
    if (TheGame.started) {
        TheGame.incrementTimer()
    }
    // if (TheGame.gameover) {
    //     if (pressedKey === "Enter") {
    //         TheGame = new Game()
    //         TheGame.display()
    //         console.log("game restarted");
    //     }
    // }
    if (TheGame.ball.isMoving) {
        TheGame.ball.move(TheGame.paddle.positionY)
    }
    if (TheGame.isPaused  ) {
        if (pressedKey === "Enter") {
            if (TheGame.lifes !== 0) {
                TheGame.start()
                TheGame.ball.isMoving = true
            }else {
                TheGame = new Game()
                TheGame.display()
            }
        }else if (pressedKey === "r") {
            TheGame = new Game()
            TheGame.display()
            console.log("game restarted!");
            
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

// on key down Start the game
// TheGame.start()
// //on echap pause the game
// TheGame.pause()
// // restart the game // continue
// //TheGame.restart()
// // TheGame.continue()
