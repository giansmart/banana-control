class Banana{
    pixels = [];

    //Position
    xMin = 0;
    xMax = 0;
    yMin = 0;
    yMax = 0;
    grades = 0;

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

        //Draw circle at center
        let Xcenter = x + (width/2);
        let Ycenter = y + (height/2);

        ctx.beginPath();
        ctx.fillStyle = "#00f";
        ctx.arc(Xcenter, Ycenter, 5, 0, 2 * Math.PI);
        ctx.fill();

        let sumYleft = 0;
        let countYleft = 0;
        let sumYright = 0;
        let countYright = 0;

        for(let i=0; i<this.pixels.length; i++){
            if(this.pixels[i].x <= (x + (width * 0.1))) {
                sumYleft += this.pixels[i].y;
                countYleft++
            } else if (this.pixels[i].x >= (x + (width * 0.9))) {
                sumYright += this.pixels[i].y;
                countYright++;
            }
        }

        ctx.beginPath();
        ctx.fillStyle = "#00f";
        ctx.arc(this.xMin, (sumYleft/countYleft), 5, 0, 2 * Math.PI);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = "#00f";
        ctx.arc(this.xMax, (sumYright/countYright), 5, 0, 2 * Math.PI);
        ctx.fill();

        ctx.beginPath()
        ctx.strokeStyle = "#0f0";
        ctx.moveTo(this.xMin, (sumYleft/countYleft))
        ctx.lineTo(this.xMax, (sumYright/countYright))
        ctx.stroke();

        let diffY = (sumYright/countYright) - (sumYleft/countYleft);
        let diffX = this.xMax - this.xMin

        let rad = Math.atan(diffY/diffX)
        let grades = Math.round(rad * (180/Math.PI))
        console.log(grades)

        this.grades = grades

    }
}