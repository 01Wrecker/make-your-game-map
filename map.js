import { Brick } from "./bricks.js"
import { TheGame } from "./main.js"
export class Map {
    var = 0
    kk = [
        24,
        46,
        52
    ]
    map = [["zero", "one"],["zero", "one", "two"], ["zero", "one", "two", "tree"]]
}
Map.prototype.generatbrick = function (level) {
    let obj = {
        map: [],
        num: 0
    };

    let count = 0;

    for (let i = 0; i < this.kk[level]; i++) {
        let randomIndex = Math.floor(Math.random() * this.map[level].length);
        let brickType = this.map[level][randomIndex];

        obj.map.push(new Brick(brickType));

        if (brickType === "zero") count++;
    }

    obj.num = this.kk[level] - count;
    console.log(obj.num);
    

    return obj;
};


//console.log(TheGame.NumOfBricks);
