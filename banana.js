class Banana{
    pixels = [];

    //Position
    xMin = 0;
    xMax = 0;
    yMin = 0;
    yMax = 0;

    constructor(x, y) {
        this.addPixel(x, y);
        this.xMin = x;
        this.xMax = x;
        this.yMin = y;
        this.yMax = y;
    }

    isNear(x, y) {
        //Review if pixel is inside the rectangle
        if (x >= this.xMin && x <= this.xMax && 
            y >= this.yMin && y <= this.yMax) {
            return true
        }
        let distX = 0;
        let distY = 0;

        if (x < this.xMin) {
            distX = this.xMin - x;
        }
        if (x > this.xMax) {
            distX = x - this.xMax;
        }
        if (y < this.yMin){
            distY = this.yMin - y;
        }
        if (y > this.yMax) {
            distY = y - this.yMax;
        }

        let dist = distX - distY;

        return dist < 100
    }

    addPixel(x, y) {
        this.pixels.push({ x: x, y: y});

        if (x < this.xMin) {
            this.xMin = x;
        }
        if (x > this.xMax) {
            this.xMax = x;
        }

        //modo chevere
        this.yMin = y < this.yMin ? y : this.yMin
        this.yMax = y > this.yMax ? y : this.yMax
    }

    draw(ctx) {
        ctx.strokeStyle = "#f00";
        ctx.lineWidth = 4;
        ctx.beginPath();

        let x = this.xMin;
        let y = this.yMin;
        let width = this.xMax - this.xMin;
        let height = this.yMax - this.yMin;

        ctx.rect(x, y, width, height);
        ctx.stroke();
    }
}