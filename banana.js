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
        let minorDistance = -1;
        for(let i=0; i<this.pixels.length; i++){
            let distance = Math.sqrt(
                Math.pow(this.pixels[i].x - x, 2) + Math.pow(this.pixels[i].y - y, 2)
            );
            if (minorDistance == -1 || distance < minorDistance) {
                minorDistance = distance;
            }
        }

        if(minorDistance <= 50) {
            return true;
        }

        return false;
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