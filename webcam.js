
let video = document.getElementById("video");
let canvas = document.getElementById("canvas");
const widthCamera = 720;
const heightCamera = 720;
const yellow = {r: 255, g: 255, b: 0}
const tresholdDistanceColor = 160;

function showCamera(){
    let opcions = {
        audio: false,
        video: {
            width: 720, height: 720
        }
    }

    if(navigator.mediaDevices.getUserMedia){
        navigator.mediaDevices.getUserMedia(opcions)
            .then(function(stream){
                video.srcObject = stream;
                processCamera();
            })
            .catch(function(err){
                console.log("Ooops. Was ocurred an error!")
            })
    }
}

function processCamera(){
    let ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, widthCamera, heightCamera, 0, 0, canvas.width, canvas.height);
    let imgData = ctx.getImageData(0,0, canvas.width, canvas.height);
    let pixels = imgData.data;

    //let pixelTopYellow = null;
    //let minorDistance = null;

    /*let sumX = 0;
    let sumY = 0;
    let count = 0;*/

    let bananas = []

    for(let p=0; p<pixels.length; p += 4){
        let red = pixels[p]
        let green = pixels[p + 1]
        let blue = pixels[p + 2]
        let alpha = pixels[p + 3]

        // sqrt[(x2-x1)^2 + (y2-y1)^2 + (z2-z1)^2 [distance formula]]
        let distance = Math.sqrt(
            Math.pow(yellow.r - red, 2) + Math.pow(yellow.g - green, 2) + Math.pow(yellow.b - blue, 2)
        )
        if(distance < tresholdDistanceColor){
            /*
            pixels[p] = 255; //r
            pixels[p + 1] =  0; //g
            pixels[p + 2] = 0; //b
            */

            let y = Math.floor(p/4/canvas.width);
            let x = (p/4) % canvas.width;

            //Group pixels
            if(bananas.length == 0){
                let banana = new Banana(x, y);
                bananas.push(banana);

            } else {
                let founded = false;
                for(let i=0; i < bananas.length; i++) {
                    if(bananas[i].isNear(x, y)) {
                        bananas[i].addPixel(x, y);
                        founded = true;
                        break;
                    }
                }

                if (!founded) {
                    let bann = new Banana(x, y);
                    bananas.push(bann);
                }
            }
            
            /*sumX += x;
            sumY += y;
            count++;*/

        }

        /*
        if(minorDistance == null || distance < minorDistance){
            minorDistance = distance;

            let y = Math.floor(p/4/canvas.width);
            let x = (p/4) % canvas.width;

            pixelTopYellow = {x: x, y: y};
        }*/
    }
    ctx.putImageData(imgData, 0, 0);

    for(let i=0; i<bananas.length; i++) {
        bananas[i].draw(ctx);
    }
    /*if(count > 0){
        ctx.fillStyle = "#00f";
        ctx.beginPath();
        ctx.arc(sumX/count, sumY/count, 10, 0, 2 * Math.PI);
        ctx.fill();
    }*/

    setTimeout(processCamera, 20)
}
