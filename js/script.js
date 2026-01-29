//1. Configuración inicial del canvas y la serpiente
const canvas = document.getElementById('snakeCanvas');
const context = canvas.getContext('2d');//Obtener el contexto del canvas para dibujar
//Siendo el contexto 2D lo que significa que se dibujará en dos dimensiones
const contextGrid = canvas.getContext('2d');
context.fillStyle = '#1d6f06'; //filltStyle = Define el color, gradiente o patrón para rellenar el rectángulo
//1.0.1 Fondo de grid del canvas 30px*30px tipo tablero
function drawGrid() {
    for (let x = 0; x < canvas.width; x += 30) {//Recorre el ancho del canvas en incrementos de 30px
        for (let y = 0; y < canvas.height; y += 30) {//Recorre el alto del canvas en incrementos de 30px
            contextGrid.fillStyle = ((x + y) / 30) % 2 === 0 ? '#A9D08E' : '#7BB661'; //Rellena con colores segun calculo de posicion, siendo la suma de x e y dividida entre 30 par o impar
            contextGrid.fillRect(x, y, 30, 30); //Dibuja un rectángulo en la posición (x,y) con ancho y alto de 30px
        }
    }
}
drawGrid();//Llamada inicial para dibujar la cuadrícula

//1.1 Definición de los elementos iniciales de la serpiente
let posX = 30 * 4; //Posición inicial en X
let posY = canvas.height / 2; //Posición inicial en Y
let sizeW = 30; //tamaño horizontal y vertical de cada parte del cuerpo
let sizeH = 30;
var speed = 10; //Velocidad de movimiento en píxeles por frame
var coundKey = 0; //Contador de teclas presionadas

//Al definir el componente de la forma siguiente const partBody = () => ({}); se está creando una función flecha que devuelve un objeto literal.
//Esta función toma parámetros para definir las propiedades del objeto, como la posición (posX, posY) y el tamaño (sizeW, sizeH).
//Lo cual nos permite crear multiples instancias de un objecto declarado como una variable
const partBody = (posX, posY, W = sizeW, H = sizeH) => ({ 'x': posX, 'y': posY, 'W': sizeW, 'H': sizeH });

//1.2 inicializacion del cuerpo de la serpiente
var Body = [partBody(posX, posY)]; //Array que contiene las partes del cuerpo de la serpiente, la primera parte es la cabeza
Body.push(partBody(Body[0].x - 30, Body[0].y)); //Agregar la segunda parte del cuerpo
Body.push(partBody(Body[1].x - 30, Body[1].y)); //Agregar la tercera parte del cuerpo
Body.push(partBody(Body[2].x - 30, Body[2].y)); //Agregar la cuarta parte del cuerpo
//Body.push(partBody(Body[3].x - 30, Body[3].y)); //Agregar la quinta parte del cuerpo

//1.3 Dibujar el cuerpo de la serpiente en el canvas
function drawBody() {
    for (let i = 0; i < Body.length; i++) {
        const element = Body[i];
        if (i === 0) {
            context.fillStyle = '#217909'; //Color diferente para la cabaza                         
        } else {
            context.fillStyle = '#1d6f06'; //Color de relleno para el resto del cuerpo
        }
        context.fillRect(element.x, element.y, element.W, element.H);
    }
    /*Body.forEach(element => {
        context.fillRect(element.x, element.y, element.W, element.H);
    });*/
    //console.log('Body inicial:', Body);
}
drawBody();//Llamada inicial para dibujar el cuerpo de la serpiente

var lastStatus = null; //Variable para almacenar la última tecla presionada
var cardinal = { 'plano': 'X', 'direction': 1 }; //representa la direccion en la cual actualmente se mueve el objecto, esto en plano cartesiano

//2 Lógica de movimiento (ejemplo: mover a la derecha) y metodos de actualizacion de objectos en canvas

