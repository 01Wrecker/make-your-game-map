import div from "./utils/div.js"
import { TheGame } from "./main.js"
export class Ball {
    element = div("ball")
    isMoving = false
    Left
    Top
    height
    width
    speed = 8
    firstReset = true
    direction = new direction()
    yes = false
}
class direction {
    x = 0
    y = 4
}
Ball.prototype.display = function () {
    let board = document.querySelector(".board")
    board.append(this.element)
    this.Left = this.element.getBoundingClientRect().left
    this.Top = this.element.getBoundingClientRect().top
    this.height = this.element.getBoundingClientRect().height
    this.width = this.element.getBoundingClientRect().width
    this.resetPosition()
}
Ball.prototype.resetPosition = function () {
    let board = document.querySelector(".board").getBoundingClientRect()
    let paddle = document.querySelector(".paddle").getBoundingClientRect()
    this.Left = (paddle.left - board.left) + ((paddle.width / 2) - this.width / 2)
    this.Top = board.height - (this.height) - (paddle.height) - 23
    this.isMoving = false
    if (!this.firstReset) {
        TheGame.removeLife()
        TheGame.started = false
    }
    this.element.style.transform = `translate(${this.Left}px,${this.Top}px)`
    this.firstReset = false
}
Ball.prototype.move = function () {
    let board = document.querySelector(".board").getBoundingClientRect()

    let paddle = TheGame.paddle
    if (this.Top <= 0) {
        this.direction.y = -this.direction.y
    }
    if (this.Top + this.height + 32 >= board.height - paddle.height) {

        if (this.Left + this.width >= paddle.Left && this.Left <= paddle.Left + paddle.width) {
            this.changeDirection(paddle)
            // this.direction.x = 0
            // this.direction.y = -this.direction.y
        }

    }

    TheGame.bricksMap.forEach((br) => {
        let boardBoundings = document.querySelector(".board").getBoundingClientRect()
        let brickBoundings = br.element.getBoundingClientRect()
        // checkking y axis
        let thisBottom = this.Top + this.height
        let thisRight = this.Left + this.width
        let brickLeft = brickBoundings.left - boardBoundings.left
        let brickTop = brickBoundings.top - boardBoundings.top
        let brickBottom = brickTop + brickBoundings.height
        let brickRight = brickLeft + brickBoundings.width
        if (thisRight >= brickLeft && this.Left <= brickRight && thisBottom >= brickTop && this.Top <= brickBottom) {
            let lfo9 = thisBottom - this.direction.y <= brickTop;
            let lisr = thisRight - this.direction.x <= brickLeft
            let lte7t = this.Top - this.direction.y >= brickBottom
            let limn = this.Left - this.direction.x >= brickLeft
            switch (br.NofHits) {
                case "zero":
                    break;
                case "one":
                    if (lfo9 || lte7t) {
                        this.direction.y = -this.direction.y
                    } else if (limn || lisr) {
                        this.direction.x = -this.direction.x
                    }
                    br.NofHits = "zero"
                    br.element.className = "zero"
                    br.element.children[0].src = "./Images/zero.png"
                    TheGame.changescore()
                    TheGame.NumOfBricks--
                    break;

                case "two":
                    if (lfo9 || lte7t) {
                        this.direction.y = -this.direction.y
                    } else if (limn || lisr) {
                        this.direction.x = -this.direction.x
                    }
                    br.NofHits = "one"
                    br.element.className = "one"
                    br.element.children[0].src = "./Images/one.png"
                    TheGame.changescore()
                    TheGame.NumOfBricks--
                    break;
                case "tree":
                    if (lfo9 || lte7t) {
                        this.direction.y = -this.direction.y
                    } else if (limn || lisr) {
                        this.direction.x = -this.direction.x
                    }
                    br.NofHits = "two"
                    br.element.className = "two"
                    br.element.children[0].src = "./Images/two.png"
                    TheGame.changescore()
                    TheGame.NumOfBricks--
                    break;
            }
            console.log(TheGame.NumOfBricks);
            
            if (TheGame.NumOfBricks == 0) {
                //TheGame.display()
                document.querySelector('.win').classList.remove('Hidden')
                TheGame.win = true
                TheGame.isPaused = true
                TheGame.ball.isMoving = false
                
            }
        }
    })
    if (this.Top + this.height >= board.height) {
        this.resetPosition(paddle)

    }
    if (this.Left + this.width >= board.width) {
        this.direction.x = -this.direction.x
    }
    if (this.Left <= 0) {
        this.direction.x = -this.direction.x
    }
    this.Left += this.direction.x
    this.Top += this.direction.y
    this.element.style.transform = `translate(${this.Left}px,${this.Top}px)`
}
Ball.prototype.changeDirection = function (paddle) {
    let ch7alB3ida = ((this.Left + this.width / 2) - (paddle.Left + paddle.width / 2)) / (paddle.width / 2)
    let LimitedAngle = ch7alB3ida * (Math.PI / 3)
    this.direction.x = this.speed * Math.sin(LimitedAngle)
    this.direction.y = -this.speed * Math.cos(LimitedAngle)
}
Ball.prototype.moveLeft = function () {
    let board = document.querySelector(".board").getBoundingClientRect()
    let paddle = document.querySelector(".paddle").getBoundingClientRect()
    this.Left = (paddle.left - board.left) + ((paddle.width / 2) - this.width / 2)
    //this.Top = board.height  - (this.height) - paddle.height
    this.element.style.transform = `translate(${this.Left}px,${this.Top}px)`
}
Ball.prototype.moveRight = function () {
    let paddle = document.querySelector(".paddle").getBoundingClientRect()
    let board = document.querySelector(".board").getBoundingClientRect()
    this.Left = (paddle.left - board.left) + ((paddle.width / 2) - this.width / 2)
    //this.Top = board.height  - (this.height) - paddle.height
    this.element.style.transform = `translate(${this.Left}px,${this.Top}px)`
}