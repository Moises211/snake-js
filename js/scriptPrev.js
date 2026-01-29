const canvas = document.getElementById('snakeCanvas');
const context = canvas.getContext('2d');//Obtener el contexto del canvas para dibujar
//Siendo el contexto 2D lo que significa que se dibujará en dos dimensiones

//filltStyle = Define el color, gradiente o patrón para rellenar el rectángulo
context.fillStyle = 'red'; //Color de relleno
//fillRect() = Función para dibujar un rectángulo relleno
context.fillRect(25, canvas.height / 2, 15, 15); //(x, y, width, height)

/*context.beginPath();
context.arc(300, 100, 40, 0, Math.PI * 2) //(x, y, radio, anguloInicio, anguloFin)
context.fillStyle = 'blue';
context.fill();*/
let posX = 25;
let posY = canvas.height / 2;
const partBody = [{ 'x': posX, 'y': posY, 'sizeW': 15, 'sizeH': 15 }];
var Body = [partBody];

lastStatus = null;
/*var lastStatusX = null;
var lastStatusY = null;*/
var cardinal = 'X'; //representa la direccion en la cual actualmente se mueve el objecto, esto en plano cartesiano
//funcion que captura el movimiento del objecto
function move(keyPressed, cardinal) {
    //Calculo del Movimento en plano X es decir Horizonal
    console.log('cardinal inicial: '+cardinal);
    if(cardinal != 'X'){
        cardinal = moveX(keyPressed);        
        console.log('cardinal X: '+cardinal);
    }else if(cardinal != 'Y'){
        cardinal = moveY(keyPressed);        
        console.log('cardinal Y: '+cardinal);
    }
    console.log('cardinal salida: '+cardinal);
    
    function moveX(keyPressed) {
        if (keyPressed === "ArrowRight" && lastStatus !== keyPressed) {
            posX += 15;
            actualizarCanvas();
            lastStatusX = keyPressed;
            return 'X';
        } else if (keyPressed === "ArrowLeft" && lastStatus !== keyPressed) {
            posX -= 15;
            actualizarCanvas();
            lastStatusX = keyPressed;
            return 'X';
        }        
        return cardinal;
    }
    //Calculo del Movimento en plano Y es decir Vertical
    function moveY(keyPressed) {
        if (keyPressed === "ArrowUp" && lastStatus !== keyPressed) {
            posY -= 15;
            actualizarCanvas();
            lastStatusY = keyPressed;
            return 'Y';
        } else if (keyPressed === "ArrowDown" && lastStatus !== keyPressed) {
            posY += 15;
            actualizarCanvas();
            lastStatusY = keyPressed;
            return 'Y';
        }      
        return cardinal;  
    }
    return cardinal;
}

window.addEventListener('keydown', function (event) {
    var keyPressed = event.key;
    this.cardinal = move(keyPressed, cardinal);
});
function actualizarCanvas(partBody) {
    // 1. Limpiar el lienzo (desde 0,0 hasta el ancho y alto total)
    context.clearRect(0, 0, canvas.width, canvas.height);
    //2 Lógica de movimiento (ejemplo: mover a la derecha) y metodos de actualizacion de objectos en canvas
    //2.1 Metodo que actualiza la posición de la serpiente
    //posX += velocidad;
    //2.2 Metodos para actulizar elementos del marcador
    //2.3 Metodos de colision
    //2.4 Metodos de crecimiento de la serpiente
    //2.5 Metodos de generacion de comida
    //3. Dibujar la serpiente en la nueva posición 
    context.fillRect(posX, posY, 15, 15);
    //4. Repetir el proceso
    requestAnimationFrame(actualizarCanvas);
}
