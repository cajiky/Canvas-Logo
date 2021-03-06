var canvas = document.querySelector('canvas');

canvas.width = 300;
canvas.height= 300;

var c = canvas.getContext('2d');



 var can=document.getElementById("hide");
 can.width = 300;
 can.height = 300;
 var ctx=can.getContext("2d");
 var img=document.getElementById("taco");
 ctx.drawImage(img,10,10);



function dist(x1,x2,y1,y2){
    let a = x1-x2;
    let b = y1-y2
    return Math.sqrt(a*a+b*b);
};


class Circles {
    constructor(begx,begy,radius,color,endx,endy,dx,dy){
        this.endx =endx;
        this.endy = endy;
        this.radius = radius;
        this.color= color;
        this.begx = begx;
        this.begy = begy;
        this.dx = this.endx-this.begx;
        this.dy = this.endy-this.begy;
    }

    draw() {
        c.beginPath()
        c.arc(this.begx,this.begy,this.radius,0,Math.PI *2, false);
        c.strokeStyle = this.color;
        c.stroke();
        c.fillStyle =this.color;
        c.fill();
    }

    update() {
        //write an if statement so balls never move too slow
        if(Math.abs(this.endx-this.begx) < 1 && Math.abs(this.endy-this.begy) <1){
            this.dx =0;
            this.dy =0;
        } else {
            this.dx= (this.endx - this.begx)/5;
            this.dy= (this.endy - this.begy)/5;
        } 
         
        this.begx+= this.dx
        this.begy+= this.dy
        this.draw();
        

    }
}

let circleArray = [];

function setup() {
    let radius =1.5;
    for(let i=1; i<20000;i++){
        //build a matrix of packed circles based on thier radius
        let endx = (radius *i*2)%(canvas.width)//+(radius*(i%2))
        let endy = Math.ceil(i/(canvas.width/(radius*2)))* Math.sqrt(3)*radius

        //randomize the ending position
        //let endx = Math.random()*300;
        //let endy = Math.random()*300;
        let begx = Math.random()*300;
        //let begx = Math.random()*50;  //make the beginning balls spawn nearthe edges
        let begy = Math.random()*300;
        //let radius = (Math.floor(Math.random()))+1
        let dx = endx-begx;
        let dy = endy-begy;
        let pixel= ctx.getImageData(endx,endy,1,1)
        //console.log(pixel);
        let data = pixel.data;
        //console.log(data)
        let color = `rgba(${data[0]},${data[1]},${data[2]},${(data[3]/255)})`
        //console.log(color)
        let circle = new Circles(begx,begy,radius,color,endx,endy,dx,dy);

        let overlapping = false
        for(let j=0; j< circleArray.length; j++){//for loop makes sure balls are not overlapping
            let other = circleArray[j];
            let d = dist(circle.endx,other.endx,circle.endy,other.endy);
            if(d < circle.radius + other.radius){
                overlapping = true;
                break;
            }
        }
        if(overlapping== false){
            circleArray.push(circle);
            //console.log(circleArray);
        }
    }
}
setup();

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);
    for(let i = 0; i< circleArray.length; i++){
        circleArray[i].draw();
        circleArray[i].update();
    }
}

animate();