const canvas = document.getElementById('snakeCanvas');
const context = canvas.getContext('2d');//Obtener el contexto del canvas para dibujar
//Siendo el contexto 2D lo que significa que se dibujará en dos dimensiones

//filltStyle = Define el color, gradiente o patrón para rellenar el rectángulo
context.fillStyle = 'green'; //Color de relleno
//fillRect() = Función para dibujar un rectángulo relleno
//context.fillRect(25, canvas.height / 2, 15, 15); //(x, y, width, height)

/*context.beginPath();
context.arc(300, 100, 40, 0, Math.PI * 2) //(x, y, radio, anguloInicio, anguloFin)
context.fillStyle = 'blue';
context.fill();*/
let posX = 15 * 4;
let posY = canvas.height / 2;
let sizeW = 15;
let sizeH = 15;
var speed = 3; //Velocidad de movimiento en píxeles por frame
var coundKey = 0; //Contador de teclas presionadas


//Al definir el componente de la forma siguiente const partBody = () => ({}); se está creando una función flecha que devuelve un objeto literal.
//Esta función toma parámetros para definir las propiedades del objeto, como la posición (posX, posY) y el tamaño (sizeW, sizeH).
//Lo cual nos permite crear multiples instancias de un objecto declarado como una variable
const partBody = (posX, posY, W = sizeW, H = sizeH) => ({ 'x': posX, 'y': posY, 'W': sizeW, 'H': sizeH });

//inicializacion del cuerpo de la serpiente
var Body = [partBody(posX, posY)]; //Array que contiene las partes del cuerpo de la serpiente, la primera parte es la cabeza
Body.push(partBody(Body[0].x - 15, Body[0].y)); //Agregar la segunda parte del cuerpo
Body.push(partBody(Body[1].x - 15, Body[1].y)); //Agregar la tercera parte del cuerpo
Body.push(partBody(Body[2].x - 15, Body[2].y)); //Agregar la cuarta parte del cuerpo
Body.forEach(element => {
    context.fillRect(element.x, element.y, element.W, element.H);
});
console.log('Body inicial:', Body);
var lastStatus = null;
/*var lastStatusX = null;
var lastStatusY = null;*/
var cardinal = { 'plano': 'X', 'direction': 1 }; //representa la direccion en la cual actualmente se mueve el objecto, esto en plano cartesiano

//funcion que captura el movimiento del objecto
function movingCardinal(keyPressed, cardinal) {
    //Calculo del Movimento en plano X es decir Horizonal
    console.log('cardinal inicial: ' + cardinal);
    console.log('body en movingCardinal:', Body);
    if (cardinal.plano != 'X') {
        cardinal = moveX(keyPressed);
        console.log('cardinal X: ' + cardinal);
    } else if (cardinal.plano != 'Y') {
        cardinal = moveY(keyPressed);
        console.log('cardinal Y: ' + cardinal);
    }
    console.log('cardinal salida: ' + cardinal);

    function moveX(keyPressed) {
        console.log('body en moveX:', Body);
        if (keyPressed === "ArrowRight" && lastStatus !== keyPressed) {
            posX += 15;
            moveBody(Body);
            lastStatus = keyPressed;
            return { 'plano': 'X', 'direction': 1 };
        } else if (keyPressed === "ArrowLeft" && lastStatus !== keyPressed) {
            posX -= 15;
            moveBody(Body);
            lastStatus = keyPressed;
            return { 'plano': 'X', 'direction': -1 };
        }
        return cardinal;
    }
    //Calculo del Movimento en plano Y es decir Vertical
    function moveY(keyPressed) {
        console.log('body en moveY:', Body);
        if (keyPressed === "ArrowUp" && lastStatus !== keyPressed) {
            posY -= 15;
            moveBody(Body);
            lastStatus = keyPressed;
            return { 'plano': 'Y', 'direction': -1 };
        } else if (keyPressed === "ArrowDown" && lastStatus !== keyPressed) {
            posY += 15;
            moveBody(Body);
            lastStatus = keyPressed;
            return { 'plano': 'Y', 'direction': 1 };
        }
        return cardinal;
    }
    return cardinal;
}

//funcion que mueve el cuerpo de la serpiente de acuerdo a la grip por cada parte del cuerpo
function moveBody(Body) {
    //console.log('Body before move:', Body);
    for (let index = Body.length - 1; index >= 0; index--) {
        const element = Body[index];
        if (index === 0) {
            //Mover la cabeza
            Body[index].x = posX;
            Body[index].y = posY;
        } else {
            //Mover el resto del cuerpo
            Body[index].x = Body[index - 1].x;
            Body[index].y = Body[index - 1].y;
        }
    }
    //console.log('Body after move:', Body);
}
//funcion que mantiene el movimiento constante del objecto
function constaMove() {

    if (cardinal.plano === 'X') {
        if (cardinal.direction === 1) {
            posX += sizeW;
        }
        if (cardinal.direction === -1) {
            posX -= sizeW;
        }
    }
    if (cardinal.plano === 'Y') {
        if (cardinal.direction === 1) {
            posY += sizeH;
        }
        if (cardinal.direction === -1) {
            posY -= sizeH;
        }
    }
    moveBody(Body); //Actualizar la posición del cuerpo de la serpiente    
}

function actualizarCanvas() {
    //Limpiar el lienzo (desde 0,0 hasta el ancho y alto total)
    context.clearRect(0, 0, canvas.width, canvas.height);
    //2 Lógica de movimiento (ejemplo: mover a la derecha) y metodos de actualizacion de objectos en canvas
    //2.1 Metodo que actualiza la posición de la serpiente
    //posX += velocidad;
    //2.2 Metodos para actulizar elementos del marcador
    //2.3 Metodos de colision
    //2.4 Metodos de crecimiento de la serpiente
    //2.5 Metodos de generacion de comida
    //3. Dibujar la serpiente en la nueva posición
    //context.fillRect(posX, posY, 15, 15);
    //console.log('Body en actualizarCanvas:', Body);
    Body.forEach(element => {
        context.fillRect(element.x, element.y, element.W, element.H);
    });
    //constaMove();
    /*Body.forEach(element => {
        console.log(element);
    });*/
}

function gameLoop() {
    //4. Repetir el proceso
    setInterval(() => {
        constaMove(); //Actualizar la posición de la serpiente
        requestAnimationFrame(actualizarCanvas);
    }, 100 * speed /*velocidad de movimiento en milisegundos*/);
}

//Evento que escucha la tecla presionada e inicia el bucle del juego
window.addEventListener('keydown', function (event) {
    if (coundKey === 0) {
        gameLoop(); //Iniciar el bucle del juego al presionar una tecla
        coundKey++;
    }    
    var keyPressed = event.key; //Obtener la tecla presionada
    this.cardinal = movingCardinal(keyPressed, cardinal); //Actualizar la dirección de movimiento
    actualizarCanvas(); //Actualizar el lienzo con la nueva posición
    // console.log('Body en keydown:', Body); //Ver el cuerpo de la serpiente en la consola
});