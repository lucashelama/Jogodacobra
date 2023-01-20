class Cobra{
    constructor(x, y, size){
        this.x = x
        this.y = y
        this.size = size
        this.tail = [{x:this.x, y:this.y}]
        this.rotateX = 0
        this.rotateY = 1
    }

    move(){
        var newRect;
        if(this.rotateX == 1){
            newRect = {
                x: this.tail[this.tail.length - 1].x + this.size,
                y: this.tail[this.tail.length - 1].y
            }
        } else if(this.rotateX == -1){
            newRect = {
                x: this.tail[this.tail.length - 1].x - this.size,
                y: this.tail[this.tail.length - 1].y
            }
        } else if(this.rotateY == 1){
            newRect = {
                x: this.tail[this.tail.length - 1].x,
                y: this.tail[this.tail.length - 1].y + this.size
            }
        } else if(this.rotateY == -1){
            newRect = {
                x: this.tail[this.tail.length - 1].x,
                y: this.tail[this.tail.length - 1].y - this.size
            }
        }

        this.tail.shift()
        this.tail.push(newRect)
    }
}

class Apple{
    constructor(){
        console.log("apple")
        console.log(cobra.size)
        var isTouching;
        while(true){
            isTouching = false;
            this.x = Math.floor(Math.random() * canvas.width / cobra.size) * cobra.size
            this.y = Math.floor(Math.random() * canvas.height / cobra.size) * cobra.size
            for(var i = 0; i < cobra.tail.length;i++){
                if(this.x == cobra.tail[i].x && this.y == cobra.tail[i].y){
                    isTouching = true
                }
           }
           console.log(this.x, this.y)
           this.size = cobra.size
           this.color = "red"
            if(!isTouching){
                break;
            }
        }
    }
}

var canvas = document.getElementById("canvas")

var cobra = new Cobra(20,20,20);

var apple = new Apple ();

var canvasContext = canvas.getContext ('2d');

window.onload = () => {
    gameLoop()
}

function gameLoop (){
    setInterval(show, 1000/10)
}

function show(){
    update();
    draw();
}

function update (){
    canvasContext.clearRect(0,0, canvas.width , canvas.height)
    cobra.move()
    eatApple()
    checkHitWall()
}

function checkHitWall(){
    var headTail = cobra.tail[cobra.tail.length -1]
    if (headTail.x == - cobra.size){
        headTail.x = canvas.width - cobra.size
    } else if (headTail.x == canvas.width){
        headTail.x = 0
    } else if (headTail.y == - cobra.size){
        headTail.y = canvas.height - cobra.size
    } else if (headTail.y == canvas.height){
        headTail.y = 0
    }   
}

function eatApple(){
    if(cobra.tail[cobra.tail.length - 1].x == apple.x &&
        cobra.tail[cobra.tail.length - 1].y == apple.y){
            cobra.tail[cobra.tail.length] = {x:apple.x, y:apple.y}
            apple = new Apple();
        }
}

function draw (){
    createRect(0,0,canvas.width, canvas.height, "black")
    createRect(0,0,canvas.width, canvas.height)
    for(var i = 0; i < cobra.tail.length; i++){
        createRect(cobra.tail[i].x + 2.5, cobra.tail[i].y + 2.5,
            cobra.size - 5, cobra.size - 5, "white")
    }

    canvasContext.font = "20px Arial"
    canvasContext.fillStyle = "#00FF42"
    canvasContext.fillText("Score: " + (cobra.tail.length - 1),
        canvas.width -120 , 18)
    createRect(apple.x, apple.y, apple.size, apple.size, apple.color)
}

function createRect(x,y,width,height,color){
    canvasContext.fillStyle = color
    canvasContext.fillRect(x,y,width,height)
}

window.addEventListener("keydown", (event)=>{
    setTimeout(()=>{
        if(event.keyCode == 37 && cobra.rotateX != 1){
            cobra.rotateX = -1
            cobra.rotateY = 0          
        } else if(event.keyCode == 38 && cobra.rotateY != 1){
            cobra.rotateX = 0
            cobra.rotateY = -1
        } else if(event.keyCode == 39 && cobra.rotateX != -1){
            cobra.rotateX = 1
            cobra.rotateY = 0
        } else if(event.keyCode == 40 && cobra.rotateY != -1){
            cobra.rotateX = 0
            cobra.rotateY = 1
        }        
    }, 1)
})