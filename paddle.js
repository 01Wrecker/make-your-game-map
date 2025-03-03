import { TheGame } from "./main.js";
import div from "./utils/div.js";

export class Paddle {
    vaus = div("paddle")
    positionX
    positionY
    Left
    Top
    height
    width  
    position = "center"
    speed = 10
    isMoving = false
    KeyPressed = null
}
Paddle.prototype.resetPosition = function() {
    let board = document.querySelector(".board").getBoundingClientRect()
    this.Left = board.width / 2 - (this.vaus.getBoundingClientRect().width / 2)
    this.Top = board.height - this.vaus.getBoundingClientRect().height-23
    this.height =this.vaus.getBoundingClientRect().height
    this.width = this.vaus.getBoundingClientRect().width
    this.vaus.style.transform = `translate(${this.Left}px,${this.Top}px)`
}
Paddle.prototype.display = function () {
    document.querySelector(".board").append(this.vaus)
    this.Left = this.vaus.getBoundingClientRect().left 
    this.Top = this.vaus.getBoundingClientRect().top    
    this.resetPosition()    
};

Paddle.prototype.moveLeft = function () {
    //let element = TheGame.ball.element.getBoundingClientRect()
    if (this.Left >= 6) {
        this.Left -= 8 
        this.vaus.style.transform = `translate(${this.Left}px ,${this.Top}px )`
        if (!TheGame.started) {
            //console.log(element.left -8);
            //TheGame.ball.left = element.left -8
         TheGame.ball.moveLeft()
            //   console.log(TheGame.ball.left)
        }
    }
}

Paddle.prototype.moveRight = function () {
  //  let element = TheGame.ball.element
    let board = document.querySelector(".board").getBoundingClientRect()
    if (this.Left < board.width - this.vaus.getBoundingClientRect().width -6) {
        this.Left += 8
        this.vaus.style.transform = `translate(${this.Left}px ,${this.Top}px )`
        if (!TheGame.started) {
            //console.log('jj');
            TheGame.ball.moveRight()
        }
    }
}
