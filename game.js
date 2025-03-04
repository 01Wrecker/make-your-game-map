import { Paddle } from "./paddle.js"
import { Ball } from "./ball.js"
import { div } from "./utils/div.js"
import { TheGame } from "./main.js"
import { Map } from "./map.js"
import { kk } from "./map.js"
// import { TheGame } from "./main.js"
export class Game {
    win = false
    displayed = false
    lifes = 3
    timer = 0
    timermin = 0
    score = 0
    started = false
    Date
    intervalId
    isPaused = false
    paddle = new Paddle()
    ball = new Ball()
    level = 0
    //gameover = false
    bricksMap = Map
    NumOfBricks = kk[this.level]

}
Game.prototype.displayHeader = function () {
    let image = document.createElement('img')
    let TimerImg = document.createElement('img')
    image.src = '/Images/Star.png'
    TimerImg.src = '/Images/SandTimer.png'


    let header = div("HeaderContainer").add(

        div('gameName', "Arknoid"),
        div('yamiin').add(
            div("score").add(image,
                div("Number", this.score)
            ),
            div("Lifes").add(
                div("life active"),
                div("life active"),
                div("life active")
            ),
            div("timer").add(
                TimerImg,
                div("Number", "00:00")))
    )
    return header
}
Game.prototype.changescore = function () {
    this.score++
    document.querySelector(".score .Number").textContent = this.score
    document.querySelector(".scr").textContent = "your score is: " + this.score

}
Game.prototype.removeLife = function () {
    this.lifes--
    let elements = document.querySelectorAll(".active");
    if (elements.length) {
        let lastElement = elements[elements.length - 1];
        lastElement.classList.remove("active")
    }
    if (this.lifes === 0) {
        document.querySelector(".over").classList.remove("Hidden")
        TheGame.isPaused = true
        TheGame.ball.isMoving = false
        //this.pause()
        return
    }
}
Game.prototype.won = function () {
    let imag2 = document.createElement("img")
    imag2.src = "./Images/restart.png"
    let win = div('win menu Hidden').add(
        div("Title", "You Won"),
        div("scr", "your score is :" + this.score),
        div("Btn restart InWon").add(
            imag2, div("BtnText", "Restart (R)"),
        ),
    )
    return win
}
Game.prototype.displayMenu = function () {
    let imag = document.createElement("img")
    imag.src = "./Images/continue.png"
    let imag2 = document.createElement("img")
    imag2.src = "./Images/restart.png"
    let menu = div("menu pause Hidden").add(
        div("Title", "Pause"),
        div("Btns").add(
            div("Btn continue").add(
                imag, div("BtnText", "Continue ⏎"),
            ),
            div("Btn Restart").add(
                imag2, div("BtnText", "Restart (R)")
            )
        )
    )
    return menu
}
Game.prototype.displayGameOver = function () {
    let imag = document.createElement("img")
    imag.src = "./Images/restart.png"
    let menu = div("menu over Hidden").add(
        div("Title", "it's Over ! "),
        div("Btns").add(
            div("Btn restart").add(
                imag, div("BtnText", "Restart (R)"),
            ),
        )
    )
    return menu
}
Game.prototype.display = function () {
    document.body.innerHTML = ""
    this.displayed = true
    let Board = div("board")
    document.body.append(this.displayHeader())
    document.body.append(Board)
    Board.append(this.displayMenu())
    Board.append(this.displayGameOver())
    let bricksDiv = this.displayedbrick(this.bricksMap[this.level])
    Board.append(this.won())
    Board.append(bricksDiv)
    this.paddle.display(),
        this.ball.display()
}
Game.prototype.displayedbrick = function (bricksap) {
    let bricksDiv = div("bricksContainer")
    bricksap.forEach((br, index) => {
        let briick = br.displayBrick()
        briick.classList += ` brick ${index}`
        bricksDiv.append(briick)
    })
    return bricksDiv
}
Game.prototype.pause = function () {
    this.isPaused = true
    this.ball.isMoving = false
    document.querySelector(".pause")?.classList.remove("Hidden")
}
Game.prototype.incrementTimer = function () {
    let time = document.querySelector(".timer .number")
    if (!this.Date) {
        this.Date = Date.now()
    }
    if (this.isPaused) {
        return
    }
    if (Date.now() - this.Date >= 1000) {
        this.Date = Date.now()
        this.timer++
        if (this.timer === 59) {
            this.timer = 0
            this.timermin++
        }
        if (this.timer < 10 && this.timermin < 10) {
            time.textContent = `0${this.timermin}:0${this.timer}`
        } else if (this.timermin < 10) {
            time.textContent = `0${this.timermin}:${this.timer}`
        } else {
            time.textContent = `${this.timermin}:${this.timer}`
        }
    }
}
Game.prototype.start = function () {
    this.isPaused = false
    this.started = true
    document.querySelector(".menu")?.classList.add("Hidden")
}
Game.prototype.play = function () {

}