//2.3 Metodos para actulizar elementos del marcador //faltante (seria con texto en canvas)
//2.4 Metodos de colision //faltante (igual tengo una vaga idea de como hacerlo)
function checkCollisionBody() { //Verificar la colision de la cabeza con el cuerpo
    var head = Body[0]; //Cabeza de la serpiente
    for (let i = 1; i < Body.length; i++) {
        const element = Body[i];
       if(head.x === element.x && head.y === element.y ){
            console.log('Colision detectada con el cuerpo en la parte:', i);
            return true;
       } 
    }
}
//2.5 Metodos de crecimiento de la serpiente //faltante (ya tengo idea de como hacerlo)
//2.6 Metodos de generacion de comida //faltante (ya tengo idea de como hacerlo)


//2.1 Metodos que actualizan la posición de la serpiente
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
        //console.log('body en moveX:', Body);
        //Calculo del Movimento en plano X es decir Horizonal
        if (keyPressed === "ArrowRight" && lastStatus !== keyPressed) {
            posX += 30;
            moveBody(Body);
            lastStatus = keyPressed;
            return { 'plano': 'X', 'direction': 1 };
        } else if (keyPressed === "ArrowLeft" && lastStatus !== keyPressed) {
            posX -= 30;
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
            posY -= 30;
            moveBody(Body);
            lastStatus = keyPressed;
            return { 'plano': 'Y', 'direction': -1 };
        } else if (keyPressed === "ArrowDown" && lastStatus !== keyPressed) {
            posY += 30;
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

//2.2 Metodos que mantienen el movimiento constante del objecto serpiente
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

//3. Renderizar los elementos en el canvas
function actualizarCanvas() {
    //Limpiar el lienzo (desde 0,0 hasta el ancho y alto total)
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();// Redibujar la cuadrícula después de limpiar el canvas
    drawBody(); //Dibujar el cuerpo de la serpiente
    /*Body.forEach(element => {
        context.fillRect(element.x, element.y, element.W, element.H);
    });*/
}

//4. Repetir el proceso en un bucle de juego
var gameLoopInterval = null; //Variable para almacenar el intervalo del bucle del juego
function gameLoop(nowState) {
    gameLoopInterval = setInterval(() => {
        constaMove(); //Actualizar la posición de la serpiente
        requestAnimationFrame(actualizarCanvas);
        //actualizarCanvas(); //Redibujar el canvas con la nueva posición
    }, 100 * speed /*velocidad de movimiento en milisegundos*/);
    var collision = checkCollisionBody(); //Verificar colisiones con el cuerpo
    if(collision){
        clearInterval(gameLoopInterval); //Detener el bucle del juego en caso de colision
        console.log('Juego terminado por colision con el cuerpo');
    }
    /*if (!nowState) {       
    } else {
        console.log('Body en gameLoop con keyPressed:', Body); //Ver el cuerpo de la serpiente en la consola
        clearInterval(gameLoopInterval); //Detener el bucle del juego para evitar saltos en el movimiento        
        //gameLoop(false); //Reiniciar el bucle del juego para aplicar el cambio de dirección
    }*/
}

//Evento que escucha la tecla presionada e inicia el bucle del juego
window.addEventListener('keydown', function (event) {
    if (coundKey === 0) {
        gameLoop(); //Iniciar el bucle del juego al presionar una tecla
        coundKey++;
    } else {
        var keyPressed = event.key; //Obtener la tecla presionada
        this.cardinal = movingCardinal(keyPressed, cardinal); //Actualizar la dirección de movimiento
        clearInterval(gameLoopInterval); //Detener el bucle del juego para evitar saltos en el movimiento
        actualizarCanvas(); //Actualizar el lienzo con la nueva posición               
        gameLoop(); //Reiniciar el bucle del juego para aplicar el cambio de dirección        
    }
    //clearInterval(); //Detener el bucle del juego para evitar saltos en el movimiento   
    // console.log('Body en keydown:', Body); //Ver el cuerpo de la serpiente en la consola
});