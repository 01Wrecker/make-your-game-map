import div from "./utils/div.js";
export class Brick {
    element = div("")
    constructor(NofHits) {
        this.NofHits = NofHits
    }
}
Brick.prototype.displayBrick = function () {
    this.element = div(this.NofHits)
    let img = document.createElement("img")
    img.src = `./Images/${this.NofHits}.png`
    this.element.append(img)

    return this.element
}
